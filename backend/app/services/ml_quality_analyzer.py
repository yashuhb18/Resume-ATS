"""
Hybrid resume quality analyzer with an optional PyTorch backend.

The model does not download external weights. It extracts recruiter/ATS quality
signals from the parsed resume and, when torch is installed, runs a small local
neural classifier trained at startup on calibrated expert profiles. The Python
fallback uses the same features with cosine/softmax scoring, so the application
keeps working on lightweight deployments.
"""
import math
import re
from typing import Any, Dict, List

try:
    import torch
    TORCH_AVAILABLE = all(
        hasattr(torch, attr)
        for attr in ("tensor", "nn", "optim", "manual_seed")
    )
except ImportError:
    torch = None
    TORCH_AVAILABLE = False


class MLQualityAnalyzer:
    """Score resume content quality from evidence, readability, and structure."""

    FEATURE_NAMES = [
        "word_count",
        "section_count",
        "skill_count",
        "bullet_count",
        "metric_count",
        "action_verb_count",
        "contact_score",
        "sentence_quality",
        "achievement_ratio",
        "technical_density",
        "project_depth",
        "experience_depth",
        "readability_flow",
        "uniqueness",
    ]

    ACTION_VERBS = [
        "achieved", "analyzed", "architected", "automated", "built",
        "collaborated", "created", "delivered", "designed", "developed",
        "implemented", "improved", "increased", "launched", "led",
        "managed", "optimized", "reduced", "scaled", "secured",
        "streamlined", "transformed", "upgraded",
    ]

    STRONG_PROFILE = [0.82, 0.92, 0.78, 0.78, 0.72, 0.82, 1.00, 0.75, 0.82, 0.72, 0.72, 0.78, 0.75, 0.94]
    AVERAGE_PROFILE = [0.55, 0.58, 0.48, 0.48, 0.35, 0.48, 0.74, 0.58, 0.45, 0.45, 0.42, 0.45, 0.58, 0.82]
    WEAK_PROFILE = [0.24, 0.22, 0.18, 0.12, 0.06, 0.16, 0.30, 0.28, 0.12, 0.18, 0.10, 0.12, 0.30, 0.55]

    def __init__(self):
        self.model = None
        if TORCH_AVAILABLE:
            try:
                self.model = self._train_quality_model()
            except Exception as exc:
                print(f"PyTorch quality model unavailable, using fallback: {exc}")

    def analyze(self, parsed_data: Dict[str, Any], skills: Any) -> Dict[str, Any]:
        """Return quality score, class label, feature values, and next actions."""
        text = parsed_data.get("raw_text", "") or ""
        sections = parsed_data.get("sections", {}) or {}
        candidate = parsed_data.get("candidate", {}) or {}
        candidate_dict = candidate.dict() if hasattr(candidate, "dict") else candidate

        raw_features = self._extract_raw_features(text, sections, candidate_dict, parsed_data, skills)
        normalized = self._normalize_features(raw_features)
        probabilities = self._profile_probabilities(normalized)
        neural_score = int(round(
            probabilities["strong"] * 100 +
            probabilities["average"] * 64 +
            probabilities["weak"] * 24
        ))
        deterministic_score = self._deterministic_score(normalized)
        score = int(round(neural_score * 0.68 + deterministic_score * 0.32))

        if score >= 78:
            label = "strong"
        elif score >= 54:
            label = "average"
        else:
            label = "weak"

        return {
            "available": bool(TORCH_AVAILABLE and self.model),
            "backend": "pytorch_hybrid_quality_model" if TORCH_AVAILABLE and self.model else "python_quality_fallback",
            "training": {
                "trained_on_startup": bool(TORCH_AVAILABLE and self.model),
                "feature_count": len(self.FEATURE_NAMES),
                "classes": ["weak", "average", "strong"],
                "purpose": "Resume readiness classification from recruiter evidence, ATS structure, and readability signals",
            },
            "label": label,
            "score": max(0, min(100, score)),
            "probabilities": probabilities,
            "features": raw_features,
            "normalized_features": dict(zip(self.FEATURE_NAMES, normalized)),
            "recommendations": self._recommendations(raw_features),
        }

    def _train_quality_model(self):
        """Train a compact neural classifier on calibrated synthetic profiles."""
        torch.manual_seed(11)
        profiles = torch.tensor(
            [self.WEAK_PROFILE, self.AVERAGE_PROFILE, self.STRONG_PROFILE],
            dtype=torch.float32,
        )
        features = []
        labels = []

        for label, profile in enumerate(profiles):
            for _ in range(72):
                noise = torch.randn(len(self.FEATURE_NAMES)) * 0.07
                features.append(torch.clamp(profile + noise, 0.0, 1.0))
                labels.append(label)

        x_train = torch.stack(features)
        y_train = torch.tensor(labels, dtype=torch.long)
        model = torch.nn.Sequential(
            torch.nn.Linear(len(self.FEATURE_NAMES), 28),
            torch.nn.ReLU(),
            torch.nn.LayerNorm(28),
            torch.nn.Linear(28, 14),
            torch.nn.ReLU(),
            torch.nn.Linear(14, 3),
        )
        optimizer = torch.optim.AdamW(model.parameters(), lr=0.018, weight_decay=0.002)
        loss_fn = torch.nn.CrossEntropyLoss()

        model.train()
        for _ in range(220):
            optimizer.zero_grad()
            loss = loss_fn(model(x_train), y_train)
            loss.backward()
            optimizer.step()
        model.eval()
        return model

    def _extract_raw_features(
        self,
        text: str,
        sections: Dict[str, str],
        candidate: Dict[str, Any],
        parsed_data: Dict[str, Any],
        skills: Any,
    ) -> Dict[str, float]:
        words = re.findall(r"[A-Za-z0-9+#.-]+", text)
        word_count = len(words)
        sentences = [s.strip() for s in re.split(r"[.!?]+", text) if s.strip()]
        avg_sentence_length = word_count / max(1, len(sentences))

        bullet_count = self._count_bullets(text)
        metric_count = len(re.findall(
            r"\d+%|\$[\d,]+|\b\d+\s*(users|customers|clients|employees|projects|requests|hours|days|months|revenue|sales|tickets|deployments|models|records)\b",
            text,
            re.IGNORECASE,
        ))
        action_verb_count = sum(
            1 for verb in self.ACTION_VERBS
            if re.search(rf"\b{re.escape(verb)}\b", text, re.IGNORECASE)
        )
        contact_score = sum(
            1 for key in ("name", "email", "phone", "linkedin", "github")
            if candidate.get(key)
        )
        skill_values = self._skill_values(skills)
        skill_count = len(skill_values)
        lower_text = text.lower()
        technical_hits = sum(1 for skill in skill_values if skill.lower() in lower_text)

        projects = parsed_data.get("projects", []) or []
        experience = parsed_data.get("experience", {}) or {}
        exp_dict = experience.dict() if hasattr(experience, "dict") else experience
        positions = exp_dict.get("positions", []) or []

        content_lines = [line.strip().lower() for line in text.splitlines() if len(line.strip()) > 24]
        duplicate_lines = len(content_lines) - len(set(content_lines))
        achievement_ratio = (metric_count + action_verb_count) / max(1, bullet_count or len(sentences))

        return {
            "word_count": float(word_count),
            "section_count": float(sum(1 for value in sections.values() if len((value or "").strip()) > 20)),
            "skill_count": float(skill_count),
            "bullet_count": float(bullet_count),
            "metric_count": float(metric_count),
            "action_verb_count": float(action_verb_count),
            "contact_score": float(contact_score),
            "avg_sentence_length": float(avg_sentence_length),
            "achievement_ratio": float(achievement_ratio),
            "technical_hits": float(technical_hits),
            "project_count": float(len(projects)),
            "position_count": float(len(positions)),
            "experience_years": float(exp_dict.get("total_years", 0) or 0),
            "duplicate_lines": float(max(0, duplicate_lines)),
        }

    def _normalize_features(self, features: Dict[str, float]) -> List[float]:
        sentence_quality = self._sentence_quality(features["avg_sentence_length"])
        return [
            self._bounded(features["word_count"], 180, 950),
            self._bounded(features["section_count"], 2, 6),
            self._bounded(features["skill_count"], 5, 22),
            self._bounded(features["bullet_count"], 4, 28),
            self._bounded(features["metric_count"], 1, 9),
            self._bounded(features["action_verb_count"], 3, 16),
            self._bounded(features["contact_score"], 2, 5),
            sentence_quality,
            self._bounded(features["achievement_ratio"], 0.15, 1.10),
            self._bounded(features["technical_hits"], 3, 16),
            self._bounded(features["project_count"], 1, 4),
            max(self._bounded(features["position_count"], 1, 4), self._bounded(features["experience_years"], 0.5, 5)),
            sentence_quality * self._bounded(features["bullet_count"] + features["section_count"], 5, 30),
            1.0 - self._bounded(features["duplicate_lines"], 1, 8),
        ]

    def _profile_probabilities(self, normalized: List[float]) -> Dict[str, float]:
        if TORCH_AVAILABLE and self.model:
            vector = torch.tensor(normalized, dtype=torch.float32).unsqueeze(0)
            with torch.no_grad():
                logits = self.model(vector).squeeze(0)
                raw_probs = torch.nn.functional.softmax(logits, dim=0).tolist()
            probs = [raw_probs[2], raw_probs[1], raw_probs[0]]
        else:
            similarities = [
                self._cosine(normalized, self.STRONG_PROFILE),
                self._cosine(normalized, self.AVERAGE_PROFILE),
                self._cosine(normalized, self.WEAK_PROFILE),
            ]
            probs = self._softmax([value * 7.0 for value in similarities])

        return {
            "strong": round(float(probs[0]), 3),
            "average": round(float(probs[1]), 3),
            "weak": round(float(probs[2]), 3),
        }

    def _deterministic_score(self, normalized: List[float]) -> int:
        weights = [8, 8, 8, 8, 11, 9, 7, 6, 11, 7, 5, 5, 4, 3]
        score = sum(value * weight for value, weight in zip(normalized, weights))
        return int(round(score))

    def _recommendations(self, features: Dict[str, float]) -> List[str]:
        recommendations = []
        if features["metric_count"] < 2:
            recommendations.append("Add measurable achievements with numbers, percentages, scale, or time saved.")
        if features["bullet_count"] < 5 and features["word_count"] > 220:
            recommendations.append("Convert dense paragraphs into concise achievement bullets.")
        if features["action_verb_count"] < 4:
            recommendations.append("Start more bullets with strong action verbs such as built, led, optimized, delivered, or automated.")
        if features["section_count"] < 4:
            recommendations.append("Use clear sections for Summary, Skills, Experience, Projects, Education, and Certifications.")
        if features["technical_hits"] < 4 and features["skill_count"] >= 5:
            recommendations.append("Back listed skills with proof inside projects or experience bullets.")
        if features["duplicate_lines"] >= 2:
            recommendations.append("Remove repeated lines and merge duplicate responsibilities into stronger impact statements.")
        return recommendations[:5]

    def _skill_values(self, skills: Any) -> List[str]:
        values: List[str] = []
        for attr in ("programming_languages", "frameworks", "tools", "databases", "soft_skills", "other"):
            values.extend(getattr(skills, attr, []) or [])
        return sorted(set(str(value).strip() for value in values if str(value).strip()))

    def _count_bullets(self, text: str) -> int:
        count = 0
        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith(("\u2022", "-", "*", "\u2013", "\u2014", "\u25cb", "\u25cf")):
                count += 1
            elif re.match(r"^\d+[\.)]\s+", stripped):
                count += 1
        return count

    def _bounded(self, value: float, low: float, high: float) -> float:
        if high <= low:
            return 0.0
        return max(0.0, min(1.0, (value - low) / (high - low)))

    def _sentence_quality(self, avg_sentence_length: float) -> float:
        if avg_sentence_length <= 0:
            return 0.0
        distance = abs(avg_sentence_length - 18.0)
        return max(0.0, min(1.0, 1.0 - distance / 24.0))

    def _cosine(self, left: List[float], right: List[float]) -> float:
        dot = sum(a * b for a, b in zip(left, right))
        left_norm = math.sqrt(sum(a * a for a in left))
        right_norm = math.sqrt(sum(b * b for b in right))
        if not left_norm or not right_norm:
            return 0.0
        return dot / (left_norm * right_norm)

    def _softmax(self, values: List[float]) -> List[float]:
        max_value = max(values)
        exps = [math.exp(value - max_value) for value in values]
        total = sum(exps)
        return [value / total for value in exps]


ml_quality_analyzer = MLQualityAnalyzer()

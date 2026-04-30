"""
Computer-vision resume layout analyzer.

Uses OpenCV when available to inspect rendered PDF pages for visual ATS risks:
skew, text density, image-heavy pages, table-like ruled lines, and multi-column
layouts. It degrades cleanly when native CV dependencies are unavailable.
"""
from typing import Any, Dict, List

try:
    import cv2
    import numpy as np
    from pdf2image import convert_from_path
    CV_AVAILABLE = True
except ImportError:
    cv2 = None
    np = None
    convert_from_path = None
    CV_AVAILABLE = False


class CVResumeAnalyzer:
    """Analyze resume page images with OpenCV."""

    MAX_PAGES = 3
    DPI = 160

    def analyze_pdf(self, pdf_path: str, max_pages: int = None) -> Dict[str, Any]:
        if not CV_AVAILABLE:
            return self._unavailable("opencv_unavailable", "OpenCV/pdf2image dependencies are unavailable.")

        try:
            pages = convert_from_path(
                pdf_path,
                dpi=self.DPI,
                first_page=1,
                last_page=max_pages or self.MAX_PAGES,
            )
        except Exception as exc:
            return self._unavailable("opencv_render_failed", f"Could not render PDF pages for CV analysis: {str(exc)}")

        page_reports = [self._analyze_page(page) for page in pages[: max_pages or self.MAX_PAGES]]
        if not page_reports:
            return self._unavailable("opencv_no_pages", "No pages were available for CV analysis.")

        signals = self._average_signals(page_reports)
        issues = self._issues(signals)
        score = self._score(signals, issues)

        return {
            "available": True,
            "backend": "opencv",
            "layout_score": score,
            "risk_level": self._risk_level(score),
            "pages_analyzed": len(page_reports),
            "signals": signals,
            "page_reports": page_reports,
            "issues": issues,
        }

    def _unavailable(self, backend: str, issue: str) -> Dict[str, Any]:
        return {
            "available": False,
            "backend": backend,
            "layout_score": 70,
            "risk_level": "unknown",
            "pages_analyzed": 0,
            "signals": {},
            "issues": [issue],
            "page_reports": [],
        }

    def _analyze_page(self, image: Any) -> Dict[str, float]:
        gray = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2GRAY)
        height, width = gray.shape[:2]
        blurred = cv2.GaussianBlur(gray, (3, 3), 0)
        binary = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

        text_density = float(np.count_nonzero(binary)) / float(width * height)
        skew_angle = abs(self._estimate_skew(binary))
        horizontal_lines, vertical_lines = self._line_counts(binary, width, height)
        column_count = self._estimate_columns(binary, width)
        large_blocks = self._count_large_blocks(binary, width, height)
        whitespace_balance = self._whitespace_balance(binary, width, height)
        margin_balance = self._margin_balance(binary, width, height)
        paragraph_blocks = self._paragraph_block_count(binary, width, height)

        return {
            "text_density": round(text_density, 4),
            "skew_angle": round(skew_angle, 2),
            "horizontal_lines": float(horizontal_lines),
            "vertical_lines": float(vertical_lines),
            "column_count": float(column_count),
            "large_visual_blocks": float(large_blocks),
            "whitespace_balance": round(whitespace_balance, 3),
            "margin_balance": round(margin_balance, 3),
            "paragraph_blocks": float(paragraph_blocks),
        }

    def _estimate_skew(self, binary: Any) -> float:
        coords = np.column_stack(np.where(binary > 0))
        if coords.size == 0:
            return 0.0
        angle = cv2.minAreaRect(coords)[-1]
        if angle < -45:
            angle = 90 + angle
        return float(angle)

    def _line_counts(self, binary: Any, width: int, height: int) -> tuple:
        horizontal_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (max(20, width // 12), 1))
        vertical_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, max(20, height // 18)))
        horizontal = cv2.morphologyEx(binary, cv2.MORPH_OPEN, horizontal_kernel)
        vertical = cv2.morphologyEx(binary, cv2.MORPH_OPEN, vertical_kernel)
        h_contours, _ = cv2.findContours(horizontal, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        v_contours, _ = cv2.findContours(vertical, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        return len(h_contours), len(v_contours)

    def _estimate_columns(self, binary: Any, width: int) -> int:
        projection = np.sum(binary > 0, axis=0)
        smoothed = np.convolve(projection, np.ones(35) / 35, mode="same")
        threshold = max(1.0, smoothed.max() * 0.08)
        occupied = smoothed > threshold
        segments = 0
        in_segment = False
        start = 0
        min_width = max(30, width // 12)

        for idx, value in enumerate(occupied):
            if value and not in_segment:
                start = idx
                in_segment = True
            elif not value and in_segment:
                if idx - start >= min_width:
                    segments += 1
                in_segment = False
        if in_segment and width - start >= min_width:
            segments += 1
        return max(1, min(3, segments))

    def _count_large_blocks(self, binary: Any, width: int, height: int) -> int:
        contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        large_blocks = 0
        for contour in contours:
            _, _, w, h = cv2.boundingRect(contour)
            area_ratio = (w * h) / float(width * height)
            if area_ratio > 0.035 and w > width * 0.18 and h > height * 0.08:
                large_blocks += 1
        return large_blocks

    def _paragraph_block_count(self, binary: Any, width: int, height: int) -> int:
        """Estimate grouped text regions after connecting nearby characters."""
        kernel = cv2.getStructuringElement(
            cv2.MORPH_RECT,
            (max(18, width // 45), max(5, height // 180))
        )
        connected = cv2.dilate(binary, kernel, iterations=2)
        contours, _ = cv2.findContours(connected, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        blocks = 0
        for contour in contours:
            _, _, w, h = cv2.boundingRect(contour)
            if w > width * 0.12 and h > height * 0.01:
                blocks += 1
        return blocks

    def _whitespace_balance(self, binary: Any, width: int, height: int) -> float:
        """Compare top/bottom and left/right ink distribution for layout stability."""
        left = np.count_nonzero(binary[:, : width // 2])
        right = np.count_nonzero(binary[:, width // 2 :])
        top = np.count_nonzero(binary[: height // 2, :])
        bottom = np.count_nonzero(binary[height // 2 :, :])
        horizontal = self._balance_ratio(left, right)
        vertical = self._balance_ratio(top, bottom)
        return (horizontal + vertical) / 2.0

    def _margin_balance(self, binary: Any, width: int, height: int) -> float:
        coords = np.column_stack(np.where(binary > 0))
        if coords.size == 0:
            return 0.0
        y_min, x_min = coords.min(axis=0)
        y_max, x_max = coords.max(axis=0)
        margins = [
            x_min / max(1, width),
            (width - x_max) / max(1, width),
            y_min / max(1, height),
            (height - y_max) / max(1, height),
        ]
        min_margin = min(margins)
        max_margin = max(margins)
        if max_margin <= 0:
            return 0.0
        return max(0.0, min(1.0, min_margin / max_margin))

    def _balance_ratio(self, left: int, right: int) -> float:
        larger = max(left, right)
        smaller = min(left, right)
        if larger == 0:
            return 0.0
        return float(smaller) / float(larger)

    def _average_signals(self, reports: List[Dict[str, float]]) -> Dict[str, float]:
        return {
            key: round(sum(report[key] for report in reports) / len(reports), 3)
            for key in reports[0]
        }

    def _issues(self, signals: Dict[str, float]) -> List[str]:
        issues = []
        if signals.get("skew_angle", 0) > 2.0:
            issues.append("Page appears skewed; scanned resumes may OCR poorly.")
        if signals.get("column_count", 1) > 1:
            issues.append("Multi-column layout detected; ATS systems may read content out of order.")
        if signals.get("horizontal_lines", 0) + signals.get("vertical_lines", 0) > 12:
            issues.append("Table or ruled-line layout detected; convert tables to simple headings and bullets.")
        if signals.get("large_visual_blocks", 0) > 2:
            issues.append("Image-heavy visual blocks detected; keep critical content as selectable text.")
        if signals.get("text_density", 0) < 0.025:
            issues.append("Low visible text density detected; resume may be sparse or image-based.")
        if signals.get("text_density", 0) > 0.18:
            issues.append("Very dense page detected; add spacing and concise bullets for recruiter scanability.")
        if signals.get("margin_balance", 1) < 0.22:
            issues.append("Uneven or tight margins detected; ATS parsers and recruiters may read the page less reliably.")
        if signals.get("paragraph_blocks", 0) < 4 and signals.get("text_density", 0) > 0.04:
            issues.append("Large text blocks detected; split long paragraphs into structured bullets.")
        return issues

    def _score(self, signals: Dict[str, float], issues: List[str]) -> int:
        score = 100
        score -= min(20, int(signals.get("skew_angle", 0) * 4))
        if signals.get("column_count", 1) > 1:
            score -= 14
        score -= min(18, int((signals.get("horizontal_lines", 0) + signals.get("vertical_lines", 0)) * 1.2))
        score -= min(16, int(signals.get("large_visual_blocks", 0) * 5))
        if signals.get("text_density", 0) < 0.025:
            score -= 14
        if signals.get("text_density", 0) > 0.18:
            score -= 10
        score -= min(10, int((1 - signals.get("whitespace_balance", 1)) * 10))
        score -= min(10, int((1 - signals.get("margin_balance", 1)) * 10))
        if signals.get("paragraph_blocks", 6) < 4 and signals.get("text_density", 0) > 0.04:
            score -= 8
        score -= min(12, max(0, len(issues) - 1) * 4)
        return max(0, min(100, score))

    def _risk_level(self, score: int) -> str:
        if score >= 80:
            return "low"
        if score >= 55:
            return "medium"
        return "high"


cv_resume_analyzer = CVResumeAnalyzer()

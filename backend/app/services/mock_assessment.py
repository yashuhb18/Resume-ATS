"""
Mock Assessment Service - Generates technical quizzes for ECE/EEE domains.
"""
import random
from typing import List, Dict, Any
from app.models.schemas import DomainInfo, SkillsData

class MockAssessmentGenerator:
    """Generates technical questions for ECE domains."""

    def __init__(self):
        # Curated question bank for ECE domains
        self.question_bank = {
            'VLSI & ASIC Design': [
                {
                    "question": "Which of the following is responsible for resolving setup time violations in digital circuits?",
                    "options": ["Decreasing the clock frequency", "Increasing the clock frequency", "Increasing data path delay", "Using a faster flip-flop"],
                    "correct_answer": "Decreasing the clock frequency",
                    "explanation": "Setup time violations occur when data arrives too late. Decreasing clock frequency increases the time available."
                },
                {
                    "question": "What is the primary advantage of CMOS over NMOS technology?",
                    "options": ["Faster switching speed", "Lower static power dissipation", "Smaller transistor size", "Higher integration density"],
                    "correct_answer": "Lower static power dissipation",
                    "explanation": "CMOS only consumes significant power during switching, resulting in near-zero static power dissipation."
                },
                {
                    "question": "In Verilog, what is the difference between blocking (=) and non-blocking (<=) assignments?",
                    "options": ["Blocking executes sequentially; non-blocking executes concurrently.", "Non-blocking executes sequentially; blocking executes concurrently.", "They are exactly the same.", "Blocking is only for combinational logic; non-blocking is only for testbenches."],
                    "correct_answer": "Blocking executes sequentially; non-blocking executes concurrently.",
                    "explanation": "Blocking assignments execute in the order they are written, while non-blocking evaluate simultaneously at the end of the time step."
                }
            ],
            'Embedded Systems & IoT': [
                {
                    "question": "Which communication protocol is typically used for IoT devices due to its lightweight publish/subscribe model?",
                    "options": ["HTTP", "FTP", "MQTT", "SMTP"],
                    "correct_answer": "MQTT",
                    "explanation": "MQTT is designed for constrained devices and low-bandwidth, high-latency networks."
                },
                {
                    "question": "What is the purpose of a Watchdog Timer in an embedded system?",
                    "options": ["To keep track of real time (RTC)", "To reset the system if the software hangs", "To measure external pulse widths", "To generate PWM signals"],
                    "correct_answer": "To reset the system if the software hangs",
                    "explanation": "A Watchdog timer resets the MCU if it is not periodically cleared by the software, preventing system freezes."
                },
                {
                    "question": "Which architecture does the ARM Cortex-M series primarily use?",
                    "options": ["Von Neumann", "Harvard", "Super-Harvard", "Turing"],
                    "correct_answer": "Harvard",
                    "explanation": "ARM Cortex-M uses a Harvard architecture with separate instruction and data buses."
                }
            ],
            'Signal Processing & Communications': [
                {
                    "question": "According to the Nyquist-Shannon sampling theorem, what is the minimum sampling rate for a signal with a maximum frequency of fm?",
                    "options": ["fm", "1.5 fm", "2 fm", "4 fm"],
                    "correct_answer": "2 fm",
                    "explanation": "The sampling rate must be at least twice the maximum frequency to perfectly reconstruct the signal."
                },
                {
                    "question": "What is the primary purpose of an FFT (Fast Fourier Transform)?",
                    "options": ["To filter high-frequency noise", "To convert a signal from time domain to frequency domain", "To amplify weak signals", "To modulate a carrier wave"],
                    "correct_answer": "To convert a signal from time domain to frequency domain",
                    "explanation": "FFT efficiently computes the Discrete Fourier Transform, revealing the frequency components of a signal."
                }
            ],
            'Electrical Power Systems': [
                {
                    "question": "What is the main function of a transformer in a power transmission system?",
                    "options": ["To convert AC to DC", "To step-up or step-down voltage levels", "To generate electrical power", "To store electrical energy"],
                    "correct_answer": "To step-up or step-down voltage levels",
                    "explanation": "Transformers change voltage levels to minimize transmission losses (step-up) and provide safe levels for consumers (step-down)."
                },
                {
                    "question": "In a 3-phase system, what is the phase difference between the three voltages?",
                    "options": ["90 degrees", "120 degrees", "180 degrees", "360 degrees"],
                    "correct_answer": "120 degrees",
                    "explanation": "A balanced 3-phase system has voltages separated by 360/3 = 120 degrees."
                }
            ]
        }
        
        self.general_ece_questions = [
            {
                "question": "What is the ideal input impedance of an Operational Amplifier (Op-Amp)?",
                "options": ["Zero", "100 Ohms", "Infinite", "Negative"],
                "correct_answer": "Infinite",
                "explanation": "An ideal Op-Amp has infinite input impedance so it does not draw any current from the input source."
            },
            {
                "question": "Which theorem states that any linear bilateral network can be replaced by an equivalent circuit consisting of a single voltage source and series resistance?",
                "options": ["Norton's Theorem", "Superposition Theorem", "Thevenin's Theorem", "Maximum Power Transfer Theorem"],
                "correct_answer": "Thevenin's Theorem",
                "explanation": "Thevenin's Theorem simplifies complex circuits into a Vth and Rth."
            }
        ]

    def generate_assessment(self, domain: DomainInfo, skills: SkillsData, num_questions: int = 5) -> Dict[str, Any]:
        """Generates a personalized quiz based on the user's primary domain."""
        
        questions = []
        domain_questions = self.question_bank.get(domain.primary, [])
        
        # Mix domain-specific questions with general ECE questions
        pool = domain_questions + self.general_ece_questions
        
        # Shuffle and pick the requested number
        random.shuffle(pool)
        selected = pool[:num_questions]
        
        return {
            "title": f"{domain.primary} Technical Assessment",
            "description": "Test your core engineering concepts to prepare for technical interviews.",
            "questions": selected,
            "total_questions": len(selected)
        }

mock_assessment_generator = MockAssessmentGenerator()

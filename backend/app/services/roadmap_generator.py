"""
Roadmap Generator Service - Generates Career Roadmaps dynamically using LLMs.
"""
import os
import json
from typing import List, Dict, Any
import httpx
from app.models.schemas import RoadmapResponse, RoadmapStep

try:
    from openai import OpenAI
except ImportError:
    OpenAI = None

class RoadmapGenerator:
    """Generates career roadmaps dynamically based on a specific domain."""

    def __init__(self):
        # Fallback roadmaps if LLMs fail
        self.domain_roadmaps = {
            "VLSI & ASIC Design": {
                "domain": "VLSI & ASIC Design",
                "steps": [
                    {"title": "Digital Logic & Architecture", "description": "Master boolean algebra, state machines, and computer architecture.", "key_skills": ["Digital Logic", "Computer Architecture", "CMOS Basics"]},
                    {"title": "Hardware Description Languages", "description": "Write and simulate RTL code.", "key_skills": ["Verilog", "VHDL", "ModelSim"]},
                    {"title": "Advanced Verification", "description": "Learn modern verification methodologies.", "key_skills": ["SystemVerilog", "UVM", "Assertions"]},
                    {"title": "Physical Design (Backend)", "description": "Understand synthesis, floorplanning, and routing.", "key_skills": ["Synthesis", "Static Timing Analysis (STA)", "Cadence Innovus"]},
                    {"title": "Tape-Out & Sign-off", "description": "Perform layout versus schematic (LVS) and design rule checks (DRC).", "key_skills": ["Calibre", "DRC/LVS", "Low Power Design"]}
                ]
            },
            "Embedded Systems & Firmware": {
                "domain": "Embedded Systems & Firmware",
                "steps": [
                    {"title": "Bare-Metal C Programming", "description": "Master pointers, memory management, and bitwise operations.", "key_skills": ["C/C++", "Bit Manipulation", "Memory Management"]},
                    {"title": "Microcontroller Architecture", "description": "Program ARM Cortex-M or AVR microcontrollers.", "key_skills": ["ARM Cortex", "Interrupts", "Timers/Counters"]},
                    {"title": "Hardware Protocols", "description": "Write drivers for serial communication.", "key_skills": ["I2C", "SPI", "UART", "CAN"]},
                    {"title": "Real-Time Operating Systems", "description": "Implement multitasking, mutexes, and semaphores.", "key_skills": ["FreeRTOS", "Zephyr", "Multithreading"]},
                    {"title": "Advanced Edge IoT", "description": "Integrate Wi-Fi/BLE and over-the-air (OTA) updates.", "key_skills": ["BLE", "MQTT", "Embedded Linux (Yocto)"]}
                ]
            },
            "Digital Signal Processing (DSP)": {
                "domain": "Digital Signal Processing (DSP)",
                "steps": [
                    {"title": "Signals & Systems Math", "description": "Master Fourier transforms, Z-transforms, and convolution.", "key_skills": ["Calculus", "Linear Algebra", "Signals & Systems"]},
                    {"title": "Algorithm Prototyping", "description": "Design FIR/IIR filters theoretically.", "key_skills": ["MATLAB", "Python (SciPy/NumPy)", "Filter Design"]},
                    {"title": "Fixed-Point Arithmetic", "description": "Convert floating-point algorithms to fixed-point for hardware.", "key_skills": ["Fixed-Point Math", "Quantization", "C Programming"]},
                    {"title": "DSP Hardware Implementation", "description": "Port algorithms to actual DSP processors.", "key_skills": ["TI C2000 / Sharc", "Assembly", "SIMD Instructions"]},
                    {"title": "Advanced Algorithms", "description": "Implement adaptive filtering or machine learning at the edge.", "key_skills": ["Kalman Filters", "Adaptive Filters", "TinyML"]}
                ]
            },
            "Telecommunications & 5G": {
                "domain": "Telecommunications & 5G",
                "steps": [
                    {"title": "Communication Theory", "description": "Understand modulation (AM/FM, QAM) and noise.", "key_skills": ["Analog/Digital Comms", "Probability", "QAM/PSK"]},
                    {"title": "Network Protocols", "description": "Study the OSI model and TCP/IP stack.", "key_skills": ["TCP/IP", "Networking", "Packet Sniffing (Wireshark)"]},
                    {"title": "Wireless Systems Simulation", "description": "Model LTE/5G physical layers.", "key_skills": ["MATLAB 5G Toolbox", "GNU Radio", "SDR"]},
                    {"title": "Antenna & Propagation", "description": "Understand MIMO systems and beamforming.", "key_skills": ["Massive MIMO", "Beamforming", "Channel Modeling"]},
                    {"title": "O-RAN & Core Networks", "description": "Explore Open RAN architectures and cloud-native 5G cores.", "key_skills": ["O-RAN", "Network Slicing", "Cloud-Native Networks"]}
                ]
            },
            "RF & Microwave Engineering": {
                "domain": "RF & Microwave Engineering",
                "steps": [
                    {"title": "Electromagnetics & Transmission Lines", "description": "Master Maxwell's equations and Smith Charts.", "key_skills": ["Electromagnetics", "Smith Chart", "S-Parameters"]},
                    {"title": "RF Component Design", "description": "Design filters, couplers, and power dividers.", "key_skills": ["ADS (Advanced Design System)", "HFSS", "Passive RF"]},
                    {"title": "Active RF Circuits", "description": "Design LNAs, Power Amplifiers, and Mixers.", "key_skills": ["LNA Design", "Power Amplifiers", "Cadence Virtuoso RF"]},
                    {"title": "Antenna Engineering", "description": "Design microstrip patch and phased array antennas.", "key_skills": ["CST Microwave Studio", "Antenna Arrays", "Radiation Patterns"]},
                    {"title": "RF Testing & Measurement", "description": "Characterize hardware in the lab.", "key_skills": ["Vector Network Analyzer (VNA)", "Spectrum Analyzer", "Anechoic Chambers"]}
                ]
            },
            "FPGA & Hardware Acceleration": {
                "domain": "FPGA & Hardware Acceleration",
                "steps": [
                    {"title": "Digital Design Fundamentals", "description": "Master combinational and sequential logic design.", "key_skills": ["Boolean Logic", "State Machines", "Timing Diagrams"]},
                    {"title": "RTL Coding", "description": "Write and simulate hardware description code.", "key_skills": ["Verilog / VHDL", "Testbenches", "ModelSim"]},
                    {"title": "FPGA Toolchains", "description": "Synthesize and implement designs on real boards.", "key_skills": ["Xilinx Vivado", "Intel Quartus", "Timing Constraints"]},
                    {"title": "Hardware/Software Co-Design", "description": "Integrate ARM hard-cores with FPGA fabric.", "key_skills": ["Zynq / SoC", "AXI Protocol", "C Programming"]},
                    {"title": "High-Level Synthesis (HLS)", "description": "Accelerate C/C++ algorithms directly into hardware.", "key_skills": ["Vivado HLS", "OpenCL", "Hardware Acceleration"]}
                ]
            },
            "Robotics & Automation": {
                "domain": "Robotics & Automation",
                "steps": [
                    {"title": "Kinematics & Dynamics", "description": "Master rigid body transformations and motor control.", "key_skills": ["Linear Algebra", "PID Control", "Motor Drivers"]},
                    {"title": "Robot Operating System (ROS)", "description": "Build software architecture for robots.", "key_skills": ["ROS1 / ROS2", "C++/Python", "Linux"]},
                    {"title": "Sensors & Perception", "description": "Process LiDAR, cameras, and IMU data.", "key_skills": ["Computer Vision", "OpenCV", "Sensor Fusion"]},
                    {"title": "Path Planning & Navigation", "description": "Implement SLAM and A* algorithms.", "key_skills": ["SLAM", "A* Algorithm", "Autonomous Navigation"]},
                    {"title": "Industrial Automation", "description": "Program PLCs and SCADA systems.", "key_skills": ["PLC Programming", "Ladder Logic", "SCADA"]}
                ]
            },
            "Control Systems": {
                "domain": "Control Systems",
                "steps": [
                    {"title": "System Modeling", "description": "Create mathematical models of physical systems.", "key_skills": ["Differential Equations", "Laplace Transforms", "Simulink"]},
                    {"title": "Classical Control Design", "description": "Design and tune PID controllers.", "key_skills": ["Root Locus", "Bode Plots", "PID Tuning"]},
                    {"title": "Modern Control Theory", "description": "State-space representation and LQR design.", "key_skills": ["State-Space", "LQR/LQG", "MATLAB Control System Toolbox"]},
                    {"title": "Digital Control Implementation", "description": "Discretize controllers for microcontroller implementation.", "key_skills": ["Z-Transforms", "Embedded C", "Real-Time Control"]},
                    {"title": "Nonlinear & Adaptive Control", "description": "Control highly complex, changing systems.", "key_skills": ["Sliding Mode Control", "Adaptive Control", "System Identification"]}
                ]
            },
            "Photonics & Optical Networks": {
                "domain": "Photonics & Optical Networks",
                "steps": [
                    {"title": "Optics Fundamentals", "description": "Understand wave optics, interference, and diffraction.", "key_skills": ["Wave Optics", "Electromagnetics", "Laser Physics"]},
                    {"title": "Fiber Optic Communications", "description": "Design fiber links and calculate power budgets.", "key_skills": ["Optical Fibers", "WDM", "Link Budgets"]},
                    {"title": "Optical Components", "description": "Work with modulators, photodetectors, and amplifiers.", "key_skills": ["EDFA", "Mach-Zehnder Modulators", "Optoelectronics"]},
                    {"title": "Silicon Photonics", "description": "Design photonic integrated circuits (PICs).", "key_skills": ["Lumerical", "PIC Design", "Silicon Fabrication"]},
                    {"title": "Quantum Communications", "description": "Explore quantum key distribution and advanced cryptography.", "key_skills": ["Quantum Cryptography", "QKD", "Advanced Optics"]}
                ]
            },
            "Nanoelectronics": {
                "domain": "Nanoelectronics",
                "steps": [
                    {"title": "Solid State Physics", "description": "Master semiconductor physics and quantum mechanics.", "key_skills": ["Quantum Mechanics", "Energy Bands", "Semiconductor Physics"]},
                    {"title": "Nanoscale Devices", "description": "Study FinFETs, GAAFETs, and tunneling transistors.", "key_skills": ["FinFET", "Device Physics", "TCAD"]},
                    {"title": "Fabrication Processes", "description": "Understand EUV lithography, etching, and deposition.", "key_skills": ["Lithography", "CVD/PVD", "Cleanroom Processes"]},
                    {"title": "Materials Science", "description": "Explore graphene, carbon nanotubes, and 2D materials.", "key_skills": ["2D Materials", "Graphene", "Material Characterization"]},
                    {"title": "Quantum Computing Hardware", "description": "Design superconducting qubits or quantum dots.", "key_skills": ["Cryogenics", "Qubit Design", "Quantum Hardware"]}
                ]
            },
            "Automotive Electronics": {
                "domain": "Automotive Electronics",
                "steps": [
                    {"title": "Automotive Microcontrollers", "description": "Program safety-critical automotive MCUs.", "key_skills": ["Infineon AURIX", "NXP S32", "Embedded C"]},
                    {"title": "In-Vehicle Networking", "description": "Master automotive communication buses.", "key_skills": ["CAN bus", "LIN", "Automotive Ethernet"]},
                    {"title": "Functional Safety (ISO 26262)", "description": "Design systems to meet strict safety integrity levels (ASIL).", "key_skills": ["ISO 26262", "ASIL", "FMEA/FTA"]},
                    {"title": "AUTOSAR Architecture", "description": "Develop software using the AUTOSAR standard.", "key_skills": ["AUTOSAR Classic", "RTE", "BSW"]},
                    {"title": "ADAS & Autonomous Driving", "description": "Integrate radar, cameras, and sensor fusion ECUs.", "key_skills": ["Radar Processing", "Sensor Fusion", "ADAS Algorithms"]}
                ]
            },
            "Biomedical Engineering (Hardware)": {
                "domain": "Biomedical Engineering (Hardware)",
                "steps": [
                    {"title": "Human Anatomy & Physiology", "description": "Understand the biological systems you are monitoring.", "key_skills": ["Physiology Basics", "Biopotentials", "Medical Terminology"]},
                    {"title": "Biosensors & Transducers", "description": "Capture ECG, EEG, and EMG signals.", "key_skills": ["Electrodes", "Signal Acquisition", "Analog Design"]},
                    {"title": "Medical Instrumentation", "description": "Design low-noise amplifiers and filters for bio-signals.", "key_skills": ["Instrumentation Amplifiers", "Low-Noise Design", "Active Filters"]},
                    {"title": "Medical Regulations", "description": "Ensure hardware meets FDA and ISO 13485 standards.", "key_skills": ["ISO 13485", "FDA Compliance", "IEC 60601"]},
                    {"title": "Wearable Medical Devices", "description": "Design ultra-low power continuous monitoring systems.", "key_skills": ["Ultra-Low Power", "BLE", "Wearables"]}
                ]
            },
            "Aerospace & Avionics": {
                "domain": "Aerospace & Avionics",
                "steps": [
                    {"title": "Avionics Fundamentals", "description": "Understand flight control systems and avionics architecture.", "key_skills": ["Flight Dynamics", "Avionics Systems", "Systems Engineering"]},
                    {"title": "Aerospace Protocols", "description": "Master avionics data buses.", "key_skills": ["MIL-STD-1553", "ARINC 429", "AFDX"]},
                    {"title": "High-Reliability Design", "description": "Design for radiation hardening and extreme environments.", "key_skills": ["Rad-Hard Design", "Thermal Management", "Redundancy"]},
                    {"title": "DO-254 & DO-178C", "description": "Follow strict aerospace hardware/software certification standards.", "key_skills": ["DO-254 (Hardware)", "DO-178C (Software)", "Certification"]},
                    {"title": "Satellites & Deep Space Comm", "description": "Design TT&C (Telemetry, Tracking, and Command) systems.", "key_skills": ["Telemetry", "Space Comm", "RF Systems"]}
                ]
            }
        }
        
        # Fallback if domain is not explicitly defined above
        self.generic_roadmap = {
            "domain": "Generic Electronics & Communication",
            "steps": [
                {"title": "Core Fundamentals", "description": "Master Network Theory, Digital Logic, and Microprocessors.", "key_skills": ["Circuit Analysis", "Digital Logic", "C/C++"]},
                {"title": "Hardware & Software Integration", "description": "Learn bare-metal microcontroller programming.", "key_skills": ["Microcontrollers", "Embedded C"]},
                {"title": "Practical Portfolios", "description": "Build hardware/software integration projects.", "key_skills": ["Sensors", "Hardware Debugging"]},
                {"title": "Industry Standard Protocols", "description": "Deep dive into communication protocols.", "key_skills": ["SPI", "I2C", "UART"]},
                {"title": "Advanced Specialization", "description": "Focus on a specific industry niche.", "key_skills": ["PCB Design", "Algorithms"]}
            ]
        }

    def generate(self, domain: str, year_of_study: str, current_skill_level: str) -> Dict[str, Any]:
        """Generate a personalized roadmap for the specified domain."""
        
        prompt = (
            f"You are an elite, God-level Engineering Career Strategist for the domain: {domain}. "
            f"The candidate is currently in: {year_of_study} and has a skill level of: {current_skill_level}. "
            "Your task is to generate a highly detailed, extremely accurate 5-step career roadmap for them. "
            "You MUST dictate the EXACT technical skills they need to learn, progressing logically from their current state up to 'Mastery'. "
            "Provide 100% relevant, industry-standard tools, languages, and hardware frameworks for this specific domain. "
            "Do not give generic advice. Be highly specific about WHAT to build and exactly WHAT technologies to use. "
            "Return ONLY a valid JSON object with the following structure, with no markdown formatting or extra text:\n"
            "{\n"
            f'  "domain": "{domain}",\n'
            '  "steps": [\n'
            '    {\n'
            '      "title": "Step 1 Title (e.g., Immediate Focus: Core Fundamentals)",\n'
            '      "description": "Highly detailed description of the exact technologies to learn and the specific projects to build at this stage.",\n'
            '      "key_skills": ["Exact Tool/Skill 1", "Exact Tool/Skill 2", "Exact Tool/Skill 3"]\n'
            '    }\n'
            '    // Exactly 5 steps leading to mastery\n'
            "  ]\n"
            "}"
        )

        roadmap_data = self._generate_with_openai(prompt)
        if not roadmap_data:
            roadmap_data = self._generate_with_ollama(prompt)
            
        if not roadmap_data or "steps" not in roadmap_data:
            roadmap_data = self.domain_roadmaps.get(domain, self.generic_roadmap)

        # Fail-safe: Ensure domain key exists to prevent Pydantic validation errors
        if "domain" not in roadmap_data:
            roadmap_data["domain"] = domain
            
        return roadmap_data

    def _generate_with_openai(self, prompt: str) -> Any:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key or OpenAI is None:
            return None

        try:
            client = OpenAI(api_key=api_key)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
            )
            content = response.choices[0].message.content.strip()
            if content.startswith("```json"):
                content = content[7:-3].strip()
            elif content.startswith("```"):
                content = content[3:-3].strip()
            return json.loads(content)
        except Exception as e:
            print(f"OpenAI Roadmap Generator Error: {e}")
            return None

    def _generate_with_ollama(self, prompt: str) -> Any:
        host = os.getenv("OLLAMA_HOST", "http://localhost:11434")
        model = os.getenv("OLLAMA_MODEL", "llama3")

        try:
            with httpx.Client(timeout=45.0) as client:
                resp = client.post(
                    f"{host}/api/generate",
                    json={
                        "model": model,
                        "prompt": prompt,
                        "stream": False,
                        "format": "json"
                    }
                )
                resp.raise_for_status()
                content = resp.json().get("response", "")
                return json.loads(content)
        except Exception as e:
            print(f"Ollama Roadmap Generator Error: {e}")
            return None

roadmap_generator = RoadmapGenerator()

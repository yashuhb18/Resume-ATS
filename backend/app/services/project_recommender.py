"""
Project Recommender Service - Generates Smart Project Recommendations for ECE/EEE students.
"""
from typing import List, Dict, Any
from app.models.schemas import SkillsData, DomainInfo

class ProjectRecommender:
    """Recommends projects based on missing skills and domain."""

    def __init__(self):
        # We can define a hardcoded dictionary or just use LLM.
        # For a robust system without heavy LLM costs on every request, we can use a hybrid approach or rule-based.
        # Here we provide a targeted mapping for ECE/EEE.
        self.project_database = {
            'VLSI & ASIC Design': [
                {
                    "title": "16-bit RISC Processor Design using Verilog",
                    "description": "Design and verify a 16-bit RISC microprocessor architecture. Implement ALU, Control Unit, and Registers.",
                    "skills_gained": ["Verilog", "Computer Architecture", "Digital Design", "ModelSim"],
                    "difficulty": "Advanced",
                    "domain": "VLSI"
                },
                {
                    "title": "Traffic Light Controller using FPGA",
                    "description": "Implement a finite state machine (FSM) based traffic light controller on an FPGA board using VHDL or Verilog.",
                    "skills_gained": ["FPGA", "VHDL", "FSM", "Digital Electronics"],
                    "difficulty": "Intermediate",
                    "domain": "VLSI"
                }
            ],
            'Embedded Systems & IoT': [
                {
                    "title": "IoT Based Smart Home Automation System",
                    "description": "Develop a smart home system using ESP32/NodeMCU that controls appliances via a mobile app using MQTT protocol.",
                    "skills_gained": ["IoT", "ESP32", "C++", "MQTT", "Sensors"],
                    "difficulty": "Intermediate",
                    "domain": "Embedded Systems"
                },
                {
                    "title": "Real-Time Weather Monitoring Station",
                    "description": "Build a weather station using Arduino and various sensors (DHT11, BMP180) to log data to a cloud dashboard like ThingSpeak.",
                    "skills_gained": ["Arduino", "Sensors", "I2C", "C", "Cloud Integration"],
                    "difficulty": "Beginner",
                    "domain": "Embedded Systems"
                }
            ],
            'Signal Processing & Communications': [
                {
                    "title": "Implementation of OFDM System in MATLAB",
                    "description": "Simulate a complete Orthogonal Frequency-Division Multiplexing (OFDM) transceiver system to understand 4G/5G basics.",
                    "skills_gained": ["MATLAB", "DSP", "Telecommunications", "OFDM"],
                    "difficulty": "Advanced",
                    "domain": "Communications"
                },
                {
                    "title": "Audio Equalizer using FIR Filters",
                    "description": "Design and implement digital FIR/IIR filters to create an audio equalizer processing real-time audio signals.",
                    "skills_gained": ["Signal Processing", "Filter Design", "MATLAB/Python"],
                    "difficulty": "Intermediate",
                    "domain": "DSP"
                }
            ],
            'Electrical Power Systems': [
                {
                    "title": "Solar Power Maximum Power Point Tracking (MPPT)",
                    "description": "Simulate and design an MPPT charge controller for solar panels using MATLAB Simulink and Perturb & Observe algorithm.",
                    "skills_gained": ["Power Electronics", "Simulink", "Control Systems", "Renewable Energy"],
                    "difficulty": "Advanced",
                    "domain": "Power Systems"
                },
                {
                    "title": "Smart Energy Meter with Billing System",
                    "description": "Develop a digital energy meter using a microcontroller that measures power consumption and sends billing data via GSM/Wi-Fi.",
                    "skills_gained": ["Microcontrollers", "Power Measurement", "IoT", "Embedded C"],
                    "difficulty": "Intermediate",
                    "domain": "Power Systems"
                }
            ],
            'Robotics & Automation': [
                {
                    "title": "Autonomous Line Follower and Obstacle Avoiding Robot",
                    "description": "Build a wheeled robot using Arduino/Raspberry Pi that navigates paths and avoids obstacles using ultrasonic and IR sensors.",
                    "skills_gained": ["Robotics", "Arduino", "Motor Control", "Sensors", "C/Python"],
                    "difficulty": "Intermediate",
                    "domain": "Robotics"
                },
                {
                    "title": "Pick and Place Robotic Arm using ROS",
                    "description": "Simulate and program a 6-DOF robotic arm using Robot Operating System (ROS) for industrial pick-and-place tasks.",
                    "skills_gained": ["ROS", "Kinematics", "Python", "C++", "Mechatronics"],
                    "difficulty": "Advanced",
                    "domain": "Robotics"
                }
            ]
        }
        
        self.default_projects = [
            {
                "title": "PCB Design for a Custom Power Supply",
                "description": "Design a schematic and PCB layout for a 5V/12V dual power supply using Altium Designer or KiCad.",
                "skills_gained": ["PCB Design", "Circuit Analysis", "Altium/KiCad"],
                "difficulty": "Intermediate",
                "domain": "Electronics"
            },
            {
                "title": "Machine Learning based Fault Detection in Circuits",
                "description": "Apply ML algorithms (using Python/Scikit-learn) on circuit sensor data to detect and classify component faults.",
                "skills_gained": ["Python", "Machine Learning", "Data Analysis", "Electronics"],
                "difficulty": "Advanced",
                "domain": "Interdisciplinary"
            }
        ]

    def recommend(self, domain: DomainInfo, missing_skills: List[str]) -> List[Dict[str, Any]]:
        """Recommend projects based on domain and missing skills."""
        recommendations = []
        
        # Get projects for the primary domain
        domain_projects = self.project_database.get(domain.primary, [])
        
        if domain_projects:
            recommendations.extend(domain_projects)
        else:
            # Fallback for general domains, try to see if secondary matches ECE
            if domain.secondary and domain.secondary in self.project_database:
                recommendations.extend(self.project_database[domain.secondary])
            else:
                recommendations.extend(self.default_projects)
                
        # Limit to 3 projects
        return recommendations[:3]

project_recommender = ProjectRecommender()

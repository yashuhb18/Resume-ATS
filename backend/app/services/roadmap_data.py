# Fallback roadmaps if LLMs fail

DOMAIN_ROADMAPS = {
    "VLSI & ASIC Design": {
        "domain": "VLSI & ASIC Design",
        "role_suitability": "Your analytical mindset and focus on digital logic make you a perfect candidate for Physical Design and RTL engineering.",
        "news_headline": "AI hardware accelerators are driving a 400% surge in VLSI and Custom Silicon demand.",
        "beginner_steps": [
            {
                "title": "Digital Logic Fundamentals", 
                "description": "Master boolean algebra, logic gates, and basic combinational/sequential circuits.", 
                "key_skills": ["Boolean Algebra", "Logic Gates", "K-Maps"], 
                "course_link": "https://www.coursera.org/learn/digital-systems", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm",
                "projects": [
                    {"title": "Custom 8-Bit ALU Design", "github_repo": "https://github.com/topics/verilog-alu"},
                    {"title": "BCD to 7-Segment Decoder", "github_repo": "https://github.com/topics/7-segment-decoder"}
                ]
            },
            {
                "title": "Introduction to Verilog", 
                "description": "Write basic modules, testbenches, and understand simulation.", 
                "key_skills": ["Verilog", "ModelSim", "Testbenches"], 
                "course_link": "https://www.coursera.org/learn/fpga-intro", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLvG6Y3kU-uNAtzSjM15jM5v9zD2h-lR8h",
                "projects": [
                    {"title": "Traffic Light Controller RTL", "github_repo": "https://github.com/topics/verilog-traffic-light"},
                    {"title": "Verilog FIFO Buffer", "github_repo": "https://github.com/topics/verilog-fifo"}
                ]
            },
            {
                "title": "Computer Architecture Basics", 
                "description": "Understand ALU design, registers, and basic memory mapping.", 
                "key_skills": ["Architecture", "ALU", "Registers"], 
                "course_link": "https://www.coursera.org/learn/comparch", 
                "youtube_link": "https://www.youtube.com/playlist?list=PL5PHm2jkkXmidJOd59REog9jdnWfBT9W7",
                "projects": [
                    {"title": "Single-Cycle MIPS Processor", "github_repo": "https://github.com/topics/mips-processor"},
                    {"title": "Register File Implementation", "github_repo": "https://github.com/topics/register-file"}
                ]
            },
            {
                "title": "FPGA Prototyping", 
                "description": "Implement simple designs on a basic FPGA board.", 
                "key_skills": ["Basys 3", "Vivado", "Synthesis"], 
                "course_link": "https://www.coursera.org/specializations/fpga-design", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLuS_I62o_X9O_nLwS_5VjXzD9xU5qI6O_",
                "projects": [
                    {"title": "FPGA Stopwatch with Debouncing", "github_repo": "https://github.com/topics/fpga-stopwatch"},
                    {"title": "UART Transmitter on Basys3", "github_repo": "https://github.com/topics/fpga-uart"}
                ]
            },
            {
                "title": "Basic State Machines", 
                "description": "Design and simulate Moore and Mealy Finite State Machines.", 
                "key_skills": ["FSMs", "State Diagrams", "RTL"], 
                "course_link": "https://www.coursera.org/learn/electronics", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLrY508WwXmX2_E0X_nE9_zQkQ_D_w_L-M",
                "projects": [
                    {"title": "Vending Machine FSM", "github_repo": "https://github.com/topics/vending-machine-verilog"},
                    {"title": "Sequence Detector (1011)", "github_repo": "https://github.com/topics/sequence-detector"}
                ]
            }
        ],
        "intermediate_steps": [
            {
                "title": "Advanced RTL Design", 
                "description": "Design complex datapaths and controllers for custom hardware.", 
                "key_skills": ["RTL Coding", "Datapaths", "Pipelining"], 
                "course_link": "https://www.coursera.org/learn/vlsicad", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLP_MIsW0wBmfWn-Lw8KshGv_Wn08-4B_F",
                "projects": [
                    {"title": "5-Stage Pipelined Processor", "github_repo": "https://github.com/topics/pipelined-processor"},
                    {"title": "Matrix Multiplication Accelerator", "github_repo": "https://github.com/topics/hardware-accelerator"}
                ]
            },
            {
                "title": "SystemVerilog for Design", 
                "description": "Transition to SystemVerilog constructs for cleaner hardware modeling.", 
                "key_skills": ["SystemVerilog", "Interfaces", "Structs"], 
                "course_link": "https://www.coursera.org/learn/asic-design", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLvG6Y3kU-uNA_E6_vC7U_f_2-O-NlXqW9",
                "projects": [
                    {"title": "Parameterized AXI-Lite Slave", "github_repo": "https://github.com/topics/axi-lite"},
                    {"title": "SV Interface-based Memory Controller", "github_repo": "https://github.com/topics/memory-controller"}
                ]
            },
            {
                "title": "Static Timing Analysis (STA)", 
                "description": "Understand setup/hold times and fix timing violations.", 
                "key_skills": ["STA", "Timing Constraints", "PrimeTime"], 
                "course_link": "https://www.coursera.org/learn/physical-design", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLP_MIsW0wBmdU_n_K6f4WpW-YI0tB-p1R",
                "projects": [
                    {"title": "SDC Constraint Generation for SOC", "github_repo": "https://github.com/topics/static-timing-analysis"},
                    {"title": "Clock Domain Crossing (CDC) Sync", "github_repo": "https://github.com/topics/clock-domain-crossing"}
                ]
            },
            {
                "title": "Basic Physical Design", 
                "description": "Learn floorplanning, placement, and basic routing concepts.", 
                "key_skills": ["Floorplanning", "P&R", "Innovus"], 
                "course_link": "https://www.coursera.org/learn/vlsi-cad-logic", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLP_MIsW0wBmexXwS090h9WkF1f-Y2I1B0",
                "projects": [
                    {"title": "OpenLane ASIC Flow Macro", "github_repo": "https://github.com/topics/openlane"},
                    {"title": "Std Cell Placement Optimization", "github_repo": "https://github.com/topics/physical-design"}
                ]
            },
            {
                "title": "Custom Core Project", 
                "description": "Build and verify a basic pipelined RISC-V or MIPS core.", 
                "key_skills": ["RISC-V", "Pipelining", "Computer Architecture"], 
                "course_link": "https://www.coursera.org/learn/arm-education-digital-logic", 
                "youtube_link": "https://www.youtube.com/playlist?list=PL5PHm2jkkXmidJOd59REog9jdnWfBT9W7",
                "projects": [
                    {"title": "RV32I Base Integer Core", "github_repo": "https://github.com/topics/riscv-core"},
                    {"title": "Instruction Cache Unit", "github_repo": "https://github.com/topics/instruction-cache"}
                ]
            }
        ],
        "advanced_steps": [
            {
                "title": "Universal Verification Methodology", 
                "description": "Master industry-standard UVM for verifying massive SoCs.", 
                "key_skills": ["UVM", "OVM", "SystemVerilog Assertions"], 
                "course_link": "https://www.coursera.org/specializations/embedded-system-design", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLvG6Y3kU-uNDP0z6vF8H7K2_f9U-O6U1j",
                "projects": [
                    {"title": "UVM Testbench for SPI Core", "github_repo": "https://github.com/topics/uvm-testbench"},
                    {"title": "Scoreboard and Coverage Monitor", "github_repo": "https://github.com/topics/functional-coverage"}
                ]
            },
            {
                "title": "Low Power Design (UPF)", 
                "description": "Implement power gating, clock gating, and multi-Vdd designs.", 
                "key_skills": ["UPF", "Clock Gating", "Low Power"], 
                "course_link": "https://www.coursera.org/learn/power-electronics", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLP_MIsW0wBmdfXvS-V-7G-0u8v1-p-D0H",
                "projects": [
                    {"title": "UPF 2.0 Power Intent File", "github_repo": "https://github.com/topics/low-power-design"},
                    {"title": "Multi-Voltage Domain Partitioning", "github_repo": "https://github.com/topics/low-power-vlsi"}
                ]
            },
            {
                "title": "Advanced Physical Design", 
                "description": "Handle complex clock tree synthesis (CTS) and IR drop analysis.", 
                "key_skills": ["CTS", "IR Drop", "EM Analysis"], 
                "course_link": "https://www.coursera.org/learn/vlsi-design", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLP_MIsW0wBmccM-uW7O-L2U-U-p-V-C-D",
                "projects": [
                    {"title": "H-Tree CTS Implementation", "github_repo": "https://github.com/topics/clock-tree-synthesis"},
                    {"title": "Post-Layout IR Drop Analysis", "github_repo": "https://github.com/topics/ir-drop"}
                ]
            },
            {
                "title": "Tape-out Signoff", 
                "description": "Perform rigorous LVS, DRC, and ERC checks before manufacturing.", 
                "key_skills": ["Calibre", "DRC/LVS", "Signoff"], 
                "course_link": "https://www.coursera.org/learn/nanotechnology", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLP_MIsW0wBmceY-U-p-V-C-D-m-uW7O-L2U",
                "projects": [
                    {"title": "GDSII Streamout and DRC Clean", "github_repo": "https://github.com/topics/drc-lvs"},
                    {"title": "Antenna Effect Violation Fix", "github_repo": "https://github.com/topics/vlsi-signoff"}
                ]
            },
            {
                "title": "Silicon Bring-up", 
                "description": "Test and validate actual manufactured silicon in the lab.", 
                "key_skills": ["Post-Silicon Validation", "Oscilloscopes", "JTAG"], 
                "course_link": "https://www.coursera.org/learn/iot", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLP_MIsW0wBmdfXvS-V-7G-0u8v1-p-D0H",
                "projects": [
                    {"title": "JTAG Boundary Scan Lab", "github_repo": "https://github.com/topics/jtag"},
                    {"title": "Python-based Chip Validation", "github_repo": "https://github.com/topics/post-silicon-validation"}
                ]
            }
        ]
    },
    "Embedded Systems & Firmware": {
        "domain": "Embedded Systems & Firmware",
        "role_suitability": "Your proficiency in C and hardware interfacing positions you at the heart of the IoT and Automotive revolution.",
        "news_headline": "The explosive growth of IoT and Automotive EVs is making Embedded Firmware the most critical layer of tech.",
        "beginner_steps": [
            {
                "title": "C Programming Mastery", 
                "description": "Deep dive into pointers, memory management, and bitwise operations.", 
                "key_skills": ["C", "Pointers", "Bitwise Math"], 
                "course_link": "https://www.coursera.org/learn/c-programming", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLBlnK6fEyqRhX6r2uhhlubuK5QxtdRNzP",
                "projects": [
                    {"title": "Custom Circular Buffer in C", "github_repo": "https://github.com/topics/embedded-c-library"},
                    {"title": "Bitwise Protocol Parser", "github_repo": "https://github.com/topics/c-programming"}
                ]
            },
            {
                "title": "Microcontroller Architecture", 
                "description": "Understand memory maps, registers, and the CPU pipeline.", 
                "key_skills": ["MCU Architecture", "Registers", "Memory Maps"], 
                "course_link": "https://www.coursera.org/learn/introduction-embedded-systems", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm",
                "projects": [
                    {"title": "STM32 Register-level Blinky", "github_repo": "https://github.com/topics/stm32-bare-metal"},
                    {"title": "Memory Map Visualizer Tool", "github_repo": "https://github.com/topics/microcontroller-architecture"}
                ]
            },
            {
                "title": "Bare-Metal GPIO", 
                "description": "Write basic drivers to control LEDs and read buttons without libraries.", 
                "key_skills": ["GPIO", "Bare-Metal", "Registers"], 
                "course_link": "https://www.coursera.org/learn/embedded-software-hardware", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLvG6Y3kU-uNDP0z6vF8H7K2_f9U-O6U1j",
                "projects": [
                    {"title": "Keypad Matrix Driver", "github_repo": "https://github.com/topics/gpio-driver"},
                    {"title": "Software PWM Implementation", "github_repo": "https://github.com/topics/embedded-pwm"}
                ]
            },
            {
                "title": "Interrupts & Timers", 
                "description": "Implement Interrupt Service Routines (ISRs) and hardware timers.", 
                "key_skills": ["ISRs", "Timers", "NVIC"], 
                "course_link": "https://www.coursera.org/learn/embedded-systems-microcontrollers", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLBlnK6fEyqRhX6r2uhhlubuK5QxtdRNzP",
                "projects": [
                    {"title": "Hardware Timer Alarm System", "github_repo": "https://github.com/topics/mcu-timers"},
                    {"title": "External Interrupt Event Logger", "github_repo": "https://github.com/topics/embedded-interrupts"}
                ]
            },
            {
                "title": "Basic Protocols (UART)", 
                "description": "Implement serial communication to print debug messages to a PC.", 
                "key_skills": ["UART", "Serial Monitor", "Baud Rates"], 
                "course_link": "https://www.coursera.org/learn/interface-with-arduino", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLvG6Y3kU-uNDP0z6vF8H7K2_f9U-O6U1j",
                "projects": [
                    {"title": "UART Command Line Interface", "github_repo": "https://github.com/topics/uart-cli"},
                    {"title": "Serial Data Bridge (UART to PC)", "github_repo": "https://github.com/topics/embedded-serial"}
                ]
            }
        ],
        "intermediate_steps": [
            {
                "title": "Advanced Hardware Protocols", 
                "description": "Write custom drivers for SPI and I2C sensors.", 
                "key_skills": ["I2C", "SPI", "Logic Analyzers"], 
                "course_link": "https://www.coursera.org/learn/embedded-interface-design", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLBlnK6fEyqRhX6r2uhhlubuK5QxtdRNzP",
                "projects": [
                    {"title": "I2C OLED Display Driver", "github_repo": "https://github.com/topics/i2c-driver"},
                    {"title": "SPI Flash Memory Interface", "github_repo": "https://github.com/topics/spi-driver"}
                ]
            },
            {
                "title": "Direct Memory Access (DMA)", 
                "description": "Offload data transfers from the CPU to DMA controllers.", 
                "key_skills": ["DMA", "Performance Optimization", "Bus Matrix"], 
                "course_link": "https://www.coursera.org/learn/embedded-system-design-uc-boulder", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLvG6Y3kU-uNDP0z6vF8H7K2_f9U-O6U1j",
                "projects": [
                    {"title": "DMA-based ADC Buffer", "github_repo": "https://github.com/topics/mcu-dma"},
                    {"title": "Zero-CPU UART Transfer", "github_repo": "https://github.com/topics/embedded-dma"}
                ]
            },
            {
                "title": "Real-Time Operating Systems", 
                "description": "Implement FreeRTOS, tasks, queues, and mutexes.", 
                "key_skills": ["FreeRTOS", "Multithreading", "Semaphores"], 
                "course_link": "https://www.coursera.org/learn/real-time-embedded-systems", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLBlnK6fEyqRhX6r2uhhlubuK5QxtdRNzP",
                "projects": [
                    {"title": "Multi-Tasking Data Logger", "github_repo": "https://github.com/topics/freertos-project"},
                    {"title": "Task Synchronization with Mutex", "github_repo": "https://github.com/topics/embedded-rtos"}
                ]
            },
            {
                "title": "Low Power Modes", 
                "description": "Optimize firmware to run on coin cell batteries for years.", 
                "key_skills": ["Sleep Modes", "Power Profiling", "RTC"], 
                "course_link": "https://www.coursera.org/learn/iot-devices", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLvG6Y3kU-uNDP0z6vF8H7K2_f9U-O6U1j",
                "projects": [
                    {"title": "Deep-Sleep Temp Sensor Node", "github_repo": "https://github.com/topics/low-power-embedded"},
                    {"title": "Power Profiling Dashboard", "github_repo": "https://github.com/topics/embedded-power"}
                ]
            },
            {
                "title": "Wireless IoT Node", 
                "description": "Build a device that connects to Wi-Fi/BLE and sends MQTT data.", 
                "key_skills": ["ESP32/STM32", "MQTT", "Wi-Fi/BLE"], 
                "course_link": "https://www.coursera.org/learn/iot-wireless-communications", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLvG6Y3kU-uNDP0z6vF8H7K2_f9U-O6U1j",
                "projects": [
                    {"title": "MQTT-based Smart Home Node", "github_repo": "https://github.com/topics/esp32-mqtt"},
                    {"title": "BLE Heart Rate Monitor", "github_repo": "https://github.com/topics/embedded-ble"}
                ]
            }
        ],
        "advanced_steps": [
            {
                "title": "Embedded Linux (Yocto)", 
                "description": "Build custom Linux distributions for embedded processors like Raspberry Pi.", 
                "key_skills": ["Yocto", "Device Trees", "Kernel Modules"], 
                "course_link": "https://www.coursera.org/learn/embedded-linux-interface-design", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLBlnK6fEyqRhX6r2uhhlubuK5QxtdRNzP",
                "projects": [
                    {"title": "Custom Yocto Meta-layer", "github_repo": "https://github.com/topics/yocto-project"},
                    {"title": "I2C Kernel Module Driver", "github_repo": "https://github.com/topics/linux-kernel-driver"}
                ]
            },
            {
                "title": "Automotive AUTOSAR", 
                "description": "Learn the strict automotive software architecture standard.", 
                "key_skills": ["AUTOSAR", "CAN Bus", "MCAL"], 
                "course_link": "https://www.coursera.org/learn/electric-vehicles-and-mobility", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLvG6Y3kU-uNDP0z6vF8H7K2_f9U-O6U1j",
                "projects": [
                    {"title": "CAN Bus Analyzer on STM32", "github_repo": "https://github.com/topics/can-bus"},
                    {"title": "AUTOSAR BSW Configuration", "github_repo": "https://github.com/topics/autosar"}
                ]
            },
            {
                "title": "Over-The-Air (OTA) Updates", 
                "description": "Implement secure, failsafe remote firmware updates.", 
                "key_skills": ["OTA", "Bootloaders", "Cryptography"], 
                "course_link": "https://www.coursera.org/learn/cyber-security-embedded-systems", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLBlnK6fEyqRhX6r2uhhlubuK5QxtdRNzP",
                "projects": [
                    {"title": "Secure A/B Partition Bootloader", "github_repo": "https://github.com/topics/embedded-bootloader"},
                    {"title": "Signed Firmware Verification", "github_repo": "https://github.com/topics/embedded-security"}
                ]
            },
            {
                "title": "Hardware Security Modules", 
                "description": "Utilize HSMs for secure boot, encryption, and secure storage.", 
                "key_skills": ["Secure Boot", "HSM", "AES/RSA"], 
                "course_link": "https://www.coursera.org/learn/hardware-security", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLvG6Y3kU-uNDP0z6vF8H7K2_f9U-O6U1j",
                "projects": [
                    {"title": "TEE-based Secure Storage", "github_repo": "https://github.com/topics/secure-boot"},
                    {"title": "Encryption Engine Accelerator", "github_repo": "https://github.com/topics/embedded-cryptography"}
                ]
            },
            {
                "title": "Safety Critical Systems", 
                "description": "Design firmware adhering to ISO 26262 or DO-178C standards.", 
                "key_skills": ["MISRA C", "ISO 26262", "Functional Safety"], 
                "course_link": "https://www.coursera.org/learn/software-security", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLBlnK6fEyqRhX6r2uhhlubuK5QxtdRNzP",
                "projects": [
                    {"title": "Dual-core Lock-step Monitor", "github_repo": "https://github.com/topics/functional-safety"},
                    {"title": "MISRA C Compliant Driver", "github_repo": "https://github.com/topics/misra-c"}
                ]
            }
        ]
    },
    "Robotics & Automation": {
        "domain": "Robotics & Automation",
        "role_suitability": "Your focus on control systems and automation makes you an ideal architect for the next generation of collaborative robotics.",
        "news_headline": "Collaborative robots and AI-driven automation are redefining the global manufacturing landscape.",
        "beginner_steps": [
            {
                "title": "Robotics Foundations", 
                "description": "Learn kinematics, dynamics, and basic control theory.", 
                "key_skills": ["Kinematics", "Dynamics", "PID"], 
                "course_link": "https://www.coursera.org/specializations/robotics", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLBlnK6fEyqRhX6r2uhhlubuK5QxtdRNzP",
                "projects": [
                    {"title": "2-DOF Robotic Arm Simulation", "github_repo": "https://github.com/topics/robot-kinematics"},
                    {"title": "PID Controller for DC Motor", "github_repo": "https://github.com/topics/pid-controller"}
                ]
            },
            {
                "title": "C++/Python for Robotics", 
                "description": "Master the languages used in modern robotics software stacks.", 
                "key_skills": ["C++", "Python", "Linux"], 
                "course_link": "https://www.coursera.org/learn/robotics-perception", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLvG6Y3kU-uNDP0z6vF8H7K2_f9U-O6U1j",
                "projects": [
                    {"title": "Robotics Pathfinding in Python", "github_repo": "https://github.com/topics/robotics-algorithms"},
                    {"title": "C++ Matrix Library for Robotics", "github_repo": "https://github.com/topics/robotics-cpp"}
                ]
            }
        ],
        "intermediate_steps": [
            {
                "title": "Advanced ROS2", 
                "description": "Transition to ROS2 for production-grade robotics applications.", 
                "key_skills": ["ROS2", "DDS", "Lifecycle Nodes"], 
                "course_link": "https://www.coursera.org/learn/robotics-flight", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLvG6Y3kU-uNDP0z6vF8H7K2_f9U-O6U1j",
                "projects": [
                    {"title": "ROS2 Navigation Stack Config", "github_repo": "https://github.com/topics/ros2-navigation"},
                    {"title": "Custom ROS2 Message Interface", "github_repo": "https://github.com/topics/ros2-projects"}
                ]
            }
        ],
        "advanced_steps": [
            {
                "title": "Autonomous Navigation Stacks", 
                "description": "Implement end-to-end navigation for mobile robots.", 
                "key_skills": ["Nav2", "Costmaps", "Planners"], 
                "course_link": "https://www.coursera.org/learn/robotics-flight", 
                "youtube_link": "https://www.youtube.com/playlist?list=PLBlnK6fEyqRhX6r2uhhlubuK5QxtdRNzP",
                "projects": [
                    {"title": "Autonomous Indoor Courier Robot", "github_repo": "https://github.com/topics/autonomous-robot"},
                    {"title": "SLAM-based Mapping Node", "github_repo": "https://github.com/topics/slam-robotics"}
                ]
            }
        ]
    }
}

GENERIC_ROADMAP = {
    "domain": "General Professional",
    "role_suitability": "Your core skills form a strong foundation for multiple career paths.",
    "news_headline": "Professionals who continuously upskill see a 40% higher career growth rate.",
    "beginner_steps": [
        {
            "title": "Core Skills Solidification",
            "description": "Strengthen the fundamental skills related to your domain.",
            "key_skills": ["Communication", "Problem Solving", "Domain Basics"],
            "course_link": "https://www.coursera.org",
            "youtube_link": "https://www.youtube.com",
            "projects": [
                {"title": "Foundational Project", "github_repo": "https://github.com"}
            ]
        }
    ],
    "intermediate_steps": [
        {
            "title": "Advanced Application",
            "description": "Apply your skills to complex, real-world problems.",
            "key_skills": ["Project Management", "Technical Execution"],
            "course_link": "https://www.coursera.org",
            "youtube_link": "https://www.youtube.com",
            "projects": [
                {"title": "Intermediate Case Study", "github_repo": "https://github.com"}
            ]
        }
    ],
    "advanced_steps": [
        {
            "title": "Leadership and Specialization",
            "description": "Take ownership of major initiatives and mentor others.",
            "key_skills": ["Leadership", "Strategic Planning"],
            "course_link": "https://www.coursera.org",
            "youtube_link": "https://www.youtube.com",
            "projects": [
                {"title": "Domain Capstone Project", "github_repo": "https://github.com"}
            ]
        }
    ]
}

# Fallback roadmaps if LLMs fail

DOMAIN_ROADMAPS = {
    "VLSI & ASIC Design": {
        "domain": "VLSI & ASIC Design",
        "news_headline": "AI hardware accelerators are driving a 400% surge in VLSI and Custom Silicon demand.",
        "beginner_steps": [
            {"title": "Digital Logic Fundamentals", "description": "Master boolean algebra, logic gates, and basic combinational/sequential circuits.", "key_skills": ["Boolean Algebra", "Logic Gates", "K-Maps"], "course_link": "https://www.coursera.org/learn/digital-systems"},
            {"title": "Introduction to Verilog", "description": "Write basic modules, testbenches, and understand simulation.", "key_skills": ["Verilog", "ModelSim", "Testbenches"], "course_link": "https://www.coursera.org/specializations/fpga-design"},
            {"title": "Computer Architecture Basics", "description": "Understand ALU design, registers, and basic memory mapping.", "key_skills": ["Architecture", "ALU", "Registers"], "course_link": "https://www.coursera.org/learn/comparch"},
            {"title": "FPGA Prototyping", "description": "Implement simple designs on a basic FPGA board.", "key_skills": ["Basys 3", "Vivado", "Synthesis"], "course_link": "https://www.coursera.org/learn/fpga-intro"},
            {"title": "Basic State Machines", "description": "Design and simulate Moore and Mealy Finite State Machines.", "key_skills": ["FSMs", "State Diagrams", "RTL"], "course_link": "https://www.coursera.org/learn/electronics"}
        ],
        "intermediate_steps": [
            {"title": "Advanced RTL Design", "description": "Design complex datapaths and controllers for custom hardware.", "key_skills": ["RTL Coding", "Datapaths", "Pipelining"], "course_link": "https://www.coursera.org/learn/vlsicad"},
            {"title": "SystemVerilog for Design", "description": "Transition to SystemVerilog constructs for cleaner hardware modeling.", "key_skills": ["SystemVerilog", "Interfaces", "Structs"], "course_link": "https://www.coursera.org/learn/asic-design"},
            {"title": "Static Timing Analysis (STA)", "description": "Understand setup/hold times and fix timing violations.", "key_skills": ["STA", "Timing Constraints", "PrimeTime"], "course_link": "https://www.coursera.org/learn/physical-design"},
            {"title": "Basic Physical Design", "description": "Learn floorplanning, placement, and basic routing concepts.", "key_skills": ["Floorplanning", "P&R", "Innovus"], "course_link": "https://www.coursera.org/learn/vlsi-cad-logic"},
            {"title": "Custom Core Project", "description": "Build and verify a basic pipelined RISC-V or MIPS core.", "key_skills": ["RISC-V", "Pipelining", "Computer Architecture"], "course_link": "https://www.coursera.org/learn/arm-education-digital-logic"}
        ],
        "advanced_steps": [
            {"title": "Universal Verification Methodology", "description": "Master industry-standard UVM for verifying massive SoCs.", "key_skills": ["UVM", "OVM", "SystemVerilog Assertions"], "course_link": "https://www.coursera.org/specializations/embedded-system-design"},
            {"title": "Low Power Design (UPF)", "description": "Implement power gating, clock gating, and multi-Vdd designs.", "key_skills": ["UPF", "Clock Gating", "Low Power"], "course_link": "https://www.coursera.org/learn/power-electronics"},
            {"title": "Advanced Physical Design", "description": "Handle complex clock tree synthesis (CTS) and IR drop analysis.", "key_skills": ["CTS", "IR Drop", "EM Analysis"], "course_link": "https://www.coursera.org/learn/vlsi-design"},
            {"title": "Tape-out Signoff", "description": "Perform rigorous LVS, DRC, and ERC checks before manufacturing.", "key_skills": ["Calibre", "DRC/LVS", "Signoff"], "course_link": "https://www.coursera.org/learn/nanotechnology"},
            {"title": "Silicon Bring-up", "description": "Test and validate actual manufactured silicon in the lab.", "key_skills": ["Post-Silicon Validation", "Oscilloscopes", "JTAG"], "course_link": "https://www.coursera.org/learn/iot"}
        ]
    },
    "Embedded Systems & Firmware": {
        "domain": "Embedded Systems & Firmware",
        "news_headline": "The explosive growth of IoT and Automotive EVs is making Embedded Firmware the most critical layer of tech.",
        "beginner_steps": [
            {"title": "C Programming Mastery", "description": "Deep dive into pointers, memory management, and bitwise operations.", "key_skills": ["C", "Pointers", "Bitwise Math"], "course_link": "https://www.coursera.org/learn/c-programming"},
            {"title": "Microcontroller Architecture", "description": "Understand memory maps, registers, and the CPU pipeline.", "key_skills": ["MCU Architecture", "Registers", "Memory Maps"], "course_link": "https://www.coursera.org/learn/introduction-embedded-systems"},
            {"title": "Bare-Metal GPIO", "description": "Write basic drivers to control LEDs and read buttons without libraries.", "key_skills": ["GPIO", "Bare-Metal", "Registers"], "course_link": "https://www.coursera.org/learn/embedded-software-hardware"},
            {"title": "Interrupts & Timers", "description": "Implement Interrupt Service Routines (ISRs) and hardware timers.", "key_skills": ["ISRs", "Timers", "NVIC"], "course_link": "https://www.coursera.org/learn/embedded-systems-microcontrollers"},
            {"title": "Basic Protocols (UART)", "description": "Implement serial communication to print debug messages to a PC.", "key_skills": ["UART", "Serial Monitor", "Baud Rates"], "course_link": "https://www.coursera.org/learn/interface-with-arduino"}
        ],
        "intermediate_steps": [
            {"title": "Advanced Hardware Protocols", "description": "Write custom drivers for SPI and I2C sensors.", "key_skills": ["I2C", "SPI", "Logic Analyzers"], "course_link": "https://www.coursera.org/learn/embedded-interface-design"},
            {"title": "Direct Memory Access (DMA)", "description": "Offload data transfers from the CPU to DMA controllers.", "key_skills": ["DMA", "Performance Optimization", "Bus Matrix"], "course_link": "https://www.coursera.org/learn/embedded-system-design-uc-boulder"},
            {"title": "Real-Time Operating Systems", "description": "Implement FreeRTOS, tasks, queues, and mutexes.", "key_skills": ["FreeRTOS", "Multithreading", "Semaphores"], "course_link": "https://www.coursera.org/learn/real-time-embedded-systems"},
            {"title": "Low Power Modes", "description": "Optimize firmware to run on coin cell batteries for years.", "key_skills": ["Sleep Modes", "Power Profiling", "RTC"], "course_link": "https://www.coursera.org/learn/iot-devices"},
            {"title": "Wireless IoT Node", "description": "Build a device that connects to Wi-Fi/BLE and sends MQTT data.", "key_skills": ["ESP32/STM32", "MQTT", "Wi-Fi/BLE"], "course_link": "https://www.coursera.org/learn/iot-wireless-communications"}
        ],
        "advanced_steps": [
            {"title": "Embedded Linux (Yocto)", "description": "Build custom Linux distributions for embedded processors like Raspberry Pi.", "key_skills": ["Yocto", "Device Trees", "Kernel Modules"], "course_link": "https://www.coursera.org/learn/embedded-linux-interface-design"},
            {"title": "Automotive AUTOSAR", "description": "Learn the strict automotive software architecture standard.", "key_skills": ["AUTOSAR", "CAN Bus", "MCAL"], "course_link": "https://www.coursera.org/learn/electric-vehicles-and-mobility"},
            {"title": "Over-The-Air (OTA) Updates", "description": "Implement secure, failsafe remote firmware updates.", "key_skills": ["OTA", "Bootloaders", "Cryptography"], "course_link": "https://www.coursera.org/learn/cyber-security-embedded-systems"},
            {"title": "Hardware Security Modules", "description": "Utilize HSMs for secure boot, encryption, and secure storage.", "key_skills": ["Secure Boot", "HSM", "AES/RSA"], "course_link": "https://www.coursera.org/learn/hardware-security"},
            {"title": "Safety Critical Systems", "description": "Design firmware adhering to ISO 26262 or DO-178C standards.", "key_skills": ["MISRA C", "ISO 26262", "Functional Safety"], "course_link": "https://www.coursera.org/learn/software-security"}
        ]
    }
}

GENERIC_ROADMAP = {
    "domain": "Generic Electronics & Communication",
    "news_headline": "The ECE industry is experiencing a massive renaissance as hardware becomes the bottleneck for AI.",
    "beginner_steps": [
        {"title": "Core Fundamentals", "description": "Master Network Theory, Digital Logic, and Basic C.", "key_skills": ["Circuit Analysis", "Digital Logic", "C"], "course_link": "https://www.coursera.org/learn/electronics"},
        {"title": "Microcontrollers", "description": "Learn bare-metal programming on Arduino or STM32.", "key_skills": ["Microcontrollers", "Embedded C"], "course_link": "https://www.coursera.org/learn/embedded-software-hardware"},
        {"title": "Basic Protocols", "description": "Understand how hardware talks.", "key_skills": ["UART", "I2C"], "course_link": "https://www.coursera.org/learn/embedded-systems-microcontrollers"},
        {"title": "Simple Projects", "description": "Build a sensor node.", "key_skills": ["Sensors", "Hardware Debugging"], "course_link": "https://www.coursera.org/learn/interface-with-arduino"},
        {"title": "PCB Basics", "description": "Learn to design a simple 2-layer board.", "key_skills": ["KiCad", "Schematics"], "course_link": "https://www.coursera.org/learn/iot"}
    ],
    "intermediate_steps": [
        {"title": "Advanced C/C++", "description": "Master pointers and object-oriented embedded code.", "key_skills": ["C++", "Pointers"], "course_link": "https://www.coursera.org/learn/c-plus-plus-introduction"},
        {"title": "RTOS Integration", "description": "Move from superloops to task-based RTOS.", "key_skills": ["FreeRTOS", "Multithreading"], "course_link": "https://www.coursera.org/learn/real-time-embedded-systems"},
        {"title": "Advanced Protocols", "description": "Implement high-speed SPI and CAN.", "key_skills": ["SPI", "CAN Bus"], "course_link": "https://www.coursera.org/learn/embedded-interface-design"},
        {"title": "Complex Portfolios", "description": "Build a connected IoT device.", "key_skills": ["Wi-Fi", "MQTT"], "course_link": "https://www.coursera.org/learn/iot-wireless-communications"},
        {"title": "Scripting", "description": "Automate hardware tests with Python.", "key_skills": ["Python", "PySerial"], "course_link": "https://www.coursera.org/learn/python"}
    ],
    "advanced_steps": [
        {"title": "System Architecture", "description": "Design end-to-end hardware/software systems.", "key_skills": ["Architecture", "System Design"], "course_link": "https://www.coursera.org/learn/embedded-system-design-uc-boulder"},
        {"title": "Embedded Linux", "description": "Write drivers for the Linux kernel.", "key_skills": ["Linux Kernel", "Device Trees"], "course_link": "https://www.coursera.org/learn/embedded-linux-interface-design"},
        {"title": "Hardware Acceleration", "description": "Offload algorithms to FPGAs.", "key_skills": ["FPGA", "Verilog"], "course_link": "https://www.coursera.org/specializations/fpga-design"},
        {"title": "High-Speed PCB", "description": "Design 6+ layer boards with impedance control.", "key_skills": ["Altium", "Signal Integrity"], "course_link": "https://www.coursera.org/learn/vlsicad"},
        {"title": "Industry Certification", "description": "Master safety standards and secure coding.", "key_skills": ["MISRA", "Secure Boot"], "course_link": "https://www.coursera.org/learn/hardware-security"}
    ]
}

# Fallback roadmaps if LLMs fail

DOMAIN_ROADMAPS = {
    "VLSI & ASIC Design": {
        "domain": "VLSI & ASIC Design",
        "news_headline": "AI hardware accelerators are driving a 400% surge in VLSI and Custom Silicon demand.",
        "beginner_steps": [
            {"title": "Digital Logic Fundamentals", "description": "Master boolean algebra, logic gates, and basic combinational/sequential circuits.", "key_skills": ["Boolean Algebra", "Logic Gates", "K-Maps"]},
            {"title": "Introduction to Verilog", "description": "Write basic modules, testbenches, and understand simulation.", "key_skills": ["Verilog", "ModelSim", "Testbenches"]},
            {"title": "Computer Architecture Basics", "description": "Understand ALU design, registers, and basic memory mapping.", "key_skills": ["Architecture", "ALU", "Registers"]},
            {"title": "FPGA Prototyping", "description": "Implement simple designs on a basic FPGA board.", "key_skills": ["Basys 3", "Vivado", "Synthesis"]},
            {"title": "Basic State Machines", "description": "Design and simulate Moore and Mealy Finite State Machines.", "key_skills": ["FSMs", "State Diagrams", "RTL"]}
        ],
        "intermediate_steps": [
            {"title": "Advanced RTL Design", "description": "Design complex datapaths and controllers for custom hardware.", "key_skills": ["RTL Coding", "Datapaths", "Pipelining"]},
            {"title": "SystemVerilog for Design", "description": "Transition to SystemVerilog constructs for cleaner hardware modeling.", "key_skills": ["SystemVerilog", "Interfaces", "Structs"]},
            {"title": "Static Timing Analysis (STA)", "description": "Understand setup/hold times and fix timing violations.", "key_skills": ["STA", "Timing Constraints", "PrimeTime"]},
            {"title": "Basic Physical Design", "description": "Learn floorplanning, placement, and basic routing concepts.", "key_skills": ["Floorplanning", "P&R", "Innovus"]},
            {"title": "Custom Core Project", "description": "Build and verify a basic pipelined RISC-V or MIPS core.", "key_skills": ["RISC-V", "Pipelining", "Computer Architecture"]}
        ],
        "advanced_steps": [
            {"title": "Universal Verification Methodology", "description": "Master industry-standard UVM for verifying massive SoCs.", "key_skills": ["UVM", "OVM", "SystemVerilog Assertions"]},
            {"title": "Low Power Design (UPF)", "description": "Implement power gating, clock gating, and multi-Vdd designs.", "key_skills": ["UPF", "Clock Gating", "Low Power"]},
            {"title": "Advanced Physical Design", "description": "Handle complex clock tree synthesis (CTS) and IR drop analysis.", "key_skills": ["CTS", "IR Drop", "EM Analysis"]},
            {"title": "Tape-out Signoff", "description": "Perform rigorous LVS, DRC, and ERC checks before manufacturing.", "key_skills": ["Calibre", "DRC/LVS", "Signoff"]},
            {"title": "Silicon Bring-up", "description": "Test and validate actual manufactured silicon in the lab.", "key_skills": ["Post-Silicon Validation", "Oscilloscopes", "JTAG"]}
        ]
    },
    "Embedded Systems & Firmware": {
        "domain": "Embedded Systems & Firmware",
        "news_headline": "The explosive growth of IoT and Automotive EVs is making Embedded Firmware the most critical layer of tech.",
        "beginner_steps": [
            {"title": "C Programming Mastery", "description": "Deep dive into pointers, memory management, and bitwise operations.", "key_skills": ["C", "Pointers", "Bitwise Math"]},
            {"title": "Microcontroller Architecture", "description": "Understand memory maps, registers, and the CPU pipeline.", "key_skills": ["MCU Architecture", "Registers", "Memory Maps"]},
            {"title": "Bare-Metal GPIO", "description": "Write basic drivers to control LEDs and read buttons without libraries.", "key_skills": ["GPIO", "Bare-Metal", "Registers"]},
            {"title": "Interrupts & Timers", "description": "Implement Interrupt Service Routines (ISRs) and hardware timers.", "key_skills": ["ISRs", "Timers", "NVIC"]},
            {"title": "Basic Protocols (UART)", "description": "Implement serial communication to print debug messages to a PC.", "key_skills": ["UART", "Serial Monitor", "Baud Rates"]}
        ],
        "intermediate_steps": [
            {"title": "Advanced Hardware Protocols", "description": "Write custom drivers for SPI and I2C sensors.", "key_skills": ["I2C", "SPI", "Logic Analyzers"]},
            {"title": "Direct Memory Access (DMA)", "description": "Offload data transfers from the CPU to DMA controllers.", "key_skills": ["DMA", "Performance Optimization", "Bus Matrix"]},
            {"title": "Real-Time Operating Systems", "description": "Implement FreeRTOS, tasks, queues, and mutexes.", "key_skills": ["FreeRTOS", "Multithreading", "Semaphores"]},
            {"title": "Low Power Modes", "description": "Optimize firmware to run on coin cell batteries for years.", "key_skills": ["Sleep Modes", "Power Profiling", "RTC"]},
            {"title": "Wireless IoT Node", "description": "Build a device that connects to Wi-Fi/BLE and sends MQTT data.", "key_skills": ["ESP32/STM32", "MQTT", "Wi-Fi/BLE"]}
        ],
        "advanced_steps": [
            {"title": "Embedded Linux (Yocto)", "description": "Build custom Linux distributions for embedded processors like Raspberry Pi.", "key_skills": ["Yocto", "Device Trees", "Kernel Modules"]},
            {"title": "Automotive AUTOSAR", "description": "Learn the strict automotive software architecture standard.", "key_skills": ["AUTOSAR", "CAN Bus", "MCAL"]},
            {"title": "Over-The-Air (OTA) Updates", "description": "Implement secure, failsafe remote firmware updates.", "key_skills": ["OTA", "Bootloaders", "Cryptography"]},
            {"title": "Hardware Security Modules", "description": "Utilize HSMs for secure boot, encryption, and secure storage.", "key_skills": ["Secure Boot", "HSM", "AES/RSA"]},
            {"title": "Safety Critical Systems", "description": "Design firmware adhering to ISO 26262 or DO-178C standards.", "key_skills": ["MISRA C", "ISO 26262", "Functional Safety"]}
        ]
    }
}

GENERIC_ROADMAP = {
    "domain": "Generic Electronics & Communication",
    "news_headline": "The ECE industry is experiencing a massive renaissance as hardware becomes the bottleneck for AI.",
    "beginner_steps": [
        {"title": "Core Fundamentals", "description": "Master Network Theory, Digital Logic, and Basic C.", "key_skills": ["Circuit Analysis", "Digital Logic", "C"]},
        {"title": "Microcontrollers", "description": "Learn bare-metal programming on Arduino or STM32.", "key_skills": ["Microcontrollers", "Embedded C"]},
        {"title": "Basic Protocols", "description": "Understand how hardware talks.", "key_skills": ["UART", "I2C"]},
        {"title": "Simple Projects", "description": "Build a sensor node.", "key_skills": ["Sensors", "Hardware Debugging"]},
        {"title": "PCB Basics", "description": "Learn to design a simple 2-layer board.", "key_skills": ["KiCad", "Schematics"]}
    ],
    "intermediate_steps": [
        {"title": "Advanced C/C++", "description": "Master pointers and object-oriented embedded code.", "key_skills": ["C++", "Pointers"]},
        {"title": "RTOS Integration", "description": "Move from superloops to task-based RTOS.", "key_skills": ["FreeRTOS", "Multithreading"]},
        {"title": "Advanced Protocols", "description": "Implement high-speed SPI and CAN.", "key_skills": ["SPI", "CAN Bus"]},
        {"title": "Complex Portfolios", "description": "Build a connected IoT device.", "key_skills": ["Wi-Fi", "MQTT"]},
        {"title": "Scripting", "description": "Automate hardware tests with Python.", "key_skills": ["Python", "PySerial"]}
    ],
    "advanced_steps": [
        {"title": "System Architecture", "description": "Design end-to-end hardware/software systems.", "key_skills": ["Architecture", "System Design"]},
        {"title": "Embedded Linux", "description": "Write drivers for the Linux kernel.", "key_skills": ["Linux Kernel", "Device Trees"]},
        {"title": "Hardware Acceleration", "description": "Offload algorithms to FPGAs.", "key_skills": ["FPGA", "Verilog"]},
        {"title": "High-Speed PCB", "description": "Design 6+ layer boards with impedance control.", "key_skills": ["Altium", "Signal Integrity"]},
        {"title": "Industry Certification", "description": "Master safety standards and secure coding.", "key_skills": ["MISRA", "Secure Boot"]}
    ]
}

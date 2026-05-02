'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Zap, CheckCircle2, 
  Target, Rocket, Shield,
  Brain, Cpu, Terminal,
  ExternalLink, Github, Youtube,
  BookOpen, Building2, ChevronRight,
  Sparkles, Layers
} from 'lucide-react';
import { useState } from 'react';

interface Resource {
  title: string;
  link: string;
  type: 'course' | 'video' | 'project';
}

interface RoadmapPhase {
  title: string;
  desc: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  milestones: string[];
  companies: string[];
  resources: Resource[];
}

interface RoadmapData {
  id: string;
  title: string;
  phases: RoadmapPhase[];
}

const roadmaps: Record<string, RoadmapData> = {
  vlsi: {
    id: 'vlsi',
    title: 'VLSI & ASIC Logic',
    phases: [
      { 
        level: 'Beginner',
        title: 'Foundation Architecture', 
        desc: 'Master the fundamental building blocks of digital logic and hardware description.',
        milestones: ['Digital Logic Design Mastery', 'Verilog/VHDL Fundamentals', 'FPGA Prototyping Basics', 'Combinational & Sequential Circuits'],
        companies: ['Intel', 'Texas Instruments', 'AMD', 'Qualcomm', 'Microchip'],
        resources: [
          { title: 'NPTEL: Digital VLSI Design', link: 'https://nptel.ac.in/courses/117106093', type: 'course' },
          { title: 'Verilog-HDL Training (YT)', link: 'https://youtube.com/playlist?list=PL2C62342779772E79', type: 'video' },
          { title: 'OpenFPGA Prototyping', link: 'https://github.com/OpenFPGA/OpenFPGA', type: 'project' }
        ]
      },
      { 
        level: 'Intermediate',
        title: 'Core Silicon Engineering', 
        desc: 'Deep dive into RTL design and verification methodologies.',
        milestones: ['Advanced RTL Coding Styles', 'Static Timing Analysis (STA)', 'Synthesis & Gate-Level Simulation', 'SystemVerilog for Design'],
        companies: ['NVIDIA', 'Apple', 'Broadcom', 'Samsung', 'Marvell'],
        resources: [
          { title: 'Coursera: ASIC Design Flow', link: 'https://www.coursera.org/specializations/asic-design-flow', type: 'course' },
          { title: 'STA for Beginners (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'RISC-V RTL Core', link: 'https://github.com/chipsalliance/Cores-VeeR-EL2', type: 'project' }
        ]
      },
      { 
        level: 'Advanced',
        title: 'Advanced Protocols', 
        desc: 'Professional-grade verification and physical design flows.',
        milestones: ['UVM (Universal Verification Methodology)', 'Logic Equivalence Checking', 'DFT (Design for Test) Insertion', 'Physical Design (P&R)'],
        companies: ['Qualcomm', 'Intel', 'Apple', 'NVIDIA', 'Synopsys', 'Cadence'],
        resources: [
          { title: 'UVM Academy', link: 'https://verificationacademy.com/sessions/uvm-fundamentals', type: 'course' },
          { title: 'Physical Design Flow (YT)', link: 'https://www.youtube.com/playlist?list=PLuv3XfM_35m1wT_8E8U1sK_S6W8A_Ff8X', type: 'video' },
          { title: 'OpenLane VLSI Flow', link: 'https://github.com/The-OpenROAD-Project/OpenLane', type: 'project' }
        ]
      },
      { 
        level: 'Expert',
        title: 'Matrix Mastery', 
        desc: 'Leading tape-outs and post-silicon architectural strategy.',
        milestones: ['Tape-out Management (GDSII)', 'Post-Silicon Validation', 'High-Speed Analog/Mixed-Signal Integration', 'System-on-Chip (SoC) Architecture'],
        companies: ['Tesla', 'Google (TPU)', 'Amazon (Graviton)', 'Meta', 'IBM'],
        resources: [
          { title: 'Advanced SoC Architecture', link: 'https://www.arm.com/resources/education/higher-education/curriculum/soc-design', type: 'course' },
          { title: 'Tape-out Checklist (YT)', link: 'https://www.youtube.com/watch?v=JmS_pG-3yY8', type: 'video' },
          { title: 'SkyWater 130nm PDK', link: 'https://github.com/google/skywater-pdk', type: 'project' }
        ]
      }
    ]
  },
  embedded: {
    id: 'embedded',
    title: 'Embedded Systems',
    phases: [
      { 
        level: 'Beginner',
        title: 'Bare-Metal Foundation', 
        desc: 'Direct hardware interaction and low-level C programming.',
        milestones: ['C/C++ for Embedded Systems', 'MCU Architecture (ARM Cortex-M)', 'Peripheral Interfacing (UART, SPI, I2C)', 'Bare-Metal Driver Development'],
        companies: ['STMicroelectronics', 'NXP', 'Microchip', 'Renesas', 'TI'],
        resources: [
          { title: 'EdX: Embedded Systems', link: 'https://www.edx.org/course/embedded-systems-shape-the-world-microcontroller-input-output', type: 'course' },
          { title: 'FastBit Embedded C (YT)', link: 'https://www.youtube.com/@FastBitEmbeddedBrainAcademy', type: 'video' },
          { title: 'STM32 Projects', link: 'https://github.com/STMicroelectronics/STM32CubeF4', type: 'project' }
        ]
      },
      { 
        level: 'Intermediate',
        title: 'Core Synchronization', 
        desc: 'Real-time operating systems and multi-threaded architecture.',
        milestones: ['RTOS Fundamentals (FreeRTOS/Zephyr)', 'Interrupt Handling & Priority', 'Memory Management & DMA', 'Task Scheduling & Semaphores'],
        companies: ['Bosch', 'Continental', 'Valeo', 'Garmin', 'Honeywell'],
        resources: [
          { title: 'FreeRTOS Official Guide', link: 'https://www.freertos.org/Documentation/RTOS_book.html', type: 'course' },
          { title: 'RTOS Concepts (YT)', link: 'https://www.youtube.com/watch?v=F321087yYy4', type: 'video' },
          { title: 'Zephyr Project RTOS', link: 'https://github.com/zephyrproject-rtos/zephyr', type: 'project' }
        ]
      },
      { 
        level: 'Advanced',
        title: 'Professional Protocols', 
        desc: 'Advanced communication and security architectures.',
        milestones: ['TCP/IP Stack Integration', 'CAN/LIN Bus for Automotive', 'USB & BLE Protocol Stacks', 'Secure Boot & Encryption'],
        companies: ['Tesla', 'Waymo', 'Apple', 'NVIDIA', 'Qualcomm'],
        resources: [
          { title: 'Automotive Security', link: 'https://www.coursera.org/learn/automotive-security-intro', type: 'course' },
          { title: 'BLE Protocol Stack (YT)', link: 'https://www.youtube.com/watch?v=XhIInS8E_1M', type: 'video' },
          { title: 'OpenSource CAN Stack', link: 'https://github.com/linux-can/can-utils', type: 'project' }
        ]
      },
      { 
        level: 'Expert',
        title: 'System Mastery', 
        desc: 'Architecting large-scale embedded ecosystems.',
        milestones: ['Embedded Linux & Kernel Hacking', 'Complex RTOS Optimization', 'High-Level Hardware Abstraction Layers', 'Safety-Critical System Design'],
        companies: ['Amazon Robotics', 'Google Home', 'SpaceX', 'Lockheed Martin', 'Airbus'],
        resources: [
          { title: 'Linux Kernel Development', link: 'https://training.linuxfoundation.org/training/linux-kernel-internals-and-development/', type: 'course' },
          { title: 'Embedded Linux (YT)', link: 'https://www.youtube.com/playlist?list=PL66_Bbe8S_v5l60aK0q3_W2F0K8Lq5i5T', type: 'video' },
          { title: 'Yocto Project', link: 'https://github.com/yoctoproject/poky', type: 'project' }
        ]
      }
    ]
  },
  'ai-hw': {
    id: 'ai-hw',
    title: 'AI Hardware Intel',
    phases: [
      { 
        level: 'Beginner',
        title: 'Neural Foundation', 
        desc: 'Linear Algebra & Basics.', 
        milestones: ['Math for AI', 'Tensor Ops', 'Python/C++'],
        companies: ['Google', 'NVIDIA', 'Intel'],
        resources: [
          { title: 'Math for ML (Coursera)', link: 'https://www.coursera.org/specializations/mathematics-machine-learning', type: 'course' },
          { title: 'PyTorch Basics (YT)', link: 'https://www.youtube.com/watch?v=V_xro1bcAuA', type: 'video' },
          { title: 'TFLite Micro', link: 'https://github.com/tensorflow/tflite-micro', type: 'project' }
        ]
      },
      { 
        level: 'Intermediate',
        title: 'Accelerator Core', 
        desc: 'Architecting TPU/NPU.', 
        milestones: ['Systolic Arrays', 'Memory Hierarchies', 'Quantization'],
        companies: ['NVIDIA', 'Graphcore', 'Groq', 'Cerebras'],
        resources: [
          { title: 'AI Accelerators (Andreas Moshovos)', link: 'https://www.youtube.com/@AndreasMoshovos', type: 'video' },
          { title: 'Quantization Theory', link: 'https://arxiv.org/abs/1712.05877', type: 'course' },
          { title: 'Gemmini Accelerator', link: 'https://github.com/ucb-bar/gemmini', type: 'project' }
        ]
      },
      { 
        level: 'Advanced',
        title: 'Edge Deployment', 
        desc: 'Optimization for power.', 
        milestones: ['TFLite', 'ONNX', 'TVM Compiler'],
        companies: ['Apple', 'Qualcomm', 'Samsung', 'MediaTek'],
        resources: [
          { title: 'Edge AI (Coursera)', link: 'https://www.coursera.org/learn/edge-ai-introduction', type: 'course' },
          { title: 'TVM Introduction (YT)', link: 'https://www.youtube.com/watch?v=L9Yw6VjOshM', type: 'video' },
          { title: 'Apache TVM', link: 'https://github.com/apache/tvm', type: 'project' }
        ]
      },
      { 
        level: 'Expert',
        title: 'Silicon Mastery', 
        desc: 'AI Chip Design.', 
        milestones: ['Hardware/Software Co-design', 'Custom Accelerators', 'Tape-out'],
        companies: ['OpenAI', 'Anthropic', 'Tenstorrent', 'Microsoft', 'AWS'],
        resources: [
          { title: 'Hardware/Software Co-design', link: 'https://www.edx.org/course/hardware-software-co-design', type: 'course' },
          { title: 'Chip Design for AI (YT)', link: 'https://www.youtube.com/watch?v=8pA8lU9j3iU', type: 'video' },
          { title: 'Verilog TPU', link: 'https://github.com/leandromoreira/verilog-tpu', type: 'project' }
        ]
      }
    ]
  },
  wireless: {
    id: 'wireless',
    title: '5G & Wireless Comm',
    phases: [
      { 
        level: 'Beginner',
        title: 'Signal Foundation', 
        desc: 'RF & DSP Basics.', 
        milestones: ['Signal Processing', 'Modulation Tech', 'Electromagnetics', 'Python for DSP'],
        companies: ['Ericsson', 'Nokia', 'Samsung', 'Qualcomm'],
        resources: [
          { title: 'NPTEL: DSP', link: 'https://nptel.ac.in/courses/117102060', type: 'course' },
          { title: 'RF Basics (YT)', link: 'https://www.youtube.com/watch?v=H7yvY9O2n5o', type: 'video' },
          { title: 'GNU Radio', link: 'https://github.com/gnuradio/gnuradio', type: 'project' }
        ]
      },
      { 
        level: 'Intermediate',
        title: 'Core Protocols', 
        desc: '4G/5G Architecture.', 
        milestones: ['L1/L2/L3 Layers', 'MIMO Tech', 'Beamforming', 'OFDM Theory'],
        companies: ['Qualcomm', 'Intel', 'Apple', 'Broadcom'],
        resources: [
          { title: '5G Training (Nokia)', link: 'https://www.nokia.com/networks/5g/training/', type: 'course' },
          { title: '5G Physical Layer (YT)', link: 'https://www.youtube.com/watch?v=78YwN6Z_uYs', type: 'video' },
          { title: 'srsRAN', link: 'https://github.com/srsran/srsRAN_4G', type: 'project' }
        ]
      },
      { 
        level: 'Advanced',
        title: 'Network Design', 
        desc: 'O-RAN & Core Ops.', 
        milestones: ['Open5GS', 'Cloud RAN', 'Network Slicing', 'MEC Architecture'],
        companies: ['Reliance Jio', 'Airtel', 'Mavenir', 'Parallel Wireless'],
        resources: [
          { title: 'Open5GS Tutorial', link: 'https://open5gs.org/open5gs/docs/guide/01-quickstart/', type: 'course' },
          { title: 'O-RAN Introduction (YT)', link: 'https://www.youtube.com/watch?v=9_N678n_0Y8', type: 'video' },
          { title: 'Open5GS Core', link: 'https://github.com/open5gs/open5gs', type: 'project' }
        ]
      },
      { 
        level: 'Expert',
        title: 'Next-Gen Mastery', 
        desc: '6G & Beyond.', 
        milestones: ['Spectrum Management', 'Satellite Comm', 'Quantum Comm', 'Massive MIMO Design'],
        companies: ['SpaceX (Starlink)', 'NASA', 'ISRO', 'OneWeb'],
        resources: [
          { title: '6G Vision (IEEE)', link: 'https://futurenetworks.ieee.org/vision/6g', type: 'course' },
          { title: 'Quantum Comm (YT)', link: 'https://www.youtube.com/watch?v=1rYvWc6p47k', type: 'video' },
          { title: 'Satellite Comms Lib', link: 'https://github.com/nasa/satellite-comms', type: 'project' }
        ]
      }
    ]
  },
  robotics: {
    id: 'robotics',
    title: 'Robotics & Automation',
    phases: [
      { 
        level: 'Beginner',
        title: 'Mechanics Foundation', 
        desc: 'Kinematics & Basic Control.', 
        milestones: ['Linear Algebra for Robots', 'Arduino/ESP32 Control', 'Motor Drivers & Encoders', 'Python for Robotics'],
        companies: ['Arduino', 'DFRobot', 'Adafruit', 'SparkFun'],
        resources: [
          { title: 'Modern Robotics (Coursera)', link: 'https://www.coursera.org/specializations/modernrobotics', type: 'course' },
          { title: 'Robotics 101 (YT)', link: 'https://www.youtube.com/watch?v=Lq1iC7YqLz8', type: 'video' },
          { title: 'Arduino Robotics', link: 'https://github.com/arduino/Arduino', type: 'project' }
        ]
      },
      { 
        level: 'Intermediate',
        title: 'Neural Core', 
        desc: 'Robot Operating System (ROS).', 
        milestones: ['ROS 2 Fundamentals', 'Sensor Fusion (IMU/LiDAR)', 'Path Planning Algorithms', 'Gazebo Simulation'],
        companies: ['Amazon Robotics', 'Locus Robotics', 'Fanuc', 'ABB'],
        resources: [
          { title: 'ROS 2 Tutorials', link: 'https://docs.ros.org/en/foxy/Tutorials.html', type: 'course' },
          { title: 'ROS 2 Crash Course (YT)', link: 'https://www.youtube.com/watch?v=4pPByfS8A8k', type: 'video' },
          { title: 'ROS 2 Navigation', link: 'https://github.com/ros-planning/navigation2', type: 'project' }
        ]
      },
      { 
        level: 'Advanced',
        title: 'Industrial Depth', 
        desc: 'Automation & Precision.', 
        milestones: ['Computer Vision (OpenCV)', 'SLAM Navigation', 'PLC & Industrial Protocols', 'Control Systems Theory'],
        companies: ['Intuitive Surgical', 'Boston Dynamics', 'Tesla (Optimus)', 'Kuka'],
        resources: [
          { title: 'SLAM Tutorials', link: 'https://github.com/RainerKuemmerle/g2o', type: 'project' },
          { title: 'OpenCV for Robotics (YT)', link: 'https://www.youtube.com/watch?v=kdLM6AodNYQ', type: 'video' },
          { title: 'OpenCV Lib', link: 'https://github.com/opencv/opencv', type: 'project' }
        ]
      },
      { 
        level: 'Expert',
        title: 'Autonomy Mastery', 
        desc: 'Human-Robot Interaction.', 
        milestones: ['Reinforcement Learning', 'Swarm Robotics', 'Space/Medical Robotics', 'Edge AI for Autonomy'],
        companies: ['NASA JPL', 'Neuralink', 'Tesla', 'Google DeepMind'],
        resources: [
          { title: 'RL for Robotics', link: 'https://www.coursera.org/learn/robotics-capstone', type: 'course' },
          { title: 'Swarm Robotics (YT)', link: 'https://www.youtube.com/watch?v=d_u_LpM_u_k', type: 'video' },
          { title: 'Gym-Robotics', link: 'https://github.com/openai/gym', type: 'project' }
        ]
      }
    ]
  },
  pcb: {
    id: 'pcb',
    title: 'PCB & Product Dev',
    phases: [
      { 
        level: 'Beginner',
        title: 'Hardware Foundation', 
        desc: 'Schematics & Components.', 
        milestones: ['Circuit Theory Basics', 'Component Selection', 'Schematic Entry (KiCad)', 'Footprint Design'],
        companies: ['Autodesk', 'Altium', 'Cadence', 'Siemens'],
        resources: [
          { title: 'PCB Design for Beginners (Coursera)', link: 'https://www.coursera.org/learn/pcb-design-altium', type: 'course' },
          { title: 'Schematic Design (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'KiCad Source', link: 'https://github.com/KiCad/KiCad', type: 'project' }
        ]
      },
      { 
        level: 'Intermediate',
        title: 'Layout Core', 
        desc: 'Multi-layer PCB Design.', 
        milestones: ['Routing Techniques', 'Ground Plane Strategy', 'Power Integrity', 'DRC/ERC Checks'],
        companies: ['Apple', 'Microsoft', 'NVIDIA', 'Intel'],
        resources: [
          { title: 'Advanced PCB Layout (YT)', link: 'https://www.youtube.com/@PhilsLab', type: 'video' },
          { title: 'Signal Integrity Basics', link: 'https://www.edn.com/signal-integrity-basics/', type: 'course' },
          { title: 'Open Hardware Repository', link: 'https://github.com/ohwr', type: 'project' }
        ]
      },
      { 
        level: 'Advanced',
        title: 'Production Depth', 
        desc: 'Manufacturing & Reliability.', 
        milestones: ['High-Speed Design (HDMI/USB)', 'Signal Integrity (SI/PI)', 'Design for Mfg (DFM)', 'EMI/EMC Mitigation'],
        companies: ['Tesla', 'Bosch', 'Continental', 'Lockheed Martin'],
        resources: [
          { title: 'High-Speed Design Guide', link: 'https://www.ti.com/lit/an/scaa082/scaa082.pdf', type: 'course' },
          { title: 'EMI/EMC Mastery (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'OpenRAM', link: 'https://github.com/VLSIDA/OpenRAM', type: 'project' }
        ]
      },
      { 
        level: 'Expert',
        title: 'Product Mastery', 
        desc: 'Full Product Lifecycle.', 
        milestones: ['Mass Production (PCBA)', 'Hardware Certification (CE/FCC)', 'Advanced RF Layout', 'Thermal Management'],
        companies: ['SpaceX', 'Blue Origin', 'Apple (iPhone Team)', 'Google Pixel'],
        resources: [
          { title: 'Hardware Product Mgmt', link: 'https://www.coursera.org/specializations/product-management', type: 'course' },
          { title: 'Mass Production Flow (YT)', link: 'https://www.youtube.com/watch?v=8pA8lU9j3iU', type: 'video' },
          { title: 'Thermal Analysis Lib', link: 'https://github.com/thermal-management/thermal-lib', type: 'project' }
        ]
      }
    ]
  },
  iot: {
    id: 'iot',
    title: 'IoT & Smart Systems',
    phases: [
      { 
        level: 'Beginner',
        title: 'Connect Foundation', 
        desc: 'Hardware & Basic Comms.', 
        milestones: ['MCU Basics (ESP32/STM32)', 'C++ for Sensors', 'HTTP/MQTT Basics', 'Sensor Interfacing'],
        companies: ['Espressif', 'Particle', 'Arduino', 'Adafruit'],
        resources: [
          { title: 'IoT for Beginners (Microsoft)', link: 'https://github.com/microsoft/IoT-For-Beginners', type: 'project' },
          { title: 'MQTT Basics (YT)', link: 'https://www.youtube.com/watch?v=XhIInS8E_1M', type: 'video' },
          { title: 'IoT Specialization (Coursera)', link: 'https://www.coursera.org/specializations/iot', type: 'course' }
        ]
      },
      { 
        level: 'Intermediate',
        title: 'Protocol Depth', 
        desc: 'Advanced networking.', 
        milestones: ['LoRaWAN/Zigbee/BLE', 'Security Protocols', 'Battery Optimization', 'Gateway Design'],
        companies: ['Silicon Labs', 'Nordic Semi', 'Semtech', 'Telit'],
        resources: [
          { title: 'LoRaWAN Academy', link: 'https://lora-developers.semtech.com/build/lorawan-academy/', type: 'course' },
          { title: 'BLE Deep Dive (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'The Things Network Source', link: 'https://github.com/TheThingsNetwork/lorawan-stack', type: 'project' }
        ]
      },
      { 
        level: 'Advanced',
        title: 'Cloud Sync', 
        desc: 'Cloud data architectures.', 
        milestones: ['AWS/Azure IoT Hub', 'Node-RED & Dashboards', 'OTA Updates', 'Real-time Analytics'],
        companies: ['AWS IoT', 'Azure IoT', 'Google Cloud IoT', 'Salesforce'],
        resources: [
          { title: 'AWS IoT Core Training', link: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/1041/iot-foundation-series', type: 'course' },
          { title: 'Node-RED Tutorial (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'ThingsBoard', link: 'https://github.com/thingsboard/thingsboard', type: 'project' }
        ]
      },
      { 
        level: 'Expert',
        title: 'Intelligence Mastery', 
        desc: 'Architecting Smart Systems.', 
        milestones: ['Edge Computing', 'Digital Twins', 'IoT Security Audit', 'Scalable Ecosystems'],
        companies: ['Siemens', 'GE Digital', 'Honeywell', 'Schneider Electric'],
        resources: [
          { title: 'Edge AI Specialization', link: 'https://www.coursera.org/specializations/edge-ai', type: 'course' },
          { title: 'IoT Security (YT)', link: 'https://www.youtube.com/watch?v=8pA8lU9j3iU', type: 'video' },
          { title: 'EdgeX Foundry', link: 'https://github.com/edgexfoundry/edgex-go', type: 'project' }
        ]
      }
    ]
  },
  analog: {
    id: 'analog',
    title: 'Analog & Mixed-Signal',
    phases: [
      { 
        level: 'Beginner',
        title: 'Physics Foundation', 
        desc: 'Semiconductor physics.', 
        milestones: ['Device Physics', 'Op-Amp Design', 'Circuit Theory', 'BJT/MOSFET Basics'],
        companies: ['TI', 'Analog Devices', 'Microchip', 'ON Semi'],
        resources: [
          { title: 'Behzad Razavi Electronics (YT)', link: 'https://www.youtube.com/@razavielectronics', type: 'video' },
          { title: 'Analog IC Design (Coursera)', link: 'https://www.coursera.org/learn/analog-ic-design', type: 'course' },
          { title: 'Ngspice', link: 'https://github.com/ngspice/ngspice', type: 'project' }
        ]
      },
      { 
        level: 'Intermediate',
        title: 'IC Architecture', 
        desc: 'Precision silicon design.', 
        milestones: ['Current Mirrors & References', 'Frequency Compensation', 'Noise Analysis', 'Layout Basics'],
        companies: ['Intel', 'Apple', 'Broadcom', 'Samsung'],
        resources: [
          { title: 'Layout for Beginners (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'Analog Layout Design', link: 'https://nptel.ac.in/courses/117101105', type: 'course' },
          { title: 'Magic VLSI', link: 'https://github.com/RTimothyEdwards/magic', type: 'project' }
        ]
      },
      { 
        level: 'Advanced',
        title: 'Mixed-Signal Depth', 
        desc: 'ADC/DAC & High Speed.', 
        milestones: ['ADC/DAC Architectures', 'PLL/DLL Design', 'Switched Cap Circuits', 'ESD Protection'],
        companies: ['Qualcomm', 'NVIDIA', 'Synopsys', 'Cadence'],
        resources: [
          { title: 'ADC/DAC Tutorials (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'Mixed Signal Design', link: 'https://www.coursera.org/learn/mixed-signal-design', type: 'course' },
          { title: 'Xyce Simulator', link: 'https://github.com/Xyce/Xyce', type: 'project' }
        ]
      },
      { 
        level: 'Expert',
        title: 'Silicon Mastery', 
        desc: 'High-end analog tape-out.', 
        milestones: ['SerDes Design', 'RFIC Architecture', 'Power Management ICs', 'Post-Layout Verification'],
        companies: ['TSMC', 'Intel Foundry', 'Skyworks', 'Qorvo'],
        resources: [
          { title: 'SerDes Design Flow', link: 'https://www.youtube.com/watch?v=8pA8lU9j3iU', type: 'video' },
          { title: 'RFIC Design (IEEE)', link: 'https://ieeexplore.ieee.org/courses/home', type: 'course' },
          { title: 'Openlane Analog Flow', link: 'https://github.com/The-OpenROAD-Project/OpenLane', type: 'project' }
        ]
      }
    ]
  },
  automotive: {
    id: 'automotive',
    title: 'Automotive & EV Tech',
    phases: [
      { 
        level: 'Beginner',
        title: 'Vehicle Foundation', 
        desc: 'Automotive systems basics.', 
        milestones: ['Electric Drivetrain Basics', 'Battery Management (BMS)', 'CAN/LIN Bus Basics', 'Auto C programming'],
        companies: ['Bosch', 'Continental', 'Tata Motors', 'Mahindra'],
        resources: [
          { title: 'EV Foundations (Coursera)', link: 'https://www.coursera.org/learn/electric-vehicles', type: 'course' },
          { title: 'CAN Bus Basics (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'OpenVehicle Monitoring', link: 'https://github.com/openvehicles/Open-Vehicle-Monitoring-System-3', type: 'project' }
        ]
      },
      { 
        level: 'Intermediate',
        title: 'Core Power', 
        desc: 'Power electronics & control.', 
        milestones: ['Inverter/Converter Design', 'Motor Control Theory', 'Embedded C for ISO26262', 'Hardware-in-Loop (HiL)'],
        companies: ['Tesla', 'Rivian', 'Lucid', 'NIO'],
        resources: [
          { title: 'Power Electronics (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'Motor Control Design', link: 'https://www.ti.com/video/series/motor-control-training-series.html', type: 'course' },
          { title: 'VESC Motor Controller', link: 'https://github.com/vedderb/bldc', type: 'project' }
        ]
      },
      { 
        level: 'Advanced',
        title: 'Autonomous Depth', 
        desc: 'Sensors & Data Fusion.', 
        milestones: ['LiDAR/Radar/Vision', 'ADAS Architecture', 'AUTOSAR Basics', 'Vehicle Security'],
        companies: ['Waymo', 'Cruise', 'Mobileye', 'Zoox'],
        resources: [
          { title: 'Intro to Self-Driving (Udacity)', link: 'https://www.udacity.com/course/intro-to-self-driving-cars--ud191', type: 'course' },
          { title: 'LiDAR Processing (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'Apollo Self-Driving', link: 'https://github.com/ApolloAuto/apollo', type: 'project' }
        ]
      },
      { 
        level: 'Expert',
        title: 'Mobility Mastery', 
        desc: 'Architecting Next-Gen EV.', 
        milestones: ['V2X Communication', 'Level 4 Autonomy Design', 'Battery Chemistry Optim', 'Fleet Sync Protocols'],
        companies: ['Tesla (FSD Team)', 'Google (Waymo Core)', 'Uber (ATG)', 'Apple (Project Titan)'],
        resources: [
          { title: 'V2X Technology', link: 'https://www.coursera.org/learn/v2x-communication', type: 'course' },
          { title: 'Level 4 Autonomy (YT)', link: 'https://www.youtube.com/watch?v=8pA8lU9j3iU', type: 'video' },
          { title: 'Comma.ai OpenPilot', link: 'https://github.com/commaai/openpilot', type: 'project' }
        ]
      }
    ]
  }
};

export default function MatrixRoadmapView({ domainId, onClose }: { domainId: string, onClose: () => void }) {
  const data = roadmaps[domainId] || roadmaps['vlsi'];
  const [selectedPhase, setSelectedPhase] = useState<number>(0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-[#020308] overflow-hidden flex flex-col font-inter"
    >
      {/* ── Cinematic Atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,241,0.05)_0%,transparent_70%)]" />
        <div className="scanline-overlay opacity-20" />
      </div>

      {/* Header */}
      <header className="relative z-20 px-8 py-6 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all group"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          </button>
          <div className="h-10 w-px bg-white/10" />
          <div>
            <div className="flex items-center gap-2 mb-0.5">
               <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] font-michroma">Neural Trajectory Map</span>
               <div className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[8px] font-black text-blue-400 uppercase tracking-widest">v4.2 PRO</div>
            </div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter font-michroma">{data.title}</h2>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Market Priority</span>
              <span className="text-xs font-bold text-white uppercase tracking-tighter">Silicon Valley & Bangalore Sync</span>
           </div>
           <div className="w-px h-8 bg-white/10" />
           <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#020308] flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Expert" className="w-full h-full object-cover grayscale opacity-50" />
                   </div>
                 ))}
              </div>
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">1.2k Mastered</span>
           </div>
        </div>
      </header>

      {/* Main Content: Tree Layout */}
      <main className="flex-1 relative overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Side: Tree Navigation */}
        <div className="w-full lg:w-[450px] border-r border-white/5 p-8 overflow-y-auto custom-scrollbar relative z-10 bg-black/20">
           <div className="space-y-4">
              <div className="flex items-center gap-3 mb-10">
                 <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <Layers className="w-5 h-5 text-blue-400" />
                 </div>
                 <div>
                    <h4 className="text-sm font-black text-white uppercase font-michroma">Sector Progression</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Root to Mastery Protocol</p>
                 </div>
              </div>

              {/* Tree Nodes */}
              <div className="relative pl-6 space-y-12">
                 {/* Vertical Connector Line */}
                 <div className="absolute left-[33px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent" />
                 
                 {data.phases.map((phase, i) => (
                   <motion.div 
                    key={i}
                    onClick={() => setSelectedPhase(i)}
                    className={`relative group cursor-pointer transition-all ${selectedPhase === i ? 'scale-105' : 'opacity-60 hover:opacity-100'}`}
                   >
                      {/* Node Circle */}
                      <div className={`absolute -left-[37px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 z-20 flex items-center justify-center transition-all ${selectedPhase === i ? 'bg-blue-500 border-blue-400 shadow-[0_0_20px_rgba(59,130,241,0.5)]' : 'bg-[#0a0c14] border-white/10 group-hover:border-blue-500/50'}`}>
                         {selectedPhase > i ? (
                           <CheckCircle2 className="w-4 h-4 text-white" />
                         ) : (
                           <span className="text-[10px] font-black text-white">{i + 1}</span>
                         )}
                      </div>

                      {/* Content Card */}
                      <div className={`p-6 rounded-2xl border transition-all ${selectedPhase === i ? 'bg-blue-600/10 border-blue-500/30 shadow-lg shadow-blue-500/5' : 'bg-white/5 border-white/5 hover:bg-white/[0.08]'}`}>
                         <div className="flex items-center justify-between mb-2">
                            <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${selectedPhase === i ? 'text-blue-400' : 'text-slate-500'}`}>{phase.level}</span>
                            {selectedPhase === i && <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />}
                         </div>
                         <h5 className="text-sm font-black text-white uppercase tracking-tight mb-1 group-hover:text-blue-400 transition-colors">{phase.title}</h5>
                         <p className="text-[10px] text-slate-500 font-medium line-clamp-1 italic">"{phase.desc}"</p>
                      </div>
                   </motion.div>
                 ))}

                 {/* Final Mastery Node */}
                 <div className="relative pt-12 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(59,130,241,0.3)] border border-white/20 mb-4">
                       <Shield className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Level: Grandmaster</span>
                    <h6 className="text-xs font-black text-white uppercase tracking-widest mt-1">Matrix Mastery</h6>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Side: Phase Details */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar relative z-10">
           <AnimatePresence mode="wait">
             <motion.div
               key={selectedPhase}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="max-w-4xl mx-auto space-y-16"
             >
                {/* Phase Hero */}
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-[2rem] bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                         <Rocket className="w-8 h-8 text-blue-400" />
                      </div>
                      <div>
                         <div className="flex items-center gap-3 mb-1">
                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Checkpoint_{selectedPhase+1}</span>
                            <div className="h-px w-12 bg-blue-500/30" />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] italic">{data.phases[selectedPhase].level} STRATEGY</span>
                         </div>
                         <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none font-michroma">{data.phases[selectedPhase].title}</h3>
                      </div>
                   </div>
                   <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl italic border-l-4 border-blue-500/30 pl-8">
                     "{data.phases[selectedPhase].desc}"
                   </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   
                   {/* Milestones & Skills */}
                   <div className="space-y-8">
                      <div className="flex items-center gap-3">
                         <Target className="w-5 h-5 text-blue-400" />
                         <h4 className="text-xs font-black text-white uppercase tracking-widest">Key Milestones</h4>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                         {data.phases[selectedPhase].milestones.map((ms, i) => (
                           <div key={i} className="group p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-5 hover:bg-white/[0.05] hover:border-blue-500/30 transition-all">
                              <div className="w-10 h-10 rounded-xl bg-[#0a0c14] border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
                                 <Terminal className="w-5 h-5" />
                              </div>
                              <div>
                                 <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">{ms}</span>
                                 <div className="mt-1 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Verified Proficiency</span>
                                 </div>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* Company Intel */}
                   <div className="space-y-8">
                      <div className="flex items-center gap-3">
                         <Building2 className="w-5 h-5 text-purple-400" />
                         <h4 className="text-xs font-black text-white uppercase tracking-widest">Hiring Intel (10+ Top Firms)</h4>
                      </div>
                      <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-white/5 space-y-6">
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] leading-relaxed">
                            These industry titans actively hunt for candidates with the {data.phases[selectedPhase].level} skills outlined in this phase:
                         </p>
                         <div className="flex flex-wrap gap-3">
                            {data.phases[selectedPhase].companies.map((company, i) => (
                              <div key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-slate-300 hover:text-white hover:border-purple-500/50 transition-all cursor-default">
                                 {company}
                              </div>
                            ))}
                            <div className="px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-[10px] font-black text-purple-400 italic">
                               +5 More in Cluster
                            </div>
                         </div>
                         <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                               <Zap className="w-5 h-5" />
                            </div>
                            <div>
                               <span className="text-[10px] font-black text-white uppercase tracking-widest">Entry Probability</span>
                               <div className="flex items-center gap-2 mt-1">
                                  <div className="h-1.5 w-32 bg-slate-800 rounded-full overflow-hidden">
                                     <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: selectedPhase === 0 ? '85%' : selectedPhase === 1 ? '70%' : '45%' }}
                                      className="h-full bg-emerald-500" 
                                     />
                                  </div>
                                  <span className="text-[10px] font-black text-emerald-400">{selectedPhase === 0 ? 'High' : selectedPhase === 1 ? 'Moderate' : 'Elite Only'}</span>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                </div>

                {/* Learning Vault */}
                <div className="pt-16 border-t border-white/5">
                   <div className="flex items-center justify-between mb-10">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-emerald-400" />
                         </div>
                         <div>
                            <h4 className="text-xl font-black text-white uppercase italic font-michroma tracking-tight">Phase Learning Vault</h4>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.3em]">Curated Free Mastery Resources</p>
                         </div>
                      </div>
                      <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol:</span>
                         <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">ZERO_COST_MASTER</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {data.phases[selectedPhase].resources.map((res, i) => (
                        <a 
                          key={i}
                          href={res.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group p-6 rounded-2xl bg-[#0a0c14] border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between h-48"
                        >
                           <div>
                              <div className="flex items-center justify-between mb-6">
                                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${res.type === 'course' ? 'bg-blue-500/10 text-blue-400' : res.type === 'video' ? 'bg-red-500/10 text-red-400' : 'bg-slate-500/10 text-slate-400'}`}>
                                    {res.type === 'course' ? <ExternalLink className="w-5 h-5" /> : res.type === 'video' ? <Youtube className="w-5 h-5" /> : <Github className="w-5 h-5" />}
                                 </div>
                                 <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest group-hover:text-emerald-500 transition-colors">{res.type}</span>
                              </div>
                              <h5 className="text-xs font-black text-white uppercase leading-relaxed group-hover:text-emerald-400 transition-colors">{res.title}</h5>
                           </div>
                           <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-600">
                              <span>Initialize</span>
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                           </div>
                        </a>
                      ))}
                   </div>
                </div>

                {/* Next Steps Prompt */}
                <div className="p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 text-center space-y-6">
                   <div className="w-16 h-16 rounded-3xl bg-blue-500 mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(59,130,241,0.3)]">
                      <Brain className="w-8 h-8 text-white" />
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-2xl font-black text-white uppercase italic tracking-tight font-michroma">Ready for next synchronization?</h4>
                      <p className="text-slate-500 text-sm font-medium tracking-widest uppercase">Master the milestones above to unlock Checkpoint_{selectedPhase+2}</p>
                   </div>
                   {selectedPhase < data.phases.length - 1 && (
                     <button 
                      onClick={() => setSelectedPhase(selectedPhase + 1)}
                      className="matrix-btn !px-12 !py-5 !text-xs !bg-blue-600 hover:!bg-blue-500 transition-all"
                     >
                       Proceed to {data.phases[selectedPhase + 1].level} Phase
                     </button>
                   )}
                </div>

             </motion.div>
           </AnimatePresence>
        </div>

      </main>

      {/* Footer / Status Bar */}
      <footer className="relative z-20 px-8 py-4 border-t border-white/5 bg-black/60 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">
         <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               Neural Link Active
            </span>
            <span className="hidden md:block">Protocol: GLOBAL_ATS_v4.2</span>
         </div>
         <div className="flex items-center gap-8">
            <span className="hidden lg:block text-slate-800 italic">"Design the future, layer by layer"</span>
            <div className="flex items-center gap-4">
               <span>System Load: 12%</span>
               <div className="w-px h-4 bg-white/5" />
               <span className="text-blue-500">Node Sync: 100%</span>
            </div>
         </div>
      </footer>
    </motion.div>
  );
}

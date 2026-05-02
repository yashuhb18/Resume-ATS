export interface Resource {
  title: string;
  link: string;
  type: 'course' | 'video' | 'project';
}

export interface RoadmapPhase {
  title: string;
  desc: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  milestones: string[];
  companies: string[];
  resources: Resource[];
}

export interface RoadmapData {
  id: string;
  title: string;
  phases: RoadmapPhase[];
}

export const roadmaps: Record<string, RoadmapData> = {
  vlsi: {
    id: 'vlsi',
    title: 'VLSI & ASIC Logic',
    phases: [
      { 
        level: 'Beginner',
        title: 'Foundation Architecture', 
        desc: 'Master the fundamental building blocks of digital logic and hardware description.',
        milestones: ['Digital Logic Design Mastery', 'Verilog/VHDL Fundamentals', 'FPGA Prototyping Basics', 'Combinational & Sequential Circuits'],
        companies: ['Intel', 'Texas Instruments', 'AMD', 'Qualcomm', 'Microchip', 'NXP', 'STMicroelectronics', 'Analog Devices', 'Infineon', 'Renesas'],
        resources: [
          { title: 'NPTEL: Digital VLSI Design', link: 'https://nptel.ac.in/courses/117106093', type: 'course' },
          { title: 'Verilog-HDL Training (YT)', link: 'https://youtube.com/playlist?list=PL2C62342779772E79', type: 'video' },
          { title: 'Digital Systems (Coursera)', link: 'https://www.coursera.org/learn/digital-systems', type: 'course' },
          { title: 'edX: Computation Structures', link: 'https://www.edx.org/course/computation-structures-part-1-digital-circuits', type: 'course' },
          { title: 'Verilog Mastery (YT)', link: 'https://www.youtube.com/playlist?list=PLuv3XfM_35m0O2OqH8F_L6fT3_8_L6fT3', type: 'video' },
          { title: 'Verilog Digital Clock Project', link: 'https://github.com/topics/verilog-digital-clock', type: 'project' },
          { title: '8-bit ALU Design', link: 'https://github.com/topics/8-bit-alu', type: 'project' },
          { title: 'FIFO Buffer Implementation', link: 'https://github.com/topics/fifo-buffer', type: 'project' },
          { title: 'Traffic Light Controller', link: 'https://github.com/topics/traffic-light-controller-verilog', type: 'project' },
          { title: 'UART Controller Core', link: 'https://github.com/alexforencich/verilog-uart', type: 'project' }
        ]
      },
      { 
        level: 'Intermediate',
        title: 'Core Silicon Engineering', 
        desc: 'Deep dive into RTL design and verification methodologies.',
        milestones: ['Advanced RTL Coding Styles', 'Static Timing Analysis (STA)', 'Synthesis & Gate-Level Simulation', 'SystemVerilog for Design'],
        companies: ['NVIDIA', 'Apple', 'Broadcom', 'Samsung', 'Marvell', 'Cisco', 'Juniper', 'Synopsys', 'Cadence', 'Western Digital'],
        resources: [
          { title: 'ASIC Design Flow (Coursera)', link: 'https://www.coursera.org/specializations/asic-design-flow', type: 'course' },
          { title: 'STA for Beginners (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'Advanced RTL Design (Udemy)', link: 'https://www.udemy.com/course/advanced-rtl-design-and-synthesis/', type: 'course' },
          { title: 'SystemVerilog for Design (YT)', link: 'https://www.youtube.com/playlist?list=PLuv3XfM_35m1wT_8E8U1sK_S6W8A_Ff8X', type: 'video' },
          { title: 'Synthesis Deep Dive', link: 'https://nptel.ac.in/courses/106105161', type: 'course' },
          { title: 'RISC-V Subset Core', link: 'https://github.com/chipsalliance/Cores-VeeR-EL2', type: 'project' },
          { title: 'DDR3 Controller Verilog', link: 'https://github.com/alexforencich/verilog-ddr3', type: 'project' },
          { title: 'SPI/I2C Protocol Master', link: 'https://github.com/topics/spi-master', type: 'project' },
          { title: 'Multi-cycle Multiplier', link: 'https://github.com/topics/multi-cycle-multiplier', type: 'project' },
          { title: 'Cache Controller Design', link: 'https://github.com/topics/cache-controller', type: 'project' }
        ]
      },
      { 
        level: 'Advanced',
        title: 'Advanced Protocols', 
        desc: 'Professional-grade verification and physical design flows.',
        milestones: ['UVM (Universal Verification Methodology)', 'Logic Equivalence Checking', 'DFT (Design for Test) Insertion', 'Physical Design (P&R)'],
        companies: ['Qualcomm', 'Intel', 'Apple', 'NVIDIA', 'Synopsys', 'Cadence', 'Arm', 'MediaTek', 'Broadcom', 'AMD'],
        resources: [
          { title: 'UVM Academy', link: 'https://verificationacademy.com/sessions/uvm-fundamentals', type: 'course' },
          { title: 'Physical Design Flow (YT)', link: 'https://www.youtube.com/playlist?list=PLuv3XfM_35m1wT_8E8U1sK_S6W8A_Ff8X', type: 'video' },
          { title: 'SystemVerilog Assertions (SVA)', link: 'https://www.udemy.com/course/systemverilog-assertions-mastery/', type: 'course' },
          { title: 'DFT Insertion Guide', link: 'https://www.youtube.com/watch?v=JmS_pG-3yY8', type: 'video' },
          { title: 'ASIC Physical Design (edX)', link: 'https://www.edx.org/course/vlsi-physical-design', type: 'course' },
          { title: 'OpenLane VLSI Flow', link: 'https://github.com/The-OpenROAD-Project/OpenLane', type: 'project' },
          { title: 'UVM Testbench for UART', link: 'https://github.com/topics/uvm-testbench', type: 'project' },
          { title: 'DFT-Ready RTL Core', link: 'https://github.com/topics/dft-insertion', type: 'project' },
          { title: 'Logic Equivalence Check Scrip', link: 'https://github.com/topics/formal-verification', type: 'project' },
          { title: 'P&R Scripts for Sky130', link: 'https://github.com/google/skywater-pdk', type: 'project' }
        ]
      },
      { 
        level: 'Expert',
        title: 'Matrix Mastery', 
        desc: 'Leading tape-outs and post-silicon architectural strategy.',
        milestones: ['Tape-out Management (GDSII)', 'Post-Silicon Validation', 'High-Speed Analog/Mixed-Signal Integration', 'System-on-Chip (SoC) Architecture'],
        companies: ['Tesla', 'Google (TPU)', 'Amazon (Graviton)', 'Meta', 'IBM', 'Microsoft (Azure Silicon)', 'SpaceX', 'Waymo', 'Cruise', 'Tesla Bot'],
        resources: [
          { title: 'Advanced SoC Architecture', link: 'https://www.arm.com/resources/education/higher-education/curriculum/soc-design', type: 'course' },
          { title: 'Tape-out Checklist (YT)', link: 'https://www.youtube.com/watch?v=JmS_pG-3yY8', type: 'video' },
          { title: 'Post-Silicon Validation (edX)', link: 'https://www.edx.org/course/post-silicon-validation', type: 'course' },
          { title: 'High-Speed SerDes Design', link: 'https://www.udemy.com/course/high-speed-serdes-design/', type: 'course' },
          { title: 'SoC System Management', link: 'https://www.youtube.com/watch?v=8pA8lU9j3iU', type: 'video' },
          { title: 'SkyWater 130nm PDK', link: 'https://github.com/google/skywater-pdk', type: 'project' },
          { title: 'Full SoC Verilog Design', link: 'https://github.com/efabless/caravel', type: 'project' },
          { title: 'Post-Silicon Debugging Framework', link: 'https://github.com/topics/post-silicon-validation', type: 'project' },
          { title: 'High-Speed SerDes RTL', link: 'https://github.com/alexforencich/verilog-pcie', type: 'project' },
          { title: 'Analog Mixed-Signal Integration', link: 'https://github.com/The-OpenROAD-Project/OpenROAD', type: 'project' }
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
        companies: ['STMicroelectronics', 'NXP', 'Microchip', 'Renesas', 'TI', 'Nordic Semi', 'Silicon Labs', 'Infineon', 'Broadcom', 'Qualcomm'],
        resources: [
          { title: 'Embedded Systems (edX)', link: 'https://www.edx.org/course/embedded-systems-shape-the-world-microcontroller-input-output', type: 'course' },
          { title: 'FastBit Embedded C (YT)', link: 'https://www.youtube.com/@FastBitEmbeddedBrainAcademy', type: 'video' },
          { title: 'C for Embedded (Coursera)', link: 'https://www.coursera.org/learn/introduction-embedded-systems', type: 'course' },
          { title: 'MCU Internals (YT)', link: 'https://www.youtube.com/playlist?list=PL6B65D4665BA1D15C', type: 'video' },
          { title: 'Embedded C++ Mastery', link: 'https://www.udemy.com/course/embedded-cpp/', type: 'course' },
          { title: 'STM32 GPIO Driver', link: 'https://github.com/STMicroelectronics/STM32CubeF4', type: 'project' },
          { title: 'Bare-Metal UART Driver', link: 'https://github.com/topics/uart-driver', type: 'project' },
          { title: 'I2C EEPROM Interfacing', link: 'https://github.com/topics/i2c-eeprom', type: 'project' },
          { title: 'ADC Data Logger', link: 'https://github.com/topics/adc-data-logger', type: 'project' },
          { title: 'PWM Motor Controller', link: 'https://github.com/topics/pwm-motor-control', type: 'project' }
        ]
      },
      { 
        level: 'Intermediate',
        title: 'Core Synchronization', 
        desc: 'Real-time operating systems and multi-threaded architecture.',
        milestones: ['RTOS Fundamentals (FreeRTOS/Zephyr)', 'Interrupt Handling & Priority', 'Memory Management & DMA', 'Task Scheduling & Semaphores'],
        companies: ['Bosch', 'Continental', 'Valeo', 'Garmin', 'Honeywell', 'Rockwell Automation', 'General Electric', 'Siemens', 'ABB', 'Schneider Electric'],
        resources: [
          { title: 'FreeRTOS Official Guide', link: 'https://www.freertos.org/Documentation/RTOS_book.html', type: 'course' },
          { title: 'RTOS Concepts (YT)', link: 'https://www.youtube.com/watch?v=F321087yYy4', type: 'video' },
          { title: 'Real-Time Systems (Coursera)', link: 'https://www.coursera.org/learn/real-time-systems', type: 'course' },
          { title: 'Interrupt Handling (YT)', link: 'https://www.youtube.com/watch?v=F321087yYy4', type: 'video' },
          { title: 'DMA Controllers Deep Dive', link: 'https://www.udemy.com/course/mastering-dma-controllers/', type: 'course' },
          { title: 'Zephyr Project RTOS', link: 'https://github.com/zephyrproject-rtos/zephyr', type: 'project' },
          { title: 'FreeRTOS Task Scheduler', link: 'https://github.com/FreeRTOS/FreeRTOS', type: 'project' },
          { title: 'RTOS-based Smart Watch', link: 'https://github.com/topics/rtos-smartwatch', type: 'project' },
          { title: 'Multi-threaded Sensor Hub', link: 'https://github.com/topics/sensor-hub', type: 'project' },
          { title: 'DMA-based Audio Player', link: 'https://github.com/topics/dma-audio-player', type: 'project' }
        ]
      },
      { 
        level: 'Advanced',
        title: 'Professional Protocols', 
        desc: 'Advanced communication and security architectures.',
        milestones: ['TCP/IP Stack Integration', 'CAN/LIN Bus for Automotive', 'USB & BLE Protocol Stacks', 'Secure Boot & Encryption'],
        companies: ['Tesla', 'Waymo', 'Apple', 'NVIDIA', 'Qualcomm', 'Intel', 'Amazon Robotics', 'Bosch', 'Continental', 'ZF Group'],
        resources: [
          { title: 'Automotive Security (Coursera)', link: 'https://www.coursera.org/learn/automotive-security-intro', type: 'course' },
          { title: 'BLE Protocol Stack (YT)', link: 'https://www.youtube.com/watch?v=XhIInS8E_1M', type: 'video' },
          { title: 'TCP/IP for Embedded (edX)', link: 'https://www.edx.org/course/tcp-ip-for-embedded-systems', type: 'course' },
          { title: 'USB Protocol Deep Dive (YT)', link: 'https://www.youtube.com/watch?v=XhIInS8E_1M', type: 'video' },
          { title: 'Embedded Security (Udemy)', link: 'https://www.udemy.com/course/embedded-security-boot-camps/', type: 'course' },
          { title: 'OpenSource CAN Stack', link: 'https://github.com/linux-can/can-utils', type: 'project' },
          { title: 'BLE Heart Rate Monitor', link: 'https://github.com/topics/ble-heart-rate-monitor', type: 'project' },
          { title: 'Embedded TCP/IP Server', link: 'https://github.com/lwip-tcpip/lwip', type: 'project' },
          { title: 'Secure Boot Implementation', link: 'https://github.com/mcu-tools/mcuboot', type: 'project' },
          { title: 'USB CDC Device Class', link: 'https://github.com/hathach/tinyusb', type: 'project' }
        ]
      },
      { 
        level: 'Expert',
        title: 'System Mastery', 
        desc: 'Architecting large-scale embedded ecosystems.',
        milestones: ['Embedded Linux & Kernel Hacking', 'Complex RTOS Optimization', 'High-Level Hardware Abstraction Layers', 'Safety-Critical System Design'],
        companies: ['Amazon Robotics', 'Google Home', 'SpaceX', 'Lockheed Martin', 'Airbus', 'NASA', 'BMW', 'Volkswagen', 'Toyota', 'Mercedes-Benz'],
        resources: [
          { title: 'Linux Kernel Development', link: 'https://training.linuxfoundation.org/training/linux-kernel-internals-and-development/', type: 'course' },
          { title: 'Embedded Linux (YT)', link: 'https://www.youtube.com/playlist?list=PL66_Bbe8S_v5l60aK0q3_W2F0K8Lq5i5T', type: 'video' },
          { title: 'Safety-Critical Systems (edX)', link: 'https://www.edx.org/course/safety-critical-systems', type: 'course' },
          { title: 'Kernel Hacking Tips (YT)', link: 'https://www.youtube.com/playlist?list=PL66_Bbe8S_v5l60aK0q3_W2F0K8Lq5i5T', type: 'video' },
          { title: 'HAL Architecture Mastery', link: 'https://www.udemy.com/course/mastering-hardware-abstraction-layers/', type: 'course' },
          { title: 'Yocto Project', link: 'https://github.com/yoctoproject/poky', type: 'project' },
          { title: 'Linux Kernel Driver', link: 'https://github.com/topics/linux-kernel-driver', type: 'project' },
          { title: 'Safety-Critical Flight Controller', link: 'https://github.com/PX4/PX4-Autopilot', type: 'project' },
          { title: 'HAL for ARM Cortex-M', link: 'https://github.com/STMicroelectronics/stm32cube-common', type: 'project' },
          { title: 'Kernel-based Virtual Machine', link: 'https://github.com/kvm-riscv/linux', type: 'project' }
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
        companies: ['Google', 'NVIDIA', 'Intel', 'Microsoft', 'AWS', 'Meta', 'Tesla', 'Apple', 'IBM', 'AMD'],
        resources: [
          { title: 'Math for ML (Coursera)', link: 'https://www.coursera.org/specializations/mathematics-machine-learning', type: 'course' },
          { title: 'PyTorch Basics (YT)', link: 'https://www.youtube.com/watch?v=V_xro1bcAuA', type: 'video' },
          { title: 'Linear Algebra (MIT OCW)', link: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', type: 'course' },
          { title: 'Tensor Ops Mastery (YT)', link: 'https://www.youtube.com/watch?v=V_xro1bcAuA', type: 'video' },
          { title: 'C++ for AI (Udemy)', link: 'https://www.udemy.com/course/cpp-deep-learning/', type: 'course' },
          { title: 'TFLite Micro', link: 'https://github.com/tensorflow/tflite-micro', type: 'project' },
          { title: 'Python Tensor Lib', link: 'https://github.com/numpy/numpy', type: 'project' },
          { title: 'Simple Neural Net in C++', link: 'https://github.com/topics/neural-network-cpp', type: 'project' },
          { title: 'Linear Algebra Solver', link: 'https://github.com/topics/linear-algebra-solver', type: 'project' },
          { title: 'Basic Optimizer Design', link: 'https://github.com/topics/optimization-algorithms', type: 'project' }
        ]
      },
      { 
        level: 'Intermediate',
        title: 'Accelerator Core', 
        desc: 'Architecting TPU/NPU.', 
        milestones: ['Systolic Arrays', 'Memory Hierarchies', 'Quantization'],
        companies: ['NVIDIA', 'Graphcore', 'Groq', 'Cerebras', 'SambaNova', 'Tenstorrent', 'Mythic', 'Untether AI', 'Habana Labs', 'Xilinx'],
        resources: [
          { title: 'AI Accelerators (Andreas Moshovos)', link: 'https://www.youtube.com/@AndreasMoshovos', type: 'video' },
          { title: 'Quantization Theory (Arxiv)', link: 'https://arxiv.org/abs/1712.05877', type: 'course' },
          { title: 'TPU Architecture (YT)', link: 'https://www.youtube.com/watch?v=8pA8lU9j3iU', type: 'video' },
          { title: 'Accelerator Design (Coursera)', link: 'https://www.coursera.org/learn/ai-accelerators', type: 'course' },
          { title: 'Memory Hierarchies Mastery', link: 'https://www.udemy.com/course/computer-architecture-memory/', type: 'course' },
          { title: 'Gemmini Accelerator', link: 'https://github.com/ucb-bar/gemmini', type: 'project' },
          { title: 'Verilog Systolic Array', link: 'https://github.com/topics/systolic-array', type: 'project' },
          { title: 'Quantization Toolkit', link: 'https://github.com/google/model-optimization', type: 'project' },
          { title: 'NPU RTL Subset', link: 'https://github.com/topics/npu-architecture', type: 'project' },
          { title: 'Custom Cache for AI', link: 'https://github.com/topics/ai-cache', type: 'project' }
        ]
      },
      { 
        level: 'Advanced',
        title: 'Edge Deployment', 
        desc: 'Optimization for power.', 
        milestones: ['TFLite', 'ONNX', 'TVM Compiler'],
        companies: ['Apple', 'Qualcomm', 'Samsung', 'MediaTek', 'Huawei', 'Xiaomi', 'Sony', 'Panasonic', 'Bosch', 'Tesla'],
        resources: [
          { title: 'Edge AI (Coursera)', link: 'https://www.coursera.org/learn/edge-ai-introduction', type: 'course' },
          { title: 'TVM Introduction (YT)', link: 'https://www.youtube.com/watch?v=L9Yw6VjOshM', type: 'video' },
          { title: 'ONNX Deep Dive (YT)', link: 'https://www.youtube.com/watch?v=L9Yw6VjOshM', type: 'video' },
          { title: 'TFLite Optimization', link: 'https://www.tensorflow.org/lite/performance/model_optimization', type: 'course' },
          { title: 'Edge Deployment Mastery', link: 'https://www.udemy.com/course/edge-ai-deployment/', type: 'course' },
          { title: 'Apache TVM', link: 'https://github.com/apache/tvm', type: 'project' },
          { title: 'TFLite Face Detection', link: 'https://github.com/tensorflow/examples/tree/master/lite/examples/face_detection', type: 'project' },
          { title: 'ONNX Runtime Edge', link: 'https://github.com/microsoft/onnxruntime', type: 'project' },
          { title: 'Power-Efficient CNN', link: 'https://github.com/topics/power-efficient-cnn', type: 'project' },
          { title: 'Edge Inference Engine', link: 'https://github.com/topics/edge-inference', type: 'project' }
        ]
      },
      { 
        level: 'Expert',
        title: 'Silicon Mastery', 
        desc: 'AI Chip Design.', 
        milestones: ['Hardware/Software Co-design', 'Custom Accelerators', 'Tape-out'],
        companies: ['OpenAI', 'Anthropic', 'Tenstorrent', 'Microsoft', 'AWS', 'Google (TPU Team)', 'NVIDIA (H100 Team)', 'Apple (Silicon Team)', 'Tesla (Dojo Team)', 'IBM (Research)'],
        resources: [
          { title: 'Hardware/Software Co-design (edX)', link: 'https://www.edx.org/course/hardware-software-co-design', type: 'course' },
          { title: 'Chip Design for AI (YT)', link: 'https://www.youtube.com/watch?v=8pA8lU9j3iU', type: 'video' },
          { title: 'Advanced Silicon (YT)', link: 'https://www.youtube.com/watch?v=8pA8lU9j3iU', type: 'video' },
          { title: 'HW/SW Co-design Mastery', link: 'https://www.udemy.com/course/hw-sw-co-design/', type: 'course' },
          { title: 'Silicon Tape-out Flow', link: 'https://www.youtube.com/watch?v=JmS_pG-3yY8', type: 'video' },
          { title: 'Verilog TPU', link: 'https://github.com/leandromoreira/verilog-tpu', type: 'project' },
          { title: 'Custom AI Accelerator', link: 'https://github.com/topics/ai-accelerator-design', type: 'project' },
          { title: 'HW/SW Interface Lib', link: 'https://github.com/topics/hw-sw-co-design', type: 'project' },
          { title: 'Tape-out Scripts for NPU', link: 'https://github.com/The-OpenROAD-Project/OpenLane', type: 'project' },
          { title: 'AI Silicon Post-Silicon', link: 'https://github.com/topics/post-silicon-validation', type: 'project' }
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
        companies: ['Ericsson', 'Nokia', 'Samsung', 'Qualcomm', 'Huawei', 'ZTE', 'Broadcom', 'Marvell', 'Intel', 'Apple'],
        resources: [
          { title: 'NPTEL: DSP', link: 'https://nptel.ac.in/courses/117102060', type: 'course' },
          { title: 'RF Basics (YT)', link: 'https://www.youtube.com/watch?v=H7yvY9O2n5o', type: 'video' },
          { title: 'Modulation Theory (Coursera)', link: 'https://www.coursera.org/learn/digital-communications-1', type: 'course' },
          { title: 'Python for DSP (YT)', link: 'https://www.youtube.com/playlist?list=PLuv3XfM_35m0O2OqH8F_L6fT3_8_L6fT3', type: 'video' },
          { title: 'Electromagnetics Mastery', link: 'https://www.edx.org/course/electromagnetics-part-1', type: 'course' },
          { title: 'GNU Radio', link: 'https://github.com/gnuradio/gnuradio', type: 'project' },
          { title: 'Python DSP Library', link: 'https://github.com/scipy/scipy.signal', type: 'project' },
          { title: 'AM/FM Modulation Project', link: 'https://github.com/topics/am-fm-modulation', type: 'project' },
          { title: 'Basic SDR Receiver', link: 'https://github.com/topics/sdr-receiver', type: 'project' },
          { title: 'Signal Analyzer Tool', link: 'https://github.com/topics/signal-analyzer', type: 'project' }
        ]
      },
      { 
        level: 'Intermediate',
        title: 'Core Protocols', 
        desc: '4G/5G Architecture.', 
        milestones: ['L1/L2/L3 Layers', 'MIMO Tech', 'Beamforming', 'OFDM Theory'],
        companies: ['Qualcomm', 'Intel', 'Apple', 'Broadcom', 'MediaTek', 'Skyworks', 'Qorvo', 'Analog Devices', 'Keysight', 'Rohde & Schwarz'],
        resources: [
          { title: '5G Training (Nokia)', link: 'https://www.nokia.com/networks/5g/training/', type: 'course' },
          { title: '5G Physical Layer (YT)', link: 'https://www.youtube.com/watch?v=78YwN6Z_uYs', type: 'video' },
          { title: 'MIMO Tech Mastery', link: 'https://www.udemy.com/course/mimo-technology-wireless/', type: 'course' },
          { title: 'OFDM Theory (Coursera)', link: 'https://www.coursera.org/learn/digital-communications-2', type: 'course' },
          { title: 'Beamforming Basics (YT)', link: 'https://www.youtube.com/watch?v=9_N678n_0Y8', type: 'video' },
          { title: 'srsRAN', link: 'https://github.com/srsran/srsRAN_4G', type: 'project' },
          { title: 'OpenMIMO', link: 'https://github.com/topics/mimo-tech', type: 'project' },
          { title: 'Beamforming Simulation', link: 'https://github.com/topics/beamforming', type: 'project' },
          { title: 'OFDM Verilog Core', link: 'https://github.com/topics/ofdm-verilog', type: 'project' },
          { title: 'L1/L2 MAC Layer Implementation', link: 'https://github.com/topics/mac-layer', type: 'project' }
        ]
      },
      { 
        level: 'Advanced',
        title: 'Network Design', 
        desc: 'O-RAN & Core Ops.', 
        milestones: ['Open5GS', 'Cloud RAN', 'Network Slicing', 'MEC Architecture'],
        companies: ['Reliance Jio', 'Airtel', 'Mavenir', 'Parallel Wireless', 'Altiostar', 'Rakuten', 'Vodafone', 'Orange', 'T-Mobile', 'Verizon'],
        resources: [
          { title: 'Open5GS Tutorial', link: 'https://open5gs.org/open5gs/docs/guide/01-quickstart/', type: 'course' },
          { title: 'O-RAN Introduction (YT)', link: 'https://www.youtube.com/watch?v=9_N678n_0Y8', type: 'video' },
          { title: 'Cloud RAN Mastery', link: 'https://www.udemy.com/course/cloud-ran-architecture/', type: 'course' },
          { title: 'Network Slicing (Coursera)', link: 'https://www.coursera.org/learn/5g-network-slicing', type: 'course' },
          { title: 'MEC Architecture (YT)', link: 'https://www.youtube.com/watch?v=9_N678n_0Y8', type: 'video' },
          { title: 'Open5GS Core', link: 'https://github.com/open5gs/open5gs', type: 'project' },
          { title: 'O-RAN SC Repo', link: 'https://github.com/o-ran-sc', type: 'project' },
          { title: 'Network Slicing Simulation', link: 'https://github.com/topics/network-slicing', type: 'project' },
          { title: 'MEC Edge App', link: 'https://github.com/topics/mec-edge', type: 'project' },
          { title: '5G Core Monitoring Tool', link: 'https://github.com/topics/5g-core', type: 'project' }
        ]
      },
      { 
        level: 'Expert',
        title: 'Next-Gen Mastery', 
        desc: '6G & Beyond.', 
        milestones: ['Spectrum Management', 'Satellite Comm', 'Quantum Comm', 'Massive MIMO Design'],
        companies: ['SpaceX (Starlink)', 'NASA', 'ISRO', 'OneWeb', 'Amazon (Kuiper)', 'Northrop Grumman', 'Boeing', 'Lockheed Martin', 'Thales', 'Ericsson (Research)'],
        resources: [
          { title: '6G Vision (IEEE)', link: 'https://futurenetworks.ieee.org/vision/6g', type: 'course' },
          { title: 'Quantum Comm (YT)', link: 'https://www.youtube.com/watch?v=1rYvWc6p47k', type: 'video' },
          { title: 'Satellite Comms (Coursera)', link: 'https://www.coursera.org/learn/satellite-communications', type: 'course' },
          { title: 'Massive MIMO (YT)', link: 'https://www.youtube.com/watch?v=1rYvWc6p47k', type: 'video' },
          { title: 'Quantum Networking Mastery', link: 'https://www.udemy.com/course/quantum-networking/', type: 'course' },
          { title: 'Satellite Comms Lib', link: 'https://github.com/nasa/satellite-comms', type: 'project' },
          { title: 'Quantum Key Distribution', link: 'https://github.com/topics/qkd', type: 'project' },
          { title: '6G Spectrum Model', link: 'https://github.com/topics/6g-wireless', type: 'project' },
          { title: 'Massive MIMO Simulator', link: 'https://github.com/topics/massive-mimo', type: 'project' },
          { title: 'Space Networking Protocol', link: 'https://github.com/topics/space-networking', type: 'project' }
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
        companies: ['Arduino', 'DFRobot', 'Adafruit', 'SparkFun', 'Makeblock', 'VEX Robotics', 'Lego Education', 'DJI', 'Parrot', 'Skydio'],
        resources: [
          { title: 'Modern Robotics (Coursera)', link: 'https://www.coursera.org/specializations/modernrobotics', type: 'course' },
          { title: 'Robotics 101 (YT)', link: 'https://www.youtube.com/watch?v=Lq1iC7YqLz8', type: 'video' },
          { title: 'Arduino Robotics (Udemy)', link: 'https://www.udemy.com/course/arduino-robotics/', type: 'course' },
          { title: 'Kinematics Mastery (YT)', link: 'https://www.youtube.com/watch?v=Lq1iC7YqLz8', type: 'video' },
          { title: 'Python for Robotics (edX)', link: 'https://www.edx.org/course/python-for-robotics', type: 'course' },
          { title: 'Arduino Robotics Code', link: 'https://github.com/arduino/Arduino', type: 'project' },
          { title: 'Basic 2WD Robot', link: 'https://github.com/topics/2wd-robot', type: 'project' },
          { title: 'PID Controller Implementation', link: 'https://github.com/topics/pid-controller', type: 'project' },
          { title: 'Robot Kinematics Lib', link: 'https://github.com/topics/robot-kinematics', type: 'project' },
          { title: 'Encoder Feedback System', link: 'https://github.com/topics/encoder-feedback', type: 'project' }
        ]
      },
      { 
        level: 'Intermediate',
        title: 'Neural Core', 
        desc: 'Robot Operating System (ROS).', 
        milestones: ['ROS 2 Fundamentals', 'Sensor Fusion (IMU/LiDAR)', 'Path Planning Algorithms', 'Gazebo Simulation'],
        companies: ['Amazon Robotics', 'Locus Robotics', 'Fanuc', 'ABB', 'Yaskawa', 'Kuka', 'Universal Robots', 'Clearpath Robotics', 'Fetch Robotics', 'Boston Dynamics'],
        resources: [
          { title: 'ROS 2 Tutorials', link: 'https://docs.ros.org/en/foxy/Tutorials.html', type: 'course' },
          { title: 'ROS 2 Crash Course (YT)', link: 'https://www.youtube.com/watch?v=4pPByfS8A8k', type: 'video' },
          { title: 'Sensor Fusion (Udemy)', link: 'https://www.udemy.com/course/sensor-fusion-self-driving-cars/', type: 'course' },
          { title: 'Path Planning Mastery (YT)', link: 'https://www.youtube.com/watch?v=4pPByfS8A8k', type: 'video' },
          { title: 'Gazebo Simulation (edX)', link: 'https://www.edx.org/course/robot-simulation-with-gazebo', type: 'course' },
          { title: 'ROS 2 Navigation', link: 'https://github.com/ros-planning/navigation2', type: 'project' },
          { title: 'IMU Fusion Code', link: 'https://github.com/topics/sensor-fusion', type: 'project' },
          { title: 'A* Path Planning', link: 'https://github.com/topics/path-planning', type: 'project' },
          { title: 'Gazebo World Model', link: 'https://github.com/topics/gazebo-simulation', type: 'project' },
          { title: 'Lidar SLAM Implementation', link: 'https://github.com/topics/lidar-slam', type: 'project' }
        ]
      },
      { 
        level: 'Advanced',
        title: 'Industrial Depth', 
        desc: 'Automation & Precision.', 
        milestones: ['Computer Vision (OpenCV)', 'SLAM Navigation', 'PLC & Industrial Protocols', 'Control Systems Theory'],
        companies: ['Intuitive Surgical', 'Boston Dynamics', 'Tesla (Optimus)', 'Kuka', 'Siemens', 'Rockwell', 'Mitsubishi Electric', 'Omron', 'Keyence', 'Fanuc'],
        resources: [
          { title: 'SLAM Tutorials', link: 'https://github.com/RainerKuemmerle/g2o', type: 'project' },
          { title: 'OpenCV for Robotics (YT)', link: 'https://www.youtube.com/watch?v=kdLM6AodNYQ', type: 'video' },
          { title: 'PLC Programming (Udemy)', link: 'https://www.udemy.com/course/plc-programming-from-scratch/', type: 'course' },
          { title: 'Control Systems (Coursera)', link: 'https://www.coursera.org/learn/control-systems', type: 'course' },
          { title: 'Industrial Protocols (YT)', link: 'https://www.youtube.com/watch?v=kdLM6AodNYQ', type: 'video' },
          { title: 'OpenCV Lib', link: 'https://github.com/opencv/opencv', type: 'project' },
          { title: 'Visual SLAM Implementation', link: 'https://github.com/topics/visual-slam', type: 'project' },
          { title: 'Modbus TCP Client', link: 'https://github.com/topics/modbus-tcp', type: 'project' },
          { title: 'Object Tracking Core', link: 'https://github.com/topics/object-tracking', type: 'project' },
          { title: 'Industrial Robot Control', link: 'https://github.com/topics/industrial-robot', type: 'project' }
        ]
      },
      { 
        level: 'Expert',
        title: 'Autonomy Mastery', 
        desc: 'Human-Robot Interaction.', 
        milestones: ['Reinforcement Learning', 'Swarm Robotics', 'Space/Medical Robotics', 'Edge AI for Autonomy'],
        companies: ['NASA JPL', 'Neuralink', 'Tesla', 'Google DeepMind', 'SpaceX', 'Intuitive Surgical', 'Johnson & Johnson Robotics', 'Stryker', 'Medtronic', 'Toyota Research'],
        resources: [
          { title: 'RL for Robotics (Coursera)', link: 'https://www.coursera.org/learn/robotics-capstone', type: 'course' },
          { title: 'Swarm Robotics (YT)', link: 'https://www.youtube.com/watch?v=d_u_LpM_u_k', type: 'video' },
          { title: 'Space Robotics (edX)', link: 'https://www.edx.org/course/robotics-foundations-i-robot-mechanics', type: 'course' },
          { title: 'Medical Robotics (YT)', link: 'https://www.youtube.com/watch?v=d_u_LpM_u_k', type: 'video' },
          { title: 'Edge AI for Robots Mastery', link: 'https://www.udemy.com/course/edge-ai-robotics/', type: 'course' },
          { title: 'Gym-Robotics', link: 'https://github.com/openai/gym', type: 'project' },
          { title: 'Swarm Navigation Lib', link: 'https://github.com/topics/swarm-robotics', type: 'project' },
          { title: 'Deep RL for Motion', link: 'https://github.com/topics/reinforcement-learning-robotics', type: 'project' },
          { title: 'Medical Image Guidance', link: 'https://github.com/topics/medical-robotics', type: 'project' },
          { title: 'Autonomous Drone Swarm', link: 'https://github.com/topics/drone-swarm', type: 'project' }
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
        companies: ['Autodesk', 'Altium', 'Cadence', 'Siemens', 'Mentor Graphics', 'Zuken', 'Ansys', 'Molex', 'TE Connectivity', 'Foxconn'],
        resources: [
          { title: 'PCB Design for Beginners (Coursera)', link: 'https://www.coursera.org/learn/pcb-design-altium', type: 'course' },
          { title: 'Schematic Design (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'Intro to EDA Tools (edX)', link: 'https://www.edx.org/course/eda-tools-for-pcb-design', type: 'course' },
          { title: 'Component Selection Guide (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'Electronics Foundations (Udemy)', link: 'https://www.udemy.com/course/basic-electronics/', type: 'course' },
          { title: 'KiCad Source', link: 'https://github.com/KiCad/KiCad', type: 'project' },
          { title: 'Arduino Uno Clone PCB', link: 'https://github.com/topics/arduino-pcb', type: 'project' },
          { title: 'Open Hardware Schematics', link: 'https://github.com/ohwr', type: 'project' },
          { title: 'Footprint Design Lib', link: 'https://github.com/topics/pcb-footprints', type: 'project' },
          { title: 'Simple Power Supply PCB', link: 'https://github.com/topics/power-supply-pcb', type: 'project' }
        ]
      },
      { 
        level: 'Intermediate',
        title: 'Layout Core', 
        desc: 'Multi-layer PCB Design.', 
        milestones: ['Routing Techniques', 'Ground Plane Strategy', 'Power Integrity', 'DRC/ERC Checks'],
        companies: ['Apple', 'Microsoft', 'NVIDIA', 'Intel', 'HP', 'Dell', 'Lenovo', 'Cisco', 'Juniper', 'Qualcomm'],
        resources: [
          { title: 'Advanced PCB Layout (YT)', link: 'https://www.youtube.com/@PhilsLab', type: 'video' },
          { title: 'Signal Integrity Basics (edN)', link: 'https://www.edn.com/signal-integrity-basics/', type: 'course' },
          { title: 'Multi-layer PCB Design (Udemy)', link: 'https://www.udemy.com/course/pcb-design-with-altium/', type: 'course' },
          { title: 'Routing Mastery (YT)', link: 'https://www.youtube.com/@PhilsLab', type: 'video' },
          { title: 'Power Integrity Mastery (edX)', link: 'https://www.edx.org/course/power-integrity-for-digital-systems', type: 'course' },
          { title: 'Open Hardware Repository', link: 'https://github.com/ohwr', type: 'project' },
          { title: '4-Layer STM32 Board', link: 'https://github.com/topics/stm32-pcb', type: 'project' },
          { title: 'DDR3 Routing Project', link: 'https://github.com/topics/ddr-routing', type: 'project' },
          { title: 'High-Speed Signal Stackup', link: 'https://github.com/topics/pcb-stackup', type: 'project' },
          { title: 'Differential Pair Routing', link: 'https://github.com/topics/differential-pair', type: 'project' }
        ]
      },
      { 
        level: 'Advanced',
        title: 'Production Depth', 
        desc: 'Manufacturing & Reliability.', 
        milestones: ['High-Speed Design (HDMI/USB)', 'Signal Integrity (SI/PI)', 'Design for Mfg (DFM)', 'EMI/EMC Mitigation'],
        companies: ['Tesla', 'Bosch', 'Continental', 'Lockheed Martin', 'Northrop Grumman', 'Boeing', 'Airbus', 'Thales', 'General Dynamics', 'Raytheon'],
        resources: [
          { title: 'High-Speed Design Guide (TI)', link: 'https://www.ti.com/lit/an/scaa082/scaa082.pdf', type: 'course' },
          { title: 'EMI/EMC Mastery (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'Design for Mfg (Coursera)', link: 'https://www.coursera.org/learn/design-for-manufacturing', type: 'course' },
          { title: 'SI/PI Simulation (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'Reliability Engineering Mastery', link: 'https://www.udemy.com/course/reliability-engineering/', type: 'course' },
          { title: 'OpenRAM', link: 'https://github.com/VLSIDA/OpenRAM', type: 'project' },
          { title: 'HDMI High-Speed PCB', link: 'https://github.com/topics/hdmi-pcb', type: 'project' },
          { title: 'USB 3.0 Layout Project', link: 'https://github.com/topics/usb3-pcb', type: 'project' },
          { title: 'EMI Mitigation Filter', link: 'https://github.com/topics/emi-filter', type: 'project' },
          { title: 'DFM Checklist Script', link: 'https://github.com/topics/dfm-check', type: 'project' }
        ]
      },
      { 
        level: 'Expert',
        title: 'Product Mastery', 
        desc: 'Full Product Lifecycle.', 
        milestones: ['Mass Production (PCBA)', 'Hardware Certification (CE/FCC)', 'Advanced RF Layout', 'Thermal Management'],
        companies: ['SpaceX', 'Blue Origin', 'Apple (iPhone Team)', 'Google Pixel', 'Tesla (HW Team)', 'Amazon (Lab126)', 'Meta (Reality Labs)', 'Microsoft (Surface Team)', 'IBM (Quantum)', 'NASA'],
        resources: [
          { title: 'Hardware Product Mgmt (Coursera)', link: 'https://www.coursera.org/specializations/product-management', type: 'course' },
          { title: 'Mass Production Flow (YT)', link: 'https://www.youtube.com/watch?v=8pA8lU9j3iU', type: 'video' },
          { title: 'Certification Guide (FCC/CE)', link: 'https://www.fcc.gov/engineering-technology/laboratory-division/general/equipment-authorization', type: 'course' },
          { title: 'Thermal Analysis (YT)', link: 'https://www.youtube.com/watch?v=8pA8lU9j3iU', type: 'video' },
          { title: 'RF PCB Layout Mastery', link: 'https://www.udemy.com/course/rf-pcb-design/', type: 'course' },
          { title: 'Thermal Analysis Lib', link: 'https://github.com/thermal-management/thermal-lib', type: 'project' },
          { title: 'Full Mass Production Repo', link: 'https://github.com/topics/mass-production', type: 'project' },
          { title: 'Certification Test Suite', link: 'https://github.com/topics/hardware-certification', type: 'project' },
          { title: 'Advanced RF Antenna PCB', link: 'https://github.com/topics/antenna-design', type: 'project' },
          { title: 'Product Lifecycle Tool', link: 'https://github.com/topics/product-lifecycle-management', type: 'project' }
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
        companies: ['Espressif', 'Particle', 'Arduino', 'Adafruit', 'Lattice Semi', 'Silicon Labs', 'Nordic Semi', 'Microchip', 'TI', 'STMicroelectronics'],
        resources: [
          { title: 'IoT for Beginners (Microsoft)', link: 'https://github.com/microsoft/IoT-For-Beginners', type: 'project' },
          { title: 'MQTT Basics (YT)', link: 'https://www.youtube.com/watch?v=XhIInS8E_1M', type: 'video' },
          { title: 'IoT Specialization (Coursera)', link: 'https://www.coursera.org/specializations/iot', type: 'course' },
          { title: 'HTTP for IoT (YT)', link: 'https://www.youtube.com/watch?v=XhIInS8E_1M', type: 'video' },
          { title: 'Sensor Interfacing Mastery', link: 'https://www.udemy.com/course/iot-sensor-interfacing/', type: 'course' },
          { title: 'ESP32 MQTT Client', link: 'https://github.com/espressif/esp-mqtt', type: 'project' },
          { title: 'Smart Home Hub Core', link: 'https://github.com/home-assistant/core', type: 'project' },
          { title: 'IoT Temperature Sensor', link: 'https://github.com/topics/iot-temperature', type: 'project' },
          { title: 'Basic IoT Dashboard', link: 'https://github.com/topics/iot-dashboard', type: 'project' },
          { title: 'ESP-IDF Sensor App', link: 'https://github.com/espressif/esp-idf/tree/master/examples/peripherals/sensor', type: 'project' }
        ]
      },
      { 
        level: 'Intermediate',
        title: 'Protocol Depth', 
        desc: 'Advanced networking.', 
        milestones: ['LoRaWAN/Zigbee/BLE', 'Security Protocols', 'Battery Optimization', 'Gateway Design'],
        companies: ['Silicon Labs', 'Nordic Semi', 'Semtech', 'Telit', 'Quectel', 'Sierra Wireless', 'Digi International', 'Advantech', 'Eurotech', 'U-blox'],
        resources: [
          { title: 'LoRaWAN Academy', link: 'https://lora-developers.semtech.com/build/lorawan-academy/', type: 'course' },
          { title: 'BLE Deep Dive (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'Wireless Protocols (edX)', link: 'https://www.edx.org/course/wireless-communications-and-connectivity', type: 'course' },
          { title: 'Gateway Design (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'Battery Optimization Mastery', link: 'https://www.udemy.com/course/iot-power-management/', type: 'course' },
          { title: 'The Things Network Source', link: 'https://github.com/TheThingsNetwork/lorawan-stack', type: 'project' },
          { title: 'BLE Gateway Implementation', link: 'https://github.com/topics/ble-gateway', type: 'project' },
          { title: 'Zigbee Bridge Code', link: 'https://github.com/topics/zigbee-bridge', type: 'project' },
          { title: 'Low Power IoT Node', link: 'https://github.com/topics/low-power-iot', type: 'project' },
          { title: 'Secure MQTT Client', link: 'https://github.com/topics/secure-mqtt', type: 'project' }
        ]
      },
      { 
        level: 'Advanced',
        title: 'Cloud Sync', 
        desc: 'Cloud data architectures.', 
        milestones: ['AWS/Azure IoT Hub', 'Node-RED & Dashboards', 'OTA Updates', 'Real-time Analytics'],
        companies: ['AWS IoT', 'Azure IoT', 'Google Cloud IoT', 'Salesforce', 'Oracle', 'SAP', 'IBM Watson IoT', 'Cisco Kinetic', 'Siemens MindSphere', 'PTC ThingWorx'],
        resources: [
          { title: 'AWS IoT Core Training', link: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/1041/iot-foundation-series', type: 'course' },
          { title: 'Node-RED Tutorial (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'Azure IoT Fundamentals (edX)', link: 'https://www.edx.org/course/microsoft-azure-iot-fundamentals', type: 'course' },
          { title: 'Real-time Analytics (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'OTA Updates Mastery', link: 'https://www.udemy.com/course/embedded-ota-updates/', type: 'course' },
          { title: 'ThingsBoard', link: 'https://github.com/thingsboard/thingsboard', type: 'project' },
          { title: 'Node-RED Dashboard App', link: 'https://github.com/node-red/node-red-dashboard', type: 'project' },
          { title: 'AWS IoT Python SDK', link: 'https://github.com/aws/aws-iot-device-sdk-python-v2', type: 'project' },
          { title: 'Azure IoT C SDK', link: 'https://github.com/Azure/azure-iot-sdk-c', type: 'project' },
          { title: 'OTA Update Server', link: 'https://github.com/topics/ota-server', type: 'project' }
        ]
      },
      { 
        level: 'Expert',
        title: 'Intelligence Mastery', 
        desc: 'Architecting Smart Systems.', 
        milestones: ['Edge Computing', 'Digital Twins', 'IoT Security Audit', 'Scalable Ecosystems'],
        companies: ['Siemens', 'GE Digital', 'Honeywell', 'Schneider Electric', 'Johnson Controls', 'Rockwell Automation', 'ABB', 'Emerson', 'Yokogawa', 'Mitsubishi Electric'],
        resources: [
          { title: 'Edge AI Specialization', link: 'https://www.coursera.org/specializations/edge-ai', type: 'course' },
          { title: 'IoT Security (YT)', link: 'https://www.youtube.com/watch?v=8pA8lU9j3iU', type: 'video' },
          { title: 'Digital Twin Foundations (edX)', link: 'https://www.edx.org/course/digital-twin-foundations', type: 'course' },
          { title: 'Scalable IoT (YT)', link: 'https://www.youtube.com/watch?v=8pA8lU9j3iU', type: 'video' },
          { title: 'IoT Audit Mastery', link: 'https://www.udemy.com/course/iot-security-audit/', type: 'course' },
          { title: 'EdgeX Foundry', link: 'https://github.com/edgexfoundry/edgex-go', type: 'project' },
          { title: 'Digital Twin Simulation', link: 'https://github.com/topics/digital-twin', type: 'project' },
          { title: 'IoT Security Framework', link: 'https://github.com/topics/iot-security', type: 'project' },
          { title: 'Kubernetes for Edge', link: 'https://github.com/kubeedge/kubeedge', type: 'project' },
          { title: 'Smart City Platform', link: 'https://github.com/Fiware/catalogue', type: 'project' }
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
        companies: ['TI', 'Analog Devices', 'Microchip', 'ON Semi', 'STMicroelectronics', 'NXP', 'Infineon', 'Renesas', 'Maxim Integrated', 'Skyworks'],
        resources: [
          { title: 'Behzad Razavi Electronics (YT)', link: 'https://www.youtube.com/@razavielectronics', type: 'video' },
          { title: 'Analog IC Design (Coursera)', link: 'https://www.coursera.org/learn/analog-ic-design', type: 'course' },
          { title: 'Circuit Theory (edX)', link: 'https://www.edx.org/course/circuits-and-electronics-1-basic-circuit-analysi', type: 'course' },
          { title: 'Op-Amp Design Mastery (YT)', link: 'https://www.youtube.com/@razavielectronics', type: 'video' },
          { title: 'Device Physics Mastery', link: 'https://www.udemy.com/course/semiconductor-physics/', type: 'course' },
          { title: 'Ngspice', link: 'https://github.com/ngspice/ngspice', type: 'project' },
          { title: 'Basic Op-Amp Circuit', link: 'https://github.com/topics/op-amp-design', type: 'project' },
          { title: 'BJT Current Mirror Project', link: 'https://github.com/topics/current-mirror', type: 'project' },
          { title: 'MOSFET Logic Gates', link: 'https://github.com/topics/mosfet-design', type: 'project' },
          { title: 'Analog Filter Simulator', link: 'https://github.com/topics/analog-filter', type: 'project' }
        ]
      },
      { 
        level: 'Intermediate',
        title: 'IC Architecture', 
        desc: 'Precision silicon design.', 
        milestones: ['Current Mirrors & References', 'Frequency Compensation', 'Noise Analysis', 'Layout Basics'],
        companies: ['Intel', 'Apple', 'Broadcom', 'Samsung', 'Qualcomm', 'NVIDIA', 'AMD', 'Marvell', 'Cisco', 'Synopsys'],
        resources: [
          { title: 'Layout for Beginners (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'Analog Layout Design (NPTEL)', link: 'https://nptel.ac.in/courses/117101105', type: 'course' },
          { title: 'Noise Analysis (edX)', link: 'https://www.edx.org/course/noise-in-analog-circuits', type: 'course' },
          { title: 'IC Architecture Mastery (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'Current References Mastery', link: 'https://www.udemy.com/course/analog-ic-design-intermediate/', type: 'course' },
          { title: 'Magic VLSI', link: 'https://github.com/RTimothyEdwards/magic', type: 'project' },
          { title: 'Bandgap Reference Design', link: 'https://github.com/topics/bandgap-reference', type: 'project' },
          { title: 'Custom Op-Amp Layout', link: 'https://github.com/topics/analog-layout', type: 'project' },
          { title: 'Frequency Compensator', link: 'https://github.com/topics/frequency-compensation', type: 'project' },
          { title: 'Analog Multiplier Core', link: 'https://github.com/topics/analog-multiplier', type: 'project' }
        ]
      },
      { 
        level: 'Advanced',
        title: 'Mixed-Signal Depth', 
        desc: 'ADC/DAC & High Speed.', 
        milestones: ['ADC/DAC Architectures', 'PLL/DLL Design', 'Switched Cap Circuits', 'ESD Protection'],
        companies: ['Qualcomm', 'NVIDIA', 'Synopsys', 'Cadence', 'Arm', 'MediaTek', 'Broadcom', 'Marvell', 'Intel', 'Apple'],
        resources: [
          { title: 'ADC/DAC Tutorials (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'Mixed Signal Design (Coursera)', link: 'https://www.coursera.org/learn/mixed-signal-design', type: 'course' },
          { title: 'PLL/DLL Mastery (edX)', link: 'https://www.edx.org/course/pll-design-and-analysis', type: 'course' },
          { title: 'ESD Protection (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'Switched Cap Mastery', link: 'https://www.udemy.com/course/switched-capacitor-circuits/', type: 'course' },
          { title: 'Xyce Simulator', link: 'https://github.com/Xyce/Xyce', type: 'project' },
          { title: 'SAR ADC Implementation', link: 'https://github.com/topics/sar-adc', type: 'project' },
          { title: 'PLL Control Loop Script', link: 'https://github.com/topics/pll-design', type: 'project' },
          { title: 'Sigma-Delta Modulator', link: 'https://github.com/topics/sigma-delta', type: 'project' },
          { title: 'ESD Protection Cells', link: 'https://github.com/topics/esd-protection', type: 'project' }
        ]
      },
      { 
        level: 'Expert',
        title: 'Silicon Mastery', 
        desc: 'High-end analog tape-out.', 
        milestones: ['SerDes Design', 'RFIC Architecture', 'Power Management ICs', 'Post-Layout Verification'],
        companies: ['TSMC', 'Intel Foundry', 'Skyworks', 'Qorvo', 'Broadcom', 'Qualcomm', 'Apple', 'NVIDIA', 'Samsung Foundry', 'GlobalFoundries'],
        resources: [
          { title: 'SerDes Design Flow (YT)', link: 'https://www.youtube.com/watch?v=8pA8lU9j3iU', type: 'video' },
          { title: 'RFIC Design (IEEE)', link: 'https://ieeexplore.ieee.org/courses/home', type: 'course' },
          { title: 'Advanced PMIC Mastery (edX)', link: 'https://www.edx.org/course/power-management-integrated-circuits', type: 'course' },
          { title: 'Post-Layout Verification (YT)', link: 'https://www.youtube.com/watch?v=8pA8lU9j3iU', type: 'video' },
          { title: 'SerDes Mastery', link: 'https://www.udemy.com/course/high-speed-serdes-design/', type: 'course' },
          { title: 'Openlane Analog Flow', link: 'https://github.com/The-OpenROAD-Project/OpenLane', type: 'project' },
          { title: 'RFIC LNA Design', link: 'https://github.com/topics/rfic-design', type: 'project' },
          { title: 'Buck Converter IC', link: 'https://github.com/topics/pmic-design', type: 'project' },
          { title: 'Analog Layout Verification', link: 'https://github.com/topics/analog-verification', type: 'project' },
          { title: 'SerDes RTL Core', link: 'https://github.com/topics/serdes-design', type: 'project' }
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
        companies: ['Bosch', 'Continental', 'Tata Motors', 'Mahindra', 'Maruti Suzuki', 'Hyundai', 'Toyota', 'Honda', 'Nissan', 'Ford'],
        resources: [
          { title: 'EV Foundations (Coursera)', link: 'https://www.coursera.org/learn/electric-vehicles', type: 'course' },
          { title: 'CAN Bus Basics (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'Auto C Programming (edX)', link: 'https://www.edx.org/course/c-programming-for-embedded-systems', type: 'course' },
          { title: 'BMS Basics (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'Automotive Foundations Mastery', link: 'https://www.udemy.com/course/automotive-systems-foundations/', type: 'course' },
          { title: 'OpenVehicle Monitoring', link: 'https://github.com/openvehicles/Open-Vehicle-Monitoring-System-3', type: 'project' },
          { title: 'CAN Bus Sniffer Code', link: 'https://github.com/linux-can/can-utils', type: 'project' },
          { title: 'Simple BMS Algorithm', link: 'https://github.com/topics/bms-algorithm', type: 'project' },
          { title: 'Automotive C Library', link: 'https://github.com/topics/automotive-c', type: 'project' },
          { title: 'Electric Motor Simulator', link: 'https://github.com/topics/motor-simulator', type: 'project' }
        ]
      },
      { 
        level: 'Intermediate',
        title: 'Core Power', 
        desc: 'Power electronics & control.', 
        milestones: ['Inverter/Converter Design', 'Motor Control Theory', 'Embedded C for ISO26262', 'Hardware-in-Loop (HiL)'],
        companies: ['Tesla', 'Rivian', 'Lucid', 'NIO', 'BYD', 'Xpeng', 'Polestar', 'Rimac', 'Porsche', 'Audi'],
        resources: [
          { title: 'Power Electronics (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'Motor Control Design (TI)', link: 'https://www.ti.com/video/series/motor-control-training-series.html', type: 'course' },
          { title: 'ISO26262 Mastery (edX)', link: 'https://www.edx.org/course/functional-safety-iso-26262', type: 'course' },
          { title: 'Inverter Design (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'HiL Testing Mastery', link: 'https://www.udemy.com/course/hil-testing-automotive/', type: 'course' },
          { title: 'VESC Motor Controller', link: 'https://github.com/vedderb/bldc', type: 'project' },
          { title: 'Custom EV Inverter RTL', link: 'https://github.com/topics/ev-inverter', type: 'project' },
          { title: 'ISO26262 Checker Tool', link: 'https://github.com/topics/iso26262', type: 'project' },
          { title: 'Motor Control Lib', link: 'https://github.com/topics/motor-control-library', type: 'project' },
          { title: 'HiL Simulation Environment', link: 'https://github.com/topics/hil-simulation', type: 'project' }
        ]
      },
      { 
        level: 'Advanced',
        title: 'Autonomous Depth', 
        desc: 'Sensors & Data Fusion.', 
        milestones: ['LiDAR/Radar/Vision', 'ADAS Architecture', 'AUTOSAR Basics', 'Vehicle Security'],
        companies: ['Waymo', 'Cruise', 'Mobileye', 'Zoox', 'Aurora', 'TuSimple', 'Motional', 'Apple', 'NVIDIA', 'Intel'],
        resources: [
          { title: 'Intro to Self-Driving (Udacity)', link: 'https://www.udacity.com/course/intro-to-self-driving-cars--ud191', type: 'course' },
          { title: 'LiDAR Processing (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'ADAS Foundations (Coursera)', link: 'https://www.coursera.org/learn/self-driving-cars', type: 'course' },
          { title: 'AUTOSAR Basics (YT)', link: 'https://www.youtube.com/watch?v=kYI9C-R_5qY', type: 'video' },
          { title: 'Vehicle Security Mastery', link: 'https://www.udemy.com/course/automotive-cybersecurity/', type: 'course' },
          { title: 'Apollo Self-Driving', link: 'https://github.com/ApolloAuto/apollo', type: 'project' },
          { title: 'LiDAR Data Fusion Code', link: 'https://github.com/topics/lidar-fusion', type: 'project' },
          { title: 'AUTOSAR Core Subset', link: 'https://github.com/topics/autosar', type: 'project' },
          { title: 'Vehicle Intrusion Detector', link: 'https://github.com/topics/intrusion-detection-system', type: 'project' },
          { title: 'ADAS Simulation Tool', link: 'https://github.com/topics/adas-simulation', type: 'project' }
        ]
      },
      { 
        level: 'Expert',
        title: 'Mobility Mastery', 
        desc: 'Architecting Next-Gen EV.', 
        milestones: ['V2X Communication', 'Level 4 Autonomy Design', 'Battery Chemistry Optim', 'Fleet Sync Protocols'],
        companies: ['Tesla (FSD Team)', 'Google (Waymo Core)', 'Uber (ATG)', 'Apple (Project Titan)', 'Amazon (Zoox)', 'NVIDIA (Drive Team)', 'Baidu (Apollo)', 'Mobileye (Intel)', 'Microsoft (Mobility)', 'Meta (Metaverse Auto)'],
        resources: [
          { title: 'V2X Technology (Coursera)', link: 'https://www.coursera.org/learn/v2x-communication', type: 'course' },
          { title: 'Level 4 Autonomy (YT)', link: 'https://www.youtube.com/watch?v=8pA8lU9j3iU', type: 'video' },
          { title: 'Battery Chem Optim (edX)', link: 'https://www.edx.org/course/battery-technology-for-electric-vehicles', type: 'course' },
          { title: 'Fleet Protocols (YT)', link: 'https://www.youtube.com/watch?v=8pA8lU9j3iU', type: 'video' },
          { title: 'Mobility Architecture Mastery', link: 'https://www.udemy.com/course/next-gen-mobility/', type: 'course' },
          { title: 'Comma.ai OpenPilot', link: 'https://github.com/commaai/openpilot', type: 'project' },
          { title: 'V2X Stack Implementation', link: 'https://github.com/topics/v2x-communication', type: 'project' },
          { title: 'Battery State Estimator', link: 'https://github.com/topics/battery-state-estimation', type: 'project' },
          { title: 'Fleet Management System', link: 'https://github.com/topics/fleet-management', type: 'project' },
          { title: 'Next-Gen EV OS', link: 'https://github.com/topics/automotive-os', type: 'project' }
        ]
      }
    ]
  }
};

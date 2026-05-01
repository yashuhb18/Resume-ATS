export interface SkillContent {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  description: string;
  industryDemand: {
    level: 'Critical' | 'High' | 'Rising';
    description: string;
    topCompanies: string[];
  };
  learningPath: {
    step: string;
    topics: string[];
  }[];
  githubProjects: {
    title: string;
    desc: string;
    tech: string[];
    link: string;
  }[];
  resources: {
    title: string;
    provider: string;
    type: 'YouTube' | 'Course' | 'Documentation';
    url: string;
  }[];
  communities: {
    name: string;
    platform: 'Reddit' | 'LinkedIn' | 'Discord' | 'Documentation';
    url: string;
  }[];
}

export const skillsData: Record<string, SkillContent> = {
  'verilog-vhdl': {
    id: 'verilog-vhdl',
    title: 'Verilog / VHDL',
    subtitle: 'The Language of Hardware',
    heroImage: '/images/skills/hdl-hero.png',
    description: 'Hardware Description Languages (HDLs) are the primary way modern digital circuits are designed. Unlike C or Python, Verilog and VHDL describe the physical structure and behavior of hardware, allowing for massive parallelism and ultra-low latency execution.',
    industryDemand: {
      level: 'Critical',
      description: 'Foundational skill for every VLSI, ASIC, and FPGA role in the world. Essential for high-performance computing and semiconductor design.',
      topCompanies: ['Intel', 'AMD', 'NVIDIA', 'Qualcomm', 'Apple']
    },
    learningPath: [
      { step: 'Logic Fundamentals', topics: ['Boolean Algebra', 'Gates', 'K-Maps'] },
      { step: 'Syntax & Modeling', topics: ['Data Types', 'Modules', 'Structural vs Behavioral'] },
      { step: 'Synthesis & Simulation', topics: ['Testbenches', 'Synthesis constraints', 'Timing analysis'] }
    ],
    githubProjects: [
      { title: '8-bit Microprocessor', desc: 'Implement a simple 8-bit CPU with a custom ISA.', tech: ['Verilog', 'GTKWave'], link: 'https://github.com/search?q=verilog+8bit+cpu' },
      { title: 'VGA Controller', desc: 'Drive a monitor display directly from an FPGA.', tech: ['Verilog', 'FPGA'], link: 'https://github.com/search?q=verilog+vga+controller' }
    ],
    resources: [
      { title: 'HDLBits Practice', provider: 'HDLBits', type: 'Documentation', url: 'https://hdlbits.05x30.com/' },
      { title: 'Verilog Tutorial (YouTube)', provider: 'Digilent', type: 'YouTube', url: 'https://www.youtube.com/results?search_query=verilog+tutorial' }
    ],
    communities: [
      { name: 'r/FPGA', platform: 'Reddit', url: 'https://www.reddit.com/r/FPGA/' },
      { name: 'Digital Design Professionals', platform: 'LinkedIn', url: 'https://www.linkedin.com/groups/1350117/' }
    ]
  },
  'systemverilog': {
    id: 'systemverilog',
    title: 'SystemVerilog',
    subtitle: 'Advanced Hardware Verification',
    heroImage: '/images/skills/hdl-hero.png',
    description: 'SystemVerilog is a major enhancement to Verilog, adding powerful object-oriented features specifically for hardware verification. It is the industry standard for verifying complex chips using the Universal Verification Methodology (UVM).',
    industryDemand: {
      level: 'Critical',
      description: 'The #1 requirement for Verification Engineers. 70% of a chip\'s design cycle is spent on verification.',
      topCompanies: ['Cadence', 'Synopsys', 'Broadcom', 'Marvell', 'Samsung']
    },
    learningPath: [
      { step: 'OOP for Hardware', topics: ['Classes', 'Inheritance', 'Polymorphism'] },
      { step: 'Randomization', topics: ['Constrained Random Testing', 'Coverage'] },
      { step: 'Assertions', topics: ['SVA (SystemVerilog Assertions)', 'Interface'] }
    ],
    githubProjects: [
      { title: 'UVM Testbench Template', desc: 'A reusable UVM testbench architecture.', tech: ['SystemVerilog', 'UVM'], link: 'https://github.com/search?q=uvm+testbench+systemverilog' },
      { title: 'Cache Controller Verification', desc: 'Verify a multi-way associative cache.', tech: ['SystemVerilog', 'SVA'], link: 'https://github.com/search?q=systemverilog+cache+verification' }
    ],
    resources: [
      { title: 'Verification Academy', provider: 'Mentor Graphics', type: 'Course', url: 'https://verificationacademy.com/' },
      { title: 'SystemVerilog for Verification', provider: 'YouTube', type: 'YouTube', url: 'https://www.youtube.com/results?search_query=systemverilog+for+verification' }
    ],
    communities: [
      { name: 'r/Verification', platform: 'Reddit', url: 'https://www.reddit.com/r/verification/' }
    ]
  },
  'matlab': {
    id: 'matlab',
    title: 'MATLAB',
    subtitle: 'The Language of Algorithm Design',
    heroImage: '/images/skills/tools-hero.png',
    description: 'MATLAB is a high-performance language for technical computing. It integrates computation, visualization, and programming in an easy-to-use environment where problems and solutions are expressed in familiar mathematical notation.',
    industryDemand: {
      level: 'High',
      description: 'Standard for research, signal processing, control systems, and automotive simulations.',
      topCompanies: ['MathWorks', 'Tesla', 'NASA', 'MathWorks', 'Bosch']
    },
    learningPath: [
      { step: 'Matrix Operations', topics: ['Linear Algebra', 'Vectorization'] },
      { step: 'Toolboxes', topics: ['Simulink', 'Signal Processing Toolbox', 'Control Systems'] },
      { step: 'Deployment', topics: ['MATLAB Coder', 'HDL Coder'] }
    ],
    githubProjects: [
      { title: 'Radar Signal Simulator', desc: 'Simulate FMCW radar range-doppler maps.', tech: ['MATLAB'], link: 'https://github.com/search?q=matlab+radar+simulation' },
      { title: 'Control System for Quadcopter', desc: 'Design PID/LQR controllers in Simulink.', tech: ['Simulink', 'MATLAB'], link: 'https://github.com/search?q=simulink+quadcopter+control' }
    ],
    resources: [
      { title: 'MATLAB Onramp', provider: 'MathWorks', type: 'Course', url: 'https://matlabacademy.mathworks.com/' },
      { title: 'Simulink Tutorial', provider: 'YouTube', type: 'YouTube', url: 'https://www.youtube.com/results?search_query=simulink+tutorial' }
    ],
    communities: [
      { name: 'MATLAB Answers', platform: 'Reddit', url: 'https://www.reddit.com/r/matlab/' }
    ]
  },
  'cpp': {
    id: 'cpp',
    title: 'C / C++',
    subtitle: 'Performance at the Metal',
    heroImage: '/images/skills/programming-hero.png',
    description: 'C and C++ are the backbone of embedded systems and high-performance computing. They provide direct memory access and zero-overhead abstractions, making them the choice for operating systems, drivers, and real-time software.',
    industryDemand: {
      level: 'Critical',
      description: 'The absolute requirement for firmware, game engines, and autonomous systems.',
      topCompanies: ['Microsoft', 'Google', 'Amazon', 'Meta', 'Tesla']
    },
    learningPath: [
      { step: 'Memory Management', topics: ['Pointers', 'Stack vs Heap', 'Smart Pointers'] },
      { step: 'Embedded C', topics: ['Volatile keyword', 'Bit manipulation', 'ISR'] },
      { step: 'Modern C++', topics: ['Templates', 'STL', 'RAII'] }
    ],
    githubProjects: [
      { title: 'LittleFS Implementation', desc: 'Integrate a failsafe filesystem for micros.', tech: ['C', 'Flash Memory'], link: 'https://github.com/search?q=embedded+c+filesystem' },
      { title: 'Neural Network from Scratch', desc: 'Implement a MLP in pure C++.', tech: ['C++', 'Math'], link: 'https://github.com/search?q=cpp+neural+network+from+scratch' }
    ],
    resources: [
      { title: 'C++ Reference', provider: 'cppreference.com', type: 'Documentation', url: 'https://en.cppreference.com/' },
      { title: 'The Cherno C++ Series', provider: 'YouTube', type: 'YouTube', url: 'https://www.youtube.com/@TheCherno' }
    ],
    communities: [
      { name: 'r/cpp', platform: 'Reddit', url: 'https://www.reddit.com/r/cpp/' },
      { name: 'r/embedded', platform: 'Reddit', url: 'https://www.reddit.com/r/embedded/' }
    ]
  },
  'python': {
    id: 'python',
    title: 'Python',
    subtitle: 'The Versatile Swiss Army Knife',
    heroImage: '/images/skills/programming-hero.png',
    description: 'Python is the world\'s most popular language for AI, data science, and scripting. In ECE, it\'s used for automating hardware tests, processing data from sensors, and rapid prototyping of algorithms.',
    industryDemand: {
      level: 'High',
      description: 'Critical for AI/ML, automation, and backend integration.',
      topCompanies: ['OpenAI', 'Google', 'Meta', 'Netflix', 'SpaceX']
    },
    learningPath: [
      { step: 'Data Science Stack', topics: ['NumPy', 'Pandas', 'Matplotlib'] },
      { step: 'Automation', topics: ['PySerial', 'Requests', 'OS/Sys'] },
      { step: 'AI/ML', topics: ['PyTorch', 'TensorFlow', 'Scikit-learn'] }
    ],
    githubProjects: [
      { title: 'IoT Data Dashboard', desc: 'Visualize real-time sensor data via MQTT.', tech: ['Python', 'Streamlit', 'MQTT'], link: 'https://github.com/search?q=python+iot+dashboard' },
      { title: 'Automated IC Tester', desc: 'Script for automated chip characterization.', tech: ['Python', 'PyVISA'], link: 'https://github.com/search?q=python+automated+test+equipment' }
    ],
    resources: [
      { title: 'Automate the Boring Stuff', provider: 'Al Sweigart', type: 'Course', url: 'https://automatetheboringstuff.com/' },
      { title: 'Python for Data Science', provider: 'YouTube', type: 'YouTube', url: 'https://www.youtube.com/results?search_query=python+for+data+science' }
    ],
    communities: [
      { name: 'r/Python', platform: 'Reddit', url: 'https://www.reddit.com/r/Python/' }
    ]
  },
  'ros': {
    id: 'ros',
    title: 'ROS',
    subtitle: 'The Operating System for Robots',
    heroImage: '/images/skills/hdl-hero.png',
    description: 'The Robot Operating System (ROS) is a flexible framework for writing robot software. It is a collection of tools, libraries, and conventions that simplify the task of creating complex and robust robot behavior across a wide variety of robotic platforms.',
    industryDemand: {
      level: 'Rising',
      description: 'Standard for autonomous mobile robots (AMRs), self-driving cars, and industrial robotics.',
      topCompanies: ['Amazon Robotics', 'Boston Dynamics', 'Waymo', 'Cruise', 'ABB']
    },
    learningPath: [
      { step: 'Core Concepts', topics: ['Nodes', 'Topics', 'Services', 'Parameters'] },
      { step: 'Communication', topics: ['Pub/Sub', 'Message Types', 'Tf2 (Transforms)'] },
      { step: 'Navigation', topics: ['SLAM', 'Nav2 Stack', 'Gazebo Simulation'] }
    ],
    githubProjects: [
      { title: 'Lidar SLAM Robot', desc: 'Build a mapping robot in simulation.', tech: ['ROS2', 'Gazebo', 'LiDAR'], link: 'https://github.com/search?q=ros2+slam+gazebo' },
      { title: 'Autonomous Drone Follower', desc: 'Computer vision based drone tracking.', tech: ['ROS', 'OpenCV', 'PX4'], link: 'https://github.com/search?q=ros+drone+vision' }
    ],
    resources: [
      { title: 'The Construct', provider: 'ROS Tutorials', type: 'Course', url: 'https://www.theconstructsim.com/' },
      { title: 'Articulated Robotics', provider: 'YouTube', type: 'YouTube', url: 'https://www.youtube.com/@ArticulatedRobotics' }
    ],
    communities: [
      { name: 'r/robotics', platform: 'Reddit', url: 'https://www.reddit.com/r/robotics/' },
      { name: 'ROS Discourse', platform: 'Documentation', url: 'https://discourse.ros.org/' }
    ]
  },
  'altium': {
    id: 'altium',
    title: 'Altium Designer',
    subtitle: 'World-Class PCB Design',
    heroImage: '/images/skills/tools-hero.png',
    description: 'Altium Designer is the industry-leading software for printed circuit board (PCB) design. It integrates schematic capture, 3D layout, and signal integrity analysis into a single unified environment used by top professional hardware teams.',
    industryDemand: {
      level: 'High',
      description: 'Requirement for Hardware Design Engineers. Standard for consumer electronics and aerospace.',
      topCompanies: ['SpaceX', 'Apple', 'Tesla', 'DJI', 'Garmin']
    },
    learningPath: [
      { step: 'Schematic Capture', topics: ['Component Libraries', 'Netlists', 'ERC'] },
      { step: 'PCB Layout', topics: ['Routing', 'Planes', 'Vias', 'DRC'] },
      { step: 'Manufacturing', topics: ['Gerber Files', 'Bill of Materials', 'Assembly'] }
    ],
    githubProjects: [
      { title: 'Custom Flight Controller', desc: '4-layer high-density flight board.', tech: ['Altium', 'PCB'], link: 'https://github.com/search?q=altium+flight+controller' },
      { title: 'SDR Hardware Board', desc: 'High-speed RF board design.', tech: ['Altium', 'RF Design'], link: 'https://github.com/search?q=altium+sdr+board' }
    ],
    resources: [
      { title: 'Altium Academy', provider: 'Altium', type: 'YouTube', url: 'https://www.youtube.com/@AltiumAcademy' },
      { title: 'Fedevel Academy', provider: 'Robert Feranec', type: 'Course', url: 'https://fedevel.com/' }
    ],
    communities: [
      { name: 'r/PrintedCircuitBoard', platform: 'Reddit', url: 'https://www.reddit.com/r/PrintedCircuitBoard/' }
    ]
  },
  'protocols': {
    id: 'protocols',
    title: 'I2C / SPI / UART',
    subtitle: 'The Language of Communication',
    heroImage: '/images/skills/hdl-hero.png',
    description: 'Communication protocols are the rules that allow hardware components to talk to each other. I2C, SPI, and UART are the most fundamental low-level protocols used to connect sensors, memory, and processors in every embedded system.',
    industryDemand: {
      level: 'Critical',
      description: 'Foundational knowledge for all embedded and firmware developers.',
      topCompanies: ['NXP', 'STMicroelectronics', 'Microchip', 'Texas Instruments', 'Qualcomm']
    },
    learningPath: [
      { step: 'UART', topics: ['Baud rate', 'Start/Stop bits', 'FIFO'] },
      { step: 'I2C', topics: ['Master/Slave', 'Addressing', 'Pull-up resistors'] },
      { step: 'SPI', topics: ['MISO/MOSI', 'Clock polarity/phase', 'Chip select'] }
    ],
    githubProjects: [
      { title: 'Protocol Analyzer for Arduino', desc: 'Sniff bus traffic in real-time.', tech: ['C', 'Protocols'], link: 'https://github.com/search?q=arduino+i2c+analyzer' },
      { title: 'Multi-Sensor Data Logger', desc: 'Read 5+ sensors on a shared I2C bus.', tech: ['Embedded C', 'I2C'], link: 'https://github.com/search?q=stm32+sensor+data+logger' }
    ],
    resources: [
      { title: 'Logic Analyzer Basics', provider: 'Saleae', type: 'Documentation', url: 'https://support.saleae.com/' },
      { title: 'Embedded Communication (YouTube)', provider: 'YouTube', type: 'YouTube', url: 'https://www.youtube.com/results?search_query=i2c+spi+uart+explained' }
    ],
    communities: [
      { name: 'r/EmbeddedSystems', platform: 'Reddit', url: 'https://www.reddit.com/r/EmbeddedSystems/' }
    ]
  },
  'rtos': {
    id: 'rtos',
    title: 'RTOS',
    subtitle: 'Real-Time Precision',
    heroImage: '/images/skills/hdl-hero.png',
    description: 'A Real-Time Operating System (RTOS) is an OS intended to serve real-time applications that process data as it comes in, typically without buffer delays. Precision timing and determinism are the core goals of an RTOS.',
    industryDemand: {
      level: 'High',
      description: 'Essential for safety-critical systems like aerospace, medical, and automotive.',
      topCompanies: ['AWS (FreeRTOS)', 'Zephyr', 'Wind River (VxWorks)', 'Blackberry (QNX)', 'Tesla']
    },
    learningPath: [
      { step: 'Task Management', topics: ['Scheduling', 'Priority Inversion', 'Context Switching'] },
      { step: 'Inter-task Comm', topics: ['Queues', 'Semaphores', 'Mutexes'] },
      { step: 'Memory Management', topics: ['Static vs Dynamic Allocation', 'Heap guards'] }
    ],
    githubProjects: [
      { title: 'FreeRTOS Audio Mixer', desc: 'Mixing multiple audio streams in real-time.', tech: ['FreeRTOS', 'C'], link: 'https://github.com/search?q=freertos+audio+mixer' },
      { title: 'STM32 Mini-OS', desc: 'Build a scheduler with task priorities.', tech: ['C', 'Cortex-M'], link: 'https://github.com/search?q=custom+rtos+stm32' }
    ],
    resources: [
      { title: 'FreeRTOS Documentation', provider: 'AWS', type: 'Documentation', url: 'https://www.freertos.org/' },
      { title: 'Zephyr Project Onramp', provider: 'Linux Foundation', type: 'Course', url: 'https://www.zephyrproject.org/' }
    ],
    communities: [
      { name: 'r/Embedded', platform: 'Reddit', url: 'https://www.reddit.com/r/embedded/' }
    ]
  },
  'fpga': {
    id: 'fpga',
    title: 'FPGA Prototyping',
    subtitle: 'Instant Hardware Evolution',
    heroImage: '/images/skills/hdl-hero.png',
    description: 'Field Programmable Gate Arrays (FPGAs) are chips that can be reconfigured after manufacturing. They are used for high-speed signal processing, financial trading, and prototyping new chip designs before they go to a silicon foundry.',
    industryDemand: {
      level: 'High',
      description: 'Used in data centers, telecom (5G), and defense.',
      topCompanies: ['AMD (Xilinx)', 'Intel (Altera)', 'Lattice', 'SpaceX', 'Microsoft']
    },
    learningPath: [
      { step: 'Digital Design', topics: ['Logic gates', 'Timing constraints'] },
      { step: 'Toolchains', topics: ['Vivado', 'Quartus', 'Synthesis'] },
      { step: 'Hardware Implementation', topics: ['Floorplanning', 'Bitstream generation'] }
    ],
    githubProjects: [
      { title: 'FPGA Cryptominer', desc: 'Implement SHA-256 in hardware.', tech: ['Verilog', 'Vivado'], link: 'https://github.com/search?q=fpga+sha256+miner' },
      { title: 'Neural Network Accelerator', desc: 'Run AI models directly on logic gates.', tech: ['HLS', 'Verilog', 'FPGA'], link: 'https://github.com/search?q=fpga+neural+network+accelerator' }
    ],
    resources: [
      { title: 'FPGA Tutorials', provider: 'Digilent', type: 'Documentation', url: 'https://digilent.com/reference/learn/programmable-logic/tutorials/start' },
      { title: 'Vivado Mastery', provider: 'YouTube', type: 'YouTube', url: 'https://www.youtube.com/results?search_query=vivado+tutorial' }
    ],
    communities: [
      { name: 'r/FPGA', platform: 'Reddit', url: 'https://www.reddit.com/r/FPGA/' }
    ]
  }
};

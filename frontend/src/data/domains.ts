export interface DomainContent {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  description: string;
  industryOutlook: {
    growth: string;
    description: string;
    trends: string[];
  };
  liveOpportunities: {
    linkedinQuery: string;
    indeedQuery: string;
    roles: string[];
  };
  community: {
    subreddits: { name: string; url: string }[];
    linkedinGroups: { name: string; url: string }[];
  };
  projects: {
    title: string;
    difficulty: 'Intermediate' | 'Advanced' | 'Expert';
    description: string;
    skills: string[];
    repoSearchQuery: string;
  }[];
  certifications: {
    title: string;
    provider: string;
    url: string;
    type: 'Course' | 'Certification' | 'YouTube';
  }[];
}

export const topDomainsData: Record<string, DomainContent> = {
  'vlsi': {
    id: 'vlsi',
    title: 'VLSI & ASIC Design',
    subtitle: 'The Architects of Modern Silicon',
    heroImage: '/images/domains/vlsi-hero.png',
    description: 'Very Large Scale Integration (VLSI) and Application-Specific Integrated Circuit (ASIC) design form the foundation of every electronic device on the planet. From Apple\'s M-series chips to massive Google TPU clusters, VLSI engineers literally define the limits of human computing power.',
    industryOutlook: {
      growth: '14.5% CAGR',
      description: 'The global semiconductor shortage and the explosive rise of AI hardware accelerators have created unprecedented demand for silicon architects and verification experts.',
      trends: ['AI Accelerators & NPUs', '3D IC Packaging', 'Open-Source RISC-V Architectures', 'Low-Power FinFET Design']
    },
    liveOpportunities: {
      linkedinQuery: 'https://www.linkedin.com/search/results/jobs/?keywords=%22VLSI%22%20OR%20%22ASIC%20Design%22%20OR%20%22Verification%22',
      indeedQuery: 'https://www.indeed.com/jobs?q=VLSI+ASIC+Design+Verification',
      roles: ['ASIC Verification Engineer', 'Physical Design Engineer', 'RTL Design Engineer', 'DFT Engineer']
    },
    community: {
      subreddits: [
        { name: 'r/VLSI', url: 'https://www.reddit.com/r/vlsi/' },
        { name: 'r/ECE', url: 'https://www.reddit.com/r/ECE/' },
        { name: 'r/FPGA', url: 'https://www.reddit.com/r/FPGA/' }
      ],
      linkedinGroups: [
        { name: 'VLSI Design & Verification', url: 'https://www.linkedin.com/search/results/groups/?keywords=VLSI%20Design' },
        { name: 'SystemVerilog Professionals', url: 'https://www.linkedin.com/search/results/groups/?keywords=SystemVerilog' }
      ]
    },
    projects: [
      {
        title: 'Complete UVM Testbench for an ALU',
        difficulty: 'Advanced',
        description: 'Build an industry-standard Universal Verification Methodology (UVM) testbench from scratch to verify a 32-bit Arithmetic Logic Unit, complete with coverage reports and assertions.',
        skills: ['SystemVerilog', 'UVM', 'ModelSim', 'Assertions'],
        repoSearchQuery: 'https://github.com/search?q=UVM+Testbench+ALU&type=repositories'
      },
      {
        title: 'Open-Source RISC-V Core Implementation',
        difficulty: 'Expert',
        description: 'Design and simulate a 5-stage pipelined RISC-V RV32I processor core in Verilog, demonstrating a deep understanding of computer architecture.',
        skills: ['Verilog', 'Computer Architecture', 'RISC-V ISA', 'RTL Design'],
        repoSearchQuery: 'https://github.com/search?q=RISC-V+Core+Verilog&type=repositories'
      }
    ],
    certifications: [
      { title: 'VLSI Design: From Components to Systems', provider: 'Coursera (University of Tokyo)', url: 'https://www.coursera.org/learn/vlsi-design', type: 'Course' },
      { title: 'SystemVerilog for Verification', provider: 'Verification Academy', url: 'https://verificationacademy.com/', type: 'Course' },
      { title: 'Physical Design Flow', provider: 'Fedevel Academy', url: 'https://fedevel.com/', type: 'Certification' },
      { title: 'VLSI Academy - YouTube', provider: 'YouTube', url: 'https://www.youtube.com/@vlsiacademy', type: 'YouTube' }
    ]
  },
  'embedded-iot': {
    id: 'embedded-iot',
    title: 'Embedded Systems & IoT',
    subtitle: 'The Soul of Smart Hardware',
    heroImage: '/images/domains/embedded-hero.png',
    description: 'Embedded Systems engineering bridges the gap between raw hardware and software. You write the ultra-efficient, real-time C/C++ firmware that controls pacemakers, automotive brake systems, and the billions of edge devices that make up the Internet of Things (IoT).',
    industryOutlook: {
      growth: '18.2% CAGR',
      description: 'The IoT revolution, smart home automation, and the massive shift towards Electric Vehicles (EVs) have made bare-metal and RTOS firmware engineers incredibly sought after.',
      trends: ['Edge AI (TinyML)', 'Automotive AUTOSAR', 'Secure OTA Updates', 'Real-Time Operating Systems (RTOS)']
    },
    liveOpportunities: {
      linkedinQuery: 'https://www.linkedin.com/search/results/jobs/?keywords=%22Embedded%20Software%22%20OR%20%22Firmware%22%20OR%20%22IoT%22',
      indeedQuery: 'https://www.indeed.com/jobs?q=Embedded+Systems+Firmware+IoT',
      roles: ['Embedded Software Engineer', 'Firmware Developer', 'IoT Solutions Architect', 'Embedded Linux Engineer']
    },
    community: {
      subreddits: [
        { name: 'r/embedded', url: 'https://www.reddit.com/r/embedded/' },
        { name: 'r/InternetOfThings', url: 'https://www.reddit.com/r/InternetOfThings/' }
      ],
      linkedinGroups: [
        { name: 'Embedded Systems Engineers', url: 'https://www.linkedin.com/search/results/groups/?keywords=Embedded%20Systems' },
        { name: 'IoT Network', url: 'https://www.linkedin.com/search/results/groups/?keywords=Internet%20of%20Things' }
      ]
    },
    projects: [
      {
        title: 'Custom Preemptive RTOS Scheduler',
        difficulty: 'Expert',
        description: 'Write a basic Real-Time Operating System kernel from scratch in C and ARM Assembly for an STM32 microcontroller. Implement context switching and semaphores.',
        skills: ['C', 'ARM Assembly', 'RTOS', 'Microcontrollers'],
        repoSearchQuery: 'https://github.com/search?q=Custom+RTOS+ARM&type=repositories'
      },
      {
        title: 'End-to-End Secure IoT Sensor Node',
        difficulty: 'Advanced',
        description: 'Build an ESP32 weather station that reads I2C sensors and securely transmits data to AWS IoT Core over MQTT using TLS encryption.',
        skills: ['ESP32', 'FreeRTOS', 'MQTT', 'AWS IoT Core'],
        repoSearchQuery: 'https://github.com/search?q=ESP32+AWS+IoT+Core+MQTT&type=repositories'
      }
    ],
    certifications: [
      { title: 'Introduction to Embedded Systems Software and Development Environments', provider: 'Coursera (University of Colorado Boulder)', url: 'https://www.coursera.org/learn/introduction-embedded-systems', type: 'Course' },
      { title: 'Mastering Microcontroller with Embedded Driver Development', provider: 'FastBit Embedded Academy', url: 'https://fastbitlab.com/', type: 'Course' },
      { title: 'AWS Certified IoT - Specialty', provider: 'AWS', url: 'https://aws.amazon.com/certification/certified-iot-specialty/', type: 'Certification' },
      { title: 'Phil’s Lab - Embedded Systems', provider: 'YouTube', url: 'https://www.youtube.com/@PhilsLab', type: 'YouTube' }
    ]
  },
  'signal-processing': {
    id: 'signal-processing',
    title: 'Digital Signal Processing',
    subtitle: 'Extracting Truth from Noise',
    heroImage: '/images/domains/signal-hero.png',
    description: 'Digital Signal Processing (DSP) is the mathematics of the modern world. Whether it\'s isolating a human voice in a noisy room, compressing 4K video, or tracking objects using radar arrays, DSP engineers use algorithms to manipulate real-world analog signals.',
    industryOutlook: {
      growth: '12.8% CAGR',
      description: 'The rollout of 5G/6G networks, autonomous vehicle radar systems, and the integration of machine learning into audio/video processing is driving DSP innovation.',
      trends: ['Radar & LiDAR Perception', 'Adaptive Filtering', 'Computer Vision & Image Processing', '5G Baseband Algorithms']
    },
    liveOpportunities: {
      linkedinQuery: 'https://www.linkedin.com/search/results/jobs/?keywords=%22DSP%20Engineer%22%20OR%20%22Signal%20Processing%22%20OR%20%22Radar%22',
      indeedQuery: 'https://www.indeed.com/jobs?q=Digital+Signal+Processing+DSP',
      roles: ['DSP Algorithm Engineer', 'Radar Systems Engineer', 'Audio Processing Engineer', 'Baseband Engineer']
    },
    community: {
      subreddits: [
        { name: 'r/DSP', url: 'https://www.reddit.com/r/DSP/' },
        { name: 'r/SignalsAndSystems', url: 'https://www.reddit.com/r/SignalsAndSystems/' }
      ],
      linkedinGroups: [
        { name: 'Digital Signal Processing Professionals', url: 'https://www.linkedin.com/search/results/groups/?keywords=Digital%20Signal%20Processing' },
        { name: 'Radar & Electronic Warfare', url: 'https://www.linkedin.com/search/results/groups/?keywords=Radar%20Electronic%20Warfare' }
      ]
    },
    projects: [
      {
        title: 'Real-Time Audio Equalizer on FPGA/DSP',
        difficulty: 'Advanced',
        description: 'Design and implement a multi-band FIR/IIR audio equalizer algorithm in MATLAB, then port the C code to a real TI Sharc or STM32 DSP processor.',
        skills: ['MATLAB', 'C/C++', 'FIR/IIR Filters', 'Hardware DSP'],
        repoSearchQuery: 'https://github.com/search?q=Real-time+Audio+Equalizer+DSP&type=repositories'
      },
      {
        title: 'FMCW Radar Target Simulator',
        difficulty: 'Expert',
        description: 'Simulate a Frequency Modulated Continuous Wave (FMCW) radar system in Python to detect the range and velocity of moving targets using Fast Fourier Transforms (FFT).',
        skills: ['Python (SciPy)', 'FFT algorithms', 'Radar Systems', 'Signal Modeling'],
        repoSearchQuery: 'https://github.com/search?q=FMCW+Radar+Simulation+Python&type=repositories'
      }
    ],
    certifications: [
      { title: 'Digital Signal Processing', provider: 'Coursera (EPFL)', url: 'https://www.coursera.org/learn/dsp', type: 'Course' },
      { title: 'Applied Digital Signal Processing', provider: 'edX (Rice University)', url: 'https://www.edx.org/course/applied-digital-signal-processing', type: 'Course' },
      { title: 'Applied DSP using MATLAB', provider: 'MathWorks', url: 'https://matlabacademy.mathworks.com/', type: 'Certification' },
      { title: 'DSP Online - YouTube', provider: 'YouTube', url: 'https://www.youtube.com/@dsponline', type: 'YouTube' }
    ]
  }
};

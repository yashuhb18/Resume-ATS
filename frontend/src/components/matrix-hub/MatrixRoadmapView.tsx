'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Zap, CheckCircle2, 
  Circle, ChevronRight, 
  Target, Rocket, Shield,
  Brain, Cpu, Terminal
} from 'lucide-react';

interface RoadmapPhase {
  title: string;
  desc: string;
  milestones: string[];
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
        title: 'Phase 01: Foundation Architecture', 
        desc: 'Master the fundamental building blocks of digital logic and hardware description.',
        milestones: ['Digital Logic Design Mastery', 'Verilog/VHDL Fundamentals', 'FPGA Prototyping Basics', 'Combinational & Sequential Circuits'] 
      },
      { 
        title: 'Phase 02: Core Silicon Engineering', 
        desc: 'Deep dive into RTL design and verification methodologies.',
        milestones: ['Advanced RTL Coding Styles', 'Static Timing Analysis (STA)', 'Synthesis & Gate-Level Simulation', 'SystemVerilog for Design'] 
      },
      { 
        title: 'Phase 03: Advanced Protocols', 
        desc: 'Professional-grade verification and physical design flows.',
        milestones: ['UVM (Universal Verification Methodology)', 'Logic Equivalence Checking', 'DFT (Design for Test) Insertion', 'Physical Design (P&R)'] 
      },
      { 
        title: 'Phase 04: Matrix Mastery', 
        desc: 'Leading tape-outs and post-silicon architectural strategy.',
        milestones: ['Tape-out Management (GDSII)', 'Post-Silicon Validation', 'High-Speed Analog/Mixed-Signal Integration', 'System-on-Chip (SoC) Architecture'] 
      }
    ]
  },
  embedded: {
    id: 'embedded',
    title: 'Embedded Systems',
    phases: [
      { 
        title: 'Phase 01: Bare-Metal Foundation', 
        desc: 'Direct hardware interaction and low-level C programming.',
        milestones: ['C/C++ for Embedded Systems', 'MCU Architecture (ARM Cortex-M)', 'Peripheral Interfacing (UART, SPI, I2C)', 'Bare-Metal Driver Development'] 
      },
      { 
        title: 'Phase 02: Core Synchronization', 
        desc: 'Real-time operating systems and multi-threaded architecture.',
        milestones: ['RTOS Fundamentals (FreeRTOS/Zephyr)', 'Interrupt Handling & Priority', 'Memory Management & DMA', 'Task Scheduling & Semaphores'] 
      },
      { 
        title: 'Phase 03: Professional Protocols', 
        desc: 'Advanced communication and security architectures.',
        milestones: ['TCP/IP Stack Integration', 'CAN/LIN Bus for Automotive', 'USB & BLE Protocol Stacks', 'Secure Boot & Encryption'] 
      },
      { 
        title: 'Phase 04: System Mastery', 
        desc: 'Architecting large-scale embedded ecosystems.',
        milestones: ['Embedded Linux & Kernel Hacking', 'Complex RTOS Optimization', 'High-Level Hardware Abstraction Layers', 'Safety-Critical System Design'] 
      }
    ]
  },
  // Add other roadmaps following the same 4-phase pattern
  'ai-hw': {
    id: 'ai-hw',
    title: 'AI Hardware Intel',
    phases: [
      { title: 'Phase 01: Neural Foundation', desc: 'Linear Algebra & Basics.', milestones: ['Math for AI', 'Tensor Ops', 'Python/C++'] },
      { title: 'Phase 02: Accelerator Core', desc: 'Architecting TPU/NPU.', milestones: ['Systolic Arrays', 'Memory Hierarchies', 'Quantization'] },
      { title: 'Phase 03: Edge Deployment', desc: 'Optimization for power.', milestones: ['TFLite', 'ONNX', 'TVM Compiler'] },
      { title: 'Phase 04: Silicon Mastery', desc: 'AI Chip Design.', milestones: ['Hardware/Software Co-design', 'Custom Accelerators', 'Tape-out'] }
    ]
  },
  wireless: {
    id: 'wireless',
    title: '5G & Wireless Comm',
    phases: [
      { title: 'Phase 01: Signal Foundation', desc: 'RF & DSP Basics.', milestones: ['Signal Processing', 'Modulation Tech', 'Electromagnetics', 'Python for DSP'] },
      { title: 'Phase 02: Core Protocols', desc: '4G/5G Architecture.', milestones: ['L1/L2/L3 Layers', 'MIMO Tech', 'Beamforming', 'OFDM Theory'] },
      { title: 'Phase 03: Network Design', desc: 'O-RAN & Core Ops.', milestones: ['Open5GS', 'Cloud RAN', 'Network Slicing', 'MEC Architecture'] },
      { title: 'Phase 04: Next-Gen Mastery', desc: '6G & Beyond.', milestones: ['Spectrum Management', 'Satellite Comm', 'Quantum Comm', 'Massive MIMO Design'] }
    ]
  },
  iot: {
    id: 'iot',
    title: 'IoT & Smart Systems',
    phases: [
      { title: 'Phase 01: Connect Foundation', desc: 'Hardware & Basic Comms.', milestones: ['MCU Basics (ESP32/STM32)', 'C++ for Sensors', 'HTTP/MQTT Basics', 'Sensor Interfacing'] },
      { title: 'Phase 02: Protocol Depth', desc: 'Advanced networking.', milestones: ['LoRaWAN/Zigbee/BLE', 'Security Protocols', 'Battery Optimization', 'Gateway Design'] },
      { title: 'Phase 03: Cloud Sync', desc: 'Cloud data architectures.', milestones: ['AWS/Azure IoT Hub', 'Node-RED & Dashboards', 'OTA Updates', 'Real-time Analytics'] },
      { title: 'Phase 04: Intelligence Mastery', desc: 'Architecting Smart Systems.', milestones: ['Edge Computing', 'Digital Twins', 'IoT Security Audit', 'Scalable Ecosystems'] }
    ]
  },
  analog: {
    id: 'analog',
    title: 'Analog & Mixed-Signal',
    phases: [
      { title: 'Phase 01: Physics Foundation', desc: 'Semiconductor physics.', milestones: ['Device Physics', 'Op-Amp Design', 'Circuit Theory', 'BJT/MOSFET Basics'] },
      { title: 'Phase 02: IC Architecture', desc: 'Precision silicon design.', milestones: ['Current Mirrors & References', 'Frequency Compensation', 'Noise Analysis', 'Layout Basics'] },
      { title: 'Phase 03: Mixed-Signal Depth', desc: 'ADC/DAC & High Speed.', milestones: ['ADC/DAC Architectures', 'PLL/DLL Design', 'Switched Cap Circuits', 'ESD Protection'] },
      { title: 'Phase 04: Silicon Mastery', desc: 'High-end analog tape-out.', milestones: ['SerDes Design', 'RFIC Architecture', 'Power Management ICs', 'Post-Layout Verification'] }
    ]
  },
  automotive: {
    id: 'automotive',
    title: 'Automotive & EV Tech',
    phases: [
      { title: 'Phase 01: Vehicle Foundation', desc: 'Automotive systems basics.', milestones: ['Electric Drivetrain Basics', 'Battery Management (BMS)', 'CAN/LIN Bus Basics', 'Auto C programming'] },
      { title: 'Phase 02: Core Power', desc: 'Power electronics & control.', milestones: ['Inverter/Converter Design', 'Motor Control Theory', 'Embedded C for ISO26262', 'Hardware-in-Loop (HiL)'] },
      { title: 'Phase 03: Autonomous Depth', desc: 'Sensors & Data Fusion.', milestones: ['LiDAR/Radar/Vision', 'ADAS Architecture', 'AUTOSAR Basics', 'Vehicle Security'] },
      { title: 'Phase 04: Mobility Mastery', desc: 'Architecting Next-Gen EV.', milestones: ['V2X Communication', 'Level 4 Autonomy Design', 'Battery Chemistry Optim', 'Fleet Sync Protocols'] }
    ]
  },
  robotics: {
    id: 'robotics',
    title: 'Robotics & Automation',
    phases: [
      { title: 'Phase 01: Mechanics Foundation', desc: 'Kinematics & Basic Control.', milestones: ['Linear Algebra for Robots', 'Arduino/ESP32 Control', 'Motor Drivers & Encoders', 'Python for Robotics'] },
      { title: 'Phase 02: Neural Core', desc: 'Robot Operating System (ROS).', milestones: ['ROS 2 Fundamentals', 'Sensor Fusion (IMU/LiDAR)', 'Path Planning Algorithms', 'Gazebo Simulation'] },
      { title: 'Phase 03: Industrial Depth', desc: 'Automation & Precision.', milestones: ['Computer Vision (OpenCV)', 'SLAM Navigation', 'PLC & Industrial Protocols', 'Control Systems Theory'] },
      { title: 'Phase 04: Autonomy Mastery', desc: 'Human-Robot Interaction.', milestones: ['Reinforcement Learning', 'Swarm Robotics', 'Space/Medical Robotics', 'Edge AI for Autonomy'] }
    ]
  },
  pcb: {
    id: 'pcb',
    title: 'PCB & Product Dev',
    phases: [
      { title: 'Phase 01: Hardware Foundation', desc: 'Schematics & Components.', milestones: ['Circuit Theory Basics', 'Component Selection', 'Schematic Entry (KiCad)', 'Footprint Design'] },
      { title: 'Phase 02: Layout Core', desc: 'Multi-layer PCB Design.', milestones: ['Routing Techniques', 'Ground Plane Strategy', 'Power Integrity', 'DRC/ERC Checks'] },
      { title: 'Phase 03: Production Depth', desc: 'Manufacturing & Reliability.', milestones: ['High-Speed Design (HDMI/USB)', 'Signal Integrity (SI/PI)', 'Design for Mfg (DFM)', 'EMI/EMC Mitigation'] },
      { title: 'Phase 04: Product Mastery', desc: 'Full Product Lifecycle.', milestones: ['Mass Production (PCBA)', 'Hardware Certification (CE/FCC)', 'Advanced RF Layout', 'Thermal Management'] }
    ]
  }
};

export default function MatrixRoadmapView({ domainId, onClose }: { domainId: string, onClose: () => void }) {
  const data = roadmaps[domainId] || roadmaps['vlsi']; // Fallback for demo

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-[#020308] overflow-y-auto custom-scrollbar"
    >
      {/* ── Cinematic Atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,241,0.1)_0%,transparent_70%)]" />
        <div className="scanline-overlay opacity-30" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        
        {/* Navigation / Header */}
        <div className="flex items-center justify-between mb-24">
          <div className="flex items-center gap-6">
            <button 
              onClick={onClose}
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="h-8 w-px bg-white/10" />
            <div>
               <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Neural Trajectory Mapping</span>
               <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">{data.title}</h2>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4">
             <div className="px-6 py-3 rounded-xl bg-blue-600/10 border border-blue-500/20 text-xs font-black text-blue-400 uppercase tracking-widest">
                Mastery Pathway_v4.2
             </div>
          </div>
        </div>

        {/* Roadmap Core */}
        <div className="max-w-5xl mx-auto relative">
          
          {/* Connecting Line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-20 hidden md:block" />

          <div className="space-y-32">
            {data.phases.map((phase, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative md:pl-24"
              >
                {/* Node Marker */}
                <div className="absolute left-0 top-0 w-12 h-12 rounded-2xl bg-[#0a0c14] border-2 border-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,241,0.4)] z-20 hidden md:flex">
                  {i === 0 ? <Rocket className="w-5 h-5 text-blue-400" /> : <Terminal className="w-5 h-5 text-blue-400" />}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                   
                   {/* Info Column */}
                   <div className="lg:col-span-5 space-y-6">
                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Checkpoint_{i+1}</span>
                        <h3 className="text-4xl font-black text-white uppercase leading-none italic">{phase.title}</h3>
                      </div>
                      <p className="text-lg text-slate-500 font-medium leading-relaxed italic">
                        "{phase.desc}"
                      </p>
                   </div>

                   {/* Milestones Column */}
                   <div className="lg:col-span-7">
                      <div className="hologram-card p-8 bg-[#0a0c14]/50 border-white/5 space-y-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {phase.milestones.map((ms, j) => (
                              <div key={j} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 group hover:border-blue-500/30 transition-all">
                                 <CheckCircle2 className="w-5 h-5 text-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                                 <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">{ms}</span>
                              </div>
                            ))}
                         </div>
                         <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest italic">Core Protocol Active</span>
                            <div className="flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                               <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Ready for Sync</span>
                            </div>
                         </div>
                      </div>
                   </div>

                </div>
              </motion.div>
            ))}
          </div>

          {/* Final Mastery Node */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mt-40 text-center space-y-8"
          >
            <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-purple-600 mx-auto flex items-center justify-center shadow-[0_0_100px_rgba(59,130,241,0.3)] border border-white/20">
               <Shield className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-4">
              <h4 className="text-5xl font-black text-white uppercase italic">Matrix Mastery.</h4>
              <p className="text-slate-500 font-medium tracking-widest uppercase text-xs">Trajectory successfully concluded | Professional DNA Optimized</p>
            </div>
            <button className="matrix-btn !px-16 !py-6 !text-sm">
              Initialize Post-Mastery Protocols
            </button>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}

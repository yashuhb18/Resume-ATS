'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ExternalLink, Github, 
  Youtube, BookOpen, Briefcase,
  MapPin, Globe, Zap, 
  ChevronRight, Sparkles, GraduationCap
} from 'lucide-react';

interface Resource {
  title: string;
  link: string;
  type: 'coursera' | 'youtube' | 'github' | 'linkedin' | 'open-source';
}

interface DomainDetails {
  id: string;
  title: string;
  resources: Resource[];
}

const domainData: Record<string, DomainDetails> = {
  vlsi: {
    id: 'vlsi',
    title: 'VLSI & ASIC Logic',
    resources: [
      { title: 'NPTEL: VLSI Physical Design (Free Cert)', link: 'https://onlinecourses.nptel.ac.in/noc24_ee52/preview', type: 'coursera' },
      { title: 'Coursera: ASIC Design Specialization (Audit)', link: 'https://www.coursera.org/specializations/asic-design-flow', type: 'coursera' },
      { title: 'VLSI Expert: RTL & Static Timing Analysis', link: 'https://www.youtube.com/@VLSIExpert', type: 'youtube' },
      { title: 'NPTEL: Digital VLSI Testing', link: 'https://www.youtube.com/playlist?list=PLuv3XfM_35m0K2OqH8F_L6fT3_8_L6fT3', type: 'youtube' },
      { title: 'OpenLane: Open Source VLSI Flow', link: 'https://github.com/The-OpenROAD-Project/OpenLane', type: 'open-source' },
      { title: 'SkyWater 130nm PDK (Google/SkyWater)', link: 'https://github.com/google/skywater-pdk', type: 'github' },
      { title: 'RISC-V International: Free Training', link: 'https://riscv.org/learning/', type: 'open-source' },
      { title: 'GATE ECE: Digital Electronics Exam Prep', link: 'https://gate.iitk.ac.in/', type: 'linkedin' },
      { title: 'VLSI Freshers: Bangalore Core Jobs', link: 'https://www.linkedin.com/jobs/search/?keywords=VLSI%20Design&location=Bengaluru&f_E=1', type: 'linkedin' },
    ]
  },
  embedded: {
    id: 'embedded',
    title: 'Embedded Systems',
    resources: [
      { title: 'Coursera: Embedded Software & Hardware (Audit)', link: 'https://www.coursera.org/specializations/embedded-software-hardware', type: 'coursera' },
      { title: 'EdX: MicroMasters in Embedded Systems', link: 'https://www.edx.org/micromasters/utaustinx-embedded-systems-shape-the-world', type: 'coursera' },
      { title: 'FastBit Embedded Brain Academy (Premium)', link: 'https://www.youtube.com/@FastBitEmbeddedBrainAcademy', type: 'youtube' },
      { title: 'Quantum Leaps: Modern Embedded Programming', link: 'https://www.youtube.com/@QuantumLeapsEmbedded', type: 'youtube' },
      { title: 'FreeRTOS: Real-Time Kernel Source', link: 'https://github.com/FreeRTOS/FreeRTOS-Kernel', type: 'github' },
      { title: 'Zephyr Project: Scalable RTOS', link: 'https://www.zephyrproject.org/training/', type: 'open-source' },
      { title: 'Arduino Pro: Industry Grade IoT', link: 'https://github.com/arduino/Arduino', type: 'github' },
      { title: 'Embedded Jobs: Bangalore/Mysore Freshers', link: 'https://www.linkedin.com/jobs/search/?keywords=Embedded%20System&location=Bengaluru&f_E=1', type: 'linkedin' },
      { title: 'Mysore Core Electronics Jobs', link: 'https://www.linkedin.com/jobs/search/?keywords=Electronics&location=Mysuru&f_E=1', type: 'linkedin' },
    ]
  },
  'ai-hw': {
    id: 'ai-hw',
    title: 'AI Hardware Intel',
    resources: [
      { title: 'TinyML: Applications on Coursera (Harvard)', link: 'https://www.coursera.org/learn/tiny-ml-applications', type: 'coursera' },
      { title: 'NVIDIA DLI: AI on Jetson Nano (Free)', link: 'https://courses.nvidia.com/courses/course-v1:DLI+S-RX-02+V2/about', type: 'open-source' },
      { title: 'Andreas Moshovos: AI Accelerators', link: 'https://www.youtube.com/@AndreasMoshovos', type: 'youtube' },
      { title: 'Stanford CS231N: Deep Learning Visual', link: 'https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv', type: 'youtube' },
      { title: 'TensorFlow Lite for Microcontrollers', link: 'https://github.com/tensorflow/tflite-micro', type: 'github' },
      { title: 'ONNX: Open Neural Network Exchange', link: 'https://github.com/onnx/onnx', type: 'github' },
      { title: 'AI Hardware Jobs: Bangalore Freshers', link: 'https://www.linkedin.com/jobs/search/?keywords=AI%20Hardware&location=Bengaluru&f_E=1', type: 'linkedin' },
      { title: 'Edge AI Intel: Mysore Specialization', link: 'https://www.linkedin.com/jobs/search/?keywords=Edge%20AI&location=Mysuru&f_E=1', type: 'linkedin' },
    ]
  },
  wireless: {
    id: 'wireless',
    title: '5G & Wireless Comm',
    resources: [
      { title: 'Coursera: 5G For Everyone (Nokia)', link: 'https://www.coursera.org/learn/5g-for-everyone', type: 'coursera' },
      { title: 'NPTEL: Wireless Ad Hoc Networks', link: 'https://onlinecourses.nptel.ac.in/noc24_ee102/preview', type: 'coursera' },
      { title: '5G Course: Ericsson Academy Briefings', link: 'https://www.youtube.com/@Ericsson', type: 'youtube' },
      { title: 'Open5GS: 5G Core Source Code', link: 'https://github.com/open5gs/open5gs', type: 'github' },
      { title: 'srsRAN: 4G/5G Software Radio', link: 'https://github.com/srsran/srsRAN_4G', type: 'github' },
      { title: 'Wireless Jobs: Bangalore Freshers', link: 'https://www.linkedin.com/jobs/search/?keywords=Wireless%20Engineer&location=Bengaluru&f_E=1', type: 'linkedin' },
    ]
  },
  robotics: {
    id: 'robotics',
    title: 'Robotics & Automation',
    resources: [
      { title: 'Coursera: Modern Robotics (Northwestern)', link: 'https://www.coursera.org/specializations/modernrobotics', type: 'coursera' },
      { title: 'EdX: Robot Mechanics (Audit Free)', link: 'https://www.edx.org/course/robot-mechanics-and-control', type: 'coursera' },
      { title: 'Articulated Robotics: ROS Tutorials', link: 'https://www.youtube.com/@ArticulatedRobotics', type: 'youtube' },
      { title: 'ROS 2: Robot Operating System Source', link: 'https://github.com/ros2/ros2', type: 'github' },
      { title: 'MoveIt: Motion Planning Framework', link: 'https://github.com/ros-planning/moveit2', type: 'github' },
      { title: 'Robotics Jobs: Bangalore/Mysore Hubs', link: 'https://www.linkedin.com/jobs/search/?keywords=Robotics%20Engineer&location=Bengaluru&f_E=1', type: 'linkedin' },
    ]
  },
  pcb: {
    id: 'pcb',
    title: 'PCB & Product Dev',
    resources: [
      { title: 'Coursera: Printed Circuit Board Design', link: 'https://www.coursera.org/learn/pcb-design-altium', type: 'coursera' },
      { title: 'Phil\'s Lab: Advanced PCB Design', link: 'https://www.youtube.com/@PhilsLab', type: 'youtube' },
      { title: 'Robert Feranec: Hardware Academy', link: 'https://www.youtube.com/@RobertFeranec', type: 'youtube' },
      { title: 'KiCad: Open Source EDA Source', link: 'https://github.com/KiCad/KiCad', type: 'github' },
      { title: 'Open Hardware Repository', link: 'https://github.com/ohwr', type: 'github' },
      { title: 'PCB Design Jobs: Bangalore Core', link: 'https://www.linkedin.com/jobs/search/?keywords=PCB%20Design&location=Bengaluru&f_E=1', type: 'linkedin' },
    ]
  },
  iot: {
    id: 'iot',
    title: 'IoT & Smart Systems',
    resources: [
      { title: 'Coursera: IoT Specialization (UC Irvine)', link: 'https://www.coursera.org/specializations/iot', type: 'coursera' },
      { title: 'NPTEL: Introduction to IoT (Free Cert)', link: 'https://onlinecourses.nptel.ac.in/noc24_cs47/preview', type: 'coursera' },
      { title: 'IoT for Beginners: Microsoft Curriculum', link: 'https://github.com/microsoft/IoT-For-Beginners', type: 'github' },
      { title: 'ThingsBoard: Open Source IoT Platform', link: 'https://github.com/thingsboard/thingsboard', type: 'github' },
      { title: 'ESP32: Official IoT Framework', link: 'https://github.com/espressif/esp-idf', type: 'github' },
      { title: 'IoT Jobs: Bangalore/Mysore Freshers', link: 'https://www.linkedin.com/jobs/search/?keywords=IoT%20Engineer&location=Bengaluru&f_E=1', type: 'linkedin' },
    ]
  },
  analog: {
    id: 'analog',
    title: 'Analog & Mixed-Signal',
    resources: [
      { title: 'Razavi Electronics: Analog Briefings', link: 'https://www.youtube.com/@razavielectronics', type: 'youtube' },
      { title: 'NPTEL: Analog IC Design (Free)', link: 'https://onlinecourses.nptel.ac.in/noc24_ee62/preview', type: 'coursera' },
      { title: 'Coursera: Linear Circuits Specialization', link: 'https://www.coursera.org/learn/linear-circuits-ac-analysis', type: 'coursera' },
      { title: 'Ngspice: Open Source Circuit Simulator', link: 'https://github.com/ngspice/ngspice', type: 'github' },
      { title: 'Analog Design Jobs: Bangalore Silicon Core', link: 'https://www.linkedin.com/jobs/search/?keywords=Analog%20Design&location=Bengaluru&f_E=1', type: 'linkedin' },
      { title: 'TI/Intel Analog Pipelines (Bangalore)', link: 'https://www.linkedin.com/jobs/search/?keywords=Analog&location=Bengaluru&f_E=1', type: 'linkedin' },
    ]
  },
  automotive: {
    id: 'automotive',
    title: 'Automotive & EV Tech',
    resources: [
      { title: 'Coursera: Electric Vehicles Specialization', link: 'https://www.coursera.org/specializations/electric-vehicles', type: 'coursera' },
      { title: 'WeberAuto: EV Power Systems Tech', link: 'https://www.youtube.com/@WeberAuto', type: 'youtube' },
      { title: 'OVMS: Open Vehicle Monitoring System', link: 'https://github.com/openvehicles/Open-Vehicle-Monitoring-System-3', type: 'github' },
      { title: 'Udacity: Intro to Self-Driving Cars (Free)', link: 'https://www.udacity.com/course/intro-to-self-driving-cars--ud191', type: 'open-source' },
      { title: 'Automotive Jobs: Bangalore/Mysore Hubs', link: 'https://www.linkedin.com/jobs/search/?keywords=Automotive%20Electronics&location=Bengaluru&f_E=1', type: 'linkedin' },
      { title: 'Bosch/Continental/L&T Mysore Openings', link: 'https://www.linkedin.com/jobs/search/?keywords=Automotive&location=Mysuru&f_E=1', type: 'linkedin' },
    ]
  }
};

export default function MatrixDomainDetails({ domainId, onClose }: { domainId: string, onClose: () => void }) {
  const data = domainData[domainId];

  if (!data) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      className="fixed inset-y-0 right-0 w-full lg:w-[600px] bg-[#0a0c14] border-l border-white/5 z-[200] shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col"
    >
      {/* Header */}
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-[#020308]/60 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
            <Zap className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight italic">{data.title}</h3>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Resource Matrix v4.2</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-3 rounded-xl bg-white/5 border border-white/5 text-slate-500 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
        
        {/* Bangalore/Mysore Focus Alert */}
        <div className="p-6 rounded-2xl bg-blue-600 border border-blue-400 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
             <MapPin className="w-16 h-16 text-white" />
           </div>
           <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2 flex items-center gap-2">
             <Globe className="w-4 h-4" /> Global Hub Priority
           </h4>
           <p className="text-xs text-blue-100 font-medium leading-relaxed">
             Direct intelligence sync with **Bangalore (Silicon Valley of India)** and **Mysore (Emerging Tech Hub)** hiring pipelines.
           </p>
        </div>

        {/* Resources Grid */}
        <div className="space-y-6">
           {[
             { label: 'Academic mastery', type: 'coursera', icon: GraduationCap },
             { label: 'Technical briefings', type: 'youtube', icon: Youtube },
             { label: 'Open source protocols', type: 'github', icon: Github },
             { label: 'Career pipelines', type: 'linkedin', icon: Briefcase },
           ].map((section) => (
             <div key={section.type} className="space-y-4">
                <div className="flex items-center gap-3">
                   <section.icon className="w-4 h-4 text-blue-400" />
                   <span className="text-tactical text-slate-600">{section.label}</span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                   {data.resources.filter(r => r.type === section.type).map((res, i) => (
                     <a 
                       key={i} 
                       href={res.link} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between hover:bg-white/[0.05] hover:border-blue-500/30 transition-all group"
                     >
                       <span className="text-xs font-black text-slate-300 group-hover:text-white transition-colors">{res.title}</span>
                       <ExternalLink className="w-3.5 h-3.5 text-slate-700 group-hover:text-blue-400 transition-colors" />
                     </a>
                   ))}
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Footer Summary */}
      <div className="p-8 border-t border-white/5 bg-[#020308]/40">
         <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-700">
            <span>Protocol: GLOBAL_LEVEL_v4</span>
            <span className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-blue-500" />
              Verified intelligence
            </span>
         </div>
      </div>
    </motion.div>
  );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Newspaper, Linkedin, Github, 
  GraduationCap, Briefcase, ExternalLink,
  ChevronRight, PlayCircle
} from 'lucide-react';

interface JobProject {
  title: string;
  desc: string;
  tech: string[];
}

interface JobCourse {
  title: string;
  url: string;
  type: 'youtube' | 'course';
}

export interface JobDetail {
  title: string;
  description: string;
  news: string[];
  linkedin: {
    query: string;
    tips: string[];
  };
  projects: JobProject[];
  courses: JobCourse[];
}

export const TRENDING_JOBS_DATA: Record<string, JobDetail> = {
  'ASIC Verification Engineer': {
    title: 'ASIC Verification Engineer',
    description: "The gatekeepers of silicon. You ensure that multi-million dollar chips work flawlessly before they are manufactured.",
    news: [
      "AI accelerators (like Google TPU and Apple Silicon) have caused a massive surge in demand for Verification Engineers.",
      "The shift towards Open-Source RISC-V architectures is creating explosive opportunities for verification specialists globally."
    ],
    linkedin: {
      query: 'https://www.linkedin.com/search/results/people/?keywords=%22ASIC%20Verification%20Engineer%22%20AND%20(%22Hiring%22%20OR%20%22Recruiter%22)',
      tips: ["Search for '#Hiring ASIC Verification'", "Follow companies like NVIDIA, AMD, and Intel", "Join 'SystemVerilog Professionals' group"]
    },
    projects: [
      {
        title: "UVM Testbench for an ALU",
        desc: "Build a complete Universal Verification Methodology (UVM) testbench for a 32-bit Arithmetic Logic Unit.",
        tech: ["SystemVerilog", "UVM", "ModelSim"]
      },
      {
        title: "RISC-V Core Verification",
        desc: "Verify an open-source RISC-V processor using constrained random testing and coverage-driven verification.",
        tech: ["RISC-V", "Assertions", "Verilator"]
      }
    ],
    courses: [
      { title: "Verification Academy: UVM Basics", url: "https://verificationacademy.com/", type: "course" },
      { title: "SystemVerilog for Verification (YouTube)", url: "https://www.youtube.com/results?search_query=SystemVerilog+for+Verification", type: "youtube" }
    ]
  },
  'Embedded Firmware Developer': {
    title: 'Embedded Firmware Developer',
    description: "The soul of the hardware. You write the ultra-efficient, real-time C/C++ code that breathes life into microcontrollers and IoT devices.",
    news: [
      "The rapid expansion of Smart Home tech and Wearables has made bare-metal C programmers highly sought after.",
      "Automotive EVs are essentially 'computers on wheels', creating massive demand for safety-critical firmware engineers."
    ],
    linkedin: {
      query: 'https://www.linkedin.com/search/results/people/?keywords=%22Embedded%20Firmware%22%20AND%20(%22Hiring%22%20OR%20%22Recruiter%22)',
      tips: ["Search for '#Hiring Embedded Software'", "Follow NXP, STMicroelectronics, and Tesla", "Join 'Embedded Systems Engineers' group"]
    },
    projects: [
      {
        title: "Custom RTOS Scheduler",
        desc: "Write a simple preemptive Real-Time Operating System scheduler from scratch for an ARM Cortex-M micro.",
        tech: ["C", "ARM Assembly", "FreeRTOS"]
      },
      {
        title: "Wireless Sensor Node",
        desc: "Build an ESP32 or STM32 node that reads I2C sensors and transmits data via MQTT over Wi-Fi/BLE.",
        tech: ["ESP32", "MQTT", "I2C/SPI Protocols"]
      }
    ],
    courses: [
      { title: "FastBit Embedded Brain Academy (Udemy)", url: "https://www.udemy.com/user/kiran-nayak-2/", type: "course" },
      { title: "Embedded Systems Programming (YouTube)", url: "https://www.youtube.com/results?search_query=Embedded+Systems+Programming+Course", type: "youtube" }
    ]
  },
  'IoT Solutions Architect': {
    title: 'IoT Solutions Architect',
    description: "The bridge between edge hardware and the cloud. You design the end-to-end architecture for connected devices, from the sensor to the AWS dashboard.",
    news: [
      "Industrial IoT (Industry 4.0) is revolutionizing manufacturing, requiring architects who understand both hardware constraints and cloud scalability.",
      "Security is becoming the #1 priority in IoT, driving demand for architects skilled in hardware cryptography."
    ],
    linkedin: {
      query: 'https://www.linkedin.com/search/results/people/?keywords=%22IoT%20Solutions%20Architect%22%20AND%20(%22Hiring%22%20OR%20%22Recruiter%22)',
      tips: ["Search for '#Hiring IoT Architect'", "Follow AWS IoT, Microsoft Azure IoT, and Cisco", "Join 'Internet of Things (IoT) Network' group"]
    },
    projects: [
      {
        title: "End-to-End Smart Agriculture System",
        desc: "Design a LoRaWAN sensor network that streams soil data to an AWS IoT Core backend.",
        tech: ["LoRaWAN", "AWS IoT Core", "Python"]
      },
      {
        title: "Edge AI Camera",
        desc: "Deploy a TinyML object detection model on a Raspberry Pi or Jetson Nano, communicating over MQTT.",
        tech: ["TinyML", "OpenCV", "Edge Computing"]
      }
    ],
    courses: [
      { title: "AWS Certified IoT - Specialty", url: "https://aws.amazon.com/certification/certified-iot-specialty/", type: "course" },
      { title: "IBM Internet of Things (Coursera)", url: "https://www.coursera.org/specializations/internet-of-things", type: "course" }
    ]
  },
  'Automation & Control Engineer': {
    title: 'Automation & Control Engineer',
    description: "The master of machines. You design the control loops, PLCs, and SCADA systems that run modern factories and robotics.",
    news: [
      "The shift towards 'Dark Factories' (fully automated, lights-out manufacturing) is accelerating globally.",
      "Integration of AI into traditional PID control systems is the next major frontier in Automation."
    ],
    linkedin: {
      query: 'https://www.linkedin.com/search/results/people/?keywords=%22Automation%20Engineer%22%20AND%20(%22Hiring%22%20OR%20%22Recruiter%22)',
      tips: ["Search for '#Hiring Automation Engineer'", "Follow Siemens, Rockwell Automation, and ABB", "Join 'Industrial Automation Professionals' group"]
    },
    projects: [
      {
        title: "Self-Balancing Robot",
        desc: "Implement a sophisticated PID control system to keep a two-wheeled robot perfectly balanced.",
        tech: ["PID Tuning", "Arduino/STM32", "IMU Sensor Fusion"]
      },
      {
        title: "Virtual Factory SCADA",
        desc: "Create a PC-based SCADA dashboard using Python that reads virtual PLC data via Modbus TCP.",
        tech: ["Modbus TCP", "Python (PyQt/Tkinter)", "Ladder Logic"]
      }
    ],
    courses: [
      { title: "PLC Programming from Scratch (Udemy)", url: "https://www.udemy.com/course/plc-programming-from-scratch/", type: "course" },
      { title: "Control Systems Engineering (YouTube)", url: "https://www.youtube.com/results?search_query=Control+Systems+Engineering", type: "youtube" }
    ]
  },
  'Hardware Systems Designer': {
    title: 'Hardware Systems Designer',
    description: "The board creator. You design the schematics and route the high-speed PCBs that house the processors and power electronics.",
    news: [
      "The explosion of high-speed data centers is driving massive demand for Signal Integrity and Power Integrity experts.",
      "Miniaturization for wearables requires highly specialized skills in multi-layer HDI (High-Density Interconnect) PCB design."
    ],
    linkedin: {
      query: 'https://www.linkedin.com/search/results/people/?keywords=%22Hardware%20Design%20Engineer%22%20AND%20(%22Hiring%22%20OR%20%22Recruiter%22)',
      tips: ["Search for '#Hiring Hardware Engineer'", "Follow Apple, Google Hardware, and Altium", "Join 'Printed Circuit Board (PCB) Design' group"]
    },
    projects: [
      {
        title: "Custom Flight Controller PCB",
        desc: "Design a 4-layer PCB for a drone flight controller, including an MCU, IMU, and power management IC.",
        tech: ["Altium Designer / KiCad", "Schematic Capture", "PCB Routing"]
      },
      {
        title: "High-Speed Memory Interface",
        desc: "Simulate and route a DDR4 memory interface focusing on length matching and signal integrity.",
        tech: ["Signal Integrity", "Impedance Control", "HyperLynx"]
      }
    ],
    courses: [
      { title: "Fedevel Academy: Advanced PCB Layout", url: "https://fedevel.com/", type: "course" },
      { title: "Phil's Lab - PCB Design (YouTube)", url: "https://www.youtube.com/@PhilsLab", type: "youtube" }
    ]
  }
};

interface TrendingJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobName: string | null;
}

export default function TrendingJobModal({ isOpen, onClose, jobName }: TrendingJobModalProps) {
  const job = jobName ? TRENDING_JOBS_DATA[jobName] : null;

  return (
    <AnimatePresence>
      {isOpen && job && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[101] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-5xl max-h-[90vh] overflow-y-auto pointer-events-auto rounded-3xl border border-white/10 shadow-2xl flex flex-col"
              style={{ background: 'var(--surface-base)', boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.25)' }}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 p-6 md:p-8 border-b border-white/5 bg-black/60 backdrop-blur-xl">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shrink-0">
                      <Briefcase className="w-7 h-7 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                        {job.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-xl hover:bg-white/10 transition-colors shrink-0 bg-black/40 border border-white/10"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Industry News */}
                    <div className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 relative overflow-hidden group hover:bg-blue-500/10 transition-colors">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                          <Newspaper className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-bold text-white">Industry Pulse</h4>
                      </div>
                      <ul className="space-y-4">
                        {job.news.map((n, i) => (
                          <li key={i} className="flex gap-3 text-sm text-gray-300">
                            <ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                            <span>{n}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* LinkedIn Networking */}
                    <div className="p-6 rounded-2xl border border-sky-500/20 bg-sky-500/5 relative overflow-hidden group hover:bg-sky-500/10 transition-colors">
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all" />
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
                          <Linkedin className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-bold text-white">LinkedIn Strategy</h4>
                      </div>
                      <ul className="space-y-3 mb-5">
                        {job.linkedin.tips.map((tip, i) => (
                          <li key={i} className="flex gap-3 text-sm text-gray-300">
                            <ChevronRight className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                      <a 
                        href={job.linkedin.query}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A66C2]/20 hover:bg-[#0A66C2]/30 text-sky-300 border border-[#0A66C2]/30 text-sm font-medium transition-colors w-full justify-center"
                      >
                        <Linkedin className="w-4 h-4" />
                        Search Recruiters on LinkedIn
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                    
                    {/* Courses & Certifications */}
                    <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 relative overflow-hidden group hover:bg-rose-500/10 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-bold text-white">Top Courses & Certifications</h4>
                      </div>
                      <div className="space-y-3">
                        {job.courses.map((course, i) => (
                          <a 
                            key={i}
                            href={course.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5 hover:border-rose-500/30 transition-colors"
                          >
                            {course.type === 'youtube' ? (
                              <PlayCircle className="w-5 h-5 text-red-500 shrink-0" />
                            ) : (
                              <GraduationCap className="w-5 h-5 text-rose-400 shrink-0" />
                            )}
                            <span className="text-sm font-medium text-gray-200">{course.title}</span>
                            <ExternalLink className="w-3 h-3 text-gray-500 ml-auto" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: GitHub Projects */}
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 relative overflow-hidden h-full flex flex-col">
                      <div className="absolute top-1/2 right-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
                      
                      <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                          <Github className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-bold text-white">GitHub Project Masterclass</h4>
                      </div>
                      <p className="text-sm text-purple-200/70 mb-6 relative z-10">
                        Build these specific projects to guarantee your resume passes the technical screen for {job.title} roles.
                      </p>

                      <div className="space-y-4 relative z-10 flex-1">
                        {job.projects.map((proj, i) => (
                          <div key={i} className="p-5 rounded-xl border border-white/10 bg-black/40 hover:border-purple-500/30 transition-colors group">
                            <h5 className="text-base font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{proj.title}</h5>
                            <p className="text-sm text-gray-400 mb-4 leading-relaxed">{proj.desc}</p>
                            <div className="flex flex-wrap gap-2">
                              {proj.tech.map((t, idx) => (
                                <span key={idx} className="px-2 py-1 rounded text-xs font-medium bg-white/5 text-purple-200 border border-white/10">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <a 
                        href={`https://github.com/search?q=${encodeURIComponent(job.title)}&type=repositories`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold transition-all w-full justify-center shadow-lg shadow-purple-500/25 relative z-10"
                      >
                        <Github className="w-5 h-5" />
                        Explore Similar Projects on GitHub
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

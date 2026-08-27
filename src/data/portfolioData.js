// Rohan Prajapati — Portfolio Central Data Store (Auto-synchronized with CMS)

const BASE = import.meta.env.BASE_URL;

export const PORTFOLIO_DATA = {
  "personal": {
    "fullName": "Rohan Prajapati",
    "logoInitials": "RP",
    "designations": [
      "Computer Science & Engineering Student",
      "Software Engineering Intern",
      "Full-Stack Developer"
    ],
    "tagline": "Schema to shipped.",
    "github": "https://github.com/Rohan33833",
    "linkedin": "https://www.linkedin.com/in/rohan-prajapati-b4390631a/",
    "email": "r0164ohan@gmail.com",
    "phone": "+91 7276633833",
    "location": "Virar, Maharashtra, India",
    "profilePic": "Portfolio_pic.png",
    "resumePdf": "Rohan_Prajapati_CV.pdf",
    "introParagraph": "I build full-stack, real-time systems end to end — from database design and backend architecture to secure authentication and live UI updates. My work spans healthcare queue management, fintech invoicing, mobile safety tools, voice-interface and robotics software, and a quadcopter I built from the frame up. I'm drawn to the problems underneath the demo — race conditions, security gaps, manual processes that shouldn't be manual anymore. Currently interning as a software engineer while finishing my degree, shipping features across web, mobile, and embedded systems. If you need someone who can take a system from schema to shipped, let's talk.",
    "aboutParagraph": "I'm Rohan, a Computer Science & Engineering student at Universal College of Engineering, currently working as a software engineering intern on robotics and voice-interface software. Most of what I build starts from a real operational problem rather than a tutorial: a hospital front desk that needed live queuing instead of paper tokens, a freelancer invoicing flow that needed proper SSO and GST logic, a device that needed to recognize a spoken wake word reliably. My toolkit centers on React, Flutter, and Node.js on the software side, PostgreSQL, MongoDB, Firebase, and Redis for data, and Git for everything in between — plus a working knowledge of Arduino and embedded control from building a quadcopter from scratch. I'm as comfortable debugging a PostgreSQL advisory lock under concurrent load as I am wiring an ESC to a flight controller.",
    "mission": "To build software that fixes a real operational problem — not just software that demos well.",
    "vision": "To grow into an engineer trusted to take a system from schema to production, end to end."
  },
  "stats": [
    {
      "label": "Status Badge",
      "value": "Student",
      "desc": "CS & Engg Intern",
      "isBadge": true
    },
    {
      "label": "Certifications",
      "value": "4",
      "desc": "AWS, Anthropic, Deloitte, CBA"
    },
    {
      "label": "Projects Shipped",
      "value": "7",
      "desc": "Full-Stack, Mobile & Embedded"
    },
    {
      "label": "Hardware Built",
      "value": "1",
      "desc": "Quadcopter from Frame Up"
    }
  ],
  "skills": [
    {
      "category": "Frontend",
      "skills": [
        {
          "name": "React",
          "level": "Advanced",
          "icon": "Code2"
        },
        {
          "name": "Flutter",
          "level": "Advanced",
          "icon": "Smartphone"
        },
        {
          "name": "Android / Dart",
          "level": "Intermediate",
          "icon": "Tablet"
        },
        {
          "name": "HTML5 / CSS3 / JS",
          "level": "Advanced",
          "icon": "Layout"
        }
      ]
    },
    {
      "category": "Backend & Systems",
      "skills": [
        {
          "name": "Node.js",
          "level": "Advanced",
          "icon": "Server"
        },
        {
          "name": "REST APIs",
          "level": "Advanced",
          "icon": "Network"
        },
        {
          "name": "WebSockets",
          "level": "Advanced",
          "icon": "Zap"
        },
        {
          "name": "C++ / C (Arduino)",
          "level": "Intermediate",
          "icon": "Cpu"
        }
      ]
    },
    {
      "category": "Database & Infra",
      "skills": [
        {
          "name": "PostgreSQL",
          "level": "Advanced",
          "icon": "Database"
        },
        {
          "name": "MongoDB",
          "level": "Advanced",
          "icon": "FileText"
        },
        {
          "name": "Redis",
          "level": "Intermediate",
          "icon": "Layers"
        },
        {
          "name": "Firebase",
          "level": "Advanced",
          "icon": "Flame"
        },
        {
          "name": "Supabase",
          "level": "Intermediate",
          "icon": "Database"
        },
        {
          "name": "SQL",
          "level": "Advanced",
          "icon": "Terminal"
        }
      ]
    },
    {
      "category": "Security & DevOps",
      "skills": [
        {
          "name": "JWT Auth",
          "level": "Advanced",
          "icon": "Shield"
        },
        {
          "name": "Single Sign-On (SSO)",
          "level": "Intermediate",
          "icon": "Lock"
        },
        {
          "name": "Git / GitHub",
          "level": "Advanced",
          "icon": "GitBranch"
        },
        {
          "name": "Cyber Security",
          "level": "Intermediate",
          "icon": "ShieldCheck"
        },
        {
          "name": "Cryptography",
          "level": "Intermediate",
          "icon": "Key"
        }
      ]
    }
  ],
  "projects": [
    {
      "id": "well-queue",
      "title": "Well Queue",
      "subtitle": "Nationwide Healthcare Queue Management System",
      "category": "Full-Stack",
      "isFlagship": true,
      "tech": [
        "Flutter",
        "Node.js",
        "PostgreSQL",
        "Redis",
        "Firebase"
      ],
      "description": "A high-concurrency real-time hospital token and queue tracking system designed to eliminate long physical waiting lines and paper tokens across medical clinics.",
      "highlights": [
        "Eliminated race conditions under high concurrent token creation using PostgreSQL advisory locks.",
        "Integrated Redis caching for low-latency live queue updates.",
        "Firebase push notifications to alert patients when their turn approaches."
      ],
      "github": "https://github.com/Rohan33833",
      "badge": "Flagship System",
      "icon": "Activity"
    },
    {
      "id": "billkaro",
      "title": "BillKaro",
      "subtitle": "SaaS Invoicing Platform for Freelancers & SMBs",
      "category": "Full-Stack",
      "isFlagship": true,
      "tech": [
        "React",
        "Node.js",
        "MongoDB",
        "JWT",
        "Razorpay",
        "MSAL",
        "Recharts"
      ],
      "description": "Comprehensive SaaS billing platform offering automated GST calculation, instant client invoice PDF generation, revenue analytics, and Microsoft SSO.",
      "highlights": [
        "Implemented secure JWT & Microsoft Silent SSO (MSAL) authentication.",
        "Integrated Razorpay webhooks with signature verification for secure automated payment tracking.",
        "Interactive dashboard analytics powered by Recharts."
      ],
      "github": "https://github.com/Rohan33833",
      "badge": "Flagship Fintech",
      "icon": "CreditCard"
    },
    {
      "id": "drone",
      "title": "Custom-Built Quadcopter",
      "subtitle": "Fully Operational Autonomous Drone from Scratch",
      "category": "Embedded & Hardware",
      "isFlagship": true,
      "tech": [
        "Arduino",
        "C++",
        "Flight Controller",
        "ESC Calibration",
        "Custom Wiring"
      ],
      "description": "Engineered a custom quadcopter drone from the bare frame up, assembling electronic speed controllers (ESCs), tuning PID control loops, and wiring RF receivers.",
      "highlights": [
        "Hand-soldered custom power distribution boards and ESC signal wiring.",
        "Configured Arduino flight controller firmware for stable flight dynamics.",
        "Calibrated transmitter channels and failsafe motor cutoffs."
      ],
      "github": "https://github.com/Rohan33833",
      "badge": "Flagship Hardware",
      "icon": "Cpu"
    },
    {
      "id": "women-safety",
      "title": "Women Safety App",
      "subtitle": "Real-time SOS & Location Sentinel Mobile App",
      "category": "Mobile",
      "isFlagship": false,
      "tech": [
        "Flutter",
        "Dart",
        "MongoDB",
        "Geolocation",
        "Background Services"
      ],
      "description": "Android safety application designed to trigger instant emergency alerts, live GPS location tracking, and audio recording to trusted emergency contacts.",
      "highlights": [
        "Implemented background shake/volume button trigger for instant panic activation.",
        "Encrypted location payloads stored securely in MongoDB backend.",
        "Clean Flutter material UI designed for fast 1-tap activation."
      ],
      "github": "https://github.com/Rohan33833",
      "badge": "Android App",
      "icon": "ShieldAlert"
    },
    {
      "id": "gamified-runner",
      "title": "Gamified Running App",
      "subtitle": "GPS Territory-Capture & Fitness Gamification",
      "category": "Mobile",
      "isFlagship": false,
      "tech": [
        "Flutter",
        "Dart",
        "MongoDB",
        "GPS APIs",
        "Google Maps"
      ],
      "description": "Location-aware workout app where runners capture real-world map tiles as their 'territory' based on live GPS tracking and pace.",
      "highlights": [
        "Calculated polygon bounding boxes for real-time map tile ownership.",
        "Integrated high-precision GPS background tracking with minimal battery drain.",
        "Gamified leaderboards updated dynamically in MongoDB."
      ],
      "github": "https://github.com/Rohan33833",
      "badge": "Mobile Game",
      "icon": "MapPin"
    },
    {
      "id": "qr-attendance",
      "title": "QR Code Attendance System",
      "subtitle": "Instant Digital Roll Call & Verification App",
      "category": "Mobile",
      "isFlagship": false,
      "tech": [
        "Flutter",
        "Dart",
        "Supabase",
        "QR Scanner",
        "SQL"
      ],
      "description": "Touchless digital attendance system allowing institution instructors to generate dynamic single-use QR codes scanned by students.",
      "highlights": [
        "Dynamic time-expiring QR payloads to prevent proxy attendance.",
        "Real-time attendance syncing directly into Supabase PostgreSQL tables.",
        "Exportable attendance CSV reports for faculty records."
      ],
      "github": "https://github.com/Rohan33833",
      "badge": "Utility App",
      "icon": "QrCode"
    },
    {
      "id": "whatsapp-clone",
      "title": "WhatsApp Real-Time Web App",
      "subtitle": "Full-Duplex Instant Messaging Platform",
      "category": "Full-Stack",
      "isFlagship": false,
      "tech": [
        "React",
        "Node.js",
        "MongoDB",
        "WebSockets",
        "Socket.io"
      ],
      "description": "Full-stack real-time messaging application mimicking core WhatsApp web features including direct chats, typing indicators, read receipts, and online status.",
      "highlights": [
        "Built low-latency bidirectional messaging using WebSockets (Socket.io).",
        "Stored persistent conversation history and attachment metadata in MongoDB.",
        "Implemented optimistic UI updates for instant message feedback."
      ],
      "github": "https://github.com/Rohan33833",
      "badge": "Real-Time System",
      "icon": "MessageSquare"
    }
  ],
  "highlights": [
    {
      "title": "Well Queue Concurrency & Advisory Lock Architecture",
      "subtitle": "Eliminating Queue Race Conditions Under Heavy Load",
      "problem": "When hundreds of patients simultaneously requested clinic tokens during peak morning hours, database row lock contention caused duplicate token numbers and database thread exhaustion.",
      "solution": "Implemented PostgreSQL transaction-level advisory locks combined with a Redis atomic counter strategy. Token generation requests are serialized cleanly without locking entire tables, while live queue positions are streamed via WebSockets.",
      "impact": "Zero race condition duplicates recorded during peak load stress testing and sub-50ms token generation latency.",
      "tags": [
        "PostgreSQL",
        "Redis",
        "Advisory Locks",
        "Concurrency"
      ]
    },
    {
      "title": "BillKaro Enterprise Authentication & Webhook Security",
      "subtitle": "Hardening SaaS Billing against Unauthorized Access & Webhook Spoofing",
      "problem": "Freelancer financial data required strict multi-tenant isolation, seamless corporate login (SSO), and cryptographic validation of payment events from external gateways.",
      "solution": "Configured MSAL (Microsoft Authentication Library) for enterprise silent SSO alongside standard JWT access tokens. Built custom Express middleware validating Razorpay HMAC-SHA256 signatures before triggering automated invoice status updates.",
      "impact": "Flawless multi-tenant tenant isolation and robust protection against payment webhook spoofing.",
      "tags": [
        "JWT",
        "MSAL SSO",
        "Razorpay Webhooks",
        "HMAC-SHA256"
      ]
    }
  ],
  "workExperience": [
    {
      "role": "Software Engineering Intern",
      "company": "Robotics & AI Software Company",
      "location": "Mumbai, India",
      "period": "Present Intern",
      "bullets": [
        "Contributed to a wake-word / voice-activation detection feature, refining the signal detection pipeline enabling devices to respond reliably to spoken triggers.",
        "Engineered user-facing software interfaces for an AI robot, designing clean interaction flows between end users and robot hardware software.",
        "Implemented Single Sign-On (SSO) and silent SSO mechanisms, ensuring user sessions persist seamlessly without repetitive manual login prompts."
      ]
    }
  ],
  "education": [
    {
      "degree": "Bachelor of Engineering — Computer Science & Engineering",
      "institution": "Universal College of Engineering",
      "location": "Virar, Maharashtra",
      "status": "In Progress"
    },
    {
      "degree": "Higher Secondary Certificate (HSC) — Science",
      "institution": "R. P. Jr. College of Arts, Science & Commerce",
      "location": "Maharashtra Board",
      "status": "Completed",
      "score": "Science Stream"
    },
    {
      "degree": "Secondary School Certificate (SSC)",
      "institution": "National English High School",
      "location": "Maharashtra Board",
      "status": "Completed",
      "score": "General Academics"
    }
  ],
  "certifications": [
    {
      "id": "aws-cloud",
      "title": "AWS Academy Graduate – Cloud Architecting",
      "issuer": "Amazon Web Services (AWS)",
      "date": "August 2026",
      "image": "certificate/AWS_Academy_Graduate___Cloud_Architecting___Training_Badge_Badge20260804-8-ealt6q_page-0001.jpg",
      "description": "Demonstrates expertise in designing scalable, resilient, and fault-tolerant cloud architectures on AWS infrastructure."
    },
    {
      "id": "claude-code",
      "title": "Claude Code in Action",
      "issuer": "Anthropic",
      "date": "2026",
      "image": "certificate/Anthropic certificate claude code in action_page-0001.jpg",
      "description": "Advanced competency in leveraging Anthropic AI models, prompt engineering, and agentic code synthesis."
    },
    {
      "id": "deloitte-tech",
      "title": "Deloitte Australia Technology Job Simulation",
      "issuer": "Forage",
      "date": "August 2026",
      "image": "certificate/Deloitte_completion_certificate_page-0001.jpg",
      "description": "Practical simulation covering technology architecture, system proposal analysis, and enterprise software evaluation."
    },
    {
      "id": "cba-tech",
      "title": "Commonwealth Bank Tech Explorer Job Simulation",
      "issuer": "Forage",
      "date": "August 2026",
      "image": "certificate/Commonwealth_bank_completion_certificate_page-0001.jpg",
      "description": "Simulated software engineering tasks focused on banking technology infrastructure, security protocols, and data engineering."
    }
  ],
  "lastModified": "2026-08-27T15:43:30.440Z"
};

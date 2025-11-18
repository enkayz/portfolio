
import React from 'react';
import { Experience } from './types';

export const PROFILE_SUMMARY = "Senior systems/DevOps engineer and telephony specialist with 20+ years of full-stack delivery across hosting, cloud, and carrier-grade voice platforms. Strong record of designing, deploying and maintaining resilient infrastructure, IVR and SIP environments, and end-to-end business workflows. Equally comfortable hands-on in code, on the command line, or in front of clients and non-technical stakeholders.";

export const SKILLS = {
  devops: {
    label: "DevOps & Software Engineering",
    items: [
      "Linux (Debian/Ubuntu/CentOS), shell scripting (Bash/Zsh), system hardening, automation.",
      "Full-stack web: LAMP, MERN/MEAN, REST APIs, portal and dashboard development.",
      "Languages: PHP, Python, Java, C#/.NET, JavaScript/TypeScript.",
      "Cloud & SaaS: AWS, Azure, GCP (POCs), Office 365, containerised and VM-based deployments.",
      "Source control and collaboration: Git/GitHub, Jira/Confluence, CI-style workflows.",
    ]
  },
  telephony: {
    label: "Telephony, Networks & Audio-Visual",
    items: [
      "Asterisk and SIP trunking, IVR design, MoH platforms, Broadsoft and Cisco integrations.",
      "IP networking, OSI-layer troubleshooting, VPNs, QoS, fibre/copper network design.",
      "CCTV and physical security: camera deployment, AI tripwires, networked recording solutions.",
      "Studio and live sound: signal flow design, PA tuning, digital mixers, hybrid analog/digital rigs.",
      "Training, documentation, and workflow design for technical and non-technical users.",
    ]
  },
  chips: [
    "DevOps & Automation", "Asterisk / SIP", "LAMP / MERN", "Linux & Networking",
    "Office 365 / Azure", "Telephony Product Dev", "CCTV & Security", "Audio & Live Sound"
  ]
};

export const EXPERIENCE: Experience[] = [
  {
    title: "Principal Consultant – System 8 / The AI Guy",
    meta: "Self-employed · 2021 – Present · Perth, WA",
    org: "Independent consulting – AI automation, DevOps, telephony, and audio-visual systems",
    duties: [
      "Design and delivery of AI-assisted automation for small businesses (booking, notification, and CRM-style workflows).",
      "Architecture and implementation of cloud-hosted and on-prem services, including Linux servers, containers, and VoIP stacks.",
      "Studio and live-venue AV design: routing templates, digital mixer configurations, and hybrid analog/digital integration.",
    ],
  },
  {
    title: "Technical Director & Audio Systems Engineer",
    meta: "Elemental Sound / Elemental Music Club · 2023 – Present · O'Connor, WA",
    org: "Rehearsal studios, small venue and community music space",
    duties: [
      "End-to-end design and commissioning of multi-room rehearsal and performance audio systems.",
      "Development of repeatable setup and shutdown procedures, documentation, and laminated checklists.",
      "Hands-on live sound duties for community music nights and events; mentoring musicians and staff.",
    ],
  },
  {
    title: "CCTV & Network Installer (Consultant)",
    meta: "Five Star Security & Electrical · 2020 – 2021 · Perth, WA",
    duties: [
        "CCTV camera installation, configuration and commissioning, including AI tripwire setup.",
        "Network and data cabling to support CCTV and related infrastructure.",
        "Office 365 migration support and general small-business IT assistance.",
    ]
  },
  {
    title: "Telephony Engineer",
    meta: "HostTel · 2019 – 2020 (Full-time); 2009 – 2018 (Ad-hoc) · Perth, WA",
    duties: [
        "Development of Asterisk-based cloud telephony platform to deliver SIP trunks for business clients.",
        "Refactoring and stabilising interdependent service scripts through reverse engineering of legacy codebases.",
        "Support for production voice systems, troubleshooting call quality and routing issues across multiple carriers.",
    ]
  },
  {
    title: "Senior Software Engineer",
    meta: "Rackcorp · 2018 – 2020 (Full-time); 2013 – 2017 (Ad-hoc)",
    duties: [
        "LAMP-stack development for customer self-service portals on a global hosting platform.",
        "Platform development for Big Data as a Service offerings, including ingestion, storage and analytics pipelines.",
        "Collaboration with infrastructure teams on performance tuning and monitoring for high-uptime environments.",
    ]
  },
  {
    title: "Product Development Manager",
    meta: "Captivate Global (Online On Hold) · 2009 – 2012",
    duties: [
        "DevOps and product ownership for music-on-hold and telephony content-delivery platforms.",
        "Development of embedded devices to deliver MoH to IP telephony systems (Cisco, Avaya and others).",
        "Liaison between engineering, sales and customers to shape product roadmaps and deployments.",
    ]
  },
];

export const PROJECTS = [
    "AI-assisted telephony and booking workflows – Designed and prototyped pipelines combining VoIP, speech technologies and cloud services to automate inbound calls, reminders and simple customer interactions.",
    "Multi-room rehearsal studio build – Planned and implemented audio routing, monitoring and patching for a multi-room rehearsal and small-venue space, including standardised configuration templates and maintenance procedures.",
    "Big Data as a Service platform components – Contributed to design and implementation of data ingestion and analytics layers for hosting-provider big data services."
];

export const CONTACT = {
    location: "O'Connor, WA",
    mobile: "0415 049 760",
    email: "dylan@system8.com.au",
    web: "https://www.system8.com.au",
    github: "https://github.com/enkayz"
};

export const ADDITIONAL_INFO = [
    "Active open-source contributor with a long-running GitHub history under @enkayz.",
    "Experienced musician (keys/percussion) and live sound operator.",
    "Comfortable mentoring junior staff and end users; extensive history of training delivery and documentation.",
    "References available on request.",
];

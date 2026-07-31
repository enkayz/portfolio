
import React from 'react';
import { Experience } from './types';

export const PROFILE_SUMMARY = "Systems, DevOps and automation technologist with 20+ years translating business workflows across Microsoft, Linux, web, voice, embedded and audio-visual platforms. I specialise in reconstructing undocumented systems, diagnosing failures across infrastructure and application boundaries, and designing secure transition paths that preserve useful capability while a supportable target architecture is proven. My delivery loop is AI-accelerated but evidence-led: primary documentation, instrumented tests, proof-of-capability spikes, decision records and operational runbooks.";

export const CURRENT_FOCUS = {
  title: "Land asset platform discovery, replacement architecture & estimation",
  summary: "Available to augment the LASP Phase 1 team where the immediate requirement is to reconstruct the operating model, test the legacy failure hypothesis, prove candidate architectures and create a pricing-grade basis for fixed-cost delivery—not assume a SharePoint lift-and-shift.",
  items: [
    "Recover the real purpose of land, sales, approval, document, identity and reporting workflows before selecting a platform.",
    "Diagnose the legacy access failure across TLS, certificates, identity, IIS, SQL, SharePoint dependencies and external publication without confusing continuity with the target architecture.",
    "Treat Power Pages + Dataverse, model-driven Power Apps, SharePoint Online / Power Platform, custom Azure and hybrid transition as options to test rather than predetermined conclusions.",
    "Use proof-of-capability spikes to resolve security, records, integration, performance and user-experience risks in a representative environment.",
    "Deliver current/target architecture, option analysis, ADRs, acceptance criteria, migration waves, work packages and estimates another delivery team can safely price.",
  ],
};

export const SKILLS = {
  microsoft: {
    label: "Business Systems Discovery, Security & Microsoft Estate",
    items: [
      "Legacy application discovery: business purpose, farm/IIS topology, data stores, integrations, custom components, workflows, jobs and identity boundaries.",
      "Windows Server, Active Directory, Entra ID, Microsoft 365, Azure, IIS, SQL connectivity, certificates/PKI, TLS/SCHANNEL and authentication troubleshooting.",
      "Power Platform architecture across Dataverse, Power Pages, model-driven apps, SharePoint Online, Microsoft Graph and PowerShell automation.",
      "Data-security and records controls: least privilege, Conditional Access, MFA, DLP, sensitivity labels, audit, retention and controlled external access.",
      "Option analysis spanning stabilisation, archive/read-only, hybrid transition, staged migration and full re-platforming with explicit operational risk.",
    ]
  },
  integration: {
    label: "Middleware, Cross-Platform Solutions & Interfaces",
    items: [
      "Protocol and data bridges across REST APIs, webhooks, databases, files, message/event flows, identity stores and proprietary interfaces.",
      "Full-stack delivery using C#/.NET, PHP, Python and JavaScript/TypeScript across Windows, Linux, cloud, containers and virtual machines.",
      "Interface engineering for browsers, desktops, phones, tablets, embedded appliances, televisions, telephony/DTMF and audio-visual control surfaces.",
      "Architecture-level fault isolation across application, identity, transport, infrastructure and operational boundaries.",
      "Rapid AI-assisted research and prototyping with claims validated against primary documentation, logs, repeatable tests and working artefacts.",
    ]
  },
  chips: [
    "Business-System Discovery", "Power Platform / Dataverse", "M365 / Azure",
    "Identity / TLS / PKI", "Data Security / Records", "PowerShell / Graph",
    "Middleware / APIs", ".NET / Python / PHP / JS", "Linux / Networking",
    "Legacy Recovery", "Cross-Device UX"
  ]
};

export const DELIVERY_METHOD = [
  { label: "Discover", detail: "Recover business purpose, technology, data, identities, controls, usage, exceptions and undocumented dependencies." },
  { label: "Design", detail: "Define candidate architectures and the minimum proof required to compare them." },
  { label: "Document", detail: "Capture evidence, diagrams, decisions, assumptions, risks and ownership while they are current." },
  { label: "Deliver", detail: "Produce working spikes, acceptance criteria, transition waves and pricing-grade work packages." },
  { label: "Distribute", detail: "Make outputs inspectable and usable by delivery, security, records, operations and executive stakeholders." },
  { label: "Dialogue", detail: "Resolve contradictions with domain experts and keep decisions traceable." },
  { label: "Develop", detail: "Iterate from verified feedback without losing the controlled source of truth." },
];

export const QUALIFICATIONS = [
  {
    title: "Certified Novell Administrator (CNA) — legacy certification",
    detail: "Formal foundation in enterprise directory services, networked applications, identity administration and systematic troubleshooting.",
  },
  {
    title: "Microsoft ecosystem technical development",
    detail: "Long-running practical work across Office/Microsoft 365, Azure, Windows infrastructure, SharePoint information protection, PowerShell and integration.",
  },
  {
    title: "Technical peer recognition — Robert Crane, Microsoft MVP",
    detail: "During direct technical engagement, Rob noted that Dylan had raised the one question he was actively seeking to answer himself—representative of Dylan's ability to find the unresolved edge in an apparently familiar system.",
  },
  {
    title: "Cross-domain engineering practice",
    detail: "Two decades spanning software, hosting, networks, carrier voice, embedded devices, physical security and professional audio—useful where legacy behaviour crosses conventional team boundaries.",
  },
];

export const EXPERIENCE: Experience[] = [
  {
    title: "Systems Engineer – CMTG",
    meta: "Recent MSP engagement · Perth, WA",
    org: "Managed services and Microsoft business systems",
    duties: [
      "Resolved client incidents at the boundary between legacy applications, Windows infrastructure, Microsoft 365, identity, certificates, networking and endpoint security.",
      "Recovered and documented poorly understood configurations, distinguishing immediate continuity fixes from durable modernisation work.",
      "Supported multiple clients with legacy-to-cloud access and integration problems, including TLS/certificate dependencies, authentication paths and Microsoft 365 adoption.",
    ],
  },
  {
    title: "Principal Consultant – System 8 / The AI Guy",
    meta: "Self-employed · 2021 – Present · Perth, WA",
    org: "Independent systems integration, automation and technical recovery",
    duties: [
      "Design and delivery of middleware and AI-assisted automation joining legacy applications, Microsoft/cloud services, telephony and business workflows.",
      "Architecture and implementation of cloud-hosted and on-premises services, including Windows/Linux servers, containers, APIs, portals and VoIP stacks.",
      "Technical discovery, fault isolation, documentation and pragmatic remediation for systems without current design records or a clean vendor boundary.",
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
    "Legacy Microsoft security and access recovery – Diagnosed client systems spanning Microsoft 365 adoption, Windows infrastructure, certificates/TLS, identity and application compatibility; restored continuity while documenting modernisation paths.",
    "SharePoint information-protection automation – Developed Microsoft 365 administration concepts and tooling around SharePoint DLP, sensitivity labels, governance and repeatable deployment.",
    "Cross-platform middleware – Built adapters and workflows connecting web applications, databases, APIs, Linux/Windows services, mobile interfaces, embedded devices and telephony systems.",
    "AI-assisted telephony and booking workflows – Designed and prototyped pipelines combining VoIP, DTMF, speech technologies and cloud services to automate inbound calls, reminders and customer interactions.",
    "Multi-room rehearsal studio build – Planned and implemented audio routing, monitoring and patching for a multi-room rehearsal and small-venue space, including standardised configuration templates and maintenance procedures.",
    "Big Data as a Service platform components – Contributed to design and implementation of data ingestion and analytics layers for hosting-provider big data services."
];

export const TECHNICAL_REFERENCES = [
  { label: "System 8 Docs: LASP replacement discovery brief", url: "https://docs.system8.com.au/lasp-discovery/" },
  { label: "Field note: architecture before platform selection", url: "https://blog.system8.com.au/architecture-before-platform/" },
  { label: "System 8 Docs: secure hybrid transition pattern", url: "https://docs.system8.com.au/hybrid-transition/" },
  { label: "System 8 way of working: Discover → Develop", url: "https://docs.system8.com.au/way-of-working/" },
  { label: "Live System 8 interaction surface", url: "https://live.system8.com.au/" },
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
    "Fast learner who uses AI to compress research, prototyping and documentation cycles while retaining human validation and technical accountability.",
    "Experienced musician, audio systems engineer and live operator; applies the same signal-path discipline to distributed software and infrastructure.",
    "Comfortable interviewing domain experts, mentoring technical staff and translating findings for project managers, executives and end users.",
    "References available on request.",
];

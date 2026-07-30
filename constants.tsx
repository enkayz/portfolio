
import React from 'react';
import { Experience } from './types';

export const PROFILE_SUMMARY = "Legacy systems discovery and integration engineer with 20+ years translating business workflows across Microsoft, Linux, web, voice, embedded and audio-visual platforms. I specialise in reverse-engineering undocumented systems, diagnosing failures across infrastructure and application boundaries, and building the middleware needed to preserve useful capability while a supportable target architecture is established. My delivery loop is AI-accelerated but evidence-led: official documentation, instrumented tests, proof-of-capability, decision records and operational runbooks.";

export const CURRENT_FOCUS = {
  title: "Legacy SharePoint continuity, recovery & modernisation",
  summary: "Available to augment a SharePoint or Microsoft 365 delivery team where the immediate problem is not yet a clean migration backlog: the farm is old, access is failing, business logic is poorly documented, and the least-disruptive route is still unknown.",
  items: [
    "Recover the real purpose of sites, pages, lists, workflows, custom solutions, integrations and security boundaries before selecting a replacement pattern.",
    "Trace end-to-end access failures across certificates, TLS 1.2, SCHANNEL, WinHTTP, .NET, IIS, SQL connectivity, authentication, service accounts, SPNs and Kerberos constrained delegation.",
    "Assess controlled continuity through Microsoft Entra Application Proxy, pre-authentication, Conditional Access and KCD without treating a proxy as a substitute for backend supportability.",
    "Compare stabilisation, archive/read-only, a staged database-attach path to SharePoint Server Subscription Edition, and Microsoft 365/Power Platform re-platforming using evidence, operational risk, records obligations and whole-of-life cost.",
    "Convert unknowns into proof-of-capability tests, architecture decisions, acceptance criteria, work packages and estimates that another delivery team can safely price.",
  ],
};

export const SKILLS = {
  microsoft: {
    label: "Legacy Microsoft, Identity & Data Security",
    items: [
      "SharePoint 2013 discovery: farm/IIS topology, AAM, content databases, service applications, WSP/full-trust components, workflows, scheduled jobs and integration dependencies.",
      "Windows Server, Active Directory, Entra ID, Microsoft 365, Azure, IIS, SQL Server connectivity, certificates/PKI, TLS/SCHANNEL and identity troubleshooting.",
      "Entra Application Proxy, Integrated Windows Authentication, Kerberos constrained delegation, SPNs, Conditional Access, MFA and least-privilege access patterns.",
      "Microsoft Graph and PowerShell automation; SharePoint information protection, DLP, sensitivity labels, audit and records-aware solution design.",
      "Supportability analysis: controlled recovery, staged upgrade, hybrid transition, archive and re-platform options with explicit security and operational risk.",
    ]
  },
  integration: {
    label: "Middleware, Cross-Platform Solutions & Interfaces",
    items: [
      "Protocol and data bridges across REST APIs, webhooks, databases, files, message/event flows, identity stores and proprietary application interfaces.",
      "Full-stack delivery using C#/.NET, PHP, Python, Java and JavaScript/TypeScript across Windows, Linux, cloud, containers and virtual machines.",
      "Interface engineering for browsers, desktops, laptops, phones, tablets, embedded appliances, televisions, telephony/DTMF and audio-visual control surfaces.",
      "Asterisk, SIP, IVR, Broadsoft and Cisco integrations; IP networking, VPNs, QoS and OSI-layer fault isolation.",
      "Rapid technical acquisition through AI-assisted research and prototyping, with claims validated against primary documentation, logs, repeatable tests and working artefacts.",
    ]
  },
  chips: [
    "SharePoint 2013 Recovery", "M365 / Azure", "Entra App Proxy / KCD",
    "TLS / PKI / IIS", "Data Security / DLP", "PowerShell / Graph",
    "Middleware / APIs", ".NET / Python / PHP / JS", "Linux / Networking",
    "Asterisk / SIP / DTMF", "Cross-Device UX"
  ]
};

export const DELIVERY_METHOD = [
  {
    label: "Discover",
    detail: "Inventory technology, data, identities, controls, business purpose, usage, exceptions and undocumented dependencies.",
  },
  {
    label: "Prove",
    detail: "Time-box the highest-risk assumptions in a representative lab or read-only environment and preserve the evidence.",
  },
  {
    label: "Decide",
    detail: "Compare continuity, upgrade, hybrid and replacement options against security, supportability, cost and operational impact.",
  },
  {
    label: "Transfer",
    detail: "Deliver diagrams, scripts, ADRs, test results, runbooks, acceptance criteria and pricing-grade work packages.",
  },
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
  {
    label: "Microsoft: Enable TLS 1.2 in SharePoint Server 2013",
    url: "https://learn.microsoft.com/en-us/sharepoint/security-for-sharepoint-server/enable-tls-and-ssl-support-in-sharepoint-2013",
  },
  {
    label: "Microsoft: Publish on-premises apps with Entra Application Proxy",
    url: "https://learn.microsoft.com/en-us/entra/identity/app-proxy/overview-what-is-app-proxy",
  },
  {
    label: "Microsoft: Kerberos constrained delegation for Application Proxy",
    url: "https://learn.microsoft.com/en-us/entra/identity/app-proxy/how-to-configure-sso-with-kcd",
  },
  {
    label: "Microsoft: staged upgrade path from SharePoint Server 2013",
    url: "https://learn.microsoft.com/en-us/sharepoint/upgrade-and-update/upgrade-from-sharepoint2013-to-sharepointserver-2019",
  },
  {
    label: "Microsoft: upgrade content databases to SharePoint Server Subscription Edition",
    url: "https://learn.microsoft.com/en-us/sharepoint/upgrade-and-update/upgrade-content-databases-subscription-edition",
  },
  {
    label: "Microsoft lifecycle: SharePoint Server 2019 support ended 14 July 2026",
    url: "https://learn.microsoft.com/en-us/lifecycle/products/sharepoint-server-2019",
  },
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

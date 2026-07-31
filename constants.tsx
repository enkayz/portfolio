import React from 'react';
import { Experience } from './types';

export const PROFILE_SUMMARY = "Through System 8, I help organisations recover, govern and modernise business systems. The work spans Microsoft 365, Azure, Power Platform, legacy applications and the integration between them—especially where the current state is undocumented, crosses vendor boundaries or must move without losing operational history.";

export const SELECTED_WORK = [
  {
    title: "Microsoft 365 governance and information control",
    summary: "Practical control sets for SharePoint structure, external access, Purview, Power Platform application lifecycle and Microsoft Graph automation.",
    url: "https://docs.system8.com.au/microsoft-365-governance-baseline/",
  },
  {
    title: "Scribe8 meeting intelligence",
    summary: "A transcript-first Microsoft 365 knowledge service: permission-aware meeting memory, evidence-linked outputs and human-approved actions.",
    url: "https://docs.system8.com.au/scribe8-technical-specification/",
  },
  {
    title: "LASP replacement analysis",
    summary: "Independent public-source analysis of discovery, legacy recovery, target-platform proof and fixed-price readiness for a complex government business system.",
    url: "https://docs.system8.com.au/lasp-discovery/",
  },
  {
    title: "Controlled automation model",
    summary: "A workflow pattern that separates observation, proposal, authority, execution and verification instead of treating API access as permission.",
    url: "https://docs.system8.com.au/automation-platform/",
  },
];

export const SKILLS = {
  microsoft: {
    label: "Microsoft 365 and business systems",
    items: [
      "SharePoint and Microsoft 365 information architecture, migration, governance and support.",
      "Entra ID, external access, Conditional Access, application identities and least privilege.",
      "Power Platform architecture across Dataverse, Power Pages, model-driven apps and Power Automate.",
      "Purview sensitivity, DLP, retention and records controls designed as separate but coordinated functions.",
    ],
  },
  integration: {
    label: "Integration, automation and technical recovery",
    items: [
      "Recovery and documentation of legacy systems across application, identity, database, network and certificate boundaries.",
      "Middleware using APIs, webhooks, files, databases, message flows and proprietary interfaces.",
      "C#/.NET, PHP, Python and JavaScript/TypeScript across Windows, Linux, cloud and containers.",
      "Microsoft Graph, PowerShell and agent workflows with explicit authority, audit and verification.",
    ],
  },
  chips: [
    "Microsoft 365", "SharePoint", "Entra ID", "Power Platform", "Dataverse",
    "Power Pages", "Purview", "Microsoft Graph", "PowerShell", "Azure",
    "APIs / Middleware", ".NET / Python / PHP / JS", "Linux / Networking",
  ],
};

export const DELIVERY_METHOD = [
  { label: "Discover", detail: "Recover the purpose, current state, dependencies, constraints and evidence." },
  { label: "Design", detail: "Compare viable options and define the proof required to choose between them." },
  { label: "Document", detail: "Keep decisions, diagrams, assumptions, tests, owners and risks traceable." },
  { label: "Deliver", detail: "Produce working assets with acceptance, support and recovery conditions." },
  { label: "Distribute", detail: "Put each output where its operator, owner and reviewer can use it." },
  { label: "Dialogue", detail: "Resolve contradictions with the people who know and operate the work." },
  { label: "Develop", detail: "Iterate from verified feedback without losing provenance." },
];

export const QUALIFICATIONS = [
  {
    title: "Certified Novell Administrator (CNA) — legacy certification",
    detail: "Early formal grounding in enterprise directory services, networked applications, identity administration and systematic troubleshooting.",
  },
  {
    title: "Cross-platform technical practice",
    detail: "Experience since the early 2000s across software, hosting, networks, Microsoft systems, carrier voice, embedded devices and physical infrastructure.",
  },
];

export const EXPERIENCE: Experience[] = [
  {
    title: "Systems Engineer – CMTG",
    meta: "Recent MSP engagement · Perth, WA",
    org: "Managed services and Microsoft business systems",
    duties: [
      "Resolved incidents spanning legacy applications, Windows infrastructure, Microsoft 365, identity, certificates, networking and endpoint security.",
      "Recovered and documented poorly understood configurations, separating immediate continuity fixes from durable modernisation work.",
    ],
  },
  {
    title: "Principal Consultant – System 8",
    meta: "Independent practice · Perth, WA",
    org: "Systems integration, automation and technical recovery",
    duties: [
      "Designed middleware and automation joining legacy applications, Microsoft/cloud services, telephony and business workflows.",
      "Delivered cloud-hosted and on-premises services across Windows, Linux, containers, APIs, portals and VoIP.",
    ],
  },
  {
    title: "Telephony Engineer – HostTel",
    meta: "Production and project engagements",
    duties: [
      "Developed and supported Asterisk-based business telephony, SIP trunks, routing and carrier integrations.",
      "Reverse-engineered and stabilised interdependent legacy service scripts.",
    ],
  },
  {
    title: "Senior Software Engineer – Rackcorp",
    meta: "Hosting and platform engineering",
    duties: [
      "Built customer self-service and data-platform components across LAMP applications and hosting infrastructure.",
      "Worked with infrastructure teams on deployment, performance and operational monitoring.",
    ],
  },
  {
    title: "Product Development – Online On Hold / Captivate Global",
    meta: "Telephony products and embedded delivery systems",
    duties: [
      "Owned development and operations for music-on-hold and telephony content-delivery platforms.",
      "Built embedded devices and integrations for Cisco, Avaya and other business telephony environments.",
    ],
  },
];

export const TECHNICAL_REFERENCES = [
  { label: "Microsoft 365 governance baseline", url: "https://docs.system8.com.au/microsoft-365-governance-baseline/" },
  { label: "SharePoint migration decision framework", url: "https://docs.system8.com.au/sharepoint-migration-decision-framework/" },
  { label: "Power Pages and Dataverse fit assessment", url: "https://docs.system8.com.au/power-pages-dataverse-fit/" },
  { label: "Scribe8 technical specification", url: "https://docs.system8.com.au/scribe8-technical-specification/" },
  { label: "System 8 articles", url: "https://blog.system8.com.au/" },
  { label: "System 8 live demonstrations", url: "https://live.system8.com.au/" },
];

export const CONTACT = {
  location: "Greater Perth / Fremantle, WA",
  email: "dylan@system8.com.au",
  web: "https://system8.com.au",
  github: "https://github.com/enkayz",
};

export const ADDITIONAL_INFO = [
  "Long-running public technical history under @enkayz.",
  "Comfortable moving between infrastructure, software, operations and user-facing workflow.",
  "Music and live-sound work remains an adjacent practice, not the focus of System 8's IT consultancy portfolio.",
];

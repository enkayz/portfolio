
import React from 'react';
import { Experience } from './types';

export const PROFILE_SUMMARY = "Microsoft 365 modern work consultant with two decades of delivery across identity, collaboration, security, and automation. I help organisations (and the MSPs that support them) migrate, secure, and govern their tenants; modernise collaboration with Teams, SharePoint, and Exchange Online; and automate business processes with Power Platform and Graph/PowerShell. Equally comfortable running workshops with business leaders, building deployment scripts, or coaching administrators through adoption.";

export const SKILLS = {
  devops: {
    label: "Microsoft 365 Modern Work",
    items: [
      "Microsoft 365 tenant design, hardening, and lifecycle management across Exchange Online, SharePoint, OneDrive, and Teams.",
      "Modern collaboration rollouts: Teams voice and meeting rooms, SharePoint sites/intranets, Viva/Loop pilots, and adoption campaigns.",
      "Identity and access: Entra ID (Azure AD), Conditional Access, MFA, PIM, and role-based delegation for MSP and customer tenants.",
      "Endpoint and security: Intune for Windows/macOS/iOS, Defender suite, Purview compliance, and secure score remediation.",
      "Automation: PowerShell/Graph automation, Power Platform (Power Automate/Apps), governance policies, and admin/runbook scripting.",
    ]
  },
  telephony: {
    label: "Cloud Voice, Infrastructure & Delivery",
    items: [
      "Teams Phone and hybrid voice integrations, number porting, call flows/auto attendants, and SBC/SIP configurations.",
      "Migration projects for MSP clients: tenant-to-tenant moves, Exchange/SharePoint/OneDrive data migration, and coexistence planning.",
      "Network fundamentals for collaboration: QoS, VPN, and bandwidth/latency tuning for Microsoft cloud services.",
      "Change management: executive briefings, admin upskilling, and user-focused enablement to drive adoption and reduce support load.",
      "Engagement delivery: requirements discovery, statement of work creation, project governance, and post-cutover support with MSP partners.",
    ]
  },
  chips: [
    "Microsoft 365", "Teams Phone", "SharePoint & OneDrive", "Entra ID / Intune",
    "Power Platform", "Security & Compliance", "Automation & PowerShell", "MSP Delivery"
  ]
};

export const EXPERIENCE: Experience[] = [
  {
    title: "Principal Consultant – System 8 / The AI Guy",
    meta: "Self-employed · 2021 – Present · Perth, WA",
    org: "Modern work and automation consultancy for Microsoft-focused SMBs and MSP partners",
    duties: [
      "Plan and execute Microsoft 365 modernisation programs: identity hardening, Teams/SharePoint rollouts, and secure collaboration baselines.",
      "Deliver Teams Phone and hybrid voice projects, including call routing, number porting, SBC/SIP integration, and admin training.",
      "Build PowerShell/Graph runbooks and Power Automate workflows to standardise provisioning, governance, and client onboarding for MSPs.",
    ],
  },
  {
    title: "Modern Work Consultant (MSP Engagements)",
    meta: "Multiple MSPs · 2019 – Present · Remote & Perth, WA",
    duties: [
        "Partner with MSP teams to scope, price, and deliver Microsoft 365 projects: tenant builds, Intune baselines, and secure score remediation.",
        "Lead migrations from on-prem Exchange/file servers and legacy cloud to Exchange Online, SharePoint/OneDrive, and Teams with minimal downtime.",
        "Coach MSP engineers through deployment patterns, incident response, and adoption playbooks inspired by Microsoft MVP community leaders like Robert Crane.",
    ]
  },
  {
    title: "Telephony & Teams Voice Engineer",
    meta: "HostTel · 2019 – 2020 (Full-time); 2009 – 2018 (Ad-hoc) · Perth, WA",
    duties: [
        "Evolved SIP and Asterisk delivery patterns into Teams Phone-aligned call flows, including auto attendants and direct routing readiness.",
        "Reverse engineered and stabilised legacy voice automation scripts, replacing them with modern PowerShell and API-based orchestration.",
        "Supported production voice systems for MSP clients, troubleshooting routing, carrier, and QoS issues impacting Microsoft 365 services.",
    ]
  },
  {
    title: "Senior Software Engineer",
    meta: "Rackcorp · 2018 – 2020 (Full-time); 2013 – 2017 (Ad-hoc)",
    duties: [
        "Built and maintained customer portals and automation APIs, later leveraged to streamline Microsoft 365 provisioning workflows.",
        "Collaborated with infrastructure teams on high-availability hosting used for hybrid Exchange/SharePoint and Teams direct routing components.",
        "Introduced source control and release practices that translated into reliable runbooks for MSP-led modern work rollouts.",
    ]
  },
];

export const PROJECTS = [
    "Tenant modernisation accelerator – Built reusable PowerShell/Graph modules to harden Entra ID, configure Conditional Access, and standardise Teams/SharePoint governance across MSP client tenants.",
    "Teams Phone and meeting rooms uplift – Delivered direct routing, call queues/auto attendants, device policies, and user training for SMB customers moving from legacy PBXs.",
    "Migration factory for MSPs – Defined repeatable Exchange/SharePoint/OneDrive migration runbooks with pre-flight checks, delta syncs, and end-user communication packs."
];

export const CONTACT = {
    location: "O'Connor, WA",
    mobile: "0415 049 760",
    email: "dylan@system8.com.au",
    web: "https://www.system8.com.au",
    github: "https://github.com/enkayz"
};

export const ADDITIONAL_INFO = [
    "Active contributor to Microsoft 365 community discussions and workshops, including collaborations and knowledge sharing with MVPs such as Robert Crane.",
    "Comfortable mentoring admins, service desk teams, and business champions through modern work adoption and governance.",
    "PowerShell-first approach to repeatable delivery; open-source and private modules available for MSP deployment factories.",
    "References and detailed engagement summaries available on request.",
];

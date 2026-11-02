import { useState } from "react";
import {
  IconArrowRight,
  IconBrandGithub,
  IconBuildingCommunity,
  IconCheck,
  IconChevronRight,
  IconCode,
  IconCube,
  IconDatabase,
  IconExternalLink,
  IconFileDescription,
  IconFlask,
  IconMail,
  IconMenu2,
  IconMessage,
  IconSearch,
  IconShieldCheck,
  IconX,
} from "@tabler/icons-react";

const ecosystemLinks = [
  { label: "Profile", href: "https://system8.com.au/" },
  { label: "Blog", href: "https://blog.system8.com.au/" },
  { label: "Docs", href: "https://docs.system8.com.au/" },
  { label: "Live", href: "https://live.system8.com.au/" },
];

const evidence = [
  {
    number: "01",
    title: "Microsoft 365 governance",
    description: "Who can change the tenant, who can read the information and what needs reviewing.",
    href: "https://docs.system8.com.au/microsoft-365-governance-baseline/",
    icon: IconShieldCheck,
  },
  {
    number: "02",
    title: "Legacy system recovery",
    description: "Follow the failed request through certificates, services, identity and data before replacing anything.",
    href: "https://docs.system8.com.au/legacy-sharepoint-recovery-runbook/",
    icon: IconDatabase,
  },
  {
    number: "03",
    title: "Automation you can check",
    description: "Design notes for finding the right record, checking permission and verifying a write.",
    href: "https://docs.system8.com.au/automation-platform/",
    icon: IconCode,
  },
  {
    number: "04",
    title: "Meetings and shared context",
    description: "Design requirements for source-linked summaries, corrected speakers and reviewed actions.",
    href: "https://docs.system8.com.au/meeting-intelligence/",
    icon: IconMessage,
  },
];

const operatingModel = [
  { number: "01", title: "Discover", text: "Watch what happens. Find the records, dependencies and person who can explain the exception.", icon: IconSearch },
  { number: "02", title: "Prove", text: "Try the smallest useful test. Record the result and what it changes about the decision.", icon: IconFlask },
  { number: "03", title: "Deliver", text: "Make the agreed change and leave instructions the next operator can use.", icon: IconCube },
  { number: "04", title: "Verify", text: "Check it from the user’s end. Keep the result, recovery steps and remaining questions.", icon: IconShieldCheck },
];

const fieldNotes = [
  {
    date: "26 AUG 2026",
    title: "The SharePoint farm came back, but the portal did not",
    description: "Compare the certificate and IIS binding on each node before changing authentication.",
    tag: "BLOG",
    href: "https://blog.system8.com.au/sharepoint-farm-certificate-expired/",
  },
  {
    date: "26 AUG 2026",
    title: "The cloud workflow depends on one Windows gateway nobody can rebuild",
    description: "Find the cluster, recovery key and dependent workflows before replacing the host.",
    tag: "BLOG",
    href: "https://blog.system8.com.au/on-premises-data-gateway-single-point-of-failure/",
  },
  {
    date: "26 AUG 2026",
    title: "Dataverse production drift after a direct hotfix",
    description: "Compare solution layers, target values and connections before removing an override.",
    tag: "DOCS",
    href: "https://docs.system8.com.au/dataverse-alm-drift-evidence-pack/",
  },
];

const capabilities = [
  {
    title: "Microsoft 365 & governance",
    description: "Find who owns the information, which identities can use it and how a change will affect the people doing the work.",
    links: [
      ["Governance baseline", "https://docs.system8.com.au/microsoft-365-governance-baseline/"],
      ["Migration decisions", "https://docs.system8.com.au/sharepoint-migration-decision-framework/"],
    ],
  },
  {
    title: "Integration & automation",
    description: "Connect the records and services a process already uses. Keep permissions, retries and the result visible to the operator.",
    links: [
      ["Automation model", "https://docs.system8.com.au/automation-platform/"],
      ["Permission review", "https://docs.system8.com.au/graph-selected-permission-review-runbook/"],
    ],
  },
  {
    title: "Technical recovery",
    description: "Recover enough of the old system to understand its rules and dependencies. Then decide what to repair, move or retire.",
    links: [
      ["Legacy recovery", "https://docs.system8.com.au/legacy-sharepoint-recovery-runbook/"],
      ["LASP discovery", "https://docs.system8.com.au/lasp-discovery/"],
    ],
  },
];

function Logo() {
  return <a className="logo" href="https://system8.com.au/" aria-label="System 8 home">SYSTEM 8</a>;
}

function AppNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Logo />
      <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>
        <span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span>
        {open ? <IconX size={22} /> : <IconMenu2 size={22} />}
      </button>
      <nav id="site-nav" className={open ? "site-nav is-open" : "site-nav"} aria-label="System 8 sites">
        {ecosystemLinks.map((item) => (
          <a key={item.label} className={item.label === "Profile" ? "is-current" : ""} href={item.href}>{item.label}</a>
        ))}
      </nav>
      <div className="header-status" aria-label="Practice location and source status">
        <span>PERTH / WESTERN AUSTRALIA</span>
        <span className="status-divider" aria-hidden="true" />
        <span className="source-led"><i aria-hidden="true" /> SOURCE-LED</span>
      </div>
    </header>
  );
}

function EvidenceIndex() {
  return (
    <section className="evidence-index" aria-labelledby="evidence-index-heading">
      <div className="panel-heading">
        <h2 id="evidence-index-heading">Examples and working notes</h2>
        <span>Follow the reasoning</span>
      </div>
      <div className="evidence-list">
        {evidence.map(({ number, title, description, href, icon: Icon }) => (
          <a className="evidence-row" href={href} key={title}>
            <Icon className="evidence-icon" size={46} stroke={1.55} aria-hidden="true" />
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <strong>{number}</strong>
            <IconChevronRight className="row-arrow" size={22} aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}

function OperatingModel() {
  return (
    <section className="operating-model" aria-labelledby="operating-model-heading">
      <h2 id="operating-model-heading" className="section-label">How I approach it</h2>
      <div className="model-grid">
        {operatingModel.map(({ number, title, text, icon: Icon }, index) => (
          <article className="model-step" key={title}>
            <div className="model-topline"><span>{number}</span>{index < operatingModel.length - 1 && <IconChevronRight size={22} aria-hidden="true" />}</div>
            <h3>{title}</h3>
            <Icon size={36} stroke={1.6} aria-hidden="true" />
            <p>{text}</p>
          </article>
        ))}
      </div>
      <p className="model-caption">Keep the question, change and result together. Another person should be able to follow what happened.</p>
    </section>
  );
}

function FieldNotes() {
  return (
    <section className="field-notes" aria-labelledby="field-notes-heading">
      <div className="notes-heading">
        <h2 id="field-notes-heading" className="section-label">From the notebook</h2>
        <a href="https://blog.system8.com.au/">Read the blog <IconChevronRight size={16} aria-hidden="true" /></a>
      </div>
      <div className="notes-list">
        {fieldNotes.map((note) => (
          <a className="note-row" href={note.href} key={note.title}>
            <time>{note.date}</time>
            <div><h3>{note.title}</h3><p>{note.description}</p></div>
            <span>{note.tag}</span>
          </a>
        ))}
      </div>
      <a className="text-link" href="https://docs.system8.com.au/">Find a runbook <IconChevronRight size={16} aria-hidden="true" /></a>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="deep-section capabilities" id="capabilities" aria-labelledby="capabilities-heading">
      <div className="section-intro">
        <span className="eyebrow">Current practice</span>
        <h2 id="capabilities-heading">What is the system supposed to do?</h2>
        <p>Start with the person using it. Follow one real transaction, including the part they do by hand. That usually gives us a better question to ask of the software.</p>
      </div>
      <div className="capability-grid">
        {capabilities.map((capability, index) => (
          <article className="capability-card" key={capability.title}>
            <span className="card-number">0{index + 1}</span>
            <h3>{capability.title}</h3>
            <p>{capability.description}</p>
            <div className="card-links">
              {capability.links.map(([label, href]) => <a href={href} key={label}>{label} <IconExternalLink size={14} aria-hidden="true" /></a>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Ecosystem() {
  const items = [
    { name: "System 8", label: "Who I am and what I work on", href: "https://system8.com.au/", icon: IconBuildingCommunity },
    { name: "Blog", label: "Faults, questions and explanations", href: "https://blog.system8.com.au/", icon: IconMessage },
    { name: "Docs", label: "Repeatable checks and design notes", href: "https://docs.system8.com.au/", icon: IconFileDescription },
    { name: "Live", label: "Demonstration status and session enquiries", href: "https://live.system8.com.au/", icon: IconCode },
  ];
  return (
    <section className="deep-section ecosystem" aria-labelledby="ecosystem-heading">
      <div className="section-intro">
        <span className="eyebrow">Keep looking</span>
        <h2 id="ecosystem-heading">Follow the question a little further.</h2>
        <p>Read the explanation, try the relevant checks or ask about a demonstration. The audio notes belong here too: start at the place where the result is wrong and follow the path back.</p>
      </div>
      <div className="ecosystem-grid">
        {items.map(({ name, label, href, icon: Icon }) => (
          <a className="ecosystem-card" href={href} key={name}>
            <Icon size={30} stroke={1.55} aria-hidden="true" />
            <span><strong>{name}</strong><small>{label}</small></span>
            <IconArrowRight size={20} aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}

export function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#page-title">Skip to content</a>
      <AppNav />
      <main id="main-content">
        <section className="hero" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="eyebrow">Systems engineer · musician · Perth WA</p>
            <h1 id="page-title">Dylan Boekelman</h1>
            <p className="hero-headline">Systems, software and sound.<br />Let’s work out what’s happening.</p>
            <span className="accent-rule" aria-hidden="true" />
            <p className="hero-summary">I’m a Perth-based systems engineer and musician. I work across Microsoft 365, older systems, integrations and automation. I like finding out why something behaves the way it does, then making the next step easier to understand.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#evidence-index-heading">See how I approach a problem <IconArrowRight size={19} aria-hidden="true" /></a>
              <a className="button button-secondary" href="mailto:dylan@system8.com.au?subject=System%20discussion">Discuss a system <IconArrowRight size={19} aria-hidden="true" /></a>
            </div>
            <div className="hero-meta"><span>Questions worth following</span><time dateTime="2026-11-03">Revised 3 Nov 2026</time></div>
          </div>
          <EvidenceIndex />
        </section>

        <div className="dashboard-row">
          <OperatingModel />
          <FieldNotes />
        </div>

        <blockquote className="principle">
          <IconCode size={34} stroke={1.5} aria-hidden="true" />
          <p>“It works” is a useful start. Show me what happened, and we can work out why.</p>
          <a href="mailto:dylan@system8.com.au?subject=System%208%20enquiry">Tell me what happened <IconChevronRight size={18} aria-hidden="true" /></a>
        </blockquote>

        <Capabilities />
        <section className="deep-section" aria-labelledby="sound-heading">
          <div className="section-intro">
            <span className="eyebrow">Music and sound</span>
            <h2 id="sound-heading">There’s a listening end to this as well.</h2>
            <p>I play music and work with sound. A patch sheet, a packet trace and a signal path each give you a way to follow what is happening. The useful test is still at the other end: can the person hear it, use it and understand what changed?</p>
            <a className="text-link" href="https://blog.system8.com.au/sound-is-a-system/">Follow an audio fault <IconArrowRight size={16} aria-hidden="true" /></a>
          </div>
        </section>
        <Ecosystem />

        <section className="contact-strip" aria-labelledby="contact-heading">
          <div><span className="eyebrow">Start with the situation</span><h2 id="contact-heading">What happened, and what did you expect?</h2></div>
          <a className="button button-primary" href="mailto:dylan@system8.com.au?subject=System%208%20enquiry"><IconMail size={20} aria-hidden="true" /> dylan@system8.com.au</a>
        </section>
      </main>
      <footer>
        <Logo />
        <p>Systems engineering, software and sound. Perth, Western Australia.</p>
        <div className="footer-links">
          <a href="https://github.com/enkayz"><IconBrandGithub size={18} aria-hidden="true" /> GitHub</a>
          <a href="mailto:dylan@system8.com.au"><IconMail size={18} aria-hidden="true" /> Contact</a>
        </div>
        <p className="footer-proof"><IconCheck size={17} aria-hidden="true" /> Read the notes. Follow the checks. Ask a question.</p>
      </footer>
    </div>
  );
}

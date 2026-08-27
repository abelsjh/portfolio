"use client";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const CONTACT = {
  name: "Jason Abel Sugiarto",
  title: "Full Stack Developer · Backend-Focused",
  subtitle: "Information Systems Student",
  email: "abeljason11@gmail.com",
  github: "github.com/abelsjh",
  linkedin: "linkedin.com/in/abelsjh",
  location: "Pekalongan, Central Java, Indonesia",
  portfolio: "portfolio-abelsjh.vercel.app",
};

const SUMMARY =
  "Backend-focused full stack developer and Information Systems student at Institut Widya Pratama Pekalongan — building systems that solve real operational problems, from API integrations to business logic and database architecture. Experienced in engineering e-office platforms, POS inventory systems, and real-time marketplaces.";

const SKILLS = [
  {
    category: "Backend",
    items: ["PHP", "Laravel", "CodeIgniter 4", "MySQL", "RESTful API", "WebSocket"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Tools & Practices",
    items: ["Git", "GitHub", "SOLID Principles", "Database Normalization", "OOP Design"],
  },
  {
    category: "Integrations",
    items: ["Face Recognition", "RFID", "WA Gateway", "SMTP", "Barcode Scanning"],
  },
];

const EDUCATION = [
  {
    degree: "Bachelor of Information Systems",
    institution: "Institut Widya Pratama Pekalongan",
    period: "2023 — Present",
    note: "Focus on software engineering, database architecture, and backend systems logic.",
  },
];

const EXPERIENCE = [
  {
    role: "Software Engineering Intern",
    company: "GKI Pekalongan",
    period: "Maret – Mei 2026",
    type: "Internship",
    points: [
      "Developed digital administration & attendance system (E-Office) covering congregation check-in, letter management, and digital archiving.",
      "Implemented hybrid RFID + face recognition attendance scanner with WhatsApp Gateway & SMTP email notification integration.",
      "Built core administration modules for congregation attendance recap and document disposition workflows.",
    ],
    tags: ["CodeIgniter 4", "PHP 8.2", "MySQL", "Face Recognition", "WA Gateway"],
  },
  {
    role: "Freelance Web Developer",
    company: "Independent",
    period: "2026 — Present",
    type: "Freelance",
    points: [
      "Developing customized business logic, cashier & inventory POS systems (FIFO stock valuation, barcode scanner integration), and backend API services.",
      "Handling full project lifecycle: business requirements discovery, database schema design, backend implementation, and deployment.",
    ],
    tags: ["Laravel", "Next.js", "TypeScript", "PHP", "MySQL"],
  },
];

const PROJECTS = [
  {
    id: "01",
    title: "BookIt Marketplace",
    subtitle: "Book Marketplace with Real-Time Price Negotiation",
    description:
      "A CodeIgniter 4-based marketplace featuring live WebSocket price negotiation between buyers and sellers — allowing interactive price bargaining without page reloads. Multi-role system (Buyer, Seller, Admin) with responsive UI.",
    tags: ["CodeIgniter 4", "PHP", "MySQL", "WebSocket", "Bootstrap 5"],
    github: "github.com/abelsjh/BookIt-Marketplace",
    color: "#16a34a",
  },
  {
    id: "02",
    title: "GKI E-Office System",
    subtitle: "Attendance & Digital Letter Management System",
    description:
      "Digital administration platform for GKI Pekalongan — RFID + face recognition attendance check-in, multi-level letter disposition workflows, digital archiving, and automated WhatsApp/email notifications.",
    tags: ["CodeIgniter 4", "PHP 8.2", "MySQL", "Face Recognition", "WA Gateway"],
    github: "github.com/abelsjh",
    color: "#7c3aed",
  },
  {
    id: "03",
    title: "PartsPro POS",
    subtitle: "Cashier & Spare Parts Inventory Management System",
    description:
      "Full-featured POS prototype for a motorcycle spare parts shop. Multi-role access (Owner & Cashier), FIFO batch stock, camera-based barcode scanning, 3-zone label printing, real-time profit reports, and a cost-code system protecting supplier pricing.",
    tags: ["Laravel", "PHP", "MySQL", "Barcode", "FIFO Batch"],
    github: "github.com/abelsjh/demo-client",
    color: "#2563eb",
  },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function ResumePage() {
  return (
    <>
      {/* ── Screen-only toolbar ─────────────────────────────────────────────── */}
      <div
        className="no-print"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "#2c241f",
          color: "#f7f1e8",
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "13px",
          fontFamily: "'Inter', sans-serif",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a
            href="/"
            style={{
              color: "rgba(247,241,232,0.55)",
              textDecoration: "none",
              fontSize: "12px",
              letterSpacing: "0.05em",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#a97848")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(247,241,232,0.55)")}
          >
            ← Back to Portfolio
          </a>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
          <span style={{ color: "rgba(247,241,232,0.4)", fontSize: "11px" }}>
            Jason Abel Sugiarto — Resume
          </span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => window.print()}
            style={{
              background: "#a97848",
              color: "#f7f1e8",
              border: "none",
              borderRadius: "6px",
              padding: "6px 16px",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm1-8V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4" />
            </svg>
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* ── Resume Body ─────────────────────────────────────────────────────── */}
      <div className="resume-page">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap');

          * { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: 'Inter', sans-serif;
            color: #2c241f;
            background: #f7f1e8;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .resume-page {
            max-width: 820px;
            margin: 0 auto;
            padding: 52px 24px 40px;
            min-height: 100vh;
            background: #f7f1e8;
          }

          /* Toolbar hidden in print */
          @media print {
            .no-print { display: none !important; }
            .resume-page {
              padding: 28px 32px;
              max-width: 100%;
              margin: 0;
              background: #ffffff;
              min-height: auto;
            }
            body { background: #ffffff; }
            a { color: inherit !important; text-decoration: none !important; }
          }

          /* Section divider */
          .resume-section {
            margin-bottom: 28px;
            page-break-inside: avoid;
          }

          .section-label {
            font-family: 'Inter', sans-serif;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #a97848;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .section-label::after {
            content: '';
            flex: 1;
            height: 1px;
            background: #d8d0c5;
          }

          /* Tag pill */
          .tag {
            display: inline-block;
            font-family: 'Inter', monospace;
            font-size: 9.5px;
            font-weight: 500;
            padding: 2px 8px;
            border-radius: 4px;
            border: 1px solid #d8d0c5;
            color: #7a6f67;
            background: rgba(44,36,31,0.04);
          }

          /* Skill category */
          .skill-row {
            display: grid;
            grid-template-columns: 100px 1fr;
            gap: 8px;
            align-items: start;
            margin-bottom: 6px;
          }

          .skill-cat-label {
            font-size: 10px;
            font-weight: 600;
            color: #7a6f67;
            padding-top: 2px;
          }

          .skill-items {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
          }

          /* Project card */
          .project-card {
            border: 1px solid #d8d0c5;
            border-radius: 10px;
            padding: 14px 16px;
            margin-bottom: 10px;
            background: rgba(240,234,223,0.4);
            page-break-inside: avoid;
          }

          .project-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 6px;
            gap: 12px;
          }

          .project-id {
            font-family: 'Inter', monospace;
            font-size: 9px;
            color: #7a6f67;
            font-weight: 600;
            letter-spacing: 0.08em;
          }

          /* Experience card */
          .experience-card {
            border-left: 2px solid #d8d0c5;
            padding-left: 16px;
            margin-bottom: 18px;
            page-break-inside: avoid;
          }

          .exp-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 6px;
          }

          .exp-period-badge {
            font-family: 'Inter', monospace;
            font-size: 9px;
            font-weight: 600;
            color: #a97848;
            background: rgba(169,120,72,0.08);
            border: 1px solid rgba(169,120,72,0.2);
            border-radius: 4px;
            padding: 2px 8px;
            white-space: nowrap;
            flex-shrink: 0;
          }

          ul.exp-points {
            margin: 6px 0;
            padding-left: 14px;
            list-style: disc;
          }

          ul.exp-points li {
            font-size: 11.5px;
            color: #5a5050;
            line-height: 1.55;
            margin-bottom: 3px;
          }

          /* Education */
          .edu-card {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
            page-break-inside: avoid;
          }

          /* Contact info row */
          .contact-item {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 11px;
            color: #7a6f67;
            text-decoration: none;
          }

          .contact-item svg {
            flex-shrink: 0;
            opacity: 0.6;
          }
        `}</style>

        {/* ── HEADER ──────────────────────────────────────────────────────────── */}
        <div
          className="resume-section"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "20px",
            marginBottom: "32px",
            paddingBottom: "24px",
            borderBottom: "1px solid #d8d0c5",
          }}
        >
          {/* Profile Photo */}
          <img
            src="/profile.jpg"
            alt="Jason Abel Sugiarto"
            width={72}
            height={72}
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "center top",
              border: "2px solid #d8d0c5",
              flexShrink: 0,
              display: "block",
            }}
          />

          {/* Name + Title + Contact */}
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "4px" }}>
              <h1
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "28px",
                  fontWeight: 400,
                  color: "#2c241f",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Jason Abel Sugiarto
              </h1>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#a97848",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginTop: "4px",
                }}
              >
                Full Stack Developer · Backend-Focused · Information Systems
              </p>
            </div>

            {/* Contact grid */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px 20px",
                marginTop: "10px",
              }}
            >
              <a href={`mailto:${CONTACT.email}`} className="contact-item">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                {CONTACT.email}
              </a>
              <a href={`https://${CONTACT.github}`} target="_blank" rel="noopener noreferrer" className="contact-item">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                {CONTACT.github}
              </a>
              <a href={`https://${CONTACT.linkedin}`} target="_blank" rel="noopener noreferrer" className="contact-item">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                {CONTACT.linkedin}
              </a>
              <span className="contact-item">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {CONTACT.location}
              </span>
              <a href={`https://${CONTACT.portfolio}`} target="_blank" rel="noopener noreferrer" className="contact-item">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                {CONTACT.portfolio}
              </a>
            </div>
          </div>
        </div>

        {/* ── SUMMARY ─────────────────────────────────────────────────────────── */}
        <div className="resume-section">
          <div className="section-label">Summary</div>
          <p
            style={{
              fontSize: "12px",
              lineHeight: 1.7,
              color: "#5a5050",
              maxWidth: "680px",
            }}
          >
            {SUMMARY}
          </p>
        </div>

        {/* ── TWO-COLUMN: SKILLS LEFT, EDUCATION RIGHT ────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "28px",
            marginBottom: "28px",
          }}
        >
          {/* Skills */}
          <div>
            <div className="section-label" style={{ marginBottom: "10px" }}>
              Technical Skills
            </div>
            {SKILLS.map((group) => (
              <div key={group.category} className="skill-row">
                <span className="skill-cat-label">{group.category}</span>
                <div className="skill-items">
                  {group.items.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div>
            <div className="section-label" style={{ marginBottom: "10px" }}>
              Education
            </div>
            {EDUCATION.map((edu) => (
              <div key={edu.degree} className="edu-card">
                <div>
                  <p
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "14px",
                      color: "#2c241f",
                      lineHeight: 1.3,
                      marginBottom: "2px",
                    }}
                  >
                    {edu.degree}
                  </p>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: "#a97848", marginBottom: "4px" }}>
                    {edu.institution}
                  </p>
                  <p style={{ fontSize: "11px", color: "#7a6f67", lineHeight: 1.5 }}>
                    {edu.note}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: "'Inter', monospace",
                    fontSize: "9.5px",
                    fontWeight: 600,
                    color: "#a97848",
                    background: "rgba(169,120,72,0.08)",
                    border: "1px solid rgba(169,120,72,0.2)",
                    borderRadius: "4px",
                    padding: "2px 8px",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    height: "fit-content",
                  }}
                >
                  {edu.period}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── EXPERIENCE ──────────────────────────────────────────────────────── */}
        <div className="resume-section">
          <div className="section-label">Experience</div>
          {EXPERIENCE.map((exp) => (
            <div key={exp.role} className="experience-card">
              <div className="exp-header">
                <div>
                  <p
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "15px",
                      color: "#2c241f",
                      lineHeight: 1.2,
                    }}
                  >
                    {exp.role}
                  </p>
                  <p style={{ fontSize: "11px", color: "#7a6f67", marginTop: "1px" }}>
                    {exp.company}{" "}
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "9px",
                        fontWeight: 600,
                        background: "rgba(44,36,31,0.06)",
                        border: "1px solid #d8d0c5",
                        borderRadius: "4px",
                        padding: "1px 6px",
                        marginLeft: "6px",
                        color: "#7a6f67",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {exp.type}
                    </span>
                  </p>
                </div>
                <span className="exp-period-badge">{exp.period}</span>
              </div>
              <ul className="exp-points">
                {exp.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "8px" }}>
                {exp.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── PROJECTS ────────────────────────────────────────────────────────── */}
        <div className="resume-section">
          <div className="section-label">Selected Projects</div>
          {PROJECTS.map((project) => (
            <div key={project.id} className="project-card" style={{ borderLeftColor: project.color, borderLeftWidth: "3px" }}>
              <div className="project-header">
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "2px" }}>
                    <span className="project-id">{project.id}</span>
                    <h3
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "14px",
                        color: "#2c241f",
                        lineHeight: 1.2,
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: "10.5px", color: project.color, fontWeight: 600, marginBottom: "5px" }}>
                    {project.subtitle}
                  </p>
                  <p style={{ fontSize: "11.5px", color: "#5a5050", lineHeight: 1.55 }}>
                    {project.description}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={`https://${project.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "10px",
                    color: project.color,
                    textDecoration: "none",
                    fontWeight: 600,
                    fontFamily: "'Inter', monospace",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                  {project.github}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
        <div
          style={{
            marginTop: "24px",
            paddingTop: "16px",
            borderTop: "1px dashed #d8d0c5",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "9.5px", color: "#b8b0a8", fontFamily: "'Inter', monospace" }}>
            portfolio-abelsjh.vercel.app · abeljason11@gmail.com · github.com/abelsjh
          </p>
          <p style={{ fontSize: "9.5px", color: "#b8b0a8", fontFamily: "'Inter', monospace" }}>
            August 2026
          </p>
        </div>
      </div>
    </>
  );
}

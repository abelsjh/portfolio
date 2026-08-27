"use client";

const AUTHOR = {
  name: "Jason Abel Sugiarto",
  role: "Full Stack Developer · Backend-Focused",
  education: "Information Systems Student — Institut Widya Pratama Pekalongan",
  email: "abeljason11@gmail.com",
  github: "github.com/abelsjh",
  linkedin: "linkedin.com/in/abelsjh",
  location: "Pekalongan, Central Java, Indonesia",
  portfolio: "portfolio-abelsjh.vercel.app",
};

const PROJECTS = [
  {
    num: "01",
    title: "BookIt Marketplace",
    subtitle: "Book Marketplace with Real-Time Price Negotiation",
    category: "Marketplace · Web Application",
    color: "#16a34a",
    stack: ["CodeIgniter 4", "PHP 8", "MySQL", "WebSocket", "Bootstrap 5"],
    github: "github.com/abelsjh/BookIt-Marketplace",
    summary:
      "A CodeIgniter 4-based book marketplace featuring live, real-time price negotiation between buyers and sellers powered by WebSockets — allowing interactive price bargaining without page reloads.",
    features: [
      "Real-time buyer & seller price negotiation via WebSocket",
      "Multi-role user authentication & authorization (Buyer, Seller, Admin)",
      "Complete order management & negotiation state history",
      "Responsive, mobile-friendly interface",
    ],
    images: [
      { src: "/bookit_home_real.png", caption: "Marketplace Landing Page & Book Catalog" },
      { src: "/bookit_negotiations_auth.png", caption: "Real-Time Price Negotiation Interface" },
      { src: "/bookit_myorders_auth.png", caption: "User Orders & Negotiation Status Management" },
      { src: "/bookit_user_home.png", caption: "Personalized User Dashboard & Active Listings" },
    ],
  },
  {
    num: "02",
    title: "GKI E-Office System",
    subtitle: "Attendance & Digital Letter Management System",
    category: "E-Office System · Internship Project (2026)",
    color: "#7c3aed",
    stack: ["CodeIgniter 4", "PHP 8.2", "MySQL", "Face Recognition", "WA Gateway", "SMTP"],
    github: "github.com/abelsjh",
    summary:
      "A digital administration platform built for GKI Pekalongan (Internship Maret – Mei 2026) — featuring hybrid RFID + face recognition congregation attendance, multi-level letter disposition workflows, digital archiving, and automated WhatsApp & email notifications.",
    features: [
      "Hybrid RFID tag scanner & camera face recognition congregation check-in",
      "Automated congregation attendance logging and recap reporting",
      "Multi-level digital letter disposition & archiving workflow",
      "WhatsApp Gateway & SMTP Email integration for broadcast notifications",
    ],
    images: [
      { src: "/gereja_scan_active.png", caption: "Live RFID & Face Recognition Attendance Scanner" },
      { src: "/gereja_absensi_list.png", caption: "Congregation Attendance Data & Log Management" },
      { src: "/gereja_surat_keluar_form.png", caption: "Digital Letter Disposition & Archiving Form" },
      { src: "/gereja_arsip_main.png", caption: "Centralized Document Archive & Search System" },
    ],
  },
  {
    num: "03",
    title: "PartsPro POS System",
    subtitle: "Cashier & Spare Parts Inventory Management System",
    category: "POS System · Commercial Prototype",
    color: "#2563eb",
    stack: ["Laravel", "PHP", "MySQL", "Barcode Scanning", "FIFO Inventory"],
    github: "github.com/abelsjh/demo-client",
    summary:
      "A comprehensive point-of-sale system for motorcycle spare parts shops — featuring multi-role access, FIFO batch stock tracking, camera-based barcode scanning, 3-zone label printing, and cost-code protection.",
    features: [
      "Multi-role RBAC access (Owner & Cashier dashboards)",
      "FIFO batch inventory valuation & stock expiration management",
      "Camera-based live barcode scanner for quick checkout",
      "Real-time daily profit reports & hidden supplier cost-code system",
    ],
    images: [
      { src: "/pos_kasir_final.png", caption: "Cashier Transaction & Live Barcode Scan Interface" },
      { src: "/pos_inventori_final.png", caption: "Spare Parts Inventory & Batch Stock Control" },
      { src: "/pos_laporan_final.png", caption: "Real-Time Sales & Profit Margin Analytics" },
      { src: "/pos_aktivitas_final.png", caption: "Cashier Activity & System Audit Logs" },
    ],
  },
];

const BEYOND_PHOTOS = [
  { src: "/Foto/foto_1.webp", title: "Captured Frames", cat: "Moments", pos: "center 25%" },
  { src: "/Foto/foto_2.jpg", title: "Laughter & Love", cat: "Memory Shards", pos: "center 15%" },
  { src: "/Foto/foto_3.jpg", title: "Scenic Focus", cat: "Fujifilm Prints", pos: "center 25%" },
  { src: "/Foto/foto_5.jpg", title: "Shared Moments", cat: "Fellowship", pos: "center 85%" },
  { src: "/Foto/foto_7.jpg", title: "Sunsets & Stories", cat: "Reflections", pos: "center 65%" },
  { src: "/Foto/foto_11.webp", title: "Youth Community", cat: "Connections", pos: "center 40%" },
];

export default function PortfolioPdfPage() {
  return (
    <>
      {/* ── Screen-only top navigation bar ─────────────────────────────────── */}
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
          padding: "12px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "13px",
          fontFamily: "'Inter', sans-serif",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <a
            href="/"
            style={{
              color: "rgba(247,241,232,0.65)",
              textDecoration: "none",
              fontSize: "12px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            ← Back to Web Portfolio
          </a>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
          <span style={{ color: "#a97848", fontWeight: 600, fontSize: "12px" }}>
            PDF PORTFOLIO SHOWCASE DOCUMENT (6 PAGES)
          </span>
        </div>
        <button
          onClick={() => window.print()}
          style={{
            background: "#a97848",
            color: "#f7f1e8",
            border: "none",
            borderRadius: "6px",
            padding: "8px 20px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "'Inter', sans-serif",
            boxShadow: "0 2px 8px rgba(169,120,72,0.4)",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4" />
          </svg>
          Export / Print to PDF
        </button>
      </div>

      {/* ── PDF Portfolio Document Container ───────────────────────────────── */}
      <div className="pdf-document">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

          * { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: 'Inter', sans-serif;
            color: #2c241f;
            background: #e8e1d4;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .pdf-document {
            max-width: 960px;
            margin: 54px auto 40px;
            background: #f7f1e8;
            box-shadow: 0 12px 48px rgba(44,36,31,0.12);
          }

          .pdf-page {
            width: 100%;
            min-height: 1120px;
            padding: 56px 64px;
            position: relative;
            background: #f7f1e8;
            border-bottom: 1px solid #d8d0c5;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            page-break-after: always;
            break-after: page;
          }

          .pdf-page:last-child {
            border-bottom: none;
            page-break-after: auto;
            break-after: auto;
          }

          @media print {
            .no-print { display: none !important; }
            body { background: #ffffff !important; }
            .pdf-document {
              max-width: 100% !important;
              margin: 0 !important;
              box-shadow: none !important;
              background: #ffffff !important;
            }
            .pdf-page {
              padding: 40px 48px !important;
              min-height: 100vh !important;
              background: #ffffff !important;
              border-bottom: none !important;
            }
            .photo-card-img-wrapper,
            .photo-card-img-wrapper img {
              height: 135px !important;
              max-height: 135px !important;
              min-height: 135px !important;
              overflow: hidden !important;
              object-fit: cover !important;
            }
          }

          /* Header / Footer page helpers */
          .page-header-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 16px;
            border-bottom: 1px solid #d8d0c5;
            margin-bottom: 32px;
          }

          .page-footer-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 16px;
            border-top: 1px dashed #d8d0c5;
            margin-top: auto;
            font-size: 10px;
            color: #7a6f67;
            font-family: 'JetBrains Mono', monospace;
          }

          /* Typography */
          .serif { font-family: 'DM Serif Display', serif; }
          .mono { font-family: 'JetBrains Mono', monospace; }

          .tag {
            display: inline-block;
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            font-weight: 500;
            padding: 3px 9px;
            border-radius: 4px;
            border: 1px solid #d8d0c5;
            color: #2c241f;
            background: rgba(44,36,31,0.04);
          }

          /* Browser Mockup Frame */
          .browser-frame {
            border: 1px solid #d8d0c5;
            border-radius: 8px;
            overflow: hidden;
            background: #ffffff;
            box-shadow: 0 4px 16px rgba(0,0,0,0.05);
          }

          .browser-header {
            background: #e8e1d4;
            padding: 6px 12px;
            display: flex;
            align-items: center;
            gap: 6px;
            border-bottom: 1px solid #d8d0c5;
          }

          .browser-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
          }

          /* Photo Card Aesthetic for Beyond Code */
          .photo-card {
            border: 1px solid #d8d0c5;
            border-radius: 12px;
            overflow: hidden !important;
            background: #ffffff;
            box-shadow: 0 4px 12px rgba(44,36,31,0.06);
            display: flex;
            flex-direction: column;
            page-break-inside: avoid;
            height: fit-content !important;
          }

          .photo-card-img-wrapper {
            width: 100% !important;
            height: 135px !important;
            max-height: 135px !important;
            min-height: 135px !important;
            overflow: hidden !important;
            position: relative !important;
            background: #f0eadf !important;
            border-radius: 10px 10px 0 0 !important;
          }

          .photo-card-img-wrapper img {
            width: 100% !important;
            height: 135px !important;
            max-height: 135px !important;
            min-height: 135px !important;
            object-fit: cover !important;
            display: block !important;
          }
        `}</style>

        {/* ═══════════════════════════════════════════════════════════════════
            PAGE 1: COVER PAGE
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="pdf-page" style={{ justifyContent: "space-between" }}>
          <div className="page-header-bar">
            <span className="mono" style={{ fontSize: "11px", color: "#a97848", fontWeight: 600 }}>
              PROJECT PORTFOLIO DOCUMENT
            </span>
            <span className="mono" style={{ fontSize: "10px", color: "#7a6f67" }}>
              2026 EDITION
            </span>
          </div>

          <div style={{ margin: "auto 0", padding: "40px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span style={{ width: "24px", height: "2px", background: "#a97848" }} />
              <span className="mono" style={{ fontSize: "11px", letterSpacing: "0.25em", color: "#a97848", textTransform: "uppercase", fontWeight: 700 }}>
                ENGINEERING & SYSTEMS SHOWCASE
              </span>
            </div>

            <h1 className="serif" style={{ fontSize: "52px", lineHeight: "1.08", color: "#2c241f", marginBottom: "20px", fontWeight: 400 }}>
              Selected Projects &<br />
              <span style={{ color: "#a97848", fontStyle: "italic" }}>System Engineering</span>
            </h1>

            <p style={{ fontSize: "15px", color: "#7a6f67", lineHeight: "1.6", maxWidth: "600px", marginBottom: "40px" }}>
              A curated portfolio documenting production systems, e-office architectures, POS platforms, real-time marketplaces, and personal context by Jason Abel Sugiarto.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", paddingTop: "28px", borderTop: "1px solid #d8d0c5" }}>
              <div>
                <span className="mono" style={{ fontSize: "10px", color: "#7a6f67", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                  DEVELOPER / ENGINEER
                </span>
                <span className="serif" style={{ fontSize: "20px", color: "#2c241f" }}>
                  {AUTHOR.name}
                </span>
                <span style={{ fontSize: "12px", color: "#a97848", display: "block", marginTop: "2px", fontWeight: 600 }}>
                  {AUTHOR.role}
                </span>
                <span style={{ fontSize: "12px", color: "#7a6f67", display: "block", marginTop: "2px" }}>
                  {AUTHOR.education}
                </span>
              </div>

              <div>
                <span className="mono" style={{ fontSize: "10px", color: "#7a6f67", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                  CONTACT & REPOSITORIES
                </span>
                <span style={{ fontSize: "12px", color: "#2c241f", display: "block" }}>
                  <strong>Email:</strong> {AUTHOR.email}
                </span>
                <span style={{ fontSize: "12px", color: "#2c241f", display: "block", marginTop: "2px" }}>
                  <strong>GitHub:</strong> {AUTHOR.github}
                </span>
                <span style={{ fontSize: "12px", color: "#2c241f", display: "block", marginTop: "2px" }}>
                  <strong>LinkedIn:</strong> {AUTHOR.linkedin}
                </span>
                <span style={{ fontSize: "12px", color: "#2c241f", display: "block", marginTop: "2px" }}>
                  <strong>Location:</strong> {AUTHOR.location}
                </span>
              </div>
            </div>
          </div>

          <div className="page-footer-bar">
            <span>{AUTHOR.portfolio}</span>
            <span>PAGE 01 / 06</span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            PAGE 2: ABOUT & PROFILE OVERVIEW
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="pdf-page">
          <div className="page-header-bar">
            <span className="serif" style={{ fontSize: "16px", color: "#2c241f" }}>
              About & Developer Profile
            </span>
            <span className="mono" style={{ fontSize: "10px", color: "#7a6f67" }}>
              BACKGROUND & COMPETENCIES
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "40px", margin: "auto 0" }}>
            {/* Left Column: Profile text */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <img
                  src="/profile.jpg"
                  alt="Jason Abel Sugiarto"
                  width={80}
                  height={80}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    border: "2px solid #a97848",
                  }}
                />
                <div>
                  <h2 className="serif" style={{ fontSize: "24px", color: "#2c241f" }}>
                    {AUTHOR.name}
                  </h2>
                  <p style={{ fontSize: "12px", color: "#a97848", fontWeight: 600 }}>
                    {AUTHOR.role}
                  </p>
                  <p style={{ fontSize: "11px", color: "#7a6f67" }}>
                    Institut Widya Pratama Pekalongan
                  </p>
                </div>
              </div>

              <div>
                <span className="mono" style={{ fontSize: "10px", color: "#a97848", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                  ENGINEERING PHILOSOPHY
                </span>
                <p style={{ fontSize: "13px", color: "#2c241f", lineHeight: "1.65" }}>
                  I focus on designing structured backend architectures, efficient operational workflows, and relational database schemas. I build systems that solve real practical challenges — from organizational e-office systems to point-of-sale platforms and interactive marketplaces.
                </p>
              </div>

              <div style={{ borderTop: "1px solid #d8d0c5", paddingTop: "16px" }}>
                <span className="mono" style={{ fontSize: "10px", color: "#a97848", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
                  TECHNICAL STACK SUMMARY
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {["PHP 8", "Laravel", "CodeIgniter 4", "MySQL", "REST APIs", "WebSockets", "React", "Next.js", "TypeScript", "Tailwind CSS", "Git", "Face Recognition", "RFID"].map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Desk Photo & Highlights */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="browser-frame">
                <div className="browser-header">
                  <span className="browser-dot" style={{ background: "#ff5f56" }} />
                  <span className="browser-dot" style={{ background: "#ffbd2e" }} />
                  <span className="browser-dot" style={{ background: "#27c93f" }} />
                  <span className="mono" style={{ fontSize: "9px", color: "#7a6f67", marginLeft: "6px" }}>
                    workspace // setup
                  </span>
                </div>
                <img
                  src="/cozy_desk.png"
                  alt="Workspace Setup"
                  style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}
                />
              </div>

              <div style={{ background: "#e8e1d4", padding: "16px", borderRadius: "8px", border: "1px solid #d8d0c5" }}>
                <span className="mono" style={{ fontSize: "10px", color: "#a97848", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                  KEY HIGHLIGHTS
                </span>
                <ul style={{ paddingLeft: "16px", fontSize: "12px", color: "#2c241f", lineHeight: "1.6" }}>
                  <li>Engineered <strong>GKI E-Office System</strong> (RFID + Face Recognition attendance scanner) during Internship 2026.</li>
                  <li>Built <strong>BookIt Marketplace</strong> featuring live WebSocket price negotiation.</li>
                  <li>Engineered <strong>PartsPro POS</strong> with FIFO inventory valuation & hidden supplier cost codes.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="page-footer-bar">
            <span>{AUTHOR.name} — Portfolio Document</span>
            <span>PAGE 02 / 06</span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            PROJECT SHOWCASE PAGES (01, 02, 03)
            ═══════════════════════════════════════════════════════════════════ */}
        {PROJECTS.map((proj, idx) => (
          <div key={proj.num} className="pdf-page">
            <div className="page-header-bar">
              <div>
                <span className="mono" style={{ fontSize: "10px", color: proj.color, fontWeight: 700, letterSpacing: "0.15em" }}>
                  PROJECT #{proj.num} · {proj.category.toUpperCase()}
                </span>
                <h2 className="serif" style={{ fontSize: "28px", color: "#2c241f", lineHeight: "1.1", marginTop: "2px" }}>
                  {proj.title}
                </h2>
              </div>
              <span className="mono" style={{ fontSize: "11px", color: "#7a6f67" }}>
                {proj.github}
              </span>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "13px", color: "#2c241f", lineHeight: "1.6", marginBottom: "12px" }}>
                {proj.summary}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                {proj.stack.map((s) => (
                  <span key={s} className="tag" style={{ borderColor: proj.color + "50", color: "#2c241f", background: proj.color + "10" }}>
                    #{s}
                  </span>
                ))}
              </div>

              <div style={{ background: "#ffffff", padding: "12px 16px", borderRadius: "6px", border: "1px solid #d8d0c5" }}>
                <span className="mono" style={{ fontSize: "9.5px", color: proj.color, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                  CORE FEATURES & CAPABILITIES
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px" }}>
                  {proj.features.map((feat, fIdx) => (
                    <div key={fIdx} style={{ fontSize: "11.5px", color: "#2c241f", display: "flex", alignItems: "flex-start", gap: "6px" }}>
                      <span style={{ color: proj.color, fontWeight: "bold" }}>✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4 Image Grid Showcase */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", margin: "auto 0" }}>
              {proj.images.map((img, iIdx) => (
                <div key={iIdx} className="browser-frame">
                  <div className="browser-header">
                    <span className="browser-dot" style={{ background: "#ff5f56" }} />
                    <span className="browser-dot" style={{ background: "#ffbd2e" }} />
                    <span className="browser-dot" style={{ background: "#27c93f" }} />
                    <span className="mono" style={{ fontSize: "8.5px", color: "#7a6f67", marginLeft: "4px" }}>
                      {img.caption}
                    </span>
                  </div>
                  <img
                    src={img.src}
                    alt={img.caption}
                    style={{
                      width: "100%",
                      height: "170px",
                      objectFit: "cover",
                      objectPosition: "top",
                      display: "block",
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="page-footer-bar">
              <span>{proj.title} — Technical Showcase</span>
              <span>PAGE 0{idx + 3} / 06</span>
            </div>
          </div>
        ))}

        {/* ═══════════════════════════════════════════════════════════════════
            PAGE 6: BEYOND CODE & BACK COVER / CONTACT
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="pdf-page">
          <div className="page-header-bar">
            <div>
              <span className="mono" style={{ fontSize: "10px", color: "#a97848", fontWeight: 700, letterSpacing: "0.15em" }}>
                BEYOND CODE // LEARNING LOG
              </span>
              <h2 className="serif" style={{ fontSize: "28px", color: "#2c241f", lineHeight: "1.1", marginTop: "2px" }}>
                Moments That Shape Perspective
              </h2>
            </div>
            <span className="mono" style={{ fontSize: "11px", color: "#7a6f67" }}>
              LIFE & COMMUNITY
            </span>
          </div>

          <p style={{ fontSize: "13px", color: "#2c241f", lineHeight: "1.6", marginBottom: "20px" }}>
            Context outside the terminal — the experiences, communities, and moments that quietly influence how I approach problem solving and build thoughtful digital experiences.
          </p>

          {/* Photo Shard Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", margin: "16px 0" }}>
            {BEYOND_PHOTOS.map((photo, pIdx) => (
              <div key={pIdx} className="photo-card">
                <div className="photo-card-img-wrapper">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: photo.pos,
                      display: "block",
                    }}
                  />
                </div>
                <div style={{ padding: "8px 10px", background: "#f0eadf" }}>
                  <span className="mono" style={{ fontSize: "8.5px", color: "#a97848", fontWeight: 700, textTransform: "uppercase", display: "block" }}>
                    {photo.cat}
                  </span>
                  <span className="serif" style={{ fontSize: "12.5px", color: "#2c241f", fontStyle: "italic", marginTop: "1px", display: "block" }}>
                    {photo.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Back Cover Contact Section */}
          <div style={{ marginTop: "auto", paddingTop: "16px", borderTop: "1px solid #d8d0c5" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <span className="mono" style={{ fontSize: "10px", color: "#a97848", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  LET'S BUILD TOGETHER
                </span>
                <h3 className="serif" style={{ fontSize: "22px", color: "#2c241f", marginTop: "2px" }}>
                  {AUTHOR.name}
                </h3>
                <p style={{ fontSize: "11.5px", color: "#7a6f67", marginTop: "2px" }}>
                  Email: {AUTHOR.email} · GitHub: {AUTHOR.github} · LinkedIn: {AUTHOR.linkedin}
                </p>
              </div>

              <div style={{ textAlign: "right" }}>
                <span className="mono" style={{ fontSize: "10px", color: "#7a6f67" }}>
                  WEB PORTFOLIO LINK
                </span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#a97848", display: "block" }}>
                  https://{AUTHOR.portfolio}
                </span>
              </div>
            </div>
          </div>

          <div className="page-footer-bar">
            <span>Beyond Code & Final Showcase</span>
            <span>PAGE 06 / 06</span>
          </div>
        </div>

      </div>
    </>
  );
}

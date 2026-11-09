"use client"

import ScrollReveal from "@/components/ScrollReveal"
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Code,
  Database,
  Github,
  Instagram,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Maximize2,
  Phone,
  Send,
  Users,
  X,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const NAV_SECTIONS = ["home", "projects", "education", "skills", "contact"]

const ROLES = ["Software Engineer", "Full Stack Developer", "Problem Solver", "UI/UX Designer"]

const PROJECTS = [
  {
    title: "Mammogram Report Interpretation Web App (Flask & NLP)",
    description:
      "A Flask/React web app secured with Firebase that uses a sequence-to-sequence NLP model to translate technical mammogram reports into plain, patient-friendly language in real time. Uploads are automatically deleted after processing to protect privacy, empowering non-medical users to understand their results instantly.",
    tech: ["React.js", "python", "javascript", "Firebase", "Machine Learning", "Figma", "Natural Language Processing (NLP)"],
    image: "/upload.png",
  },
  {
    title: "Solar Website",
    description:
      "Developed a web application using React for a solar business with a user-friendly interface, featuring customer feedback, managed projects and more.",
    tech: ["React.js", "typescript", "javascript", "GIT", "Figma"],
    image: "/solar.png",
  },
  {
    title: "A Movie app using Flutter",
    description:
      "Designed and built a responsive movie app using Flutter, integrating The Movie DB API and Firebase for backend data storage. Included features like personalized watchlists, local persistence, and intuitive UI design based on HCI principles. Implemented robust error handling and maintained version control throughout development, with a critical evaluation of design decisions.",
    tech: ["Flutter", "Dart", "Firebase", "Figma", "Android Studio"],
    image: "/flutter.png",
  },
  {
    title: "Unity AR Communication Application",
    description:
      "Developed an augmented reality mobile application to support communication for blind and deaf individuals. Built using Unity with C#, the app focused on accessibility and inclusion. Worked collaboratively in an Agile team, contributing to both design and development, and delivered a functional prototype tailored for diverse user needs.",
    tech: ["Unity", "C#", "Figma", "Firebase", "Agile"],
    image: "/unity.png",
  },
  {
    title: "Advanced Software Modelling and Simulation Project (Java)",
    description:
      "Developed a console-based, multithreaded Java simulation to model rush-hour traffic flow through a configurable road network with traffic-light–controlled intersections, custom thread-safe buffers, and real-time reporting.",
    tech: ["Java", "Concurrency", "Threads", "Simulation Design"],
    image: "/java.png",
  },
  {
    title: "Tasty BYTES Mobile App – UX Design Project",
    description:
      "Designed a mobile food-ordering app prototype for UCLan students and staff, focused on improving lunchtime efficiency. Created detailed user personas, low-fidelity wireframes, and a high-fidelity interactive prototype using Figma. The design addressed core UX requirements such as vendor listings, filtered menus, order tracking, and sustainable packaging representation.",
    tech: ["Figma", "UI/UX principles"],
    image: "/ui.png",
  },
]

const EDUCATION = [
  {
    title: "Bachelor of Science in Software Engineering",
    school: "University Of Lancashire",
    period: "2023 – 2025",
    detail:
      "Relevant coursework: Data Structures, Algorithms, Software Engineering (Software Development Life Cycle, Agile Methodologies, System Design)",
    accent: "#7dd3fc",
  },
  {
    title: "Professional Qualification of Java Application Development using JavaSE",
    school: "University of Colombo School of Computing",
    period: "2024",
    accent: "#7dd3fc",
  },
  {
    title: "GCE A/L",
    school: "Sirimavo Bandaranaike Vidyalaya",
    period: "2022 (2023)",
    accent: "#a5b4fc",
  },
  {
    title: "GCE O/L",
    school: "Sirimavo Bandaranaike Vidyalaya",
    period: "2019",
    accent: "#a5b4fc",
  },
]

const TECHNICAL_SKILLS = ["JavaScript", "typescript", "C++", "Python", "React", "Next.js", "C#", "Java", "Dart", "HTML", "CSS", "REST APIs"]
const DATABASES = ["MongoDB", "PostgreSQL", "Firebase", "MySQL"]
const TOOLS = ["Git", "GitHub", "Docker", "Unity", "Flutter", "Jupyter Notebook", "Canva", "Figma", "VS Code", "Android Studio"]
const SOFT_SKILLS = [
  "Problem Solving",
  "Team Leadership",
  "Communication",
  "Project Management",
  "Creative Thinking",
  "Adaptability",
  "Time Management",
  "Collaboration",
  "Organizational Skills",
]

const SKILL_GROUPS = [
  { title: "Technical Skills", icon: Code, items: TECHNICAL_SKILLS, accent: "#7dd3fc" },
  { title: "Tools & Platforms", icon: Layers, items: TOOLS, accent: "#a5b4fc" },
  { title: "Databases", icon: Database, items: DATABASES, accent: "#67e8f9" },
  { title: "Soft Skills", icon: Users, items: SOFT_SKILLS, accent: "#c4b5fd" },
]

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mehara-udawatte", icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/mehaa.ra?igsh=NmV5eXRnbG9mNXJk&utm_source=qr", icon: Instagram },
  { label: "GitHub", href: "https://github.com/mehara2003", icon: Github },
]

const CONTACTS = [
  { label: "Email", value: "meharaudawatte@gmail.com", href: "mailto:meharaudawatte@gmail.com", icon: Mail, accent: "#7dd3fc" },
  { label: "Phone", value: "+94 76 554 0319", href: "tel:+94765540319", icon: Phone, accent: "#a5b4fc" },
  { label: "Location", value: "Colombo, Sri Lanka", icon: MapPin, accent: "#c4b5fd" },
]

/* ------------------------------------------------------------------ */
/*  Small interactive building blocks                                  */
/* ------------------------------------------------------------------ */

// Card with a cursor-following spotlight + subtle 3D tilt (no React re-renders).
function SpotlightCard({ children, className = "", tilt = true, style, ...props }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    el.style.setProperty("--cx", `${x}px`)
    el.style.setProperty("--cy", `${y}px`)
    if (tilt) {
      const rx = ((r.height / 2 - y) / (r.height / 2)) * 3.5
      const ry = ((x - r.width / 2) / (r.width / 2)) * 3.5
      el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`
    }
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = ""
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`card ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
}

// Button / link that is gently pulled toward the cursor.
function MagneticButton({ as: Tag = "button", children, className = "", strength = 0.22, ...props }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = ""
  }

  return (
    <Tag ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className={`magnetic ${className}`} {...props}>
      {children}
    </Tag>
  )
}

function SectionHeading({ index, eyebrow, title, accent, description }) {
  return (
    <ScrollReveal direction="up" className="text-center mb-16 md:mb-20">
      <span className="eyebrow">
        {index} — {eyebrow}
      </span>
      <h2 className="mt-5 font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-white">
        {title} <em className="text-gradient">{accent}</em>
      </h2>
      {description && (
        <p className="mt-5 text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">{description}</p>
      )}
    </ScrollReveal>
  )
}

function SplitLetters({ text, baseDelay = 0 }) {
  return (
    <span aria-label={text} className="inline-block">
      {text.split("").map((ch, i) => (
        <span key={i} aria-hidden="true" className="letter" style={{ "--i": i, "--base": `${baseDelay}ms` }}>
          {ch}
        </span>
      ))}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false })

  // Form states
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const progressRef = useRef(null)
  const timelineRef = useRef(null)
  const navRefs = useRef({})

  // Cursor spotlight — written straight to CSS variables, no re-renders.
  useEffect(() => {
    let raf = 0
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const s = document.documentElement.style
        s.setProperty("--mx", `${e.clientX}px`)
        s.setProperty("--my", `${e.clientY}px`)
      })
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
    }
  }, [])

  // Rotating role line in the hero
  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2800)
    return () => clearInterval(id)
  }, [])

  // Scroll: progress bar, header state, timeline drawing, scroll spy
  useEffect(() => {
    let ticking = false

    const update = () => {
      ticking = false
      const total = document.documentElement.scrollHeight - window.innerHeight
      const y = window.scrollY
      const p = total > 0 ? y / total : 0

      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`
      setScrolled(y > 24)

      const tl = timelineRef.current
      if (tl) {
        const r = tl.getBoundingClientRect()
        const v = Math.min(1, Math.max(0, (window.innerHeight * 0.7 - r.top) / r.height))
        tl.style.setProperty("--progress", v.toFixed(3))
      }

      if (y >= total - 15) {
        setActiveSection("contact")
        return
      }

      const pos = y + window.innerHeight * 0.35
      for (const id of NAV_SECTIONS) {
        const el = document.getElementById(id)
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id)
          break
        }
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    update()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  // Sliding pill under the active nav link
  useEffect(() => {
    const update = () => {
      const el = navRefs.current[activeSection]
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth, ready: true })
    }
    update()
    document.fonts?.ready?.then(update)
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [activeSection])

  // Modal: close on Escape, lock background scroll
  useEffect(() => {
    if (!selectedImage) return
    const onKey = (e) => e.key === "Escape" && setSelectedImage(null)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [selectedImage])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-[var(--ink)] text-slate-200 overflow-x-hidden font-sans relative">
      {/* Ambient layers */}
      <div className="aurora" aria-hidden="true">
        <span className="a1" />
        <span className="a2" />
        <span className="a3" />
      </div>
      <div className="spotlight" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      {/* Scroll progress */}
      <div ref={progressRef} className="progress" aria-hidden="true" />

      {/* Navigation */}
      <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <button
          onClick={() => scrollToSection("home")}
          className="hidden sm:grid place-items-center w-9 h-9 rounded-full font-serif italic text-lg text-white bg-white/5 border border-white/10 hover:border-sky-300/50 transition-colors"
          aria-label="Back to top"
        >
          M
        </button>
        <nav className="relative flex items-center">
          <span
            className="nav-indicator"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.ready ? 1 : 0,
            }}
            aria-hidden="true"
          />
          {NAV_SECTIONS.map((sec) => (
            <button
              key={sec}
              ref={(el) => (navRefs.current[sec] = el)}
              onClick={() => scrollToSection(sec)}
              className={`nav-link ${activeSection === sec ? "is-active" : ""}`}
              aria-current={activeSection === sec ? "true" : undefined}
            >
              {sec}
            </button>
          ))}
        </nav>
      </header>

      {/* ============================ HERO ============================ */}
      <section id="home" className="relative min-h-[100svh] flex items-center justify-center px-6 pt-28 pb-28 z-10">
        <div className="hero-grid" aria-hidden="true" />

        <div className="relative text-center max-w-3xl mx-auto flex flex-col items-center">
          {/* Portrait */}
          <div className="hero-in" style={{ "--d": "0ms" }}>
            <div className="photo-float">
              <div className="photo-ring w-40 h-40 sm:w-48 sm:h-48">
                <img src="/pic.png" alt="Mehara Udawatte" className="w-full h-full object-cover bg-slate-800" />
              </div>
            </div>
          </div>

          {/* Status pill */}
          <div className="hero-in mt-8" style={{ "--d": "200ms" }}>
            <span className="pill">
              <span className="dot-live" />
              Software Engineer · Colombo, Sri Lanka
            </span>
          </div>

          {/* Name */}
          <h1 className="mt-6 text-[3.25rem] leading-[0.95] sm:text-7xl md:text-8xl tracking-tight text-white">
            <span className="block font-semibold">
              <SplitLetters text="Mehara" baseDelay={300} />
            </span>
            <span className="hero-in block font-serif italic font-normal" style={{ "--d": "700ms" }}>
              <span className="text-gradient pr-2">Udawatte</span>
            </span>
          </h1>

          {/* Rotating role */}
          <div className="hero-in mt-6 text-lg sm:text-xl md:text-2xl text-slate-300 font-light" style={{ "--d": "900ms" }}>
            <span>I&apos;m a </span>
            <span className="role-window">
              <span key={roleIndex} className="role-word font-medium text-sky-200">
                {ROLES[roleIndex]}
              </span>
            </span>
          </div>

          {/* Intro */}
          <p
            className="hero-in mt-6 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed"
            style={{ "--d": "1050ms" }}
          >
            Software Engineer who enjoys designing and building software solutions that are efficient, useful, and
            reliable. Loves solving problems through coding and turning ideas into practical applications. Always
            interested in learning new technologies, improving skills, and exploring better ways to create quality
            software.
          </p>

          {/* CTAs */}
          <div
            className="hero-in mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            style={{ "--d": "1200ms" }}
          >
            <MagneticButton onClick={() => scrollToSection("projects")} className="btn btn-primary">
              View My Work
              <ArrowRight className="arrow w-4 h-4" />
            </MagneticButton>
            <MagneticButton onClick={() => scrollToSection("contact")} className="btn btn-ghost">
              Get In Touch
            </MagneticButton>
          </div>

          {/* Socials */}
          <div className="hero-in mt-10 flex gap-3" style={{ "--d": "1350ms" }}>
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="social">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <button
          onClick={() => scrollToSection("projects")}
          className="hero-in hero-centered absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-slate-500 hover:text-sky-200 transition-colors"
          style={{ "--d": "1600ms" }}
          aria-label="Scroll to projects"
        >
          <span className="scroll-cue">
            <span />
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Scroll</span>
        </button>
      </section>

      {/* ========================== PROJECTS ========================== */}
      <section id="projects" className="py-28 md:py-36 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            index="01"
            eyebrow="Selected Work"
            title="Featured"
            accent="Projects"
            description="A selection of things I've designed and built — from NLP-powered web apps to AR accessibility tools."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, index) => (
              <ScrollReveal key={project.title} direction="up" delay={(index % 3) * 120} className="h-full">
                <SpotlightCard className="group h-full flex flex-col p-3">
                  <button
                    type="button"
                    className="project-media"
                    onClick={() => setSelectedImage(project)}
                    aria-label={`Preview ${project.title}`}
                  >
                    <img src={project.image} alt={project.title} loading="lazy" />
                    <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="media-cta">
                      <Maximize2 className="w-3.5 h-3.5" />
                      Preview
                    </span>
                  </button>

                  <div className="flex flex-col flex-grow px-3 pt-5 pb-3">
                    <h3 className="text-base sm:text-lg font-semibold text-white leading-snug transition-colors duration-300 group-hover:text-sky-200">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-slate-400 text-[13px] sm:text-sm leading-relaxed flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-5 mt-auto">
                      {project.tech.map((tech) => (
                        <span key={tech} className="chip chip-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== EDUCATION ========================= */}
      <section id="education" className="py-28 md:py-36 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <SectionHeading index="02" eyebrow="Background" title="My" accent="Education" />

          <div ref={timelineRef} className="timeline">
            <span className="timeline-fill" aria-hidden="true" />
            {EDUCATION.map((item, i) => (
              <ScrollReveal
                key={item.title}
                direction="left"
                delay={i * 120}
                className="relative mb-6 last:mb-0"
                style={{ "--accent": item.accent }}
              >
                <span className="timeline-dot" aria-hidden="true" />
                <SpotlightCard tilt={false} className="p-6 sm:p-7">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white leading-snug">{item.title}</h3>
                      <p className="mt-1.5 text-sm font-medium" style={{ color: item.accent }}>
                        {item.school}
                      </p>
                      {item.detail && (
                        <p className="mt-3 text-slate-400 text-sm leading-relaxed max-w-xl">{item.detail}</p>
                      )}
                    </div>
                    <span className="period shrink-0 self-start">{item.period}</span>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ SKILLS ========================== */}
      <section id="skills" className="py-28 md:py-36 relative z-10">
        <div className="px-6">
          <SectionHeading index="03" eyebrow="Toolkit" title="Skills &" accent="Expertise" />
        </div>

        {/* Infinite marquees */}
        <ScrollReveal direction="none" className="space-y-4 mb-16">
          <div className="marquee" style={{ "--speed": "45s" }}>
            <div className="marquee-track">
              {[...TECHNICAL_SKILLS, ...DATABASES, ...TECHNICAL_SKILLS, ...DATABASES].map((s, i) => (
                <span key={i} className="marquee-item">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="marquee reverse" style={{ "--speed": "50s" }}>
            <div className="marquee-track">
              {[...TOOLS, ...TOOLS].map((s, i) => (
                <span key={i} className="marquee-item alt">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_GROUPS.map(({ title, icon: Icon, items, accent }, gi) => (
            <ScrollReveal key={title} direction="up" delay={gi * 110} className="h-full" style={{ "--accent": accent }}>
              <SpotlightCard className="h-full p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <span className="icon-tile">
                    <Icon className="w-[18px] h-[18px]" />
                  </span>
                  <span className="font-mono text-xs text-slate-500">{String(items.length).padStart(2, "0")}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
                <div className="chip-stagger flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <span key={skill} className="chip" style={{ "--i": i }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ============================= CTA ============================ */}
      <section className="py-20 px-6 relative z-10">
        <ScrollReveal direction="scale" className="max-w-4xl mx-auto">
          <div className="glow-border">
            <div className="glow-inner text-center px-6 py-14 sm:px-12 sm:py-20">
              <span className="eyebrow">Collaborate</span>
              <h2 className="mt-5 font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-white">
                Let&apos;s work <em className="text-gradient">together</em>
              </h2>
              <p className="mt-5 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
                Ready to bring your ideas to life? Let&apos;s collaborate and create something amazing together.
              </p>
              <div className="mt-10 flex justify-center">
                <MagneticButton onClick={() => scrollToSection("contact")} className="btn btn-primary">
                  <Send className="w-4 h-4" />
                  Send Message
                </MagneticButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* =========================== CONTACT ========================== */}
      <section id="contact" className="py-28 md:py-36 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <SectionHeading index="04" eyebrow="Contact" title="Get in" accent="touch" />

          <div className="grid md:grid-cols-[1fr_1.15fr] gap-10 md:gap-14">
            {/* Info */}
            <ScrollReveal direction="right">
              <h3 className="font-serif text-3xl text-white">Let&apos;s connect</h3>
              <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
                I&apos;m always interested in hearing about new opportunities and exciting projects. Whether you have a
                question or just want to say hi, feel free to reach out!
              </p>

              <div className="mt-8 space-y-3">
                {CONTACTS.map(({ label, value, href, icon: Icon, accent }) => {
                  const Row = href ? "a" : "div"
                  return (
                    <Row key={label} href={href} className="contact-row group" style={{ "--accent": accent }}>
                      <span className="icon-tile">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="flex flex-col min-w-0">
                        <span className="text-[11px] uppercase tracking-[0.15em] text-slate-500 font-mono">{label}</span>
                        <span className="text-sm sm:text-[15px] text-slate-200 truncate">{value}</span>
                      </span>
                      {href && (
                        <ArrowUpRight className="ml-auto w-4 h-4 text-slate-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      )}
                    </Row>
                  )
                })}
              </div>

              <div className="mt-8 flex gap-3">
                {SOCIALS.map(({ label, href, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="social">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </ScrollReveal>

            {/* Form */}
            <ScrollReveal direction="left" delay={120}>
              <SpotlightCard tilt={false} className="p-6 sm:p-8">
                <form action="https://api.web3forms.com/submit" method="POST" className="space-y-5">
                  <input type="hidden" name="access_key" value="b005c4fb-b4b4-477d-88e7-1edf3fe5a07f" />
                  <input type="hidden" name="subject" value="New Portfolio Message" />
                  <input type="hidden" name="from_name" value="Portfolio Website" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <label className="block">
                      <span className="field-label">First name</span>
                      <input
                        name="first_name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Jane"
                        required
                        className="field"
                      />
                    </label>
                    <label className="block">
                      <span className="field-label">Last name</span>
                      <input
                        name="last_name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        className="field"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="field-label">Email</span>
                    <input
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="field"
                    />
                  </label>

                  <label className="block">
                    <span className="field-label">Subject</span>
                    <input
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="What's this about?"
                      required
                      className="field"
                    />
                  </label>

                  <label className="block">
                    <span className="field-label">Message</span>
                    <textarea
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me a little about your idea…"
                      rows={5}
                      required
                      className="field resize-none"
                    />
                  </label>

                  <MagneticButton type="submit" strength={0.08} className="btn btn-primary w-full">
                    Send Message
                    <Send className="arrow w-4 h-4" />
                  </MagneticButton>
                </form>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================ FOOTER ========================== */}
      <footer className="relative z-10 px-6 py-10 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© 2026 Mehara Udawatte. All rights reserved.</p>
          <button
            onClick={() => scrollToSection("home")}
            className="group inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            Back to top
            <span className="grid place-items-center w-8 h-8 rounded-full border border-white/10 group-hover:border-sky-300/50 group-hover:-translate-y-1 transition-all duration-300">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </footer>

      {/* ============================ MODAL =========================== */}
      {selectedImage && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
        >
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
            />
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-sm text-slate-300">{selectedImage.title}</p>
              <button
                onClick={() => setSelectedImage(null)}
                className="shrink-0 grid place-items-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

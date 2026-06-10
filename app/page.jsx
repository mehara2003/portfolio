"use client"

import ScrollReveal from "@/components/ScrollReveal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  ChevronDown,
  Code,
  Database,
  Eye,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Users
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"

// Reusable 3D Tilt Card Component for Projects and Education
function TiltCard({ children, className, ...props }) {
  const [style, setStyle] = useState({})

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((centerY - y) / centerY) * 8 // Max 8 degrees tilt
    const rotateY = ((x - centerX) / centerX) * 8

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    })
  }

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-in-out",
    })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
}

// Reusable Magnetic Button Component
function MagneticButton({ children, className, onClick, ...props }) {
  const [style, setStyle] = useState({})

  const handleMouseMove = (e) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    
    setStyle({
      transform: `translate(${x * 0.22}px, ${y * 0.22}px)`,
      transition: "transform 0.1s ease-out",
    })
  }

  const handleMouseLeave = () => {
    setStyle({
      transform: "translate(0px, 0px)",
      transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", // Elastic snap back
    })
  }

  return (
    <Button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </Button>
  )
}

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [selectedImage, setSelectedImage] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("home")

  // Form states
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  // Subheading Typing Animation States
  const [typedText, setTypedText] = useState("")
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const roles = useMemo(() => ["Software Engineer", "Full Stack Developer", "Problem Solver", "UI/UX Designer"], [])

  // Monitor mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Typing effect loop
  useEffect(() => {
    let timer
    const currentRole = roles[roleIndex]
    const typingSpeed = isDeleting ? 40 : 100

    if (!isDeleting && typedText === currentRole) {
      // Pause at full word
      timer = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    } else {
      timer = setTimeout(() => {
        setTypedText(
          isDeleting
            ? currentRole.substring(0, typedText.length - 1)
            : currentRole.substring(0, typedText.length + 1)
        )
      }, typingSpeed)
    }

    return () => clearTimeout(timer)
  }, [typedText, isDeleting, roleIndex, roles])

  // Monitor scroll progress and scroll spy active section
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100)
      }

      // Check if user is scrolled to the absolute bottom (to robustly highlight contact section)
      const isAtBottom = window.scrollY >= totalHeight - 15
      if (isAtBottom) {
        setActiveSection("contact")
        return
      }

      // Scroll spy logic
      const sections = ["home", "projects", "education", "skills", "contact"]
      const scrollPosition = window.scrollY + 250 // trigger offset

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // initial call
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Pre-generate particle coordinates so they do not random-jitter on mouse movement re-renders
  const particles = useMemo(() => {
    return [...Array(22)].map((_, i) => ({
      id: i,
      left: `${(i * 7 + 11) % 100}%`,
      top: `${(i * 13 + 7) % 100}%`,
      size: ((i * 3) % 6) + 4, // 4px to 10px
      delay: `${(i * 0.4).toFixed(1)}s`,
      speedFactor: 0.006 + (i % 3) * 0.005, // variable parallax shift speeds
      color: i % 4 === 0 ? '#38bdf8' : i % 4 === 1 ? '#818cf8' : i % 4 === 2 ? '#60a5fa' : '#a78bfa'
    }))
  }, [])

  const projects = [
    {
      title: "Mammogram Report Interpretation Web App (Flask & NLP)",
      description: "A Flask/React web app secured with Firebase that uses a sequence-to-sequence NLP model to translate technical mammogram reports into plain, patient-friendly language in real time. Uploads are automatically deleted after processing to protect privacy, empowering non-medical users to understand their results instantly.",
      tech: ["React.js", "python", "javascript", "Firebase", "Machine Learning", "Figma", "Natural Language Processing (NLP)"],
      image: "/upload.png",
    },
    {
      title: "Solar Website",
      description: "Developed a web application using React for a solar business with a user-friendly interface, featuring customer feedback, managed projects and more.",
      tech: ["React.js", "typescript", "javascript", "GIT", "Figma"],
      image: "/solar.png",
    },
    {
      title: "A Movie app using Flutter",
      description: "Designed and built a responsive movie app using Flutter, integrating The Movie DB API and Firebase for backend data storage. Included features like personalized watchlists, local persistence, and intuitive UI design based on HCI principles. Implemented robust error handling and maintained version control throughout development, with a critical evaluation of design decisions.",
      tech: ["Flutter", "Dart", "Firebase", "Figma", "Android Studio"],
      image: "/flutter.png",
    },
    {
      title: "Unity AR Communication Application",
      description: "Developed an augmented reality mobile application to support communication for blind and deaf individuals. Built using Unity with C#, the app focused on accessibility and inclusion. Worked collaboratively in an Agile team, contributing to both design and development, and delivered a functional prototype tailored for diverse user needs.",
      tech: ["Unity", "C#", "Figma", "Firebase", "Agile"],
      image: "/unity.png",
    },
    {
      title: "Advanced Software Modelling and Simulation Project (Java)",
      description: "Developed a console-based, multithreaded Java simulation to model rush-hour traffic flow through a configurable road network with traffic-light–controlled intersections, custom thread-safe buffers, and real-time reporting.",
      tech: ["Java", "Concurrency", "Threads", "Simulation Design"],
      image: "/java.png",
    },
    {
      title: "Tasty BYTES Mobile App – UX Design Project",
      description: "Designed a mobile food-ordering app prototype for UCLan students and staff, focused on improving lunchtime efficiency. Created detailed user personas, low-fidelity wireframes, and a high-fidelity interactive prototype using Figma. The design addressed core UX requirements such as vendor listings, filtered menus, order tracking, and sustainable packaging representation.",
      tech: ["Figma", "UI/UX principles"],
      image: "/ui.png",
    },
  ]

  const technicalSkills = [
    "JavaScript",
    "typescript",
    "C++",
    "Python",
    "React",
    "Next.js",
    "C#",
    "Java",
    "Dart",
    "HTML",
    "CSS",
    "REST APIs",
  ]
  
  const databases = [
    "MongoDB",
    "PostgreSQL",
    "Firebase",
    "MySQL",
  ]

  const toolsPlatforms = [
    "Git",
    "GitHub",
    "Docker",
    "Unity",
    "Flutter",
    "Jupyter Notebook",
    "Canva",
    "Figma",
    "VS Code",
    "Android Studio",
  ]

  const softSkills = [
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0e192d] via-[#0e192d] to-[#091422] text-slate-200 overflow-x-hidden font-sans relative">
      
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-500 z-50 transition-all duration-75 scroll-progress-glow"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Glassmorphic Sticky Header / Navbar */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 w-[90%] max-w-3xl rounded-full border border-[#1a5e95]/30 bg-[#124c7a]/60 backdrop-blur-md px-4 py-2.5 flex justify-between items-center shadow-lg shadow-black/10 transition-all duration-300">
        <div 
          className="text-white font-bold tracking-tight text-lg cursor-pointer pl-2 hover:text-sky-300 transition-colors"
          onClick={() => scrollToSection("home")}
        >
         
        </div>
        <nav className="flex space-x-1 sm:space-x-2">
          {["home", "projects", "education", "skills", "contact"].map((sec) => (
            <button
              key={sec}
              onClick={() => scrollToSection(sec)}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 capitalize ${
                activeSection === sec
                  ? "bg-[#1a5e95] text-white shadow-md shadow-sky-500/10"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {sec}
            </button>
          ))}
        </nav>
      </header>

      {/* Background Dot Grid Overlay with Parallax Motion */}
      <div 
        className="fixed inset-0 pointer-events-none bg-grid-dots z-0 opacity-70"
        style={{
          transform: `translate(${mousePosition.x * 0.008}px, ${mousePosition.y * 0.008}px)`,
        }}
      />

      {/* Ambient Mouse Glow Tracker */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          background: `radial-gradient(700px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.15), transparent 50%)`,
        }}
      />

      {/* Ambient Floating Particle Parallax background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full animate-pulse opacity-25"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
              transform: `translate(${mousePosition.x * p.speedFactor}px, ${mousePosition.y * p.speedFactor}px)`,
              backgroundColor: p.color,
            }}
          />
        ))}
      </div>

      {/* Ambient Large Floating Blurs */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none animate-float-slow" />
      <div className="absolute top-[60%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none animate-float-medium" />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20 z-10">
        <div className="text-center space-y-6 max-w-3xl">
          
          {/* Profile Photo with Interactive Border Effect */}
          <ScrollReveal direction="scale" duration={1000}>
            <div className="w-48 h-48 sm:w-52 sm:h-52 mx-auto rounded-full bg-gradient-to-br from-sky-400 via-[#1a5e95] to-indigo-500 p-1 mb-4 overflow-hidden shadow-xl shadow-sky-500/10 hover:scale-105 transition-transform duration-500 group relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <img
                src="/pic.png"
                alt="Profile Photo"
                className="w-full h-full rounded-full object-cover bg-slate-800"
              />
            </div>
          </ScrollReveal>

          {/* Heading - Mehara Udawatte */}
          <ScrollReveal direction="up" delay={200} duration={800}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-2">
              Mehara Udawatte
            </h1>
          </ScrollReveal>

          {/* Subheading - Interactive Typing Animation */}
          <ScrollReveal direction="up" delay={400} duration={800}>
            <div className="text-lg sm:text-xl md:text-2xl font-medium tracking-wide text-sky-300 min-h-[36px] flex justify-center items-center">
              <span>I&apos;m a </span>
              <span className="ml-2 border-r-2 border-sky-400 pr-1 animate-pulse font-semibold">
                {typedText}
              </span>
            </div>
          </ScrollReveal>

          {/* Hero Paragraph description */}
          <ScrollReveal direction="up" delay={550} duration={800}>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Software Engineer who enjoys designing and building software solutions that are efficient, useful, 
              and reliable. Loves solving problems through coding and turning ideas into practical applications. 
              Always interested in learning new technologies, improving skills, and exploring better ways to create quality software.

            </p>
          </ScrollReveal>

          {/* Navigation Buttons with Magnetic Pull Effects */}
          <ScrollReveal direction="up" delay={700} duration={800}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <MagneticButton
                onClick={() => scrollToSection("projects")}
                size="lg"
                className="bg-gradient-to-r from-sky-500 to-[#1a5e95] hover:from-sky-600 hover:to-blue-700 text-white px-8 py-3 text-base font-medium shadow-lg shadow-sky-500/10 cursor-pointer"
              >
                <Eye className="w-5 h-5 mr-2 animate-bounce" />
                View My Work
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollToSection("contact")}
                size="lg"
                variant="outline"
                className="border-2 border-sky-400/40 text-sky-300 hover:bg-sky-400/10 px-8 py-3 text-base font-medium bg-transparent cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get In Touch
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll Down Indicator Icon - Advanced Double Chevron */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1 group"
          onClick={() => scrollToSection("projects")}
        >
          <span className="text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-sky-300 transition-colors">Scroll Down</span>
          <div className="flex flex-col items-center">
            <ChevronDown className="w-5 h-5 text-sky-400 animate-bounce" />
            <ChevronDown className="w-4 h-4 text-sky-400/60 -mt-3 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 relative z-10 bg-slate-950/20">
        <div className="max-w-6xl mx-auto">
          
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
              Featured Projects
            </h2>
            <div className="w-16 h-1 bg-sky-400 mx-auto mb-14 rounded-full" />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ScrollReveal 
                key={index} 
                direction="up" 
                delay={index * 100}
                className="h-full"
              >
                <TiltCard className="h-full rounded-2xl">
                  <Card className="bg-slate-950/40 backdrop-blur-md border border-[#1a5e95]/30 hover:border-sky-400/50 hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300 group hover-edge-glow flex flex-col h-full overflow-hidden">
                    <CardContent className="p-5 flex flex-col h-full">
                      
                      {/* Image Preview Container */}
                      <div
                        className="aspect-video rounded-lg mb-4 overflow-hidden cursor-pointer bg-slate-900/50 relative"
                        onClick={() => setSelectedImage(project.image)}
                      >
                        <div className="absolute inset-0 bg-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                          <Eye className="w-8 h-8 text-white drop-shadow-md" />
                        </div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                      </div>

                      <h3 className="text-base sm:text-lg font-semibold mb-2 text-white leading-tight group-hover:text-sky-300 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-slate-300 mb-4 text-xs sm:text-sm leading-relaxed flex-grow">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2 mt-auto">
                        {project.tech.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="bg-sky-400/10 text-sky-300 hover:bg-sky-400/20 border-0 text-[10px] sm:text-xs font-normal"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                    </CardContent>
                  </Card>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
              Education
            </h2>
            <div className="w-16 h-1 bg-sky-400 mx-auto mb-14 rounded-full" />
          </ScrollReveal>

          <div className="space-y-6 relative border-l-2 border-[#1a5e95]/40 pl-6 ml-4 sm:ml-6">
            
            {/* Education Card 1 */}
            <ScrollReveal direction="left" delay={100}>
              <div className="absolute -left-[31px] top-6 w-4 h-4 rounded-full bg-sky-400 border-4 border-[#124c7a] shadow-md shadow-sky-500/50" />
              <TiltCard>
                <Card className="bg-slate-950/40 backdrop-blur-md border border-[#1a5e95]/30 hover:border-sky-400/40 hover:shadow-lg hover:shadow-sky-500/5 transition-all duration-300 hover-edge-glow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Bachelor of Science in Software Engineering</h3>
                        <p className="text-sky-300 font-medium text-sm mt-0.5">University Of Lancashire</p>
                        <p className="text-slate-300 text-xs sm:text-sm mt-2 font-normal leading-relaxed">
                          Relevant coursework: Data Structures, Algorithms, Software Engineering (Software Development Life Cycle, Agile Methodologies, System Design)
                        </p>
                      </div>
                      <div className="text-left md:text-right shrink-0">
                        <Badge variant="outline" className="border-sky-400/40 text-sky-300 bg-sky-500/5">2023 - 2025</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TiltCard>
            </ScrollReveal>

            {/* Education Card 2 */}
            <ScrollReveal direction="left" delay={200}>
              <div className="absolute -left-[31px] top-6 w-4 h-4 rounded-full bg-sky-400 border-4 border-[#124c7a] shadow-md shadow-sky-500/50" />
              <TiltCard>
                <Card className="bg-slate-950/40 backdrop-blur-md border border-[#1a5e95]/30 hover:border-sky-400/40 hover:shadow-lg hover:shadow-sky-500/5 transition-all duration-300 hover-edge-glow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Professional Qualification of Java Application Development using JavaSE</h3>
                        <p className="text-sky-300 font-medium text-sm mt-0.5">University of Colombo School of Computing</p>
                      </div>
                      <div className="text-left md:text-right shrink-0">
                        <Badge variant="outline" className="border-sky-400/40 text-sky-300 bg-sky-500/5">2024</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TiltCard>
            </ScrollReveal>

            {/* Education Card 3 */}
            <ScrollReveal direction="left" delay={300}>
              <div className="absolute -left-[31px] top-6 w-4 h-4 rounded-full bg-indigo-400 border-4 border-[#124c7a] shadow-md shadow-indigo-500/50" />
              <TiltCard>
                <Card className="bg-slate-950/40 backdrop-blur-md border border-[#1a5e95]/30 hover:border-indigo-400/40 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 hover-edge-glow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">GCE A/L</h3>
                        <p className="text-indigo-300 font-medium text-sm mt-0.5">Sirimavo Bandaranaike Vidyalaya</p>
                      </div>
                      <div className="text-left md:text-right shrink-0">
                        <Badge variant="outline" className="border-indigo-400/40 text-indigo-300 bg-indigo-500/5">2022 (2023)</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TiltCard>
            </ScrollReveal>

            {/* Education Card 4 */}
            <ScrollReveal direction="left" delay={400}>
              <div className="absolute -left-[31px] top-6 w-4 h-4 rounded-full bg-indigo-400 border-4 border-[#124c7a] shadow-md shadow-indigo-500/50" />
              <TiltCard>
                <Card className="bg-slate-950/40 backdrop-blur-md border border-[#1a5e95]/30 hover:border-indigo-400/40 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 hover-edge-glow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">GCE O/L</h3>
                        <p className="text-indigo-300 font-medium text-sm mt-0.5">Sirimavo Bandaranaike Vidyalaya</p>
                      </div>
                      <div className="text-left md:text-right shrink-0">
                        <Badge variant="outline" className="border-indigo-400/40 text-indigo-300 bg-indigo-500/5">2019</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 relative z-10 bg-slate-950/20">
        <div className="max-w-5xl mx-auto">
          
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
              Skills & Expertise
            </h2>
            <div className="w-16 h-1 bg-sky-400 mx-auto mb-14 rounded-full" />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Technical Skills Card */}
            <ScrollReveal direction="up" delay={100} className="h-full">
              <Card className="bg-slate-950/40 backdrop-blur-md border border-[#1a5e95]/30 hover:border-sky-400/40 hover:shadow-lg hover:shadow-sky-500/5 transition-all duration-300 hover-edge-glow h-full">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-9 h-9 rounded-full bg-sky-500/10 flex items-center justify-center mr-3">
                      <Code className="w-4 h-4 text-sky-400" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white">Technical Skills</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {technicalSkills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-sky-400/30 text-sky-300 hover:bg-sky-400/10 transition-colors text-xs font-normal"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Tools & Platforms Card */}
            <ScrollReveal direction="up" delay={200} className="h-full">
              <Card className="bg-slate-950/40 backdrop-blur-md border border-[#1a5e95]/30 hover:border-indigo-400/40 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 hover-edge-glow h-full">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-9 h-9 rounded-full bg-indigo-500/10 flex items-center justify-center mr-3">
                      <Database className="w-4 h-4 text-indigo-400" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white">Tools & Platforms</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {toolsPlatforms.map((tool, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-indigo-400/30 text-indigo-300 hover:bg-indigo-500/20 transition-colors text-xs font-normal"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Databases Card */}
            <ScrollReveal direction="up" delay={300} className="h-full">
              <Card className="bg-slate-950/40 backdrop-blur-md border border-[#1a5e95]/30 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 hover-edge-glow h-full">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-9 h-9 rounded-full bg-cyan-500/10 flex items-center justify-center mr-3">
                      <Database className="w-4 h-4 text-cyan-400" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white">Databases</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {databases.map((db, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10 transition-colors text-xs font-normal"
                      >
                        {db}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Soft Skills Card */}
            <ScrollReveal direction="up" delay={400} className="h-full">
              <Card className="bg-slate-950/40 backdrop-blur-md border border-[#1a5e95]/30 hover:border-violet-400/40 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 hover-edge-glow h-full">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-9 h-9 rounded-full bg-violet-500/10 flex items-center justify-center mr-3">
                      <Users className="w-4 h-4 text-violet-400" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white">Soft Skills</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {softSkills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-violet-400/30 text-violet-300 hover:bg-violet-500/20 transition-colors text-xs font-normal"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Collaboration Banner / Let's Work Together with Magnetic Button */}
      <section className="py-24 px-6 relative z-10">
        <ScrollReveal direction="scale">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-sky-500/15 via-[#1a5e95]/20 to-indigo-500/15 border border-[#1a5e95]/40 rounded-3xl p-10 backdrop-blur-md shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Let&apos;s Work Together
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed">
              Ready to bring your ideas to life? Let&apos;s collaborate and create something amazing together.
            </p>
            <MagneticButton
              onClick={() => scrollToSection("contact")}
              size="lg"
              className="bg-gradient-to-r from-sky-500 to-[#1a5e95] hover:from-sky-600 hover:to-blue-700 text-white px-8 py-3 text-base font-medium shadow-md shadow-sky-500/10 cursor-pointer"
            >
              <Send className="w-5 h-5 mr-2 animate-pulse" />
              Send Message
            </MagneticButton>
          </div>
        </ScrollReveal>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
              Get In Touch
            </h2>
            <div className="w-16 h-1 bg-sky-400 mx-auto mb-14 rounded-full" />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-10">
            
            {/* Contact Information */}
            <ScrollReveal direction="right" className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Let&apos;s Connect</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                I&apos;m always interested in hearing about new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              
              <div className="space-y-4 pt-2">
                
                <div className="flex items-center space-x-4 text-slate-300 hover:text-sky-300 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-4 h-4 text-sky-400" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">meharaudawatte@gmail.com</span>
                </div>
                
                <div className="flex items-center space-x-4 text-slate-300 hover:text-indigo-300 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">+94 76 554 0319</span>
                </div>
                
                <div className="flex items-center space-x-4 text-slate-300 hover:text-violet-300 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-4 h-4 text-violet-400" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">Colombo, Sri Lanka</span>
                </div>

              </div>

              {/* Social Media Link Buttons */}
              <div className="flex space-x-3 pt-4">
                <a href="https://www.linkedin.com/in/mehara-udawatte" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="border-sky-400/30 text-sky-300 hover:bg-sky-400/20 h-10 w-10 p-0 bg-transparent rounded-full hover:scale-110 hover:border-sky-400 transition-all duration-300">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </a>
                <a href="https://www.instagram.com/mehaa.ra?igsh=NmV5eXRnbG9mNXJk&utm_source=qr" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="border-indigo-400/30 text-indigo-300 hover:bg-indigo-500/20 h-10 w-10 p-0 bg-transparent rounded-full hover:scale-110 hover:border-indigo-400 transition-all duration-300">
                    <Instagram className="w-4 h-4" />
                  </Button>
                </a>
                <a href="https://github.com/mehara2003" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="border-slate-500/30 text-slate-300 hover:bg-slate-500/20 h-10 w-10 p-0 bg-transparent rounded-full hover:scale-110 hover:border-slate-300 transition-all duration-300">
                    <Github className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </ScrollReveal>

            {/* Form Container */}
            <ScrollReveal direction="left">
              <Card className="bg-slate-950/40 backdrop-blur-md border border-[#1a5e95]/30 shadow-xl hover-edge-glow">
                <CardContent className="p-5">
                  <form action="https://api.web3forms.com/submit" method="POST" className="space-y-4">
                    
                    <input
                      type="hidden"
                      name="access_key"
                      value="b005c4fb-b4b4-477d-88e7-1edf3fe5a07f"
                    />
                    <input type="hidden" name="subject" value="New Portfolio Message" />
                    <input type="hidden" name="from_name" value="Portfolio Website" />

                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        name="first_name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        required
                        className="bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-sky-400/50 focus:ring-sky-400/20 text-sm rounded-lg transition-all focus:scale-[1.01]"
                      />
                      <Input
                        name="last_name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-sky-400/50 focus:ring-sky-400/20 text-sm rounded-lg transition-all focus:scale-[1.01]"
                      />
                    </div>
                    
                    <Input
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      required
                      className="bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-sky-400/50 focus:ring-sky-400/20 text-sm rounded-lg transition-all focus:scale-[1.01]"
                    />
                    
                    <Input
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Subject"
                      required
                      className="bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-sky-400/50 focus:ring-sky-400/20 text-sm rounded-lg transition-all focus:scale-[1.01]"
                    />
                    
                    <Textarea
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your Message"
                      rows={4}
                      required
                      className="bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-sky-400/50 focus:ring-sky-400/20 resize-none text-sm rounded-lg transition-all focus:scale-[1.01]"
                    />

                    <MagneticButton
                      type="submit"
                      className="w-full bg-gradient-to-r from-sky-500 to-[#1a5e95] hover:from-sky-600 hover:to-blue-700 text-white font-medium py-2.5 rounded-lg shadow-md cursor-pointer"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </MagneticButton>
                  </form>
                </CardContent>
              </Card>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#1a5e95]/20 bg-slate-950/40 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-2">
          <p className="text-slate-400 text-sm">© 2026 Mehara Udawatte. All rights reserved.</p>
        </div>
      </footer>

      {/* Image Modal Preview */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4 backdrop-blur-sm transition-all duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl w-full mx-auto" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Project preview"
              className="w-full h-auto rounded-lg border-2 border-sky-400/40 shadow-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white text-sm bg-sky-500 hover:bg-sky-600 rounded-full px-3 py-1 shadow-md hover:scale-105 transition-transform"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

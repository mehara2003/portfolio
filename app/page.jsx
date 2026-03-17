"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import emailjs from 'emailjs-com'
import {
  Code,
  Database,
  Download,
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
import { useEffect, useState } from "react"

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    emailjs.sendForm(
      "service_m41zzvm",
      "template_n2lreka",
      e.currentTarget,
      "U-1firgXEsLBcvwyU"
    )
      .then(() => {
        alert("Message sent successfully!")
        setFirstName("")
        setLastName("")
        setEmail("")
        setSubject("")
        setMessage("")
      })
      .catch((error) => {
        console.error("EmailJS error:", error)
        alert("Failed to send message. Please try again.")
      })
  }

  const projects = [
    {
      title: "Mammogram Report Interpretation Web App (Flask & NLP) ",
      description: "A Flask/React web app secured with Firebase that uses a sequence-to-sequence NLP model to translate technical mammogram reports into plain, patient-friendly language in real time. Uploads are automatically deleted after processing to protect privacy, empowering non-medical users to understand their results instantly.",
      tech: ["React.js", "python", "javascript", "Firebase", "Machine Learning", "Figma", "Natural Language Processing (NLP)"],
      image: "/upload.png",
    },
    {
      title: "Solar Website",
      description: "Developed a web application using React for a solar business with a user-friendly interface, featuring customer feedback, managed projects and more.",
      tech: ["React.js", "typescript", "javascript", "GIT", "Figma",],
      image: "/solar.png",
     // link: "https://medical-annotation-platform.example.com"
    },
    {
      title: "A Movie app using Flutter",
      description: "Designed and built a responsive movie app using Flutter, integrating The Movie DB API and Firebase for backend data storage. Included features like personalized watchlists, local persistence, and intuitive UI design based on HCI principles. Implemented robust error handling and maintained version control throughout development, with a critical evaluation of design decisions.",
      tech: ["Flutter", "Dart", "Firebase", "Figma", "Android Studio"],
      image: "/flutter.png",
    },
    {
      title: "Unity Project - Created a communication AR application for blind and deaf people.",
      description: "Developed an augmented reality mobile application to support communication for blind and deaf individuals. Built using Unity with C#, the app focused on accessibility and inclusion. Worked collaboratively in an Agile team, contributing to both design and development, and delivered a functional prototype tailored for diverse user needs.",
      tech: ["Unity", "C#", "Figma", "Firebase", "Agile"],
      image: "/unity.png",
    },
    {
      title: "Advanced Software Modelling and Simulation Project (Java)",
      description: "Developed a console-based, multithreaded Java simulation to model rush-hour traffic flow through a configurable road network with traffic-light–controlled intersections, custom thread-safe buffers, and real-time reporting",
      tech: ["Java", "Concurrency", "Threads", "Simulation Design"],
      image: "/java.png",
    },
    {
      title: "Tasty BYTES Mobile App – UX Design Project",
      description: "Designed a mobile food-ordering app prototype for UCLan students and staff, focused on improving lunchtime efficiency. Created detailed user personas, low-fidelity wireframes, and a high-fidelity interactive prototype using Figma. The design addressed core UX requirements such as vendor listings based on real-time availability, filtered food menus, order tracking, and sustainable packaging representation. Justified design choices through annotations and user-centered design principles, supported by relevant UX research and design guidelines.",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-slate-200 overflow-hidden">
      {/* Subtle Mouse Follow Gradient */}
      <div
        className="fixed inset-0 pointer-events-none opacity-50"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.15), transparent 50%)`,
        }}
      />

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-pulse opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `translate(${mousePosition.x * 0.012}px, ${mousePosition.y * 0.012}px)`,
              backgroundColor: i % 4 === 0 ? '#60A5FA' : i % 4 === 1 ? '#818CF8' : i % 4 === 2 ? '#38BDF8' : '#A78BFA',
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div
          className="text-center space-y-6 transform transition-transform duration-300"
          style={{
            transform: `translate(${mousePosition.x * 0.006}px, ${mousePosition.y * 0.006}px)`,
          }}
        >
          {/* Profile Photo */}
          <div className="w-52 h-52 mx-auto rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 p-1 mb-6 overflow-hidden shadow-lg shadow-blue-500/20">
            <img
              src="/pic.png"
              alt="Profile Photo"
              className="w-full h-full rounded-full object-cover bg-slate-800"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">
            Mehara Udawatte
          </h1>

          <p className="text-xl md:text-2xl text-blue-400 font-medium">Software Engineer</p>

          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            I am a passionate Software Engineer who enjoys designing and building efficient software
            solutions. I like solving problems through coding and creating applications that are useful and
            reliable. I am always interested in learning new technologies and improving my skills to become a
            better developer.
          </p>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              onClick={() => scrollToSection("projects")}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-base font-medium transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/25"
            >
              <Eye className="w-5 h-5 mr-2" />
              View My Work
            </Button>

            <Button
              onClick={() => scrollToSection("contact")}
              size="lg"
              variant="outline"
              className="border-2 border-blue-500/50 text-blue-400 hover:bg-blue-500/10 px-8 py-3 text-base font-medium transform hover:scale-105 transition-all duration-300 bg-transparent"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 border-2 border-blue-500/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-blue-500 rounded-full mt-1.5 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-white">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/10"
                style={{
                  transform: `translateY(${Math.sin((mousePosition.x + index * 100) * 0.01) * 2}px)`,
                }}
              >
                <CardContent className="p-5">
                  <div
                    className="aspect-video rounded-lg mb-4 overflow-hidden cursor-pointer bg-slate-700/50"
                    onClick={() => setSelectedImage(project.image)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-base font-semibold mb-2 text-slate-100 leading-tight">{project.title}</h3>
                  <p className="text-slate-400 mb-3 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-0 text-xs font-normal"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                    >
                      Visit Project
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-white">
            Education
          </h2>
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border border-blue-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100">Bachelor of Science in Software Engineering (Upper Second Class)</h3>
                    <p className="text-blue-400 font-medium">University Of Lancashire</p>
                    <p className="text-slate-400 text-sm mt-1">Relevant coursework: Data Structures, Algorithms, Software Engineering (Software Development Life Cycle, Agile Methodologies, System Design) </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-blue-500/40 text-blue-300">2023 - 2025</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

          <Card className="bg-slate-800/50 border border-blue-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100">Professional Qualification of Java Application Development using JavaSE</h3>
                    <p className="text-blue-400 font-medium">University of Colombo School of Computing</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-blue-500/40 text-blue-300">2024</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border border-indigo-500/30 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100">GCE A/L</h3>
                    <p className="text-indigo-400 font-medium">Sirimavo Bandaranaike Vidyalaya</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-indigo-500/40 text-indigo-300">2022 (2023)</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border border-indigo-500/30 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100">GCE O/L</h3>
                    <p className="text-indigo-400 font-medium">Sirimavo Bandaranaike Vidyalaya</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-indigo-500/40 text-indigo-300">2019</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-white">
            Skills & Expertise
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Technical Skills */}
            <Card className="bg-slate-800/50 border border-blue-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center mb-4">
                  <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <Code className="w-4 h-4 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100">Technical Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-blue-500/40 text-blue-300 hover:bg-blue-500/20 transition-colors text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tools & Platforms */}
            <Card className="bg-slate-800/50 border border-indigo-500/30 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center mb-4">
                  <div className="w-9 h-9 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3">
                    <Database className="w-4 h-4 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100">Tools & Platforms</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {toolsPlatforms.map((tool, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/20 transition-colors text-xs"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

                        {/* Databases */}
            <Card className="bg-slate-800/50 border border-cyan-500/30 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center mb-4">
                  <div className="w-9 h-9 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                    <Database className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100">Databases</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {databases.map((db, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 transition-colors text-xs"
                    >
                      {db}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Soft Skills */}
            <Card className="bg-slate-800/50 border border-violet-500/30 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center mb-4">
                  <div className="w-9 h-9 rounded-full bg-violet-500/20 flex items-center justify-center mr-3">
                    <Users className="w-4 h-4 text-violet-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100">Soft Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-violet-500/40 text-violet-300 hover:bg-violet-500/20 transition-colors text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Let's Work Together Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Let&apos;s Work Together
          </h2>
          <p className="text-base text-slate-400 mb-10 max-w-xl mx-auto">
            Ready to bring your ideas to life? Let&apos;s collaborate and create something amazing together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-base font-medium transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/25"
              >
                <Download className="w-5 h-5 mr-2" />
                View Resume
              </Button>
            </a>

            <Button
              onClick={() => scrollToSection("contact")}
              size="lg"
              variant="outline"
              className="border-2 border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 px-8 py-3 text-base font-medium transform hover:scale-105 transition-all duration-300 bg-transparent"
            >
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-white">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-100">Let&apos;s Connect</h3>
              <p className="text-slate-400 leading-relaxed">
                I&apos;m always interested in hearing about new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-slate-300 hover:text-blue-400 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-sm">meharaudawatte@gmail.com</span>
                </div>
                <div className="flex items-center space-x-4 text-slate-300 hover:text-indigo-400 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="text-sm">+94 76 554 0319</span>
                </div>
                <div className="flex items-center space-x-4 text-slate-300 hover:text-violet-400 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-violet-400" />
                  </div>
                  <span className="text-sm">Colombo, Sri Lanka</span>
                </div>
              </div>
              <div className="flex space-x-3 pt-2">
                <a href="https://www.linkedin.com/in/mehara-udawatte" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="border-blue-500/40 text-blue-400 hover:bg-blue-500/20 h-9 w-9 p-0 bg-transparent">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </a>
                <a href="https://www.instagram.com/mehaa.ra?igsh=NmV5eXRnbG9mNXJk&utm_source=qr" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="border-indigo-500/40 text-indigo-400 hover:bg-indigo-500/20 h-9 w-9 p-0 bg-transparent">
                    <Instagram className="w-4 h-4" />
                  </Button>
                </a>
                <a href="https://github.com/mehara2003" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="border-slate-500/40 text-slate-400 hover:bg-slate-500/20 h-9 w-9 p-0 bg-transparent">
                    <Github className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>

            <Card className="bg-slate-800/50 border border-slate-700/50 shadow-lg">
              <CardContent className="p-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      name="first_name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className="bg-slate-700/50 border-slate-600/50 text-slate-200 placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20 text-sm"
                    />
                    <Input
                      name="last_name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className="bg-slate-700/50 border-slate-600/50 text-slate-200 placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20 text-sm"
                    />
                  </div>
                  <Input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="bg-slate-700/50 border-slate-600/50 text-slate-200 placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20 text-sm"
                  />
                  <Input
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject"
                    className="bg-slate-700/50 border-slate-600/50 text-slate-200 placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20 text-sm"
                  />
                  <Textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your Message"
                    rows={4}
                    className="bg-slate-700/50 border-slate-600/50 text-slate-200 placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20 resize-none text-sm"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2.5 transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-slate-800">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-slate-500 text-sm">© 2025 Mehara Udawatte. All rights reserved</p>
        </div>
      </footer>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="relative max-w-3xl w-full mx-4">
            <img
              src={selectedImage}
              alt="Project preview"
              className="w-full h-auto rounded-lg border-4 border-slate-700 shadow-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white text-lg bg-blue-600 hover:bg-blue-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              x
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

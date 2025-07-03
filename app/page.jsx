"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }
  
    // Contact form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName]   = useState("")
  const [email, setEmail]         = useState("")
  const [subject, setSubject]     = useState("")
  const [message, setMessage]     = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { firstName, lastName, email, subject, message }

    try {
      const res = await fetch("/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        alert("Message sent!")
        setFirstName(""); setLastName(""); setEmail(""); setSubject(""); setMessage("")
      } else {
        alert("Error sending message.")
      }
    } catch (err) {
      console.error(err)
      alert("Network error.")
    }
  }

  const projects = [
    {
      title: "Mammogram Report Interpretation Web App (Flask & NLP) ",
      description: "A Flask/React web app secured with Firebase that uses a sequence-to-sequence NLP model to translate technical mammogram reports into plain, patient-friendly language in real time. Uploads are automatically deleted after processing to protect privacy, empowering non-medical users to understand their results instantly.",
      tech: ["React.js", "Firebase", "Machine Learning", "Figma", "Natural Language Processing (NLP)"],
      image: "/upload.png",
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
      tech: ["Figma", "UI principles"],
      image: "/ui.png",
    },
  ]

  const technicalSkills = [
    "JavaScript",
    "C++",
    "Python",
    "React",
    "Next.js",
    "C#",
    "Java",
    "Dart",
    "HTML",
    "CSS",
  ]

  const toolsPlatforms = [
    "Git",
    "Unity",
    "Flutter",
    "Firebase",
    "Jupyter Notebook",
    "Canva",
    "Figma",
    "VS Code",
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
    <div
      className="min-h-screen bg-gradient-to-br from-gray-800 via-purple-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139,69,193,0.2), transparent 40%)`,
        }} />
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-300/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            }} />
        ))}
      </div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div
          className="text-center space-y-8 transform transition-transform duration-300"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          }}>
          <div className="relative">
            {/* Profile Photo */}
            <div
              className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-purple-400 to-gray-500 p-1 mb-8 overflow-hidden">
              <img
                src="/placeholder.svg?height=160&width=160"
                alt="Profile Photo"
                className="w-full h-full rounded-full object-cover bg-gray-800" />
            </div>
            <h1
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-300 via-gray-200 to-purple-400 bg-clip-text text-transparent mb-4">
              Mehara Udawatte
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-6">Undergraduate Software Engineer</p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
              Motivated Software Engineer with strong leadership skills and experience in collaborative projects. Demonstrated ability to 
              drive innovation and continuous learning in software development. Proven track record of delivering results in team 
              environments. 
            </p>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => scrollToSection("projects")}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-gray-700 hover:from-purple-700 hover:to-gray-800 text-white px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300">
                <Eye className="w-5 h-5 mr-2" />
                View My Work
              </Button>

              <Button
                onClick={() => scrollToSection("contact")}
                size="lg"
                variant="outline"
                className="border-purple-400/50 text-purple-300 hover:bg-purple-600/20 px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300 bg-transparent">
                <MessageCircle className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div
            className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-gray-300 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-gray-800/40 backdrop-blur-lg border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 group hover:scale-105"
                style={{
                  transform: `translateY(${Math.sin((mousePosition.x + index * 100) * 0.01) * 3}px)`,
                }}>
                <CardContent className="p-6">
                  <div className="aspect-video rounded-lg mb-4 overflow-hidden">
                  <img
                      src={project.image}
                      alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="bg-purple-600/20 text-purple-300 hover:bg-purple-600/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Skills Section */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-gray-300 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Technical Skills */}
            <Card
              className="bg-gray-800/40 backdrop-blur-lg border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Code className="w-8 h-8 text-purple-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Technical Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-purple-400/50 text-purple-300 hover:bg-purple-600/20 transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tools & Platforms */}
            <Card
              className="bg-gray-800/40 backdrop-blur-lg border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Database className="w-8 h-8 text-gray-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Tools & Platforms</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {toolsPlatforms.map((tool, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-gray-400/50 text-gray-300 hover:bg-gray-600/20 transition-colors">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Soft Skills */}
            <Card
              className="bg-gray-800/40 backdrop-blur-lg border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Users className="w-8 h-8 text-purple-300 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Soft Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-purple-300/50 text-purple-200 hover:bg-purple-600/20 transition-colors">
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
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-gray-300 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's collaborate and create something amazing together.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-gray-700 hover:from-purple-700 hover:to-gray-800 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300">
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>

            <Button
              onClick={() => scrollToSection("contact")}
              size="lg"
              variant="outline"
              className="border-purple-400/50 text-purple-300 hover:bg-purple-600/20 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 bg-transparent">
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </section>
      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-gray-300 bg-clip-text text-transparent">
            Get In Touch
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-white">Let's Connect</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  I'm always interested in hearing about new opportunities and exciting projects. Whether you have a
                  question or just want to say hi, feel free to reach out!
                </p>
              </div>

              <div className="space-y-4">
                <div
                  className="flex items-center space-x-4 text-gray-300 hover:text-purple-400 transition-colors">
                  <Mail className="w-6 h-6" />
                  <span>meharaudawatte@gmail.com</span>
                </div>
                <div
                  className="flex items-center space-x-4 text-gray-300 hover:text-purple-400 transition-colors">
                  <Phone className="w-6 h-6" />
                  <span>+94 76 554 0319</span>
                </div>
                <div
                  className="flex items-center space-x-4 text-gray-300 hover:text-purple-400 transition-colors">
                  <MapPin className="w-6 h-6" />
                  <span>Colombo, Sri Lanka</span>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-purple-400/50 text-purple-300 hover:bg-purple-600/20 bg-transparent">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-purple-400/50 text-purple-300 hover:bg-purple-600/20 bg-transparent">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-purple-400/50 text-purple-300 hover:bg-purple-600/20 bg-transparent">
                  <Github className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-gray-800/40 backdrop-blur-lg border-gray-700/50">
              <CardContent className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        placeholder="First Name"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-400" />
                    </div>
                    <div>
                      <Input
                        placeholder="Last Name"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-400" />
                    </div>
                  </div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-400" />
                  <Input
                    placeholder="Subject"
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-400" />
                  <Textarea
                    placeholder="Your Message"
                    rows={5}
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-400 resize-none" />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-gray-700 hover:from-purple-700 hover:to-gray-800 text-white font-semibold py-3 transform hover:scale-105 transition-all duration-300">
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
      <footer className="py-8 px-6 border-t border-gray-700/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© 2025 Mehara Udawatte. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

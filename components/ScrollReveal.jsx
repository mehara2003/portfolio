"use client"

import React, { useEffect, useRef, useState } from "react"

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 800,
  threshold = 0.1,
  className = "",
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Once visible, we can unobserve to avoid rerun animations unless we want it to run every scroll.
          if (ref.current) {
            observer.unobserve(ref.current)
          }
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px", // triggers slightly before entering the full screen
      }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold])

  const getDirectionClass = () => {
    switch (direction) {
      case "up":
        return "translate-y-12 opacity-0"
      case "down":
        return "-translate-y-12 opacity-0"
      case "left":
        return "translate-x-12 opacity-0"
      case "right":
        return "-translate-x-12 opacity-0"
      case "scale":
        return "scale-90 opacity-0"
      case "none":
      default:
        return "opacity-0"
    }
  }

  const getTransitionStyle = () => {
    return {
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
    }
  }

  return (
    <div
      ref={ref}
      style={getTransitionStyle()}
      className={`transition-all cubic-bezier(0.16, 1, 0.3, 1) ${
        isVisible ? "translate-y-0 translate-x-0 scale-100 opacity-100" : getDirectionClass()
      } ${className}`}
    >
      {children}
    </div>
  )
}

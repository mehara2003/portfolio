"use client"

import { useEffect, useRef, useState } from "react"

const OFFSETS = {
  up: "translate3d(0, 36px, 0)",
  down: "translate3d(0, -36px, 0)",
  left: "translate3d(36px, 0, 0)",
  right: "translate3d(-36px, 0, 0)",
  scale: "scale(0.94)",
  none: "none",
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 1000,
  threshold = 0.12,
  blur = true,
  className = "",
  as: Tag = "div",
  style,
  ...props
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`}
      style={{
        "--reveal-from": OFFSETS[direction] ?? OFFSETS.up,
        "--reveal-duration": `${duration}ms`,
        "--reveal-delay": `${delay}ms`,
        "--reveal-blur": blur ? "8px" : "0px",
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  )
}

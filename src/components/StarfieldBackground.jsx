import React, { useEffect, useRef, useState } from 'react'

export function StarfieldBackground() {
    const canvasRef = useRef(null)
    const mouseRef = useRef({ x: 0, y: 0 })
    const starsRef = useRef([])
    const particlesRef = useRef([])
    const [theme, setTheme] = useState('dark')

    useEffect(() => {
        // Detect theme changes
        const observer = new MutationObserver(() => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark'
            setTheme(currentTheme)
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        })

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let animationFrameId

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Create stars for dark mode
        const createStars = (count) => {
            const stars = []
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5,
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: (Math.random() - 0.5) * 0.2,
                    opacity: Math.random() * 0.5 + 0.3
                })
            }
            return stars
        }

        // Create particles for light mode
        const createParticles = (count) => {
            const particles = []
            const colors = [
                'rgba(240, 180, 41, 0.6)',
                'rgba(0, 188, 212, 0.6)',
                'rgba(255, 152, 0, 0.5)',
                'rgba(156, 39, 176, 0.5)',
            ]
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 3 + 1,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    opacity: Math.random() * 0.4 + 0.2
                })
            }
            return particles
        }

        starsRef.current = createStars(150)
        particlesRef.current = createParticles(80)

        // Mouse move handler
        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY }
        }
        window.addEventListener('mousemove', handleMouseMove)

        // Gradient waves for light mode
        let waveOffset = 0

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            if (theme === 'light') {
                // Light mode: Gradient waves + particles
                waveOffset += 0.01

                // Draw animated gradient waves
                const gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
                const opacity1 = 0.05 + Math.sin(waveOffset) * 0.03
                const opacity2 = 0.05 + Math.cos(waveOffset) * 0.03
                const opacity3 = 0.05 + Math.sin(waveOffset + 1) * 0.03

                gradient1.addColorStop(0, `rgba(240, 180, 41, ${opacity1})`)
                gradient1.addColorStop(0.5, `rgba(0, 188, 212, ${opacity2})`)
                gradient1.addColorStop(1, `rgba(156, 39, 176, ${opacity3})`)

                ctx.fillStyle = gradient1
                ctx.fillRect(0, 0, canvas.width, canvas.height)

                // Draw floating particles
                particlesRef.current.forEach((particle) => {
                    // Calculate distance from mouse
                    const dx = mouseRef.current.x - particle.x
                    const dy = mouseRef.current.y - particle.y
                    const distance = Math.sqrt(dx * dx + dy * dy)
                    const maxDistance = 200

                    // Move particle away from mouse
                    if (distance < maxDistance) {
                        const force = (maxDistance - distance) / maxDistance
                        particle.x -= (dx / distance) * force * 3
                        particle.y -= (dy / distance) * force * 3
                    }

                    // Normal movement
                    particle.x += particle.vx
                    particle.y += particle.vy

                    // Wrap around edges
                    if (particle.x < 0) particle.x = canvas.width
                    if (particle.x > canvas.width) particle.x = 0
                    if (particle.y < 0) particle.y = canvas.height
                    if (particle.y > canvas.height) particle.y = 0

                    // Draw particle with glow
                    ctx.beginPath()
                    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)

                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.radius * 4
                    )
                    gradient.addColorStop(0, particle.color)
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

                    ctx.fillStyle = gradient
                    ctx.fill()
                })
            } else {
                // Dark mode: Stars
                starsRef.current.forEach((star) => {
                    // Calculate distance from mouse
                    const dx = mouseRef.current.x - star.x
                    const dy = mouseRef.current.y - star.y
                    const distance = Math.sqrt(dx * dx + dy * dy)
                    const maxDistance = 150

                    // Move star away from mouse
                    if (distance < maxDistance) {
                        const force = (maxDistance - distance) / maxDistance
                        star.x -= (dx / distance) * force * 2
                        star.y -= (dy / distance) * force * 2
                    }

                    // Normal movement
                    star.x += star.vx
                    star.y += star.vy

                    // Wrap around edges
                    if (star.x < 0) star.x = canvas.width
                    if (star.x > canvas.width) star.x = 0
                    if (star.y < 0) star.y = canvas.height
                    if (star.y > canvas.height) star.y = 0

                    // Draw star
                    ctx.beginPath()
                    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)

                    // Golden glow for stars
                    const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 3)
                    gradient.addColorStop(0, `rgba(240, 180, 41, ${star.opacity})`)
                    gradient.addColorStop(0.5, `rgba(240, 180, 41, ${star.opacity * 0.3})`)
                    gradient.addColorStop(1, 'rgba(240, 180, 41, 0)')

                    ctx.fillStyle = gradient
                    ctx.fill()
                })
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [theme])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        />
    )
}

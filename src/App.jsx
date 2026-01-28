import React, { useEffect, useRef, useState } from 'react'
import { profile } from './data/profile'
import { profileEN } from './data/profileEN'
import { translations } from './data/translations'
import { StarfieldBackground } from './components/StarfieldBackground'
import './App.css'

// Icon components (simple SVG icons)
const BriefcaseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
)

const CodeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
)

const TrendingIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
)

const RocketIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
    </svg>
)

function App() {
    const [scrolled, setScrolled] = useState(false)
    const [theme, setTheme] = useState('dark')
    const [language, setLanguage] = useState('pt')

    const currentProfile = language === 'pt' ? profile : profileEN
    const t = translations[language]

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                }
            })
        }, observerOptions)

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    }

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'pt' ? 'en' : 'pt')
    }

    const experienceIcons = [BriefcaseIcon, RocketIcon, TrendingIcon]

    return (
        <div className="portfolio-app">
            <StarfieldBackground />

            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-content">
                    <span className="logo">RC.</span>
                    <div className="nav-links">
                        <a href="#about">{t.nav.about}</a>
                        <a href="#projects">{t.nav.projects}</a>
                        <a href="#experience">{t.nav.experience}</a>
                        <a href="#skills">{t.nav.skills}</a>
                        <a href="#contact">{t.nav.contact}</a>
                        <button className="lang-toggle" onClick={toggleLanguage} aria-label="Toggle language">
                            {language === 'pt' ? 'EN' : 'PT'}
                        </button>
                        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>
                    </div>
                </div>
            </nav>

            <section id="about" className="section about-hero">
                <div className="about-hero-container animate-on-scroll">
                    <div className="about-hero-left">
                        <div className="about-label">👋 {t.hero.greeting}</div>
                        <h2 className="about-name">Ricardo Crescêncio</h2>
                        <h3 className="about-role">
                            <span className="highlight-text">Software Engineer</span> | Martech Specialist
                        </h3>
                        <p className="about-intro">
                            {currentProfile.about.split('\n\n')[0]}
                        </p>

                        <div className="about-tags">
                            <span className="tag">{t.about.specialty1}</span>
                            <span className="tag">{t.about.specialty2}</span>
                            <span className="tag">{t.about.specialty3}</span>
                            <span className="tag">Integrations</span>
                        </div>

                        <div className="about-cta">
                            <a href="#contact" className="cta-button">
                                <span>{t.hero.cta}</span>
                                <span className="arrow">→</span>
                            </a>
                        </div>
                    </div>

                    <div className="about-hero-right">
                        <div className="avatar-container">
                            <div className="avatar-circle">
                                <div className="avatar-emoji">👨‍💻</div>
                            </div>
                            <div className="floating-badge badge-1">
                                <span>⚡</span> Performance
                            </div>
                            <div className="floating-badge badge-2">
                                <span>🎯</span> Product
                            </div>
                            <div className="floating-badge badge-3">
                                <span>🚀</span> Innovation
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed About */}
                <div className="about-details glass animate-on-scroll">
                    <h3>{t.hero.moreAbout}</h3>
                    <div className="about-grid">
                        <div className="about-detail-text">
                            {currentProfile.about.split('\n\n').slice(1).map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section stats-section">
                <div className="stats-grid animate-on-scroll">
                    <div className="stat-card glass">
                        <div className="stat-number">{currentProfile.stats.experience}+</div>
                        <div className="stat-label">{t.stats.experience}</div>
                    </div>
                    <div className="stat-card glass">
                        <div className="stat-number">{currentProfile.stats.projects}+</div>
                        <div className="stat-label">{t.stats.projects}</div>
                    </div>
                    <div className="stat-card glass">
                        <div className="stat-number">{currentProfile.stats.technologies}+</div>
                        <div className="stat-label">{t.stats.technologies}</div>
                    </div>
                    <div className="stat-card glass">
                        <div className="stat-number">{currentProfile.stats.certifications}+</div>
                        <div className="stat-label">{t.stats.certifications}</div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="section">
                <h3 className="animate-on-scroll">{t.projects.title}</h3>
                <div className="projects-grid">
                    {currentProfile.projects.map((project, i) => (
                        <div key={i} className="project-card glass animate-on-scroll">
                            <div className="project-header">
                                <h4>{project.name}</h4>
                                <div className="project-links">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link" title="Ver no GitHub">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </a>
                                    )}
                                    {project.demo && (
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link demo-link" title="Ver Demo">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                            <p className="project-description">{project.description}</p>
                            <div className="project-tech">
                                {project.tech.map((tech, j) => (
                                    <span key={j} className="tech-badge">{tech}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education Section */}
            <section id="education" className="section">
                <h3 className="animate-on-scroll">{t.education.title}</h3>
                <div className="education-timeline">
                    {currentProfile.education.map((edu, i) => (
                        <div key={i} className="education-card glass animate-on-scroll">
                            <div className="education-icon">🎓</div>
                            <div className="education-content">
                                <h4>{edu.degree}</h4>
                                <div className="education-institution">{edu.institution}</div>
                                <div className="education-period">{edu.period}</div>
                                <p className="education-description">{edu.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="experience" className="section">
                <h3 className="animate-on-scroll">{t.experience.title}</h3>
                <div className="experience-grid">
                    {currentProfile.experience.map((exp, i) => {
                        const Icon = experienceIcons[i % experienceIcons.length]
                        return (
                            <div key={i} className="experience-card-modern animate-on-scroll">
                                <div className="card-icon">
                                    <Icon />
                                </div>
                                <div className="card-content">
                                    <h4>{exp.role}</h4>
                                    <div className="company-period">
                                        <span className="company">{exp.company}</span>
                                        <span className="period">{exp.period}</span>
                                    </div>
                                    <p className="description">{exp.description}</p>
                                    <ul className="achievements">
                                        {exp.achievements.slice(0, 3).map((ach, j) => (
                                            <li key={j}>{ach}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            <section id="skills" className="section">
                <h3 className="animate-on-scroll">{t.skills.title}</h3>
                <div className="skills-grid-modern">
                    <div className="skill-category-card animate-on-scroll">
                        <div className="card-icon">
                            <CodeIcon />
                        </div>
                        <h4>{t.skills.technical}</h4>
                        <div className="pills">
                            {currentProfile.skills.technical.map(s => <span key={s} className="pill">{s}</span>)}
                        </div>
                    </div>

                    <div className="skill-category-card animate-on-scroll">
                        <div className="card-icon">
                            <TrendingIcon />
                        </div>
                        <h4>{t.skills.martech}</h4>
                        <div className="pills">
                            {currentProfile.skills.marketing.map(s => <span key={s} className="pill">{s}</span>)}
                        </div>
                    </div>
                </div>
            </section>

            {/* Spotify Section */}
            <section className="section spotify-section">
                <h3 className="animate-on-scroll">{t.spotify.title}</h3>
                <div className="spotify-container glass animate-on-scroll">
                    <iframe
                        style={{ borderRadius: '12px' }}
                        src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
                        width="100%"
                        height="352"
                        frameBorder="0"
                        allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>
                </div>
            </section>

            <footer id="contact" className="animate-on-scroll">
                <h3>{t.footer.title}</h3>
                <p>{t.footer.subtitle}</p>
                <div className="social-links">
                    <a href={currentProfile.links.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                    </a>
                    <a href={currentProfile.links.github} target="_blank" rel="noopener noreferrer" className="social-link">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                    </a>
                    <a href={currentProfile.links.email} className="social-link">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        Email
                    </a>
                </div>
                <p className="copyright">{t.footer.copyright}</p>
            </footer>
        </div>
    )
}

export default App

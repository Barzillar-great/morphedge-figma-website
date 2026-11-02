import {
  type FormEvent,
  type SVGProps,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useParams,
} from "react-router"
import { insightArticles } from "./insights"

const publishedInsights = Array.isArray(insightArticles) ? insightArticles : []

const services = [
  {
    number: "01",
    title: "Event Consultancy",
    copy: "We shape meaningful experiences from first thought to final moment—aligning concept, audience, partners and delivery around a clear strategic purpose.",
    detail: "Strategy · Experience · Delivery",
  },
  {
    number: "02",
    title: "Business Development",
    copy: "We reveal pathways to sustainable growth, helping ambitious organisations sharpen their position, build momentum and move with confidence.",
    detail: "Positioning · Growth · Partnerships",
  },
  {
    number: "03",
    title: "Productions (Products and Services)",
    copy: "We turn ideas into beautifully considered products, services and productions that connect vision with a tangible, market-ready expression.",
    detail: "Ideation · Creation · Launch",
  },
]

const principles = [
  {
    name: "Metamorphosis",
    copy: "We embrace purposeful change—transforming ideas, identities and opportunities into stronger new forms.",
  },
  {
    name: "Optimization",
    copy: "We refine what matters, aligning every element to create clarity, efficiency and enduring value.",
  },
  {
    name: "Resilience",
    copy: "We design strategies that adapt intelligently, helping organisations remain relevant through changing conditions.",
  },
  {
    name: "Progression",
    copy: "We create forward motion through deliberate choices, measurable learning and continuous evolution.",
  },
  {
    name: "Harmony",
    copy: "We connect ambition, people and execution so every part of the vision moves together with purpose.",
  },
]

const fbdEditions = [
  {
    name: "Visions",
    year: "March 2025",
    theme: "Learn · Connect · Envision · Transform",
    story:
      "VISIONS brought curious minds into conversations about possibility, perspective and the futures we can imagine together. An exploration of ideas, connection and the courage to see beyond the present.",
    image: "/assets/futures-by-design-visions.jpg",
    alt: "Futures by Design Visions event artwork",
  },
  {
    name: "Jackpot",
    year: "September 2025",
    theme: "Grit, Scars, and the Gold We Built.",
    story:
      "JACKPOT explored the stories behind achievement — the risks, setbacks, resilience and lessons that shape the things we build. A conversation about the journeys that rarely make the spotlight, but make progress possible.",
    image: "/assets/futures-by-design-jackpot.jpg",
    alt: "Futures by Design Jackpot event artwork",
  },
]

const fbdNextEdition = {
  label: "FUTURES BY DESIGN — 2027",
  title: "The next chapter is taking shape.",
  line: "New perspectives. New conversations. New possibilities.",
  note: "Look out for the next edition of Futures by Design.",
}

const portfolioProjects = {
  gobiDaniel: {
    number: "02",
    title: "Gobi Daniel",
    category: "Website Design & Development",
    description:
      "A website project created with MorphEdge’s involvement, shown through the approved homepage and profile page views.",
    link: "https://gobidaniel.com/",
    images: [
      {
        src: "/assets/gobi-daniel-homepage.png",
        alt: "Gobi Daniel website homepage featuring the Maximise Your Potential message",
        caption: "Homepage",
      },
      {
        src: "/assets/gobi-daniel-about.png",
        alt: "Gobi Daniel website profile page with portrait and introduction",
        caption: "Profile page",
      },
    ],
  },
  productDesign: [
    {
      number: "03",
      title: "Product Design — Draft 01",
      category: "Product Design",
      status: "Editable draft label",
      image: "/assets/product-design-draft-01.jpg",
      alt: "Black cosmetic serum bottle product design on a dark sculptural surface",
    },
    {
      number: "04",
      title: "Product Design — Draft 02",
      category: "Product Design",
      status: "Editable draft label",
      image: "/assets/product-design-draft-02.jpg",
      alt: "Amber dropper bottle product design floating above a moss landscape",
    },
  ],
  packaging: {
    number: "05",
    title: "Futures by Design — Packaging & Merchandise",
    category: "Packaging Design · Branded Merchandise",
    description:
      "Exploring how visual identity extends beyond the screen through thoughtfully designed packaging and branded merchandise. A cohesive expression of the Futures by Design identity across physical products.",
    images: [
      {
        src: "/assets/fbd-diary.png",
        alt: "Futures by Design branded diary and notebook mockup",
        label: "Branded Diary",
      },
      {
        src: "/assets/fbd-packaging-box.png",
        alt: "Futures by Design custom branded packaging box mockup",
        label: "Custom Packaging",
      },
      {
        src: "/assets/fbd-shirt.jpg",
        alt: "Futures by Design branded T-shirt displayed on a black mannequin",
        label: "Branded Apparel",
      },
      {
        src: "/assets/fbd-water-bottle.png",
        alt: "Three Futures by Design branded water bottle mockups",
        label: "Branded Drinkware",
      },
    ],
  },
}

const consultationPackages = [
  {
    id: "30",
    title: "30-Minute Consultation",
    duration: "30 minutes",
    description:
      "A focused conversation to explore an idea, clarify a challenge, or identify practical next steps.",
  },
  {
    id: "60",
    title: "60-Minute Consultation",
    duration: "60 minutes",
    description:
      "An in-depth strategic discussion to evaluate opportunities, explore solutions, and develop clearer direction.",
  },
  {
    id: "90",
    title: "90-Minute Consultation",
    duration: "90 minutes",
    description:
      "An extended advisory session for complex challenges, detailed exploration, and broader strategic planning.",
  },
]

const consultationPricing = {
  NGN: {
    label: "Nigeria — NGN",
    symbol: "₦",
    prices: { "30": "50,000", "60": "80,000", "90": "150,000" },
  },
  USD: {
    label: "International — USD",
    symbol: "$",
    prices: { "30": "38", "60": "60", "90": "113" },
  },
} as const

type Currency = keyof typeof consultationPricing

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? "arrow arrow--diagonal" : "arrow"}
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function BrandMark({ className = "" }: { className?: string }) {
  return (
    <img
      className={`brand-mark ${className}`}
      src="/assets/morphedge-logo-white.png"
      alt="MorphEdge"
    />
  )
}

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M3 5.5h18v13H3zM4 7l8 6 8-6" />
    </svg>
  )
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.8" r="0.8" className="icon-fill" />
    </svg>
  )
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1" />
      <path d="M8 10v7M8 7.2v.1M11.5 17v-4c0-1.8 1-3 2.7-3 1.8 0 2.8 1.2 2.8 3v4M11.5 10.3V17" />
    </svg>
  )
}

function InsightCover({
  variant,
  number,
  compact = false,
}: {
  variant: "systems" | "narratives"
  number: string
  compact?: boolean
}) {
  return (
    <div
      className={`insight-cover insight-cover--${variant} ${
        compact ? "insight-cover--compact" : ""
      }`}
      aria-hidden="true"
    >
      <span className="insight-cover__number">{number}</span>
      <div className="insight-cover__composition">
        <i />
        <i />
        <i />
        <i />
      </div>
      <span className="insight-cover__label">
        {variant === "systems" ? "Systems / Structure" : "Narrative / Culture"}
      </span>
    </div>
  )
}

function ProductImageLightbox({
  image,
  onClose,
}: {
  image: { src: string alt: string label: string }
  onClose: () => void
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  return (
    <div
      className="product-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${image.label} enlarged image`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <button
        className="product-lightbox__close"
        type="button"
        aria-label="Close enlarged image"
        onClick={onClose}
        ref={closeButtonRef}
      >
        <span />
        <span />
      </button>
      <figure>
        <img src={image.src} alt={image.alt} />
        <figcaption>{image.label}</figcaption>
      </figure>
    </div>
  )
}

function PageHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen)
    return () => document.body.classList.remove("menu-is-open")
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a
        className="logo-link"
        href="/"
        aria-label="MorphEdge home"
        onClick={closeMenu}
      >
        <BrandMark />
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="/#about">About</a>
        <a href="/#expertise">Expertise</a>
        <a href="/#work">Our Work</a>
        <a href="/#insights">Insights</a>
        <a href="/contact">Contact</a>
      </nav>

      <a className="header-cta" href="/book-consultation">
        <span>Book a consultation</span>
        <Arrow diagonal />
      </a>

      <button
        className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <nav aria-label="Mobile navigation">
          {[
            ["About", "/#about"],
            ["Expertise", "/#expertise"],
            ["Our Work", "/#work"],
            ["Contact", "/contact"],
            ["Book a Consultation", "/book-consultation"],
          ].map(([label, href], index) => (
            <a href={href} onClick={closeMenu} key={label}>
              <span>0{index + 1}</span>
              {label}
              <Arrow />
            </a>
          ))}
        </nav>
        <p>Transforming Visions, Shaping Futures.</p>
      </div>
    </header>
  )
}

function PageFooter() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <BrandMark className="footer-logo" />
          <p>Transforming Visions, Shaping Futures.</p>
        </div>
        <div className="footer-links">
          <div>
            <p>Navigate</p>
            <a href="/#about">About</a>
            <a href="/#expertise">Expertise</a>
            <a href="/#work">Our Work</a>
            <a href="/contact">Contact</a>
          </div>
          <div>
            <p>Connect</p>
            <a href="mailto:info@morph-edge.com">info@morph-edge.com</a>
            <a
              href="https://www.instagram.com/morph.edge?cplk=MWprY2FraTIya2RrZw=="
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/company/morphedge-ltd"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Morph Edge Brand Solutions</span>
        <span>Built for continuous evolution</span>
        <a href="#page-top">
          Back to top <Arrow />
        </a>
      </div>
    </footer>
  )
}

function Sculpture() {
  const sculptureRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    frame: 0,
    reducedMotion: false,
    dragging: false,
    captured: false,
    scrolling: false,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
  })

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    )

    function syncMotionPreference() {
      const tilt = tiltRef.current
      tilt.reducedMotion = motionPreference.matches
      if (tilt.reducedMotion) {
        tilt.currentX = 0
        tilt.currentY = 0
        tilt.targetX = 0
        tilt.targetY = 0
        sculptureRef.current?.style.setProperty("--pointer-x", "0deg")
        sculptureRef.current?.style.setProperty("--pointer-y", "0deg")
      }
    }

    syncMotionPreference()
    motionPreference.addEventListener("change", syncMotionPreference)

    return () => {
      motionPreference.removeEventListener("change", syncMotionPreference)
      if (tiltRef.current.frame) {
        cancelAnimationFrame(tiltRef.current.frame)
      }
    }
  }, [])

  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max)
  }

  function animateTilt() {
    const tilt = tiltRef.current
    const easing =
      tilt.targetX === 0 && tilt.targetY === 0
        ? 0.1
        : tilt.dragging
          ? 0.2
          : 0.16

    tilt.currentX += (tilt.targetX - tilt.currentX) * easing
    tilt.currentY += (tilt.targetY - tilt.currentY) * easing

    sculptureRef.current?.style.setProperty(
      "--pointer-x",
      `${tilt.currentX.toFixed(3)}deg`,
    )
    sculptureRef.current?.style.setProperty(
      "--pointer-y",
      `${tilt.currentY.toFixed(3)}deg`,
    )

    const isMoving =
      Math.abs(tilt.targetX - tilt.currentX) > 0.015 ||
      Math.abs(tilt.targetY - tilt.currentY) > 0.015

    if (isMoving) {
      tilt.frame = requestAnimationFrame(animateTilt)
    } else {
      tilt.currentX = tilt.targetX
      tilt.currentY = tilt.targetY
      tilt.frame = 0
    }
  }

  function requestTiltFrame() {
    const tilt = tiltRef.current
    if (!tilt.frame && !tilt.reducedMotion) {
      tilt.frame = requestAnimationFrame(animateTilt)
    }
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const tilt = tiltRef.current
    if (tilt.reducedMotion) return

    const bounds = event.currentTarget.getBoundingClientRect()

    if (event.pointerType === "touch") {
      if (!tilt.dragging || tilt.scrolling) return

      const deltaX = event.clientX - tilt.startX
      const deltaY = event.clientY - tilt.startY

      if (!tilt.captured) {
        if (Math.abs(deltaY) > 6 && Math.abs(deltaY) > Math.abs(deltaX)) {
          tilt.scrolling = true
          return
        }

        if (Math.abs(deltaX) <= 6) return

        event.currentTarget.setPointerCapture(event.pointerId)
        tilt.captured = true
      }

      tilt.targetX = clamp(tilt.baseX + (deltaX / bounds.width) * 48, -22, 22)
      tilt.targetY = clamp(tilt.baseY - (deltaY / bounds.height) * 30, -12, 12)
    } else {
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      tilt.targetX = clamp(x * 76, -38, 38)
      tilt.targetY = clamp(y * -40, -20, 20)
    }

    requestTiltFrame()
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "touch" || tiltRef.current.reducedMotion) return

    const tilt = tiltRef.current
    tilt.dragging = true
    tilt.captured = false
    tilt.scrolling = false
    tilt.startX = event.clientX
    tilt.startY = event.clientY
    tilt.baseX = tilt.currentX
    tilt.baseY = tilt.currentY
  }

  function handlePointerRelease(event: React.PointerEvent<HTMLDivElement>) {
    const tilt = tiltRef.current
    if (event.pointerType !== "touch") return

    if (
      tilt.captured &&
      event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    tilt.dragging = false
    tilt.captured = false
    tilt.scrolling = false
    tilt.targetX = 0
    tilt.targetY = 0
    requestTiltFrame()
  }

  function resetPointer(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" && tiltRef.current.dragging) return
    tiltRef.current.targetX = 0
    tiltRef.current.targetY = 0
    requestTiltFrame()
  }

  return (
    <div
      className="sculpture-wrap"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerRelease}
      onPointerCancel={handlePointerRelease}
      onPointerLeave={resetPointer}
      role="img"
      aria-label="Abstract butterfly and spiral sculpture representing transformation"
    >
      <div className="sculpture-glow" />
      <div className="sculpture-orbit sculpture-orbit--outer" />
      <div className="sculpture-orbit sculpture-orbit--inner" />
      <div className="sculpture" ref={sculptureRef}>
        <svg className="sculpture-filters" aria-hidden="true">
          <filter
            id="morph-metallic"
            x="-30%"
            y="-30%"
            width="160%"
            height="170%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              in="SourceAlpha"
              stdDeviation="8"
              result="soft-alpha"
            />
            <feComponentTransfer in="SourceGraphic" result="gold-base">
              <feFuncR type="linear" slope="0.85" intercept="0.16" />
              <feFuncG type="linear" slope="0.85" intercept="0.12" />
              <feFuncB type="linear" slope="0.8" intercept="0.03" />
              <feFuncA type="identity" />
            </feComponentTransfer>
            <feDiffuseLighting
              in="soft-alpha"
              surfaceScale="9"
              diffuseConstant="0.68"
              lightingColor="#e5b747"
              result="diffuse"
            >
              <feDistantLight azimuth="225" elevation="48" />
            </feDiffuseLighting>
            <feComposite
              in="diffuse"
              in2="SourceAlpha"
              operator="in"
              result="diffuse-in"
            />
            <feSpecularLighting
              in="soft-alpha"
              surfaceScale="8"
              specularConstant="0.34"
              specularExponent="28"
              lightingColor="#ffe59a"
              result="specular"
            >
              <feDistantLight azimuth="220" elevation="54" />
            </feSpecularLighting>
            <feComposite
              in="specular"
              in2="SourceAlpha"
              operator="in"
              result="specular-in"
            />
            <feBlend
              in="gold-base"
              in2="diffuse-in"
              mode="soft-light"
              result="shaded"
            />
            <feBlend in="shaded" in2="specular-in" mode="screen" result="lit" />
            <feDropShadow
              in="lit"
              dx="2"
              dy="7"
              stdDeviation="6"
              floodColor="#001717"
              floodOpacity="0.24"
              result="shadow"
            />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="lit" />
            </feMerge>
          </filter>
        </svg>
        <img
          className="sculpture-mark"
          src="/assets/morph-mark-gold.png"
          alt=""
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

function MorphEdgeHomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePrinciple, setActivePrinciple] = useState(0)
  const [activeWork, setActiveWork] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<{
    src: string
    alt: string
    label: string
  } | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen)
    return () => document.body.classList.remove("menu-is-open")
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a
          className="logo-link"
          href="#top"
          aria-label="MorphEdge home"
          onClick={closeMenu}
        >
          <BrandMark />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#expertise">Expertise</a>
          <a href="#work">Our Work</a>
          <a href="#insights">Insights</a>
          <a href="/contact">Contact</a>
        </nav>

        <a className="header-cta" href="/book-consultation">
          <span>Book a consultation</span>
          <Arrow diagonal />
        </a>

        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
          <nav aria-label="Mobile navigation">
            {[
              ["About", "#about"],
              ["Expertise", "#expertise"],
              ["Our Work", "#work"],
              ["Insights", "#insights"],
              ["Contact", "/contact"],
            ].map(([label, href], index) => (
              <a href={href} onClick={closeMenu} key={label}>
                <span>0{index + 1}</span>
                {label}
                <Arrow />
              </a>
            ))}
          </nav>
          <p>Transforming Visions, Shaping Futures.</p>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow hero-eyebrow">
                <span />
                Strategy · Creativity · Transformation
              </div>
              <h1>
                Transforming
                <br />
                Visions, <em>Shaping</em>
                <br />
                Futures.
              </h1>
              <div className="hero-lower">
                <p>
                  At MorphEdge, we turn ideas into reality through strategic
                  consultancy, tailored business development, and creative
                  productions. We create exceptional experiences, help
                  businesses strengthen their competitive edge, and develop
                  solutions designed for lasting growth.
                </p>
                <div className="hero-actions">
                  <a className="button button--gold" href="#expertise">
                    Explore Our Expertise <Arrow />
                  </a>
                  <a className="text-link" href="#work">
                    Discover Our Work <Arrow diagonal />
                  </a>
                </div>
              </div>
            </div>
            <Sculpture />
          </div>

          <div className="hero-footer">
            <span>Strategy</span>
            <span>Experiences</span>
            <span>Growth</span>
            <a href="#about" aria-label="Scroll to our philosophy">
              Scroll to transform <i />
            </a>
          </div>
        </section>

        <section className="philosophy light-section" id="about">
          <div className="section-index" data-reveal>
            <span>01</span>
            <p>The Morph Philosophy</p>
          </div>
          <div className="philosophy-heading" data-reveal>
            <p className="eyebrow eyebrow--dark">
              From possibility to progress
            </p>
            <h2>
              We see <em>change</em> not as disruption, but as the raw material
              of meaningful progress.
            </h2>
          </div>
          <div className="philosophy-grid">
            <div className="philosophy-symbol" data-reveal aria-hidden="true">
              <span className="symbol-wing symbol-wing--left" />
              <span className="symbol-wing symbol-wing--right" />
              <span className="symbol-spiral">↻</span>
            </div>
            <div className="philosophy-copy" data-reveal>
              <p className="lead">
                MorphEdge partners with ambitious leaders to turn potential into
                lasting competitive advantage.
              </p>
              <div className="body-columns">
                <p>
                  We bring strategic clarity to complex visions—combining
                  insight, imagination and disciplined execution to create
                  brands, ventures and experiences ready for what comes next.
                </p>
                <p>
                  Our work is grounded in adaptability. We listen deeply,
                  challenge thoughtfully and build solutions that can evolve
                  alongside the people and markets they serve.
                </p>
              </div>
              <a className="line-link" href="#principles">
                Discover how we think <Arrow />
              </a>
            </div>
          </div>

          <div className="founder-section">
            <figure className="founder-portrait" data-reveal>
              <img
                src="/assets/barzillar-victor-eliathah.jpg"
                alt="Barzillar Victor Eliathah, founder of MorphEdge Brand Solutions"
                loading="lazy"
              />
            </figure>

            <div className="founder-biography" data-reveal>
              <p className="eyebrow eyebrow--dark">Meet the Founder</p>
              <h3>Barzillar Victor Eliathah</h3>
              <p className="founder-role">Founder, MorphEdge Brand Solutions</p>

              <div className="founder-copy">
                <p>
                  Barzillar Victor Eliathah is a forward-thinking brand
                  strategist, storyteller and creative entrepreneur passionate
                  about building businesses, shaping culture and creating
                  lasting impact.
                </p>
                <p>
                  With a background in marketing and brand strategy, his
                  professional experience spans businesses across Africa, Europe
                  and international markets. His strategic contributions have
                  supported business growth, market expansion and stronger
                  commercial positioning, including initiatives associated with
                  an eightfold increase in business valuation, from $50,000 to
                  $400,000.
                </p>
                <p>
                  He founded MorphEdge Brand Solutions with a vision that
                  extends beyond conventional creative services: to build a
                  strategic partner for businesses, startups and emerging
                  ventures seeking to scale, unlock opportunities and establish
                  lasting market relevance.
                </p>
                <p>
                  That vision also inspired{" "}
                  <strong>Futures by Design (FBD)</strong>, a community-driven
                  initiative bringing together professionals, creatives and
                  forward-thinkers to collaborate, exchange ideas and develop
                  products and experiences that shape culture.
                </p>
                <p>
                  At the heart of his work is a genuine desire to help people
                  succeed, challenge conventional thinking and transform
                  ambitious ideas into meaningful outcomes.
                </p>
              </div>

            </div>
          </div>
        </section>

        <section className="expertise" id="expertise">
          <div className="section-top" data-reveal>
            <div className="section-index section-index--light">
              <span>02</span>
              <p>Our Expertise</p>
            </div>
            <p className="section-intro">
              Three connected capabilities.
              <br />
              One transformative point of view.
            </p>
          </div>

          <div className="services-list">
            {services.map((service) => (
              <article className="service" key={service.title} data-reveal>
                <div className="service-number">{service.number}</div>
                <h3>{service.title}</h3>
                <div className="service-detail">
                  <p>{service.copy}</p>
                  <span>{service.detail}</span>
                </div>
                <button type="button" aria-label={`Explore ${service.title}`}>
                  <Arrow diagonal />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="work light-section" id="work">
          <div className="work-heading" data-reveal>
            <div className="section-index">
              <span>03</span>
              <p>Selected Work</p>
            </div>
            <h2>Ideas made visible.</h2>
          </div>

          <div className="work-layout">
            <div className="work-copy" data-reveal>
              <p className="eyebrow eyebrow--dark">A MorphEdge initiative</p>
              <h3>Futures by Design</h3>
              <p>
                A platform created to bring curious minds together—to learn,
                connect, envision and transform through honest, forward-looking
                conversations.
              </p>
              <div className="work-meta">
                <span>Strategy</span>
                <span>Community</span>
                <span>Experience</span>
              </div>
              <div
                className="gallery-controls"
                role="tablist"
                aria-label="Select Futures by Design edition"
              >
                {fbdEditions.map((edition, index) => (
                  <button
                    className={activeWork === index ? "is-active" : ""}
                    onClick={() => setActiveWork(index)}
                    type="button"
                    role="tab"
                    aria-selected={activeWork === index}
                    key={edition.name}
                  >
                    <span>0{index + 1}</span>
                    {edition.name}
                    <small>{edition.year}</small>
                  </button>
                ))}
              </div>

              <div
                className="edition-story"
                key={fbdEditions[activeWork].name}
                aria-live="polite"
              >
                <p>
                  {fbdEditions[activeWork].name} —{" "}
                  {fbdEditions[activeWork].year}
                </p>
                <h4>{fbdEditions[activeWork].theme}</h4>
                <p>{fbdEditions[activeWork].story}</p>
              </div>

              <aside className="fbd-next-edition">
                <p>{fbdNextEdition.label}</p>
                <h4>{fbdNextEdition.title}</h4>
                <p>{fbdNextEdition.line}</p>
                <p>{fbdNextEdition.note}</p>
              </aside>
            </div>

            <div className="work-gallery" data-reveal>
              <figure
                className={`work-image work-image--primary ${
                  activeWork === 1 ? "show-second" : ""
                }`}
              >
                <img
                  key={fbdEditions[activeWork].image}
                  src={fbdEditions[activeWork].image}
                  alt={fbdEditions[activeWork].alt}
                />
              </figure>
              <button
                className="work-image work-image--peek"
                onClick={() => setActiveWork(activeWork === 0 ? 1 : 0)}
                aria-label="Show next Futures by Design artwork"
                type="button"
              >
                <img src={fbdEditions[activeWork === 0 ? 1 : 0].image} alt="" />
                <span>
                  View next <Arrow />
                </span>
              </button>
            </div>
          </div>

          <div className="portfolio-expansion">
            <article className="portfolio-project portfolio-project--gobi">
              <header className="portfolio-project__header" data-reveal>
                <div className="portfolio-project__index">
                  <span>{portfolioProjects.gobiDaniel.number}</span>
                  <p>{portfolioProjects.gobiDaniel.category}</p>
                </div>
                <div className="portfolio-project__intro">
                  <h3>{portfolioProjects.gobiDaniel.title}</h3>
                  <p>{portfolioProjects.gobiDaniel.description}</p>
                  <a
                    className="portfolio-project__link"
                    href={portfolioProjects.gobiDaniel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Live Website <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </header>

              <div className="gobi-gallery">
                {portfolioProjects.gobiDaniel.images.map((image, index) => (
                  <figure
                    className={`gobi-gallery__item gobi-gallery__item--${index + 1}`}
                    data-reveal
                    key={image.src}
                  >
                    <div className="portfolio-image">
                      <img src={image.src} alt={image.alt} />
                    </div>
                    <figcaption>
                      <span>0{index + 1}</span>
                      {image.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </article>

            <div className="product-work">
              <header className="product-work__header" data-reveal>
                <p className="eyebrow eyebrow--dark">Product Design</p>
                <h3>Selected Product Explorations.</h3>
                <p>
                  A showcase of sample product designs exploring creativity,
                  functionality, and thoughtful user experiences. These concepts
                  demonstrate our approach to transforming ideas into compelling
                  digital solutions.
                </p>
              </header>

              <div className="product-gallery">
                {portfolioProjects.productDesign.map((project) => (
                  <article
                    className="product-card"
                    data-reveal
                    key={project.number}
                  >
                    <figure>
                      <div className="product-card__image">
                        <img src={project.image} alt={project.alt} />
                      </div>
                      <figcaption>
                        <span>{project.number}</span>
                        <p>{project.category}</p>
                      </figcaption>
                    </figure>
                    <div className="product-card__copy">
                      <h4>{project.title}</h4>
                      <p>{project.status}</p>
                    </div>
                  </article>
                ))}
              </div>

              <article className="packaging-showcase" data-reveal>
                <header className="packaging-showcase__header">
                  <div>
                    <span>{portfolioProjects.packaging.number}</span>
                    <p>{portfolioProjects.packaging.category}</p>
                  </div>
                  <div>
                    <h4>{portfolioProjects.packaging.title}</h4>
                    <p>{portfolioProjects.packaging.description}</p>
                  </div>
                </header>

                <div className="packaging-gallery">
                  {[
                    portfolioProjects.packaging.images.slice(0, 2),
                    portfolioProjects.packaging.images.slice(2),
                  ].map((row, rowIndex) => (
                    <div
                      className={`packaging-gallery__row packaging-gallery__row--${rowIndex + 1}`}
                      key={rowIndex}
                    >
                      {row.map((image, index) => {
                        const imageIndex = rowIndex * 2 + index
                        return (
                          <figure
                            className={`packaging-gallery__item packaging-gallery__item--${imageIndex + 1}`}
                            key={image.src}
                          >
                            <button
                              type="button"
                              onClick={() => setLightboxImage(image)}
                              aria-label={`View larger ${image.label}`}
                            >
                              <img src={image.src} alt={image.alt} />
                              <span aria-hidden="true">
                                View larger <Arrow diagonal />
                              </span>
                            </button>
                            <figcaption>
                              <span>0{imageIndex + 1}</span>
                              {image.label}
                            </figcaption>
                          </figure>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="principles" id="principles">
          <div className="principles-bg" aria-hidden="true">
            MORPH
          </div>
          <div className="section-top" data-reveal>
            <div className="section-index section-index--light">
              <span>04</span>
              <p>The Morph Principles</p>
            </div>
            <p className="section-intro">
              The values that keep
              <br />
              every transformation in motion.
            </p>
          </div>

          <div className="principles-layout">
            <div
              className="principle-list"
              role="tablist"
              aria-label="Morph principles"
              data-reveal
            >
              {principles.map((principle, index) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activePrinciple === index}
                  className={activePrinciple === index ? "is-active" : ""}
                  onClick={() => setActivePrinciple(index)}
                  onMouseEnter={() => setActivePrinciple(index)}
                  key={principle.name}
                >
                  <span>0{index + 1}</span>
                  {principle.name}
                  <Arrow diagonal />
                </button>
              ))}
            </div>

            <div className="principle-display" data-reveal>
              <span className="principle-display-number">
                0{activePrinciple + 1}
              </span>
              <div className="principle-orb">
                <i />
                <i />
                <i />
              </div>
              <div className="principle-content">
                <p>Our principle</p>
                <h3>{principles[activePrinciple].name}</h3>
                <p>{principles[activePrinciple].copy}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="insights light-section" id="insights">
          <div className="insights-header" data-reveal>
            <div className="section-index">
              <span>05</span>
              <p>Insights</p>
            </div>
            <h2>Ideas in motion.</h2>
            <p>
              Perspectives on transformation, growth and the choices that shape
              what comes next.
            </p>
          </div>

          <div className="insight-grid">
            {publishedInsights.map((insight) => (
              <a
                className="insight-card"
                href={`/insights/${insight.slug}`}
                key={insight.slug}
                data-reveal
              >
                <InsightCover
                  variant={insight.cover}
                  number={insight.number}
                  compact
                />
                <div className="insight-card-body">
                  <p>{insight.category}</p>
                  <h3>{insight.title}</h3>
                  <p className="insight-excerpt">{insight.excerpt}</p>
                  <div className="insight-byline">
                    <span>{insight.author}</span>
                    <span>{insight.readingTime}</span>
                  </div>
                  <span className="read-link">
                    Read Article <Arrow diagonal />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-ring contact-ring--one" aria-hidden="true" />
          <div className="contact-ring contact-ring--two" aria-hidden="true" />
          <div className="contact-inner" data-reveal>
            <p className="eyebrow">Start a meaningful conversation</p>
            <h2>
              Let’s build something
              <br /> <em>meaningful.</em>
            </h2>
            <p>
              Have a project in mind, a business challenge to solve, or an idea
              worth exploring? We’d love to hear from you.
            </p>
            <div className="contact-actions">
              <a className="button button--gold button--large" href="/contact">
                Contact MorphEdge <Arrow diagonal />
              </a>
              <a
                className="text-link text-link--light"
                href="/book-consultation"
              >
                Book a Consultation <Arrow diagonal />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <div>
            <BrandMark className="footer-logo" />
            <p>Transforming Visions, Shaping Futures.</p>
          </div>
          <div className="footer-links">
            <div>
              <p>Navigate</p>
              <a href="#about">About</a>
              <a href="#expertise">Expertise</a>
              <a href="#work">Our Work</a>
              <a href="#insights">Insights</a>
            </div>
            <div>
              <p>Connect</p>
              <a href="mailto:info@morph-edge.com">info@morph-edge.com</a>
              <a
                href="https://www.instagram.com/morph.edge?cplk=MWprY2FraTIya2RrZw=="
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com/company/morphedge-ltd"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Morph Edge Brand Solutions</span>
          <span>Built for continuous evolution</span>
          <a href="#top">
            Back to top <Arrow />
          </a>
        </div>
      </footer>
      {lightboxImage && (
        <ProductImageLightbox
          image={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </div>
  )
}

type FieldErrors = Record<string, string>

function ContactPage() {
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formNotice, setFormNotice] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const nextErrors: FieldErrors = {}

    if (!String(form.get("fullName") || "").trim()) {
      nextErrors.fullName = "Please enter your full name."
    }
    const email = String(form.get("email") || "").trim()
    if (!email) {
      nextErrors.email = "Please enter your email address."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address."
    }
    if (!String(form.get("service") || "")) {
      nextErrors.service = "Please select a service."
    }
    if (!String(form.get("message") || "").trim()) {
      nextErrors.message = "Please tell us a little about your enquiry."
    }

    setErrors(nextErrors)
    setFormNotice(Object.keys(nextErrors).length === 0)
  }

  return (
    <div className="site-shell page-shell" id="page-top">
      <PageHeader />
      <main>
        <section className="contact-page-hero">
          <div className="page-orbit page-orbit--one" aria-hidden="true" />
          <div className="page-orbit page-orbit--two" aria-hidden="true" />
          <div className="contact-page-hero__inner">
            <p className="eyebrow">Contact MorphEdge</p>
            <h1>Build With Us.</h1>
            <p>
              Have a project in mind, a business challenge to solve, or an idea
              worth exploring? We’d love to hear from you.
            </p>
            <a className="button button--gold" href="/book-consultation">
              Book a Consultation <Arrow diagonal />
            </a>
          </div>
        </section>

        <section className="contact-page-content">
          <div className="contact-channels">
            <div className="section-index">
              <span>01</span>
              <p>Direct channels</p>
            </div>
            <div className="contact-channel-grid">
              <a className="contact-channel" href="mailto:info@morph-edge.com">
                <span className="contact-channel__icon">
                  <MailIcon />
                </span>
                <span>
                  <small>Email</small>
                  <strong>info@morph-edge.com</strong>
                </span>
                <Arrow diagonal />
              </a>
              <a
                className="contact-channel"
                href="https://www.instagram.com/morph.edge?cplk=MWprY2FraTIya2RrZw=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-channel__icon">
                  <InstagramIcon />
                </span>
                <span>
                  <small>Instagram</small>
                  <strong>@morph.edge</strong>
                </span>
                <Arrow diagonal />
              </a>
              <a
                className="contact-channel"
                href="https://linkedin.com/company/morphedge-ltd"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-channel__icon">
                  <LinkedInIcon />
                </span>
                <span>
                  <small>LinkedIn</small>
                  <strong>MorphEdge</strong>
                </span>
                <Arrow diagonal />
              </a>
            </div>
          </div>

          <div className="enquiry-layout">
            <div className="enquiry-intro">
              <div className="section-index">
                <span>02</span>
                <p>Send an enquiry</p>
              </div>
              <h2>Tell us what you’re working on.</h2>
              <p>
                Share the essentials below. This form is prepared for secure
                submission integration; until that connection is active, you can
                reach us directly by email.
              </p>
            </div>

            <form className="morph-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <label className="form-field">
                  <span>Full Name</span>
                  <input
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={
                      errors.fullName ? "contact-name-error" : undefined
                    }
                  />
                  {errors.fullName && (
                    <small className="field-error" id="contact-name-error">
                      {errors.fullName}
                    </small>
                  )}
                </label>
                <label className="form-field">
                  <span>Email Address</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? "contact-email-error" : undefined
                    }
                  />
                  {errors.email && (
                    <small className="field-error" id="contact-email-error">
                      {errors.email}
                    </small>
                  )}
                </label>
                <label className="form-field">
                  <span>
                    Company / Organisation <em>Optional</em>
                  </span>
                  <input
                    name="company"
                    type="text"
                    autoComplete="organization"
                  />
                </label>
                <label className="form-field">
                  <span>Service of Interest</span>
                  <select
                    name="service"
                    defaultValue=""
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={
                      errors.service ? "contact-service-error" : undefined
                    }
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option>Strategic Consultancy</option>
                    <option>Business Development</option>
                    <option>Creative Productions</option>
                    <option>General Enquiry</option>
                  </select>
                  {errors.service && (
                    <small className="field-error" id="contact-service-error">
                      {errors.service}
                    </small>
                  )}
                </label>
                <label className="form-field form-field--wide">
                  <span>Project Details / Message</span>
                  <textarea
                    name="message"
                    rows={6}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                  />
                  {errors.message && (
                    <small className="field-error" id="contact-message-error">
                      {errors.message}
                    </small>
                  )}
                </label>
              </div>
              <div className="form-submit-row">
                <button className="button button--gold" type="submit">
                  Send Enquiry <Arrow diagonal />
                </button>
                <p>
                  No message is sent until a submission service is connected.
                </p>
              </div>
              {formNotice && (
                <div className="form-notice" role="status">
                  <strong>Your enquiry is ready.</strong>
                  <p>
                    Online submission is not connected yet. Please email{" "}
                    <a href="mailto:info@morph-edge.com">info@morph-edge.com</a>{" "}
                    to send your enquiry now.
                  </p>
                </div>
              )}
            </form>
          </div>
        </section>
      </main>
      <PageFooter />
    </div>
  )
}

type BookingDetails = {
  fullName: string
  email: string
  country: string
  company: string
  discussion: string
  preferredDate: string
  preferredTime: string
  timeZone: string
}

const emptyBookingDetails: BookingDetails = {
  fullName: "",
  email: "",
  country: "",
  company: "",
  discussion: "",
  preferredDate: "",
  preferredTime: "",
  timeZone: "",
}

function ConsultationPage() {
  const [currency, setCurrency] = useState<Currency>("NGN")
  const [currencyIndicator, setCurrencyIndicator] = useState<{
    left: number
    width: number
  } | null>(null)
  const [selectedPackage, setSelectedPackage] = useState("")
  const [details, setDetails] = useState<BookingDetails>(emptyBookingDetails)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [step, setStep] = useState<"details" | "review" | "ready">("details")
  const currencySelectorRef = useRef<HTMLDivElement>(null)
  const currencyButtonRefs = useRef<Record<Currency, HTMLButtonElement | null>>(
    {
      NGN: null,
      USD: null,
    },
  )
  const selectedSession = consultationPackages.find(
    (session) => session.id === selectedPackage,
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useLayoutEffect(() => {
    const selector = currencySelectorRef.current
    const updateIndicator = () => {
      const activeButton = currencyButtonRefs.current[currency]
      if (!activeButton) return
      setCurrencyIndicator({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      })
    }

    updateIndicator()
    if (!selector) return

    const resizeObserver = new ResizeObserver(updateIndicator)
    resizeObserver.observe(selector)
    return () => resizeObserver.disconnect()
  }, [currency])

  const selectSession = (sessionId: string) => {
    setSelectedPackage(sessionId)
    setStep("details")
    setErrors({})
    requestAnimationFrame(() => {
      document.getElementById("booking-request")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })
  }

  const updateDetail = (field: keyof BookingDetails, value: string) => {
    setDetails((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: "" }))
    }
  }

  const validateBooking = () => {
    const nextErrors: FieldErrors = {}
    if (!details.fullName.trim())
      nextErrors.fullName = "Please enter your full name."
    if (!details.email.trim()) {
      nextErrors.email = "Please enter your email address."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
      nextErrors.email = "Please enter a valid email address."
    }
    if (!details.country.trim())
      nextErrors.country = "Please enter your country or region."
    if (!details.discussion.trim()) {
      nextErrors.discussion =
        "Please briefly describe what you would like to discuss."
    }
    if (!details.preferredDate)
      nextErrors.preferredDate = "Please choose a preferred date."
    if (!details.preferredTime)
      nextErrors.preferredTime = "Please choose a preferred time."
    if (!details.timeZone.trim())
      nextErrors.timeZone = "Please enter your time zone."
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validateBooking()) {
      setStep("review")
      requestAnimationFrame(() => {
        document.getElementById("booking-review")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      })
    }
  }

  const price = selectedSession
    ? `${consultationPricing[currency].symbol}${
        consultationPricing[currency].prices[
          (selectedSession.id as "30" | "60" | "90")
        ]
      }`
    : ""

  return (
    <div className="site-shell page-shell consultation-page" id="page-top">
      <PageHeader />
      <main>
        <section className="consultation-hero">
          <div className="page-orbit page-orbit--one" aria-hidden="true" />
          <div className="consultation-hero__content">
            <p className="eyebrow">Strategic Consultation</p>
            <h1>Let’s Talk Strategy.</h1>
            <p>
              Book a dedicated consultation to discuss your ideas, explore
              opportunities, and gain strategic direction for your next project.
            </p>
            <a className="text-link text-link--light" href="#packages">
              View consultation options <Arrow />
            </a>
          </div>
          <div className="consultation-hero__aside" aria-hidden="true">
            <span>30</span>
            <span>60</span>
            <span>90</span>
            <p>Focused time. Clear conversation.</p>
          </div>
        </section>

        <section className="packages-section light-section" id="packages">
          <div className="packages-heading">
            <div className="section-index">
              <span>01</span>
              <p>Choose a session</p>
            </div>
            <div>
              <h2>Time shaped around the conversation.</h2>
              <p>
                Select the session length and pricing region that best suits
                you. All appointments are requests until confirmed.
              </p>
            </div>
          </div>

          <div
            className={`currency-selector ${
              currencyIndicator ? "is-ready" : ""
            }`}
            aria-label="Select pricing currency"
            ref={currencySelectorRef}
          >
            <span
              className="currency-selector__indicator"
              aria-hidden="true"
              style={{
                left: currencyIndicator?.left,
                width: currencyIndicator?.width,
              }}
            />
            {(Object.keys(consultationPricing) as Currency[]).map((option) => (
              <button
                type="button"
                className={currency === option ? "is-active" : ""}
                aria-pressed={currency === option}
                ref={(button) => {
                  currencyButtonRefs.current[option] = button
                }}
                onClick={() => {
                  setCurrency(option)
                  setStep("details")
                }}
                key={option}
              >
                {consultationPricing[option].label}
              </button>
            ))}
          </div>

          <div className="package-grid">
            {consultationPackages.map((session) => (
              <article
                className={`package-card ${
                  selectedPackage === session.id ? "is-selected" : ""
                }`}
                key={session.id}
              >
                <div className="package-card__top">
                  <span>{session.duration}</span>
                  <span>0{consultationPackages.indexOf(session) + 1}</span>
                </div>
                <h3>{session.title}</h3>
                <p>{session.description}</p>
                <div className="package-card__price" aria-live="polite">
                  <span className="package-card__price-values">
                    {(Object.keys(consultationPricing) as Currency[]).map(
                      (option) => (
                        <strong
                          className={currency === option ? "is-active" : ""}
                          aria-hidden={currency !== option}
                          key={option}
                        >
                          {consultationPricing[option].symbol}
                          {
                            consultationPricing[option].prices[
                              (session.id as "30" | "60" | "90")
                            ]
                          }
                        </strong>
                      ),
                    )}
                  </span>
                  <span className="package-card__currency-labels">
                    {(Object.keys(consultationPricing) as Currency[]).map(
                      (option) => (
                        <span
                          className={currency === option ? "is-active" : ""}
                          aria-hidden={currency !== option}
                          key={option}
                        >
                          {option}
                        </span>
                      ),
                    )}
                  </span>
                </div>
                <button
                  className="button package-card__button"
                  type="button"
                  onClick={() => selectSession(session.id)}
                >
                  {selectedPackage === session.id
                    ? "Selected Session"
                    : "Book This Session"}
                  <Arrow diagonal />
                </button>
              </article>
            ))}
          </div>
          {currency === "USD" && (
            <p className="pricing-note">
              Fixed rounded reference prices based on the exchange rate as of
              October 21, 2026. No live currency conversion is applied.
            </p>
          )}
        </section>

        <section className="booking-section" id="booking-request">
          <div className="booking-section__intro">
            <div className="section-index section-index--light">
              <span>02</span>
              <p>Request your session</p>
            </div>
            <h2>
              {selectedSession
                ? "A few details before we connect."
                : "Select a session to begin."}
            </h2>
            <p>
              Consultation requests require confirmation. No appointment,
              payment, or meeting link is created through this prototype.
            </p>
          </div>

          {!selectedSession ? (
            <div className="booking-empty">
              <span>01</span>
              <p>Choose one of the consultation options above to continue.</p>
              <a href="#packages" className="text-link text-link--light">
                View sessions <Arrow />
              </a>
            </div>
          ) : step === "review" || step === "ready" ? (
            <div className="booking-review" id="booking-review">
              <p className="eyebrow">Review your request</p>
              <h3>Please confirm the details below.</h3>
              <dl>
                <div>
                  <dt>Session</dt>
                  <dd>{selectedSession.title}</dd>
                </div>
                <div>
                  <dt>Pricing</dt>
                  <dd>
                    {price} {currency}
                  </dd>
                </div>
                <div>
                  <dt>Name</dt>
                  <dd>{details.fullName}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{details.email}</dd>
                </div>
                <div>
                  <dt>Country / Region</dt>
                  <dd>{details.country}</dd>
                </div>
                {details.company && (
                  <div>
                    <dt>Company / Organisation</dt>
                    <dd>{details.company}</dd>
                  </div>
                )}
                <div>
                  <dt>Preferred date</dt>
                  <dd>{details.preferredDate}</dd>
                </div>
                <div>
                  <dt>Preferred time</dt>
                  <dd>
                    {details.preferredTime} · {details.timeZone}
                  </dd>
                </div>
                <div className="booking-review__wide">
                  <dt>Discussion</dt>
                  <dd>{details.discussion}</dd>
                </div>
              </dl>
              {step === "ready" ? (
                <div className="form-notice form-notice--dark" role="status">
                  <strong>Your booking request is ready.</strong>
                  <p>
                    Online scheduling and payment are not connected yet. Please
                    email{" "}
                    <a href="mailto:info@morph-edge.com">info@morph-edge.com</a>{" "}
                    to request confirmation. Your preferred date and time are
                    not reserved until MorphEdge confirms them.
                  </p>
                </div>
              ) : (
                <div className="booking-review__actions">
                  <button
                    className="button button--gold"
                    type="button"
                    onClick={() => setStep("ready")}
                  >
                    Submit Booking Request <Arrow diagonal />
                  </button>
                  <button
                    className="text-button"
                    type="button"
                    onClick={() => setStep("details")}
                  >
                    Edit information
                  </button>
                </div>
              )}
            </div>
          ) : (
            <form
              className="booking-form morph-form morph-form--dark"
              onSubmit={handleReview}
              noValidate
            >
              <div className="selected-session-summary">
                <div>
                  <span>Selected consultation</span>
                  <strong>{selectedSession.title}</strong>
                </div>
                <div>
                  <span>Duration</span>
                  <strong>{selectedSession.duration}</strong>
                </div>
                <div>
                  <span>Price</span>
                  <strong>
                    {price} {currency}
                  </strong>
                </div>
              </div>

              <div className="form-grid">
                {[
                  ["fullName", "Full Name", "text", "name"],
                  ["email", "Email Address", "email", "email"],
                  ["country", "Country / Region", "text", "country-name"],
                  ["company", "Company / Organisation", "text", "organization"],
                ].map(([field, label, type, autoComplete]) => (
                  <label className="form-field" key={field}>
                    <span>
                      {label}
                      {field === "company" && <em>Optional</em>}
                    </span>
                    <input
                      type={type}
                      value={details[(field as keyof BookingDetails)]}
                      autoComplete={autoComplete}
                      onChange={(event) =>
                        updateDetail(
                          field as keyof BookingDetails,
                          event.target.value,
                        )
                      }
                      aria-invalid={Boolean(errors[field])}
                    />
                    {errors[field] && (
                      <small className="field-error">{errors[field]}</small>
                    )}
                  </label>
                ))}
                <label className="form-field form-field--wide">
                  <span>Brief Description of What You Want to Discuss</span>
                  <textarea
                    rows={5}
                    value={details.discussion}
                    onChange={(event) =>
                      updateDetail("discussion", event.target.value)
                    }
                    aria-invalid={Boolean(errors.discussion)}
                  />
                  {errors.discussion && (
                    <small className="field-error">{errors.discussion}</small>
                  )}
                </label>
                <label className="form-field">
                  <span>Preferred Date</span>
                  <input
                    type="date"
                    value={details.preferredDate}
                    onChange={(event) =>
                      updateDetail("preferredDate", event.target.value)
                    }
                    aria-invalid={Boolean(errors.preferredDate)}
                  />
                  {errors.preferredDate && (
                    <small className="field-error">
                      {errors.preferredDate}
                    </small>
                  )}
                </label>
                <label className="form-field">
                  <span>Preferred Time</span>
                  <input
                    type="time"
                    value={details.preferredTime}
                    onChange={(event) =>
                      updateDetail("preferredTime", event.target.value)
                    }
                    aria-invalid={Boolean(errors.preferredTime)}
                  />
                  {errors.preferredTime && (
                    <small className="field-error">
                      {errors.preferredTime}
                    </small>
                  )}
                </label>
                <label className="form-field form-field--wide">
                  <span>Time Zone</span>
                  <input
                    type="text"
                    value={details.timeZone}
                    placeholder="For example: WAT (UTC+1)"
                    onChange={(event) =>
                      updateDetail("timeZone", event.target.value)
                    }
                    aria-invalid={Boolean(errors.timeZone)}
                  />
                  {errors.timeZone && (
                    <small className="field-error">{errors.timeZone}</small>
                  )}
                </label>
              </div>
              <div className="form-submit-row">
                <button className="button button--gold" type="submit">
                  Review Booking Request <Arrow diagonal />
                </button>
                <p>No appointment is reserved at this stage.</p>
              </div>
            </form>
          )}
        </section>
      </main>
      <PageFooter />
    </div>
  )
}

function InsightArticlePage() {
  const { slug } = useParams()
  const article = publishedInsights.find((entry) => entry.slug === slug)
  const relatedArticle = publishedInsights.find((entry) => entry.slug !== slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!article) {
    return <Navigate to="/#insights" replace />
  }

  return (
    <div className="site-shell page-shell article-page" id="page-top">
      <PageHeader />
      <main className="article-page__main">
        <header className="article-hero">
          <a className="article-back-link" href="/#insights">
            <Arrow /> Back to Insights
          </a>
          <div className="article-hero__grid">
            <div className="article-hero__meta">
              <p>{article.category}</p>
              <dl>
                <div>
                  <dt>Written by</dt>
                  <dd>{article.author}</dd>
                </div>
                <div>
                  <dt>Published</dt>
                  <dd>
                    <time dateTime={article.publicationDateIso}>
                      {article.publicationDate}
                    </time>
                  </dd>
                </div>
                <div>
                  <dt>Reading time</dt>
                  <dd>{article.readingTime}</dd>
                </div>
              </dl>
            </div>
            <h1>{article.title}</h1>
          </div>
          <InsightCover variant={article.cover} number={article.number} />
        </header>

        <section className="article-reading">
          <aside className="article-reading__aside">
            <span>{article.number}</span>
            <p>{article.category}</p>
            <i />
          </aside>
          <article
            className="article-prose"
            dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
          />
        </section>

        <section className="article-source-note">
          <p>
            Originally published by {article.author}. The complete original text
            is presented here as published.
          </p>
          <a
            href={article.originalSource}
            target="_blank"
            rel="noopener noreferrer"
          >
            View original publication <Arrow diagonal />
          </a>
        </section>

        {relatedArticle && (
          <section className="related-insights">
            <div className="related-insights__heading">
              <div className="section-index">
                <span>Next</span>
                <p>Related insight</p>
              </div>
              <h2>Continue reading.</h2>
            </div>
            <a
              className="related-insight-card"
              href={`/insights/${relatedArticle.slug}`}
            >
              <InsightCover
                variant={relatedArticle.cover}
                number={relatedArticle.number}
                compact
              />
              <div>
                <p>{relatedArticle.category}</p>
                <h3>{relatedArticle.title}</h3>
                <span>
                  Read Article <Arrow diagonal />
                </span>
              </div>
            </a>
          </section>
        )}
      </main>
      <PageFooter />
    </div>
  )
}

const router = createBrowserRouter([
  { path: "/", Component: MorphEdgeHomePage },
  { path: "/contact", Component: ContactPage },
  { path: "/book-consultation", Component: ConsultationPage },
  { path: "/insights/:slug", Component: InsightArticlePage },
  { path: "*", Component: () => <Navigate to="/" replace /> },
])

export default function App() {
  return <RouterProvider router={router} />
}

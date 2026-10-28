'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Menu, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

const navItems = [
  ['Home', '#home'],
  ['Why it matters', '#why'],
  ['Approach', '#approach'],
  ['Facility', '#facility'],
  ['Technology', '#technology'],
  ['Insights', '#insights'],
]

const zones = {
  'R&D': { code: '01', title: 'Research & development', body: 'An illustrative zone for process development, sampling, and material science validation.' },
  'QA/QC': { code: '02', title: 'Quality assurance / control', body: 'A proposed control point for analytical review, traceability, and specification checks.' },
  Operations: { code: '03', title: 'Operations', body: 'The central production zone shown for flow planning. Final configuration is to be confirmed.' },
  Mechanical: { code: '04', title: 'Mechanical', body: 'A service and maintenance area for equipment readiness and continuous improvement.' },
  Chemical: { code: '05', title: 'Chemical', body: 'A controlled process area for chemistry-led separation and refining steps.' },
  Warehousing: { code: '06', title: 'Warehousing', body: 'An illustrative inbound and outbound materials zone with future logistics workflows.' },
} as const

type Zone = keyof typeof zones

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeZone, setActiveZone] = useState<Zone>('Operations')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedElement, setSelectedElement] = useState<string | null>('Nd')
  const shouldReduceMotion = useReducedMotion()

  const active = useMemo(() => zones[activeZone], [activeZone])

  const elementDetails: Record<string, { name: string; category: string; description: string }> = {
    'Nd': { name: 'Neodymium', category: 'Rare Earth', description: 'Critical for high-strength permanent magnets in motors and generators.' },
    'Dy': { name: 'Dysprosium', category: 'Rare Earth', description: 'Essential additive for high-temperature magnet stability.' },
    'Co': { name: 'Cobalt', category: 'Transition Metal', description: 'Key cathode material in lithium-ion battery systems.' },
    'Li': { name: 'Lithium', category: 'Alkali Metal', description: 'Fundamental element for energy storage and battery technology.' },
    'Ni': { name: 'Nickel', category: 'Transition Metal', description: 'Critical component in battery cathodes and steel alloys.' },
    'Mn': { name: 'Manganese', category: 'Transition Metal', description: 'Used in battery chemistry and steel manufacturing.' },
    'Cu': { name: 'Copper', category: 'Transition Metal', description: 'Essential conductor for electrical systems and infrastructure.' },
    'Ga': { name: 'Gallium', category: 'Post-transition', description: 'Critical for semiconductor and LED applications.' },
    'Tb': { name: 'Terbium', category: 'Rare Earth', description: 'Used in green phosphors and high-tech magnets.' },
    'Pr': { name: 'Praseodymium', category: 'Rare Earth', description: 'Important for glass polishing and magnet alloys.' },
    'La': { name: 'Lanthanum', category: 'Rare Earth', description: 'Used in catalysts and rechargeable battery electrodes.' },
    'Sc': { name: 'Scandium', category: 'Rare Earth', description: 'Alloying element for aerospace applications.' },
    'Y': { name: 'Yttrium', category: 'Rare Earth', description: 'Critical for phosphors, ceramics, and superconductors.' },
    'Fe': { name: 'Iron', category: 'Transition Metal', description: 'Foundation of structural steel and industrial materials.' },
    'Al': { name: 'Aluminum', category: 'Post-transition', description: 'Lightweight structural material for transport and manufacturing.' },
    'Zn': { name: 'Zinc', category: 'Transition Metal', description: 'Protective coatings and alloy component.' },
    'Ti': { name: 'Titanium', category: 'Transition Metal', description: 'High-strength, corrosion-resistant engineering material.' },
  }

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      nodes.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          } else {
            entry.target.classList.remove('is-visible')
          }
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
    )
    nodes.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const form = event.currentTarget
    const data = new FormData(form)
    const email = String(data.get('email') || '')
    if (!data.get('name') || !data.get('organization') || !data.get('message') || !data.get('consent')) {
      setError('Please complete the required fields and consent checkbox.')
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid work email address.')
      return
    }
    setSubmitted(true)
    form.reset()
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f7f8] text-[#0f2840]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#0f2840]/95 text-white backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14">
          <a href="#top" className="flex items-center gap-3" aria-label="Giga Mines home">
            <span className="grid size-9 place-items-center border border-[#ee7b2b] text-sm font-black text-[#ee7b2b]">GM</span>
            <span className="text-lg font-semibold tracking-[0.16em]">GIGA MINES<span className="text-[#ee7b2b]">.</span></span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {navItems.map(([label, href]) => <a key={href} href={href} className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70 transition hover:text-[#ee7b2b]">{label}</a>)}
          </nav>
          <a href="#partner" className="cta cta-primary hidden items-center border border-[#ee7b2b] bg-[#ee7b2b] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f2840] sm:inline-flex">Partner with us <ArrowUpRight className="cta-arrow ml-2 size-3" /></a>
          <button className="lg:hidden" aria-label="Toggle menu" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
        </div>
        {mobileOpen && <nav className="flex flex-col gap-5 border-t border-white/15 bg-[#0f2840] px-5 py-6 lg:hidden">{navItems.map(([label, href]) => <a onClick={() => setMobileOpen(false)} key={href} href={href} className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">{label}</a>)}<a href="#partner" onClick={() => setMobileOpen(false)} className="text-xs font-bold uppercase tracking-[0.16em] text-[#ee7b2b]">Partner with us</a></nav>}
      </header>

      <section id="home" className="relative flex min-h-[760px] items-end overflow-hidden bg-[#0f2840] pt-20 text-white lg:min-h-screen">
        {/* Cinematic layered backgrounds with parallax depth */}
        <motion.div
          initial={shouldReduceMotion ? {} : { scale: 1.2, opacity: 0 }}
          animate={shouldReduceMotion ? {} : { scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: [0.16, 0.84, 0.44, 1] }}
          className="hero-bg-layer hero-bg-far absolute inset-0"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2200&q=85"
            alt="Engineers working inside an industrial processing facility"
            className="size-full object-cover opacity-40"
            style={{ willChange: 'transform' }}
            animate={shouldReduceMotion ? {} : {
              scale: [1, 1.05, 1],
              opacity: [0.4, 0.45, 0.4],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Mineral texture overlay */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          animate={shouldReduceMotion ? {} : { opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute inset-0 opacity-[.15]"
        >
          <img
            src="/mineral-texture.svg"
            alt=""
            className="size-full object-cover mix-blend-screen"
            aria-hidden="true"
          />
        </motion.div>

        {/* Enhanced gradient overlay with depth */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          animate={shouldReduceMotion ? {} : { opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="hero-bg-layer hero-bg-mid absolute inset-0"
        >
          <div className="absolute inset-0 bg-[linear-gradient(105deg,#0f2840_0%,rgba(15,40,64,.92)_35%,rgba(15,40,64,.55)_65%,rgba(15,40,64,.15)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_45%,rgba(238,123,43,.06)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_60%,rgba(46,135,198,.08)_0%,transparent_60%)]" />
        </motion.div>

        {/* Animated technical grid layer */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          animate={shouldReduceMotion ? {} : { opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="hero-bg-layer hero-bg-near absolute inset-0"
        >
          <div className="hero-grid absolute inset-0" />
          <div className="hero-depth-accent" />
        </motion.div>

        {/* Advanced blueprint scanning visualization */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          animate={shouldReduceMotion ? {} : { opacity: 0.85 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="hero-blueprint"
          aria-hidden="true"
        >
          <span className="hero-scan-x" />
          <span className="hero-scan-y" />
          <span className="hero-frame" />
          <span className="hero-scan-corner hero-scan-corner-tl" />
          <span className="hero-scan-corner hero-scan-corner-tr" />
          <span className="hero-scan-corner hero-scan-corner-bl" />
          <span className="hero-scan-corner hero-scan-corner-br" />
        </motion.div>

        {/* Technical measurement lines */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          animate={shouldReduceMotion ? {} : { opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="hero-measure-line hero-measure-h" style={{ top: '28%', left: '8%', width: '35%' }} />
          <div className="hero-measure-line hero-measure-h" style={{ bottom: '22%', right: '10%', width: '28%' }} />
          <div className="hero-measure-line hero-measure-v" style={{ left: '15%', top: '20%', height: '45%' }} />
        </motion.div>

        {/* Content layer with staggered animations */}
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-14 lg:pb-28">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -40 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 0.84, 0.44, 1] }}
            className="hero-eyebrow mb-11"
          >
            <span className="hero-eyebrow-text">Critical minerals</span>
            <span className="hero-eyebrow-separator">/</span>
            <span className="hero-eyebrow-text">rare earths</span>
          </motion.div>

          <h1 className="max-w-[1100px] font-semibold leading-[.94] tracking-[-.062em] text-5xl sm:text-7xl lg:text-[clamp(4.75rem,8.2vw,9rem)]">
            <motion.span
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 60 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 0.84, 0.44, 1] }}
              className="block mb-2"
            >
              <span className="bg-gradient-to-br from-white via-white/98 to-white/95 bg-clip-text text-transparent">
                Building global
              </span>
            </motion.span>
            <motion.span
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 60 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1, ease: [0.16, 0.84, 0.44, 1] }}
              className="block mb-2"
            >
              <span className="bg-gradient-to-br from-white/55 to-white/40 bg-clip-text text-transparent">
                supply chains
              </span>
            </motion.span>
            <motion.span
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 60 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 0.84, 0.44, 1] }}
              className="block"
            >
              <span className="bg-gradient-to-br from-white via-white/98 to-white/95 bg-clip-text text-transparent">
                that matter.
              </span>
            </motion.span>
          </h1>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 0.84, 0.44, 1] }}
            className="mt-12 flex flex-col justify-between gap-8 border-t border-white/20 pt-7 md:flex-row md:items-end"
          >
            <p className="max-w-[520px] text-[15px] leading-[1.72] text-white/72 font-normal">
              Giga Mines is developing capabilities to recycle, recover, and refine the materials powering a more resilient future.
            </p>
            <div className="flex flex-wrap gap-3">
              <motion.a
                href="#partner"
                whileHover={!shouldReduceMotion ? { scale: 1.03, y: -2 } : {}}
                whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
                className="cta cta-primary inline-flex items-center bg-[#ee7b2b] px-7 py-[15px] text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f2840]"
              >
                Partner with us
                <ArrowUpRight className="cta-arrow ml-2 size-[15px]" />
              </motion.a>
              <motion.a
                href="#technology"
                whileHover={!shouldReduceMotion ? { scale: 1.03, y: -2 } : {}}
                whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
                className="cta inline-flex items-center border border-white/35 bg-white/[.03] px-7 py-[15px] text-[11px] font-bold uppercase tracking-[0.14em] backdrop-blur-sm transition hover:border-[#ee7b2b] hover:bg-[#ee7b2b]/10 hover:text-[#ee7b2b]"
              >
                Explore technology
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Animated scroll hint */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2, ease: [0.16, 0.84, 0.44, 1] }}
          className="absolute bottom-8 right-8 hidden text-right lg:block"
        >
          <span className="block text-[9.5px] font-bold uppercase tracking-[0.24em] text-[#ee7b2b] opacity-90">
            Scroll to explore
          </span>
          <span className="mt-1 block text-[10px] font-medium tracking-[0.18em] text-white/45">
            01 / 12
          </span>
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-3 flex justify-end"
          >
            <ArrowDownRight className="size-4 text-[#ee7b2b]/70" />
          </motion.div>
        </motion.div>
      </section>

      {/* Capabilities banner */}
      <section className="border-b border-[#0f2840]/15 bg-white" aria-label="Capabilities">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 md:grid-cols-4">
          {['Material recovery', 'Process development', 'Quality systems', 'Strategic partnerships'].map((item, i) => (
            <motion.div
              key={item}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 0.84, 0.44, 1] }}
              className="border-r border-[#0f2840]/12 px-5 py-7 text-[10px] font-semibold uppercase tracking-[0.18em] last:border-0 sm:px-8 lg:px-14"
            >
              <span className="mr-3 text-[#ee7b2b]">0{i + 1}</span>
              {item}
            </motion.div>
          ))}
        </div>
      </section>

      <section id="why" className="relative mx-auto max-w-[1440px] overflow-hidden px-5 py-24 sm:px-8 lg:px-14 lg:py-36">
        {/* Enhanced background with layered mineral imagery */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 1.1 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 0.84, 0.44, 1] }}
          className="absolute right-0 top-0 h-full w-full lg:w-[55%]"
        >
          <div className="absolute inset-0 opacity-[.15]">
            <img
              src="https://images.unsplash.com/photo-1611348524140-53c9a25263d6?auto=format&fit=crop&w=1400&q=85"
              alt=""
              className="size-full object-cover"
              aria-hidden="true"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#f5f7f8]/60 to-[#f5f7f8]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f5f7f8]" />

          {/* Mineral texture overlay */}
          <div className="absolute inset-0 opacity-[.08] mix-blend-multiply">
            <img
              src="/mineral-texture.svg"
              alt=""
              className="size-full object-cover"
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* Connecting technical lines */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute left-0 top-1/3 hidden w-full lg:block"
          aria-hidden="true"
        >
          <svg className="w-full h-32 opacity-20" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <motion.path
              d="M 0,50 Q 250,10 500,50 T 1000,50"
              stroke="#2e87c6"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>

        <div className="relative grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -40 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 0.84, 0.44, 1] }}
          >
            <p className="eyebrow">01 — Why it matters</p>
            <h2 className="section-title mt-5">
              The materials beneath <em>everything.</em>
            </h2>
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 0.84, 0.44, 1] }}
              className="mt-8 border-l-2 border-[#ee7b2b] pl-5"
            >
              <p className="text-sm leading-7 text-[#0f2840]/70 max-w-md">
                Critical minerals form the material foundation of modern infrastructure, renewable energy systems, and advanced manufacturing capabilities.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid gap-10 sm:grid-cols-3">
            {[
              {
                num: '01',
                title: 'Supply-chain resilience',
                body: 'Critical minerals sit at the foundation of electrification, advanced manufacturing, and national infrastructure.',
                delay: 0.1
              },
              {
                num: '02',
                title: 'Resource recovery',
                body: 'Recovering value from existing material streams can complement primary resources and reduce waste.',
                delay: 0.2
              },
              {
                num: '03',
                title: 'Circular materials',
                body: 'We are exploring practical pathways to keep high-value elements in productive use for longer.',
                delay: 0.3
              }
            ].map((item) => (
              <motion.article
                key={item.num}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8, delay: item.delay, ease: [0.16, 0.84, 0.44, 1] }}
                className="relative"
              >
                <motion.div
                  initial={shouldReduceMotion ? {} : { scale: 0.8, opacity: 0 }}
                  whileInView={shouldReduceMotion ? {} : { scale: 1, opacity: 1 }}
                  viewport={{ margin: "-100px" }}
                  transition={{ duration: 0.6, delay: item.delay + 0.2, ease: [0.16, 0.84, 0.44, 1] }}
                >
                  <span className="number">{item.num}</span>
                </motion.div>
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#0f2840]/65">
                  {item.body}
                </p>

                {/* Decorative accent */}
                <motion.div
                  initial={shouldReduceMotion ? {} : { width: 0 }}
                  whileInView={shouldReduceMotion ? {} : { width: '60%' }}
                  viewport={{ margin: "-100px" }}
                  transition={{ duration: 0.8, delay: item.delay + 0.4, ease: [0.16, 0.84, 0.44, 1] }}
                  className="mt-6 h-px bg-gradient-to-r from-[#ee7b2b]/40 to-transparent"
                />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="approach" className="bg-[#0f2840] px-5 py-24 text-white sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-8 border-b border-white/20 pb-10 md:flex-row md:items-end" data-reveal>
            <div>
              <p className="eyebrow text-[#ee7b2b]">02 — Our approach</p>
              <h2 className="section-title mt-5 max-w-2xl">
                Recycle <span className="text-[#ee7b2b]">·</span> Recovery <span className="text-[#ee7b2b]">·</span> Refine
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-7 text-white/60">
              A connected view of material flows — from feedstock intelligence to refined output.
            </p>
          </div>

          <div className="process-track mt-14" data-reveal="stagger">
            <span className="process-progress" aria-hidden="true" />
            <div className="grid gap-px bg-white/20 md:grid-cols-3">
              {[
                ['01', 'Recycle', 'Identify and prepare secondary material streams for responsible processing.', 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80'],
                ['02', 'Recovery', 'Separate and concentrate target elements with process-led discipline.', 'https://images.unsplash.com/photo-1581092918484-8313e1f6c196?auto=format&fit=crop&w=800&q=80'],
                ['03', 'Refine', 'Develop pathways toward specification-ready materials and products.', 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80']
              ].map(([n, title, body, img]) => (
                <article key={title} className="process-step relative overflow-hidden bg-[#0f2840] p-7 lg:p-10">
                  <div className="absolute inset-0 opacity-[.06]">
                    <img src={img} alt="" className="size-full object-cover" aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0f2840] via-[#0f2840]/90 to-transparent" />
                  </div>
                  <div className="relative">
                    <span className="text-xs text-[#ee7b2b]">{n}</span>
                    <h3 className="mt-16 text-3xl font-semibold tracking-tight">
                      {title}<span className="text-[#ee7b2b]">.</span>
                    </h3>
                    <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">{body}</p>
                    <ArrowDownRight className="process-arrow mt-10 size-6 text-[#ee7b2b]" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="facility" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-14 lg:py-36"><div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr]" data-reveal><div><p className="eyebrow">03 — Inside Giga Mines</p><h2 className="section-title mt-5">A facility <em>in formation.</em></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[#0f2840]/65">Explore an illustrative facility plan. Zones and adjacencies are shown to communicate our thinking, not to represent a verified operating site.</p><div className="mt-10 border-l-2 border-[#ee7b2b] pl-5"><p className="text-xs font-semibold uppercase tracking-[0.14em]">{active.code} / {active.title}</p><p className="mt-3 text-sm leading-6 text-[#0f2840]/65">{active.body}</p></div></div><div className="relative min-h-[460px] border border-[#0f2840]/20 bg-[#e8eef1] p-5 sm:p-10"><div className="absolute inset-8 border border-[#2e87c6]/40" /><div className="relative grid h-full min-h-[370px] grid-cols-6 grid-rows-6 gap-2">{(Object.keys(zones) as Zone[]).map((zone, index) => <button key={zone} type="button" onClick={() => setActiveZone(zone)} className={`facility-zone group relative border text-left ${activeZone === zone ? 'is-active border-[#ee7b2b] bg-[#ee7b2b] text-[#0f2840]' : 'border-[#2e87c6]/45 bg-[#d8e4e9]/70'}`} style={{ gridColumn: `${(index % 3) * 2 + 1} / span 2`, gridRow: `${Math.floor(index / 3) * 3 + 1} / span 2` }}><span className="absolute right-3 top-3 text-[10px] opacity-50">0{index + 1}</span><span className="absolute bottom-3 left-3 text-xs font-semibold uppercase tracking-[0.08em]">{zone}</span><span className="facility-dot" aria-hidden="true"><span className="facility-dot-core" /></span></button>)}</div><span className="absolute bottom-3 right-4 text-[9px] uppercase tracking-[.2em] text-[#0f2840]/50">Illustrative plan / TBC</span></div></div></section>

      <section id="technology" className="relative overflow-hidden bg-gradient-to-b from-[#dce8ed] to-[#c8d8e0] px-5 py-24 sm:px-8 lg:px-14 lg:py-36">
        {/* Technical background pattern */}
        <div className="absolute inset-0 opacity-40">
          <img
            src="/tech-process.svg"
            alt=""
            className="absolute left-0 top-0 h-full w-full object-cover"
            aria-hidden="true"
          />
        </div>

        {/* Mineral texture accent */}
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-[.08]">
          <img
            src="/mineral-texture.svg"
            alt=""
            className="size-full object-contain"
            aria-hidden="true"
          />
        </div>

        <div className="relative mx-auto max-w-[1440px]">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 0.84, 0.44, 1] }}
            className="grid gap-12 lg:grid-cols-[1fr_1fr]"
          >
            <div>
              <p className="eyebrow">04 — Technology preview</p>
              <h2 className="section-title mt-5">
                Precision at <em>every step.</em>
              </h2>
            </div>
            <div className="flex items-end">
              <p className="max-w-md text-sm leading-7 text-[#0f2840]/70">
                Our technology roadmap is being developed across process chemistry, mechanical systems, and quality control. Detailed capabilities will be shared as they are confirmed.
              </p>
            </div>
          </motion.div>

          <div className="relative mt-16">
            {/* Connection line */}
            <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#ee7b2b]/40 to-transparent lg:block" />

            <div className="space-y-0 border-y border-[#0f2840]/20">
              {[
                { title: 'Feedstock intelligence', icon: '01', delay: 0 },
                { title: 'Separation systems', icon: '02', delay: 0.1 },
                { title: 'Analytical quality', icon: '03', delay: 0.2 },
                { title: 'Responsible operations', icon: '04', delay: 0.3 }
              ].map((item, i) => (
                <motion.a
                  key={item.title}
                  href="#partner"
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                  viewport={{ margin: "-50px" }}
                  transition={{ duration: 0.6, delay: item.delay, ease: [0.16, 0.84, 0.44, 1] }}
                  className="tech-item group relative flex items-center justify-between border-b border-[#0f2840]/20 py-7 lg:py-8 last:border-0"
                >
                  {/* Hover background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ee7b2b]/0 via-[#ee7b2b]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex items-center gap-6">
                    <span className="flex size-12 items-center justify-center border border-[#0f2840]/20 bg-white/50 text-xs font-bold text-[#ee7b2b] backdrop-blur-sm transition-all duration-500 group-hover:border-[#ee7b2b] group-hover:bg-[#ee7b2b]/10 group-hover:shadow-lg">
                      {item.icon}
                    </span>
                    <span className="text-xl font-medium transition-colors duration-300 group-hover:text-[#ee7b2b]">
                      {item.title}
                    </span>
                  </div>

                  <ArrowUpRight className="relative size-5 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110 group-hover:text-[#ee7b2b]" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#0a1a28] px-5 py-24 sm:px-8 lg:px-14 lg:py-36">
        {/* Ambient background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#2e87c6]/8 blur-[120px]" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[#ee7b2b]/6 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-[1440px]">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 0.84, 0.44, 1] }}
            className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#ee7b2b]">
                05 — Elements we recover
              </p>
              <h2 className="section-title mt-5 max-w-xl text-white">
                The periodic table, <em className="text-[#2e87c6]">reconsidered.</em>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/55">
              Target elements are pending confirmation. This teaser represents the scope of the platform, not a confirmed recovery list.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            {/* Elements Grid */}
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-6">
              {['Nd','Dy','Co','Li','Ni','Mn','Cu','Ga','Tb','Pr','La','Sc','Y','Fe','Al','Zn','Ti','—'].map((el, i) => (
                <motion.button
                  key={`${el}-${i}`}
                  initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                  viewport={{}}
                  transition={{ duration: 0.5, delay: i * 0.03, ease: [0.16, 0.84, 0.44, 1] }}
                  whileHover={el !== '—' && !shouldReduceMotion ? { scale: 1.05, y: -4 } : {}}
                  onClick={() => el !== '—' && setSelectedElement(el)}
                  disabled={el === '—'}
                  className={`group relative aspect-square overflow-hidden border transition-all duration-300 ${
                    el === '—'
                      ? 'border-dashed border-white/10 bg-[#0a1a28] cursor-not-allowed'
                      : selectedElement === el
                      ? 'border-[#ee7b2b] bg-gradient-to-br from-[#ee7b2b]/20 via-[#0f2840]/90 to-[#0f2840] shadow-[0_0_30px_rgba(238,123,43,0.3)]'
                      : 'border-white/20 bg-gradient-to-br from-[#0f2840] to-[#0a1a28] hover:border-[#2e87c6] hover:shadow-[0_0_20px_rgba(46,135,198,0.2)]'
                  }`}
                >
                  {el !== '—' && (
                    <>
                      {/* Scanning line effect */}
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="scanning-line" />
                      </div>

                      {/* Orbital rings */}
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30">
                        <div className="orbital-ring" />
                        <div className="orbital-ring animation-delay-500" />
                      </div>
                    </>
                  )}

                  <div className="relative flex size-full flex-col items-center justify-center p-2 sm:p-3">
                    <span className={`text-[9px] font-bold tracking-wider ${
                      el === '—' ? 'text-white/20' : 'text-[#ee7b2b]'
                    }`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`mt-1 block text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl ${
                      el === '—' ? 'text-white/20' : 'text-white'
                    }`}>
                      {el}
                    </span>
                    <span className={`mt-1 block text-[8px] uppercase tracking-wider ${
                      el === '—' ? 'text-white/15' : 'text-white/40'
                    }`}>
                      {el === '—' ? 'TBC' : elementDetails[el]?.category.split(' ')[0] || 'Element'}
                    </span>
                  </div>

                  {selectedElement === el && (
                    <motion.div
                      layoutId="element-selected-indicator"
                      className="absolute inset-0 border-2 border-[#ee7b2b]"
                      transition={{ duration: 0.3, ease: [0.16, 0.84, 0.44, 1] }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Element Detail Panel */}
            {selectedElement && selectedElement !== '—' && elementDetails[selectedElement] && (
              <motion.div
                key={selectedElement}
                initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 0.84, 0.44, 1] }}
                className="relative overflow-hidden rounded-sm border border-white/20 bg-gradient-to-br from-[#0f2840] to-[#0a1a28] p-8 shadow-2xl lg:p-10"
              >
                {/* Ambient glow */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#ee7b2b]/10 blur-[80px]" />

                <div className="relative">
                  <div className="mb-8 flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ee7b2b]">
                        Selected Element
                      </p>
                      <h3 className="mt-3 text-6xl font-semibold tracking-tight text-white lg:text-7xl">
                        {selectedElement}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedElement(null)}
                      className="rounded-sm border border-white/20 p-2 text-white/60 transition hover:border-[#ee7b2b] hover:text-[#ee7b2b]"
                      aria-label="Close detail panel"
                    >
                      <X className="size-5" />
                    </button>
                  </div>

                  <div className="space-y-4 border-t border-white/10 pt-6">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/50">Name</p>
                      <p className="mt-1 text-2xl font-semibold text-white">
                        {elementDetails[selectedElement].name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/50">Category</p>
                      <p className="mt-1 text-lg text-[#2e87c6]">
                        {elementDetails[selectedElement].category}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/50">Industrial Application</p>
                      <p className="mt-2 text-sm leading-7 text-white/70">
                        {elementDetails[selectedElement].description}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-6">
                      <p className="text-[10px] uppercase tracking-wider text-white/40">
                        Recovery status: Under development
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-24 sm:px-8 lg:px-14 lg:py-32"><div className="mx-auto max-w-[1440px]" data-reveal><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">06 — Numbers & impact</p><h2 className="section-title mt-5">Measure what <em>matters.</em></h2></div><div className="grid grid-cols-2 gap-0 border-l border-t border-[#0f2840]/15">{[['—', 'Capacity / to be confirmed'], ['—', 'Recovery rate / to be confirmed'], ['—', 'Locations / to be confirmed'], ['—', 'Impact metrics / to be confirmed']].map(([n, label]) => <div key={label} className="border-b border-r border-[#0f2840]/15 p-6 sm:p-10"><span className="text-5xl font-semibold tracking-[-.06em] text-[#ee7b2b] sm:text-7xl">{n}</span><p className="mt-4 text-[10px] uppercase tracking-[.15em] text-[#0f2840]/55">{label}</p></div>)}</div></div></div></section>

      <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-14 lg:py-32"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]" data-reveal><div><p className="eyebrow">07 — Intended markets</p><h2 className="section-title mt-5">For industries building <em>what's next.</em></h2></div><div className="grid grid-cols-2 gap-x-8 gap-y-5 text-xl font-medium sm:grid-cols-3">{['Energy storage', 'Electric mobility', 'Renewable power', 'Advanced manufacturing', 'Aerospace', 'Defence & infrastructure'].map(item => <div key={item} className="border-t border-[#0f2840]/20 pt-4"><span className="mr-2 text-[#ee7b2b]">+</span>{item}<p className="mt-2 text-[10px] font-normal uppercase tracking-wider text-[#0f2840]/45">Target market / TBC</p></div>)}</div></div></section>

      <section id="insights" className="bg-[#0f2840] px-5 py-24 text-white sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-[1440px]" data-reveal>
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="eyebrow text-[#ee7b2b]">08 — News & insights</p>
              <h2 className="section-title mt-5">Signals from <em>the field.</em></h2>
            </div>
            <span className="hidden text-[10px] uppercase tracking-[.2em] text-white/50 sm:block">Sample content / TBC</span>
          </div>
          <div className="mt-14 grid gap-px bg-white/20 md:grid-cols-3">
            {[
              ['Material flows: a primer', 'https://images.unsplash.com/photo-1581092918484-8313e1f6c196?auto=format&fit=crop&w=600&q=80'],
              ['Why recovery matters', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'],
              ['Inside the roadmap', 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=600&q=80']
            ].map(([title, img], i) => (
              <article key={title} className="relative overflow-hidden bg-[#0f2840] p-7 lg:p-10">
                <div className="absolute inset-0 opacity-[.08]">
                  <img src={img} alt="" className="size-full object-cover" aria-hidden="true" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0f2840] via-[#0f2840]/95 to-[#0f2840]/70" />
                </div>
                <div className="relative">
                  <p className="text-[10px] uppercase tracking-[.2em] text-[#ee7b2b]">Insight 0{i + 1} / Sample</p>
                  <h3 className="mt-14 text-2xl font-semibold">{title}</h3>
                  <p className="mt-5 text-sm leading-7 text-white/55">
                    A placeholder for a future Giga Mines perspective. Announcement and publication details are to be confirmed.
                  </p>
                  <a href="#partner" className="cta mt-8 inline-flex items-center text-[10px] font-bold uppercase tracking-[.15em] text-white underline decoration-[#ee7b2b] underline-offset-4">
                    Register interest <ArrowUpRight className="cta-arrow ml-1 size-3" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="partner" className="relative overflow-hidden bg-[#0a1a28] px-5 py-24 text-white sm:px-8 lg:px-14 lg:py-36">
        {/* Immersive background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581092918484-8313e1f6c196?auto=format&fit=crop&w=2400&q=85"
            alt=""
            className="size-full object-cover opacity-20"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2840]/95 via-[#0a1a28]/90 to-[#0a1a28]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(238,123,43,0.08)_0%,transparent_50%)]" />
        </div>

        <div className="relative mx-auto max-w-[1440px]">
          <div className="grid gap-20 lg:grid-cols-[.9fr_1.1fr]">
            {/* Left: Editorial Typography */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -40 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 0.84, 0.44, 1] }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#ee7b2b]">
                09 — Partner with us
              </p>
              <h2 className="section-title mt-6 max-w-xl text-white">
                Start a <em className="text-[#2e87c6]">conversation.</em>
              </h2>

              <div className="mt-12 space-y-8 border-l-2 border-[#ee7b2b]/40 pl-8">
                <p className="text-base leading-8 text-white/70">
                  Tell us about your interest in critical minerals recovery, rare-earth refining capabilities, or strategic partnerships.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 size-2 rounded-full bg-[#ee7b2b]" />
                    <div>
                      <p className="text-sm font-semibold text-white">OEM & Industry Partners</p>
                      <p className="mt-1 text-xs leading-6 text-white/50">
                        Secure supply chains for critical materials
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 size-2 rounded-full bg-[#2e87c6]" />
                    <div>
                      <p className="text-sm font-semibold text-white">Feed Suppliers</p>
                      <p className="mt-1 text-xs leading-6 text-white/50">
                        Material streams and recovery opportunities
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 size-2 rounded-full bg-[#ee7b2b]" />
                    <div>
                      <p className="text-sm font-semibold text-white">Investors & R&D</p>
                      <p className="mt-1 text-xs leading-6 text-white/50">
                        Technology development and scale-up pathways
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs leading-6 text-white/40">
                  This demonstration form is ready to connect to a production endpoint when one is confirmed.
                </p>
              </div>
            </motion.div>

            {/* Right: Premium Form */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: 40 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 0.84, 0.44, 1] }}
            >
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="group">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-white/70 transition-colors group-focus-within:text-[#ee7b2b]">
                      Name *
                    </span>
                    <input
                      name="name"
                      required
                      className="contact-field"
                      placeholder="Your full name"
                    />
                  </label>

                  <label className="group">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-white/70 transition-colors group-focus-within:text-[#ee7b2b]">
                      Work email *
                    </span>
                    <input
                      name="email"
                      type="email"
                      required
                      className="contact-field"
                      placeholder="email@company.com"
                    />
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="group">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-white/70 transition-colors group-focus-within:text-[#ee7b2b]">
                      Organization *
                    </span>
                    <input
                      name="organization"
                      required
                      className="contact-field"
                      placeholder="Company name"
                    />
                  </label>

                  <label className="group">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-white/70 transition-colors group-focus-within:text-[#ee7b2b]">
                      Enquiry category
                    </span>
                    <select name="category" className="contact-field">
                      <option>OEM / industry partner</option>
                      <option>Feed supplier</option>
                      <option>Investor</option>
                      <option>R&D partner</option>
                      <option>Other enquiry</option>
                    </select>
                  </label>
                </div>

                <label className="group">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-white/70 transition-colors group-focus-within:text-[#ee7b2b]">
                    Message *
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="contact-field resize-y"
                    placeholder="Tell us about your interest..."
                  />
                </label>

                <label className="flex items-start gap-3 text-sm leading-6 text-white/50">
                  <input
                    name="consent"
                    type="checkbox"
                    className="mt-1 accent-[#ee7b2b]"
                  />
                  I consent to Giga Mines using this information to respond to my enquiry. *
                </label>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    className="rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                  >
                    {error}
                  </motion.p>
                )}

                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    role="status"
                    className="flex items-center gap-3 rounded-sm border border-[#2e87c6]/30 bg-[#2e87c6]/10 px-4 py-3 text-sm text-[#2e87c6]"
                  >
                    <Check className="size-5" />
                    Thank you — your enquiry is validated. Production submission is pending backend connection.
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  whileHover={!shouldReduceMotion ? { scale: 1.02 } : {}}
                  whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
                  className="cta cta-primary group inline-flex w-full items-center justify-center bg-[#ee7b2b] px-8 py-5 text-xs font-bold uppercase tracking-[0.15em] text-[#0f2840] sm:w-auto"
                >
                  Submit enquiry
                  <ArrowUpRight className="cta-arrow ml-2 size-4 transition-transform" />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/15 bg-[#0f2840] px-5 py-12 text-white sm:px-8 lg:px-14"><div className="mx-auto max-w-[1440px]"><div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr] md:gap-20"><div><div className="flex items-center gap-3"><span className="grid size-9 place-items-center border border-[#ee7b2b] text-sm font-black text-[#ee7b2b]">GM</span><span className="text-lg font-semibold tracking-[.16em]">GIGA MINES<span className="text-[#ee7b2b]">.</span></span></div><p className="mt-6 max-w-xs text-sm leading-6 text-white/55">The critical-minerals and rare-earth refining vertical of MiniMines Cleantech Solutions Pvt Ltd.</p></div><div><p className="eyebrow text-[#ee7b2b]">Navigate</p><div className="mt-5 flex flex-col gap-3 text-sm text-white/65">{navItems.slice(0, 4).map(([label, href]) => <a key={href} href={href} className="hover:text-white">{label}</a>)}</div></div><div><p className="eyebrow text-[#ee7b2b]">Contact</p><p className="mt-5 text-sm leading-6 text-white/55">General contact details<br />awaiting confirmation.<br /><br />Legal and privacy links<br />to be confirmed.</p></div></div><div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/15 pt-6 text-[10px] uppercase tracking-[.15em] text-white/40 sm:flex-row"><span>© 2026 Giga Mines / MiniMines Cleantech Solutions Pvt Ltd</span><span>Information subject to confirmation</span></div></div></footer>

      <button aria-label="Open quick navigation" onClick={() => setMenuOpen(!menuOpen)} className="fixed bottom-5 right-5 z-40 hidden size-12 place-items-center rounded-full bg-[#ee7b2b] text-[#0f2840] shadow-lg lg:grid"><ChevronDown className={`size-5 transition ${menuOpen ? 'rotate-180' : ''}`} /></button>
      {menuOpen && <div className="fixed bottom-20 right-5 z-40 w-52 border border-[#0f2840]/15 bg-white p-4 shadow-xl"><p className="eyebrow">Quick navigation</p>{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="mt-3 block text-sm hover:text-[#ee7b2b]">{label}</a>)}</div>}
    </main>
  )
}

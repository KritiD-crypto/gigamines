'use client'

import { FormEvent, useMemo, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Menu, X } from 'lucide-react'

const navItems = [
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

  const active = useMemo(() => zones[activeZone], [activeZone])

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
          <a href="#partner" className="hidden border border-[#ee7b2b] bg-[#ee7b2b] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f2840] transition hover:bg-white sm:block">Partner with us <ArrowUpRight className="ml-2 inline size-3" /></a>
          <button className="lg:hidden" aria-label="Toggle menu" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
        </div>
        {mobileOpen && <nav className="flex flex-col gap-5 border-t border-white/15 bg-[#0f2840] px-5 py-6 lg:hidden">{navItems.map(([label, href]) => <a onClick={() => setMobileOpen(false)} key={href} href={href} className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">{label}</a>)}<a href="#partner" onClick={() => setMobileOpen(false)} className="text-xs font-bold uppercase tracking-[0.16em] text-[#ee7b2b]">Partner with us</a></nav>}
      </header>

      <section id="top" className="relative flex min-h-[760px] items-end bg-[#0f2840] pt-20 text-white lg:min-h-screen">
        <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2200&q=85" alt="Engineers working inside an industrial processing facility" className="absolute inset-0 size-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0f2840_0%,rgba(15,40,64,.78)_42%,rgba(15,40,64,.15)_100%)]" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
        <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-14 lg:pb-28">
          <div className="mb-10 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#ee7b2b]"><span className="h-px w-12 bg-[#ee7b2b]" /> Critical minerals / rare earths</div>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[.96] tracking-[-.055em] sm:text-7xl lg:text-[clamp(4.5rem,8vw,8.5rem)]">Building global<br /><span className="text-white/45">supply chains</span><br />that matter.</h1>
          <div className="mt-10 flex flex-col justify-between gap-8 border-t border-white/25 pt-6 md:flex-row md:items-end"><p className="max-w-md text-base leading-relaxed text-white/75">Giga Mines is developing capabilities to recycle, recover, and refine the materials powering a more resilient future.</p><div className="flex flex-wrap gap-3"><a href="#partner" className="bg-[#ee7b2b] px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-[#0f2840] transition hover:bg-white">Partner with us <ArrowUpRight className="ml-2 inline size-4" /></a><a href="#technology" className="border border-white/40 px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] transition hover:border-[#ee7b2b] hover:text-[#ee7b2b]">Explore technology</a></div></div>
        </div>
        <div className="absolute bottom-7 right-8 hidden text-right text-[10px] uppercase tracking-[0.2em] text-white/50 lg:block"><span className="block text-[#ee7b2b]">Scroll to explore</span> 01 / 12</div>
      </section>

      <section className="border-b border-[#0f2840]/15 bg-white" aria-label="Capabilities"><div className="mx-auto grid max-w-[1440px] grid-cols-2 md:grid-cols-4">{['Material recovery', 'Process development', 'Quality systems', 'Strategic partnerships'].map((item, i) => <div key={item} className="border-r border-[#0f2840]/12 px-5 py-7 text-[10px] font-semibold uppercase tracking-[0.18em] last:border-0 sm:px-8 lg:px-14"><span className="mr-3 text-[#ee7b2b]">0{i + 1}</span>{item}</div>)}</div></section>

      <section id="why" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-14 lg:py-36"><div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">01 — Why it matters</p><h2 className="section-title mt-5">The materials beneath <em>everything.</em></h2></div><div className="grid gap-10 sm:grid-cols-3"><article><span className="number">01</span><h3 className="mt-5 text-xl font-semibold">Supply-chain resilience</h3><p className="mt-4 text-sm leading-7 text-[#0f2840]/65">Critical minerals sit at the foundation of electrification, advanced manufacturing, and national infrastructure.</p></article><article><span className="number">02</span><h3 className="mt-5 text-xl font-semibold">Resource recovery</h3><p className="mt-4 text-sm leading-7 text-[#0f2840]/65">Recovering value from existing material streams can complement primary resources and reduce waste.</p></article><article><span className="number">03</span><h3 className="mt-5 text-xl font-semibold">Circular materials</h3><p className="mt-4 text-sm leading-7 text-[#0f2840]/65">We are exploring practical pathways to keep high-value elements in productive use for longer.</p></article></div></div></section>

      <section id="approach" className="bg-[#0f2840] px-5 py-24 text-white sm:px-8 lg:px-14 lg:py-32"><div className="mx-auto max-w-[1440px]"><div className="flex flex-col justify-between gap-8 border-b border-white/20 pb-10 md:flex-row md:items-end"><div><p className="eyebrow text-[#ee7b2b]">02 — Our approach</p><h2 className="section-title mt-5 max-w-2xl">Recycle <span className="text-[#ee7b2b]">·</span> Recovery <span className="text-[#ee7b2b]">·</span> Refine</h2></div><p className="max-w-xs text-sm leading-7 text-white/60">A connected view of material flows — from feedstock intelligence to refined output.</p></div><div className="mt-14 grid gap-px bg-white/20 md:grid-cols-3">{[['01', 'Recycle', 'Identify and prepare secondary material streams for responsible processing.'], ['02', 'Recovery', 'Separate and concentrate target elements with process-led discipline.'], ['03', 'Refine', 'Develop pathways toward specification-ready materials and products.']].map(([n, title, body]) => <article key={title} className="bg-[#0f2840] p-7 lg:p-10"><span className="text-xs text-[#ee7b2b]">{n}</span><h3 className="mt-16 text-3xl font-semibold tracking-tight">{title}<span className="text-[#ee7b2b]">.</span></h3><p className="mt-5 max-w-xs text-sm leading-7 text-white/60">{body}</p><ArrowDownRight className="mt-10 size-6 text-[#ee7b2b]" /></article>)}</div></div></section>

      <section id="facility" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-14 lg:py-36"><div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow">03 — Inside Giga Mines</p><h2 className="section-title mt-5">A facility <em>in formation.</em></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[#0f2840]/65">Explore an illustrative facility plan. Zones and adjacencies are shown to communicate our thinking, not to represent a verified operating site.</p><div className="mt-10 border-l-2 border-[#ee7b2b] pl-5"><p className="text-xs font-semibold uppercase tracking-[0.14em]">{active.code} / {active.title}</p><p className="mt-3 text-sm leading-6 text-[#0f2840]/65">{active.body}</p></div></div><div className="relative min-h-[460px] border border-[#0f2840]/20 bg-[#e8eef1] p-5 sm:p-10"><div className="absolute inset-8 border border-[#2e87c6]/40" /><div className="relative grid h-full min-h-[370px] grid-cols-6 grid-rows-6 gap-2">{(Object.keys(zones) as Zone[]).map((zone, index) => <button key={zone} onClick={() => setActiveZone(zone)} className={`group relative border text-left transition ${activeZone === zone ? 'border-[#ee7b2b] bg-[#ee7b2b] text-[#0f2840]' : 'border-[#2e87c6]/45 bg-[#d8e4e9]/70 hover:bg-white'}`} style={{ gridColumn: `${(index % 3) * 2 + 1} / span 2`, gridRow: `${Math.floor(index / 3) * 3 + 1} / span 2` }}><span className="absolute right-3 top-3 text-[10px] opacity-50">0{index + 1}</span><span className="absolute bottom-3 left-3 text-xs font-semibold uppercase tracking-[0.08em]">{zone}</span><span className="absolute bottom-3 right-3 size-2 rounded-full bg-[#2e87c6] group-hover:bg-[#ee7b2b]" /></button>)}</div><span className="absolute bottom-3 right-4 text-[9px] uppercase tracking-[.2em] text-[#0f2840]/50">Illustrative plan / TBC</span></div></div></section>

      <section id="technology" className="bg-[#dce8ed] px-5 py-24 sm:px-8 lg:px-14 lg:py-32"><div className="mx-auto max-w-[1440px]"><div className="grid gap-12 lg:grid-cols-[1fr_1fr]"><div><p className="eyebrow">04 — Technology preview</p><h2 className="section-title mt-5">Precision at <em>every step.</em></h2></div><div className="flex items-end"><p className="max-w-md text-sm leading-7 text-[#0f2840]/70">Our technology roadmap is being developed across process chemistry, mechanical systems, and quality control. Detailed capabilities will be shared as they are confirmed.</p></div></div><div className="mt-16 border-y border-[#0f2840]/20">{['Feedstock intelligence', 'Separation systems', 'Analytical quality', 'Responsible operations'].map((item, i) => <a key={item} href="#partner" className="group flex items-center justify-between border-b border-[#0f2840]/20 py-6 last:border-0"><span className="flex items-center gap-5 text-xl font-medium"><span className="text-xs text-[#ee7b2b]">0{i + 1}</span>{item}</span><ArrowUpRight className="size-5 transition group-hover:translate-x-1 group-hover:-translate-y-1" /></a>)}</div></div></section>

      <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-14 lg:py-36"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="eyebrow">05 — Elements we recover</p><h2 className="section-title mt-5 max-w-xl">The periodic table, <em>reconsidered.</em></h2></div><p className="max-w-sm text-sm leading-7 text-[#0f2840]/65">Target elements are pending confirmation. This teaser represents the scope of the platform, not a confirmed recovery list.</p></div><div className="mt-16 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9">{['Nd','Dy','Co','Li','Ni','Mn','Cu','Ga','Tb','Pr','La','Sc','Y','Fe','Al','Zn','Ti','—'].map((el, i) => <div key={`${el}-${i}`} className={`group aspect-square border p-3 transition hover:-translate-y-1 hover:border-[#ee7b2b] ${el === '—' ? 'border-dashed border-[#0f2840]/30 bg-[#f5f7f8]' : 'border-[#0f2840]/20 bg-white'}`}><span className="text-[10px] text-[#ee7b2b]">{String(i + 1).padStart(2, '0')}</span><span className="mt-4 block text-3xl font-semibold sm:text-4xl">{el}</span><span className="mt-1 block text-[9px] uppercase tracking-wider text-[#0f2840]/45">{el === '—' ? 'TBC' : 'Element'}</span></div>)}</div></section>

      <section className="bg-white px-5 py-24 sm:px-8 lg:px-14 lg:py-32"><div className="mx-auto max-w-[1440px]"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">06 — Numbers & impact</p><h2 className="section-title mt-5">Measure what <em>matters.</em></h2></div><div className="grid grid-cols-2 gap-0 border-l border-t border-[#0f2840]/15">{[['—', 'Capacity / to be confirmed'], ['—', 'Recovery rate / to be confirmed'], ['—', 'Locations / to be confirmed'], ['—', 'Impact metrics / to be confirmed']].map(([n, label]) => <div key={label} className="border-b border-r border-[#0f2840]/15 p-6 sm:p-10"><span className="text-5xl font-semibold tracking-[-.06em] text-[#ee7b2b] sm:text-7xl">{n}</span><p className="mt-4 text-[10px] uppercase tracking-[.15em] text-[#0f2840]/55">{label}</p></div>)}</div></div></div></section>

      <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-14 lg:py-32"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">07 — Intended markets</p><h2 className="section-title mt-5">For industries building <em>what's next.</em></h2></div><div className="grid grid-cols-2 gap-x-8 gap-y-5 text-xl font-medium sm:grid-cols-3">{['Energy storage', 'Electric mobility', 'Renewable power', 'Advanced manufacturing', 'Aerospace', 'Defence & infrastructure'].map(item => <div key={item} className="border-t border-[#0f2840]/20 pt-4"><span className="mr-2 text-[#ee7b2b]">+</span>{item}<p className="mt-2 text-[10px] font-normal uppercase tracking-wider text-[#0f2840]/45">Target market / TBC</p></div>)}</div></div></section>

      <section id="insights" className="bg-[#0f2840] px-5 py-24 text-white sm:px-8 lg:px-14 lg:py-32"><div className="mx-auto max-w-[1440px]"><div className="flex items-end justify-between gap-5"><div><p className="eyebrow text-[#ee7b2b]">08 — News & insights</p><h2 className="section-title mt-5">Signals from <em>the field.</em></h2></div><span className="hidden text-[10px] uppercase tracking-[.2em] text-white/50 sm:block">Sample content / TBC</span></div><div className="mt-14 grid gap-px bg-white/20 md:grid-cols-3">{['Material flows: a primer', 'Why recovery matters', 'Inside the roadmap'].map((title, i) => <article key={title} className="bg-[#0f2840] p-7 lg:p-10"><p className="text-[10px] uppercase tracking-[.2em] text-[#ee7b2b]">Insight 0{i + 1} / Sample</p><h3 className="mt-14 text-2xl font-semibold">{title}</h3><p className="mt-5 text-sm leading-7 text-white/55">A placeholder for a future Giga Mines perspective. Announcement and publication details are to be confirmed.</p><a href="#partner" className="mt-8 inline-block text-[10px] font-bold uppercase tracking-[.15em] text-white underline decoration-[#ee7b2b] underline-offset-4">Register interest <ArrowUpRight className="ml-1 inline size-3" /></a></article>)}</div></div></section>

      <section id="partner" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-14 lg:py-36"><div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]"><div><p className="eyebrow">09 — Partner with us</p><h2 className="section-title mt-5">Start a <em>conversation.</em></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[#0f2840]/65">Tell us a little about your interest. This demonstration form is ready to connect to a production endpoint when one is confirmed.</p></div><form onSubmit={handleSubmit} className="grid gap-5" noValidate><div className="grid gap-5 sm:grid-cols-2"><label>Name *<input name="name" required className="field" /></label><label>Work email *<input name="email" type="email" required className="field" /></label></div><div className="grid gap-5 sm:grid-cols-2"><label>Organization *<input name="organization" required className="field" /></label><label>Enquiry category<select name="category" className="field"><option>OEM / industry partner</option><option>Feed supplier</option><option>Investor</option><option>R&D partner</option><option>Other enquiry</option></select></label></div><label>Message *<textarea name="message" required rows={5} className="field resize-y" /></label><label className="flex items-start gap-3 text-xs leading-5 text-[#0f2840]/60"><input name="consent" type="checkbox" className="mt-1 accent-[#ee7b2b]" />I consent to Giga Mines using this information to respond to my enquiry. *</label>{error && <p role="alert" className="text-sm text-red-700">{error}</p>}{submitted && <p role="status" className="flex items-center gap-2 text-sm text-[#2e87c6]"><Check className="size-4" />Thank you — your enquiry is validated. Production submission is pending backend connection.</p>}<button type="submit" className="w-fit bg-[#ee7b2b] px-7 py-4 text-xs font-bold uppercase tracking-[.15em] text-[#0f2840] transition hover:bg-[#0f2840] hover:text-white">Submit enquiry <ArrowUpRight className="ml-2 inline size-4" /></button></form></div></section>

      <footer className="border-t border-white/15 bg-[#0f2840] px-5 py-12 text-white sm:px-8 lg:px-14"><div className="mx-auto max-w-[1440px]"><div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr] md:gap-20"><div><div className="flex items-center gap-3"><span className="grid size-9 place-items-center border border-[#ee7b2b] text-sm font-black text-[#ee7b2b]">GM</span><span className="text-lg font-semibold tracking-[.16em]">GIGA MINES<span className="text-[#ee7b2b]">.</span></span></div><p className="mt-6 max-w-xs text-sm leading-6 text-white/55">The critical-minerals and rare-earth refining vertical of MiniMines Cleantech Solutions Pvt Ltd.</p></div><div><p className="eyebrow text-[#ee7b2b]">Navigate</p><div className="mt-5 flex flex-col gap-3 text-sm text-white/65">{navItems.slice(0, 4).map(([label, href]) => <a key={href} href={href} className="hover:text-white">{label}</a>)}</div></div><div><p className="eyebrow text-[#ee7b2b]">Contact</p><p className="mt-5 text-sm leading-6 text-white/55">General contact details<br />awaiting confirmation.<br /><br />Legal and privacy links<br />to be confirmed.</p></div></div><div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/15 pt-6 text-[10px] uppercase tracking-[.15em] text-white/40 sm:flex-row"><span>© 2026 Giga Mines / MiniMines Cleantech Solutions Pvt Ltd</span><span>Information subject to confirmation</span></div></div></footer>

      <button aria-label="Open quick navigation" onClick={() => setMenuOpen(!menuOpen)} className="fixed bottom-5 right-5 z-40 hidden size-12 place-items-center rounded-full bg-[#ee7b2b] text-[#0f2840] shadow-lg lg:grid"><ChevronDown className={`size-5 transition ${menuOpen ? 'rotate-180' : ''}`} /></button>
      {menuOpen && <div className="fixed bottom-20 right-5 z-40 w-52 border border-[#0f2840]/15 bg-white p-4 shadow-xl"><p className="eyebrow">Quick navigation</p>{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="mt-3 block text-sm hover:text-[#ee7b2b]">{label}</a>)}</div>}
    </main>
  )
}

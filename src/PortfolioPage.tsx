import { useState } from "react"

const DATA = {
  name: "Abdullah Al Zubaidi",
  headline: "Biological Sciences Student",
  value: "I design and test simple tools that turn data into decisions in my free time",
  email: "abdullaaqeelalzubaidi@gmail.com",
  linkedin: "https://www.linkedin.com/in/abdulla-al-zubaidi-732852298/",
  discord: "revidents",
  instagram: "https://instagram.com/3qee.l",
  university: "University of Calgary",
  graduation: "Expected 2029",
  focus: "Biological Sciences",
  contactEndpoint: "https://formspree.io/f/xzzaplrj",
  about: {
    bio: `I’m a biomedical student focused on Bioinformatics. I like clear problems, clean data, and simple tools that help decisions. I enjoy working with small teams and shipping.`,
    photo: "https://i.imgur.com/uNks6y0.png",
    facts: ["STEM Council founder", "NSERC USRA recipient", "Volunteer EMT"],
    timeline: [
      { date: "2025–2029", label: "BSc, University of Calgary" },
      { date: "Summer 2025", label: "Research Assistant, Lab XYZ" },
      { date: "2024", label: "Intern, HealthTech Co." },
    ],
  },
}

// utils
const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ")

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: "smooth", block: "start" })
}

// components
function AnimatedBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-blue-300/20 dark:bg-blue-300/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-teal-300/20 dark:bg-teal-300/10 blur-3xl" />
    </div>
  )
}

function SlimeBlob({ text, tone }: { text: string; tone: "blue" | "teal" }) {
  const base = tone === "blue" ? "bg-blue-300 dark:bg-blue-800" : "bg-teal-300 dark:bg-teal-800"
  const eyeColor = tone === "blue" ? "bg-blue-900 dark:bg-blue-100" : "bg-teal-900 dark:bg-teal-100"
  return (
    <div className={cx(
      "group relative flex h-48 w-64 items-center justify-center slime-shape shadow-lg transition-transform duration-200 ease-out slime-bob",
      base
    )}>
      {/* Eyes — solid color, blink on hover */}
      <div className="absolute inset-0 flex items-center justify-center gap-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className={cx("eye", eyeColor)} />
        <div className={cx("eye", eyeColor)} />
      </div>
      {/* Text */}
      <p className="font-semibold text-center text-zinc-900 transition-opacity duration-300 group-hover:opacity-0">{text}</p>
    </div>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-xl font-semibold text-center">{title}</h2>
        <div className="mt-6 flex items-center justify-center">{children}</div>
      </div>
    </section>
  )
}

const NAV_IDS = ["home", "projects", "skills", "about", "contact"] as const

function Header({ onNav }: { onNav: (id: string) => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <button type="button" onClick={() => onNav("home")} className="flex items-center gap-2 font-semibold">
          <img
            src={DATA.about.photo}
            alt="profile"
            className="h-6 w-6 rounded-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/profile.png" }}
          />
          <span>Student</span>
        </button>
        <nav className="hidden gap-6 text-sm sm:flex">
          {NAV_IDS.map((id) => (
            <button key={id} type="button" onClick={() => onNav(id)} className="px-2 py-1">
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default function PortfolioPage() {
  const year = new Date().getFullYear()
  const [copied, setCopied] = useState(false)

  const copyDiscord = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(DATA.discord)
      } else {
        const ta = document.createElement('textarea')
        ta.value = DATA.discord
        ta.style.position = 'fixed'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.focus(); ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
      <Header onNav={(id) => scrollToId(id)} />

      {/* Hero */}
      <section id="home" className="relative isolate overflow-hidden pt-10 sm:pt-16">
        <AnimatedBackdrop />
        <div className="mx-auto max-w-6xl px-4 pb-14 sm:pb-20 text-center">
          <img
            src={DATA.about.photo}
            alt="profile large"
            referrerPolicy="no-referrer"
            className="mx-auto mb-6 h-40 w-40 rounded-full object-cover ring-2 ring-blue-500/30 dark:ring-blue-400/20 shadow"
            loading="lazy"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/profile.png" }}
          />
          <p className="text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">Biomedical student — {DATA.focus}</p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl">{DATA.headline}</h1>
          <p className="mt-3 max-w-prose mx-auto text-sm text-zinc-700 dark:text-zinc-300">{DATA.value}</p>
          <div className="mt-6 text-xs text-zinc-600 dark:text-zinc-400">
            {DATA.university} • {DATA.graduation}
          </div>
        </div>
      </section>

      {/* Projects slime blob */}
      <Section id="projects" title="Projects">
        <SlimeBlob text="Work in progress — just in my first year lmao" tone="blue" />
      </Section>

      {/* Skills slime blob */}
      <Section id="skills" title="Skills">
        <SlimeBlob text="Work in progress — just in my first year lmao" tone="teal" />
      </Section>

      {/* About */}
      <Section id="about" title="About">
        <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-[auto,1fr]">
          <img src={DATA.about.photo} alt={`${DATA.name} portrait`} className="h-28 w-28 rounded-full object-cover" loading="lazy" referrerPolicy="no-referrer" onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/profile.png" }} />
          <div>
            <p className="max-w-prose text-sm text-zinc-700 dark:text-zinc-300">{DATA.about.bio}</p>
            <ul className="mt-3 grid list-disc grid-cols-1 gap-1 pl-5 text-sm sm:grid-cols-2">
              {DATA.about.facts.map((f) => (<li key={f}>{f}</li>))}
            </ul>
            <div className="mt-6">
              <h3 className="text-sm font-semibold">Timeline</h3>
              <ol className="mt-2 space-y-2 text-sm">
                {DATA.about.timeline.map((t) => (
                  <li key={t.date} className="flex gap-3">
                    <span className="min-w-[6rem] text-zinc-500 dark:text-zinc-400">{t.date}</span>
                    <span>{t.label}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact">
        <div className="text-center">
          <p className="text-sm">Email: <a href={`mailto:${DATA.email}`} className="underline">{DATA.email}</a></p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm">
            <a className="underline" href={DATA.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <span className="cursor-pointer underline hover:text-blue-600" onClick={copyDiscord}>
              Discord: {DATA.discord} {copied ? "(copied)" : "(copy)"}
            </span>
            <a className="underline" href={DATA.instagram} target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
      </Section>

      <footer className="border-t border-zinc-200 py-8 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <div className="mx-auto max-w-6xl px-4">
          <p>© {year} {DATA.name}. Last updated {new Date().toISOString().slice(0, 10)}</p>
        </div>
      </footer>

      {/* Slime blob idle bob + eyes blink */}
      <style>{`
        @keyframes bob { 0%{transform:translateY(0)} 50%{transform:translateY(-6px)} 100%{transform:translateY(0)} }
        .slime-bob { animation: bob 6s ease-in-out infinite; }
        .slime-shape { border-radius: 60% 40% 65% 35% / 55% 45% 60% 40%; }

        .eye { height: 1.2rem; width: 0.85rem; border-radius: 50%; transform-origin: center; will-change: transform; }
        /* Blink: immediate once, then slow repeat */
        .group:hover .eye {
          animation: blink 0.25s 1, blink-slow 1.2s infinite 1s;
        }

        @keyframes blink { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(0.05); } }
        @keyframes blink-slow { 0%,90%,100% { transform: scaleY(1); } 95% { transform: scaleY(0.05); } }

        @media (prefers-reduced-motion: reduce){ .slime-bob, .eye { animation: none; } }
      `}</style>
    </div>
  )
}

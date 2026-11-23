import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  ChevronDown,
  Cloud,
  Code2,
  CreditCard,
  Database,
  Eye,
  Globe,
  LayoutGrid,
  Link2,
  Lock,
  Menu,
  MessageSquare,
  Mic,
  Monitor,
  Plus,
  RefreshCw,
  Rocket,
  Search,
  Share,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Users,
  X,
  Zap,
} from "lucide-react";

const NAV = [
  { label: "Solutions", items: ["For startups", "For enterprise", "For agencies", "For product teams"] },
  { label: "Resources", items: ["Blog", "Docs", "Guides", "Changelog"] },
];

const FEATURES = [
  { icon: MessageSquare, title: "Describe it in plain language", body: "Tell Lovable what you want. It plans, designs and writes production-grade code as you watch." },
  { icon: LayoutGrid, title: "Refine every detail", body: "Select any element and ask for a change. Typography, layout and interactions update live." },
  { icon: Database, title: "Real data, built in", body: "Connect Supabase for auth, Postgres and storage without leaving the conversation." },
  { icon: Globe, title: "Ship to a real domain", body: "Publish with one click, add a custom domain and get SSL automatically." },
  { icon: Code2, title: "Own the code", body: "Sync to GitHub any time. Standard React and Tailwind — no lock-in." },
  { icon: Shield, title: "Secure by default", body: "SOC 2 Type II, SSO and granular workspace permissions for teams." },
];

const BUILDS = [
  "Understanding your idea",
  "Planning the pages",
  "Writing React components",
  "Applying the design system",
  "Connecting the data model",
];

const BEYOND = [
  {
    title: "Hosting, handled",
    body: "Lovable handles hosting, SSL, and backend infrastructure. Your code and data stay yours, always.",
  },
  {
    title: "Your app stack, connected",
    body: "Auth, Postgres, storage, and server functions arrive wired together — no service to provision yourself.",
  },
  {
    title: "Payments, processed",
    body: "Stripe-backed checkout, subscriptions, and a customer portal, ready for the first real transaction.",
  },
  {
    title: "Safe and secure, as standard",
    body: "Row-level permissions, encrypted secrets, and a security review before anything reaches production.",
  },
  {
    title: "Works wherever, whenever",
    body: "Every project deploys to a global edge network, with a custom domain and preview URLs for every branch.",
  },
];

const STACK = ["Analytics", "Payments", "Auth", "Storage", "Functions", "Email", "Search", "Queues"];

function Mark({ size = 26 }: { size?: number }) {
  return <img src="/lovable-mark.png" width={size} height={size} alt="" aria-hidden className="lv-mark" />;
}

function MiniSite() {
  return (
    <div className="lv-mini">
      <nav>
        <b>Hush</b>
        <div><span>How it works</span><span>Pricing</span><span>Journal</span></div>
        <i>Start free</i>
      </nav>
      <div className="lv-mini-hero">
        <span className="lv-mini-pill">A CALMER WEEK</span>
        <h1>Make room for<br />what matters.</h1>
        <p>Hush turns your scattered to-dos into a gentle, realistic plan — so you can finish the day with energy left.</p>
        <div className="lv-mini-btns"><i>Plan my week</i><span>See a demo</span></div>
        <div className="lv-mini-visual">
          <div className="lv-mini-card">
            <div className="lv-mini-card-top"><span>This week</span><b>8.5h focused</b></div>
            <div className="lv-mini-days">
              {[42, 68, 55, 82, 48, 26, 12].map((h, i) => (
                <div key={i}><i style={{ height: `${h}%` }} /><span>{["M", "T", "W", "T", "F", "S", "S"][i]}</span></div>
              ))}
            </div>
          </div>
          <div className="lv-mini-float">
            <span className="lv-mini-check"><Check size={10} /></span>
            <div><b>Deep work</b><span>9:00 – 11:00</span></div>
          </div>
        </div>
      </div>
      <div className="lv-mini-logos"><span>Northwind</span><span>Arc</span><span>Fieldnote</span><span>Basecamp</span><span>Miro</span></div>
    </div>
  );
}

type ChatMessage = { role: "user" | "assistant"; text: string };

function Workspace({ prompt, onBack }: { prompt: string; onBack: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "user", text: prompt },
  ]);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [value, setValue] = useState("");
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [toast, setToast] = useState<string | null>(null);
  const [publish, setPublish] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers = BUILDS.map((_, i) => window.setTimeout(() => setStep(i + 1), 620 * (i + 1)));
    timers.push(
      window.setTimeout(() => {
        setDone(true);
        setMessages((m) => [
          ...m,
          {
            role: "assistant" as const,
            text: "Your site is ready. I built a warm, editorial landing page with a working waitlist form, a pricing section and responsive layouts. Want me to add a blog or connect a database next?",
          },
        ]);
      }, 620 * BUILDS.length + 600),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, done]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2300);
    return () => window.clearTimeout(t);
  }, [toast]);

  function send() {
    if (!value.trim()) return;
    const text = value.trim();
    setValue("");
    setMessages((m) => [...m, { role: "user", text }]);
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "Done — I updated the preview and kept everything responsive. The new section is live in the canvas. Anything else you'd like to refine?" },
      ]);
    }, 1200);
  }

  return (
    <div className="lv-ws">
      <header className="lv-ws-top">
        <button className="lv-ws-back" onClick={onBack} aria-label="Back to home"><ArrowLeft size={15} /></button>
        <button className="lv-ws-brand" onClick={onBack}><Mark size={19} /> <span>Lovable</span></button>
        <span className="lv-ws-sep" />
        <button className="lv-ws-project">hush-site <ChevronDown size={11} /></button>
        <span className="lv-ws-status"><i /> {done ? "Published" : "Building"}</span>
        <div className="lv-ws-actions">
          <button className="lv-ws-ghost" onClick={() => setToast("Share link copied")}><Share size={13} /> Share</button>
          <button className="lv-ws-ghost" onClick={() => setToast("Connected to GitHub — demo only")}><Code2 size={13} /> GitHub</button>
          <button className="lv-ws-publish" onClick={() => setPublish(true)}><Rocket size={13} /> Publish</button>
        </div>
      </header>

      <div className="lv-ws-body">
        <aside className="lv-ws-chat">
          <div className="lv-ws-scroll" ref={scroller}>
            {messages.map((m, i) => (
              <div key={i} className={`lv-ws-msg ${m.role}`}>
                {m.role === "assistant" && <span className="lv-ws-ai"><Mark size={15} /></span>}
                <div className="lv-ws-bubble">{m.text}</div>
              </div>
            ))}
            {!done && (
              <div className="lv-ws-build">
                <div className="lv-ws-build-head"><span className="lv-ws-spin" /> Building your app <span>~30s</span></div>
                {BUILDS.map((b, i) => (
                  <div key={b} className={i < step ? "done" : i === step ? "active" : ""}>
                    <span>{i < step ? <Check size={9} /> : i === step ? <i /> : null}</span>{b}
                  </div>
                ))}
              </div>
            )}
            {done && (
              <div className="lv-ws-done">
                <div><Check size={13} /> Site generated</div>
                <span>9 files · 4 sections · responsive</span>
              </div>
            )}
          </div>
          <div className="lv-ws-composer">
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              rows={2}
              placeholder="Ask Lovable to change something…"
            />
            <div className="lv-ws-tools">
              <button aria-label="Attach"><Plus size={15} /></button>
              <span><Sparkles size={11} /> Build</span>
              <button className="lv-ws-send" onClick={send} disabled={!value.trim()} aria-label="Send"><ArrowUp size={14} /></button>
            </div>
          </div>
        </aside>

        <main className="lv-ws-canvas">
          <div className="lv-ws-bar">
            <div className="lv-ws-tabs">
              <button className={tab === "preview" ? "on" : ""} onClick={() => setTab("preview")}><Eye size={12} /> Preview</button>
              <button className={tab === "code" ? "on" : ""} onClick={() => setTab("code")}><Code2 size={12} /> Code</button>
            </div>
            <div className="lv-ws-url"><Lock size={9} /> hush.lovable.app</div>
            <div className="lv-ws-devices">
              <button className={device === "desktop" ? "on" : ""} onClick={() => setDevice("desktop")} aria-label="Desktop"><Monitor size={13} /></button>
              <button className={device === "mobile" ? "on" : ""} onClick={() => setDevice("mobile")} aria-label="Mobile"><Smartphone size={13} /></button>
              <button onClick={() => setToast("Refreshing preview")} aria-label="Refresh"><RefreshCw size={12} /></button>
            </div>
          </div>
          {tab === "preview" ? (
            <div className="lv-ws-preview">
              <div className={`lv-ws-frame ${device}`}>
                <MiniSite />
              </div>
            </div>
          ) : (
            <pre className="lv-ws-code"><code>{`export default function App() {
  return (
    <main className="min-h-screen bg-[#faf7f2] text-[#211f1c]">
      <Nav />
      <Hero
        eyebrow="A calmer week"
        title="Make room for what matters."
        cta="Plan my week"
      />
      <WeekPreview />
      <Logos />
      <Pricing />
      <Footer />
    </main>
  );
}`}</code></pre>
          )}
        </main>
      </div>

      <AnimatePresence>
        {publish && (
          <motion.div className="lv-ws-modal-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPublish(false)}>
            <motion.div className="lv-ws-modal" initial={{ y: 14, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 10 }} onClick={(e) => e.stopPropagation()}>
              <span className="lv-ws-modal-icon"><Rocket size={18} /></span>
              <h3>Your site is live</h3>
              <p>hush.lovable.app has been published to production with SSL enabled.</p>
              <div className="lv-ws-urlbox"><Lock size={10} /> https://hush.lovable.app</div>
              <button className="lv-ws-publish" onClick={() => setPublish(false)}>Done</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div className="lv-toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
            <Check size={14} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<"home" | "workspace">("home");
  const [prompt, setPrompt] = useState("");
  const [sent, setSent] = useState("");
  const [cookies, setCookies] = useState(() => !localStorage.getItem("lv-cookie"));
  const [menu, setMenu] = useState(false);
  const [openNav, setOpenNav] = useState<string | null>(null);
  const [beyond, setBeyond] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2300);
    return () => window.clearTimeout(t);
  }, [toast]);

  function build() {
    if (!prompt.trim()) return;
    setSent(prompt.trim());
    setPrompt("");
    setView("workspace");
  }

  function decideCookies() {
    localStorage.setItem("lv-cookie", "1");
    setCookies(false);
  }

  if (view === "workspace") {
    return <Workspace prompt={sent} onBack={() => setView("home")} />;
  }

  return (
    <div className="lv">
      <header className="lv-header">
        <button className="lv-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <Mark size={19} /> <span>Lovable</span>
        </button>
        <nav className="lv-nav">
          {NAV.map((n) => (
            <div key={n.label} className="lv-nav-item">
              <button onClick={() => setOpenNav(openNav === n.label ? null : n.label)}>
                {n.label} <ChevronDown size={12} />
              </button>
              {openNav === n.label && (
                <div className="lv-dropdown">
                  {n.items.map((i) => <a key={i} href="#features" onClick={() => setOpenNav(null)}>{i}</a>)}
                </div>
              )}
            </div>
          ))}
          {[
            ["Community", "#proof"],
            ["Enterprise", "#enterprise"],
            ["Pricing", "#pricing"],
            ["Security", "#enterprise"],
          ].map(([label, href]) => (
            <a key={label} href={href}>{label}</a>
          ))}
        </nav>
        <div className="lv-header-actions">
          <button className="lv-login" onClick={() => setView("workspace")}>Log in</button>
          <button className="lv-getstarted" onClick={() => document.getElementById("lv-ask")?.focus()}>Get started</button>
          <button className="lv-menu-btn" onClick={() => setMenu(!menu)} aria-label="Menu">
            {menu ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {menu && (
          <div className="lv-mobile-menu">
            {[
              ["Solutions", "#features"],
              ["Resources", "#features"],
              ["Community", "#proof"],
              ["Enterprise", "#enterprise"],
              ["Pricing", "#pricing"],
              ["Security", "#enterprise"],
            ].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenu(false)}>{label}</a>
            ))}
            <button className="lv-getstarted" onClick={() => { setMenu(false); document.getElementById("lv-ask")?.focus(); }}>Get started</button>
          </div>
        )}
      </header>

      <main>
        <section className="lv-hero">
          <div className="lv-hero-glow" aria-hidden />
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            Build something Lovable
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.07 }}>
            Bring a new product, internal tool, or entire company to life.
          </motion.p>

          <motion.div
            className="lv-composer"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <textarea
              id="lv-ask"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); build(); } }}
              rows={1}
              placeholder="Ask"
            />
            <div className="lv-composer-foot">
              <button className="lv-plus" aria-label="Attach"><Plus size={18} /></button>
              <div className="lv-composer-right">
                <button className="lv-buildmode">Build <ChevronDown size={12} /></button>
                <button className="lv-mic" aria-label="Voice"><Mic size={17} /></button>
                {prompt.trim() && (
                  <button className="lv-send" onClick={build} aria-label="Send"><ArrowUp size={16} /></button>
                )}
              </div>
            </div>
          </motion.div>

          <div className="lv-pastel" aria-hidden>
            <span className="p6" /><span className="p1" /><span className="p2" /><span className="p3" /><span className="p4" /><span className="p5" />
          </div>
        </section>

        <section className="lv-platform" id="features">
          <div className="lv-platform-head">
            <h2>One platform. Endless possibilities.</h2>
            <p>If you can describe it, you can build it. Create, run, and manage entire products and businesses from scratch.</p>
          </div>

          <div className="lv-cards">
            <article className="lv-card">
              <div className="lv-card-art art-create">
                <div className="lv-art-composer">
                  <span className="lv-art-caret" />
                  <p>Create an online store…</p>
                </div>
                <div className="lv-art-glow" />
              </div>
              <h3>You bring the idea. Lovable brings it to life.</h3>
              <p>Describe what you want in plain language. Watch as Lovable builds production-grade software with you in real time.</p>
            </article>

            <article className="lv-card">
              <div className="lv-card-art art-refine">
                <div className="lv-art-browser">
                  <div className="lv-art-browser-top"><span>◎ Preview</span><i /><i /><i /></div>
                  <div className="lv-art-select">
                    <b>Bug tracking for teams<br />that ship fast</b>
                    <span className="lv-art-tag">H1</span>
                  </div>
                  <p>Purpose-built for engineering teams. Triage, track and resolve issues without slowing down.</p>
                  <span className="lv-art-btn">Get started for free</span>
                  <span className="lv-art-cursor">▲</span>
                </div>
              </div>
              <h3>Refine your design and deploy</h3>
              <p>Iterate on your creation until you&apos;re happy with the finished product. Then ship your idea and start using it immediately.</p>
            </article>

            <article className="lv-card">
              <div className="lv-card-art art-infra">
                <div className="lv-art-side">
                  {[
                    { icon: Zap, l: "Analytics" },
                    { icon: Globe, l: "Cloud" },
                    { icon: Users, l: "Connectors" },
                    { icon: Shield, l: "Security" },
                    { icon: Sparkles, l: "Agent integrations" },
                    { icon: CreditCard, l: "Payments" },
                    { icon: Search, l: "SEO & AI search" },
                  ].map((x, i) => (
                    <div key={x.l} className={i === 1 ? "on" : ""}><x.icon size={13} /> {x.l}</div>
                  ))}
                </div>
                <div className="lv-art-panel">
                  <span /><span /><span /><span />
                </div>
              </div>
              <h3>Depend on Lovable, from end to end</h3>
              <p>Lovable handles your end-to-end infrastructure — from hosting and authentication to integrations.</p>
            </article>
          </div>
        </section>

        <section className="lv-beyond" id="infrastructure">
          <div className="lv-beyond-inner">
            <div className="lv-beyond-copy">
              <h2>For building<br />and beyond</h2>
              <p>Lovable runs on enterprise-grade infrastructure — so you can create full-stack software that scales.</p>
              <div className="lv-beyond-list">
                {BEYOND.map((item, i) => (
                  <div key={item.title} className={`lv-beyond-item ${beyond === i ? "open" : ""}`}>
                    <button onClick={() => setBeyond(i)} aria-expanded={beyond === i}>
                      <span>{item.title}</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {beyond === i && (
                        <motion.div
                          className="lv-beyond-body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                        >
                          <p>{item.body}</p>
                          <span className="lv-beyond-line" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            <div className="lv-beyond-right">
              <div className="lv-beyond-visual">
                <span className="lv-orbit-card c1" aria-hidden />
                <span className="lv-orbit-card c2" aria-hidden />
                <span className="lv-orbit-card c3" aria-hidden />
                <span className="lv-orbit-card c4" aria-hidden />
                <span className="lv-orbit-card c5" aria-hidden />

                <div className="lv-orbit-browser">
                  <div className="lv-orbit-frame">
                    <div className="lv-orbit-bar">
                      <span className="lv-orbit-dot" />
                      <span className="lv-orbit-dot" />
                      <span className="lv-orbit-dot" />
                      <span className="lv-orbit-url"><Lock size={8} /> orbit.lovable.app</span>
                      <span className="lv-orbit-dot" />
                      <span className="lv-orbit-dot" />
                    </div>
                    <div className="lv-orbit-canvas">
                      <span className="lv-orbit-wire" aria-hidden />
                      <span className="lv-orbit-node n1"><Users size={17} /></span>
                      <span className="lv-orbit-node n2"><Cloud size={17} /></span>
                      <span className="lv-orbit-node n3"><Link2 size={17} /></span>
                    </div>
                  </div>
                </div>

                <span className="lv-orbit-side side-l" aria-hidden><Lock size={15} /></span>
                <span className="lv-orbit-side side-r" aria-hidden><Database size={15} /></span>
              </div>

              <div className="lv-integrations">
                <p>Connect the tools your team already uses</p>
                <div className="lv-integrations-grid">
                  {STACK.map((name, i) => {
                    const Icon = [Zap, CreditCard, Lock, Database, Code2, MessageSquare, Search, RefreshCw][i];
                    return (
                      <div key={name} className="lv-integration">
                        <span><Icon size={16} /></span>
                        {name}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lv-proof">
          <div className="lv-proof-copy">
            <span className="lv-eyebrow">Loved by builders</span>
            <h2>From first prompt<br />to real business.</h2>
            <p>Over 8 million people have used Lovable to turn an idea into software they actually ship.</p>
            <div className="lv-proof-stats">
              {[["8M+", "builders"], ["100M+", "projects created"], ["4.9/5", "average rating"]].map(([n, l]) => (
                <div key={l}><b>{n}</b><span>{l}</span></div>
              ))}
            </div>
          </div>
          <div className="lv-quote-card">
            <div className="lv-quote-stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
            <blockquote>“I described the product on a Monday and launched the paid version on Friday. It would have taken a team of three a quarter.”</blockquote>
            <div className="lv-quote-author"><span>MK</span><div><b>Maya Kim</b><i>Founder, Fieldnote</i></div></div>
          </div>
        </section>

        <section className="lv-features">
          <div className="lv-features-head">
            <span className="lv-eyebrow">Everything included</span>
            <h2>What used to take a team<br />now takes a conversation.</h2>
          </div>
          <div className="lv-feature-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="lv-feature">
                <span><f.icon size={17} /></span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="lv-enterprise" id="enterprise">
          <div className="lv-enterprise-inner">
            <div>
              <span className="lv-eyebrow light">Lovable for teams</span>
              <h2>Build faster,<br />together.</h2>
              <p>Shared workspaces, design systems and review flows. Ship internal tools and customer products with the same ease.</p>
              <div className="lv-enterprise-points">
                {["Collaborate in real time", "Connect GitHub and Supabase", "SOC 2 Type II and SSO"].map((p) => (
                  <span key={p}><Check size={12} /> {p}</span>
                ))}
              </div>
              <button className="lv-enterprise-btn" onClick={() => setToast("Sales contact — demo only")}>Talk to sales <ArrowRight size={14} /></button>
            </div>
            <div className="lv-enterprise-visual">
              <div className="lv-team-row"><span>AM</span><span>JK</span><span>SR</span><span>+6</span><i>Editing now</i></div>
              <div className="lv-team-canvas">
                <div className="lv-team-block"><b>Hero</b><span /><span /><i /></div>
                <div className="lv-team-block"><b>Features</b><span /><span /><i /></div>
                <div className="lv-team-block"><b>Pricing</b><span /><span /><i /></div>
              </div>
              <div className="lv-team-comment"><span>JK</span> Can we try the warmer palette here?</div>
            </div>
          </div>
        </section>

        <section className="lv-pricing" id="pricing">
          <span className="lv-eyebrow">Simple pricing</span>
          <h2>Start free. Scale when you&apos;re ready.</h2>
          <div className="lv-plans">
            {[
              { name: "Free", price: "$0", note: "For trying ideas", features: ["5 messages / day", "Public projects", "Lovable subdomain"], cta: "Start building" },
              { name: "Pro", price: "$25", note: "per month", features: ["100 messages / day", "Private projects", "Custom domains", "GitHub sync"], cta: "Get started", featured: true },
              { name: "Business", price: "$50", note: "per seat / month", features: ["Unlimited messages", "SSO and roles", "Design systems", "Priority support"], cta: "Talk to sales" },
            ].map((p) => (
              <div key={p.name} className={`lv-plan ${p.featured ? "featured" : ""}`}>
                {p.featured && <span className="lv-plan-badge">Most popular</span>}
                <h3>{p.name}</h3>
                <div className="lv-plan-price"><b>{p.price}</b><span>{p.note}</span></div>
                <ul>{p.features.map((f) => <li key={f}><Check size={12} /> {f}</li>)}</ul>
                <button className={p.featured ? "lv-getstarted" : "lv-login"} onClick={() => setView("workspace")}>{p.cta}</button>
              </div>
            ))}
          </div>
        </section>

        <section className="lv-cta">
          <Mark size={34} />
          <h2>Build something Lovable</h2>
          <p>Bring a new product, internal tool, or entire company to life.</p>
          <button className="lv-getstarted big" onClick={() => document.getElementById("lv-ask")?.focus()}>Start building <ArrowRight size={14} /></button>
        </section>
      </main>

      <footer className="lv-footer">
        <div className="lv-footer-brand">
          <div className="lv-brand"><Mark size={21} /> <span>Lovable</span></div>
          <p>Build software by talking to it.</p>
          <span>© 2026 Lovable AB</span>
        </div>
        {[
          { h: "Product", l: ["Home", "Pricing", "Enterprise", "Security", "Changelog"] },
          { h: "Resources", l: ["Docs", "Guides", "Blog", "Community", "Templates"] },
          { h: "Company", l: ["About", "Careers", "Press", "Contact", "Partners"] },
          { h: "Legal", l: ["Privacy", "Terms", "DPA", "Subprocessors", "Cookie settings"] },
        ].map((c) => (
          <div key={c.h} className="lv-footer-col">
            <p>{c.h}</p>
            {c.l.map((x) => <a key={x} href="#footer">{x}</a>)}
          </div>
        ))}
      </footer>

      <AnimatePresence>
        {cookies && (
          <motion.div className="lv-cookie" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}>
            <p>We use cookies to enhance your development experience and keep your data secure. <a href="#privacy">Privacy Policy</a></p>
            <button className="lv-cookie-accept" onClick={decideCookies}>Accept all</button>
            <button className="lv-cookie-text" onClick={decideCookies}>Manage preferences</button>
            <button className="lv-cookie-text" onClick={decideCookies}>Reject all</button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div className="lv-toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
            <Check size={14} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

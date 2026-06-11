import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Umsebenzi Owakho — The Job Is Yours" },
      {
        name: "description",
        content:
          "South Africa's flagship AI career platform. Build ATS-friendly CVs, simulate interviews, and track every application with the confidence of an expert recruiter.",
      },
      { property: "og:title", content: "Umsebenzi Owakho — The Job Is Yours" },
      {
        property: "og:description",
        content:
          "South Africa's flagship AI career platform. Build ATS-friendly CVs, simulate interviews, and track every application with the confidence of an expert recruiter.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-dvh font-body text-foreground bg-background">
      <SiteNav />
      <Hero />
      <StatsBar />
      <FeatureBento />
      <Journey />
      <Testimonials />
      <CTASection />
      <SiteFooter />
    </div>
  );
}

function SiteNav() {
  const links = [
    { label: "Features", href: "#features" },
    { label: "CV Coach", href: "#features" },
    { label: "Recruiters", href: "#recruiters" },
    { label: "Pricing", href: "#pricing" },
  ];
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold font-display">
            U
          </div>
          <span className="font-display font-extrabold tracking-tight text-xl text-primary">
            Umsebenzi
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/70">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">
            Sign In
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-accent/10 via-transparent to-transparent -z-10" />
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold mb-8 animate-fade-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
          </span>
          NOW LIVE ACROSS SOUTH AFRICA
        </div>
        <h1
          className="text-5xl md:text-7xl font-display font-extrabold tracking-tighter text-balance leading-[0.9] mb-6 animate-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          The Job Is Yours.
          <br />
          <span className="text-primary/40 italic">uMsebenzi Owakho.</span>
        </h1>
        <p
          className="max-w-2xl mx-auto text-lg text-foreground/60 text-pretty mb-10 animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          The flagship AI career platform built for the South African market. Create
          ATS-friendly CVs, simulate interviews, and track applications with the confidence
          of an expert recruiter.
        </p>
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          <button className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
            Start My Journey
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-card border border-border text-foreground font-bold rounded-xl text-lg hover:bg-muted transition-colors">
            Try CV Analyzer
          </button>
        </div>

        <DashboardPreview />
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <div
      className="mt-20 relative animate-fade-up"
      style={{ animationDelay: "500ms" }}
    >
      <div className="relative bg-card rounded-2xl shadow-2xl border border-border p-4 max-w-5xl mx-auto overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5 pointer-events-none" />
        <div className="relative bg-card rounded-xl border border-border shadow-inner min-h-[400px] grid grid-cols-12 gap-4 p-6 text-left">
          <aside className="hidden md:block col-span-3 border-r border-border pr-6">
            <div className="h-4 w-24 bg-muted rounded mb-6" />
            <div className="space-y-3">
              <div className="h-9 w-full bg-primary/5 rounded-lg border-l-4 border-primary flex items-center px-3 text-xs font-semibold text-primary">
                Dashboard
              </div>
              <div className="h-9 w-full bg-muted/50 rounded-lg flex items-center px-3 text-xs text-foreground/50">
                CV Builder
              </div>
              <div className="h-9 w-full bg-muted/50 rounded-lg flex items-center px-3 text-xs text-foreground/50">
                Interview Coach
              </div>
              <div className="h-9 w-full bg-muted/50 rounded-lg flex items-center px-3 text-xs text-foreground/50">
                Applications
              </div>
              <div className="h-9 w-full bg-muted/50 rounded-lg flex items-center px-3 text-xs text-foreground/50">
                Learning Hub
              </div>
            </div>
          </aside>
          <main className="col-span-12 md:col-span-9">
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-1">
                <h3 className="text-xl font-display font-bold">Career Health</h3>
                <p className="text-xs text-foreground/40 font-mono uppercase tracking-wider">
                  Last updated: 12:04 SAST
                </p>
              </div>
              <div className="size-16 rounded-full border-4 border-secondary border-t-transparent flex items-center justify-center text-secondary font-display font-bold animate-spin [animation-duration:8s]">
                84%
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-32 rounded-xl bg-muted/50 border border-border p-4">
                <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-wider">
                  ATS Optimization
                </span>
                <div className="mt-3 flex items-end justify-between">
                  <span className="text-2xl font-display font-bold text-secondary">75%</span>
                  <span className="text-xs text-secondary">+12% this week</span>
                </div>
                <div className="mt-3 h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-secondary rounded-full" />
                </div>
              </div>
              <div className="h-32 rounded-xl bg-muted/50 border border-border p-4">
                <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-wider">
                  Interview Readiness
                </span>
                <div className="mt-3 flex items-end gap-1 h-14">
                  {[8, 12, 6, 10, 14, 9, 16].map((h, i) => (
                    <div
                      key={i}
                      className="w-3 bg-primary rounded-full"
                      style={{ height: `${h * 4}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
        <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50 blur-sm animate-scan" />
      </div>
    </div>
  );
}

function StatsBar() {
  const stats = [
    { value: "12k+", label: "Applications Sent" },
    { value: "84%", label: "Interview Rate" },
    { value: "R4.2M", label: "Salary Gained" },
    { value: "4.9/5", label: "User Rating" },
  ];
  return (
    <section className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-3xl md:text-4xl font-display font-extrabold">{s.value}</div>
            <div className="text-xs uppercase tracking-widest text-primary-foreground/60 mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureBento() {
  return (
    <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="max-w-2xl mb-16">
        <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-4">
          What you get
        </p>
        <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-balance">
          A complete career toolkit, built for Mzansi.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BentoCard
          className="md:col-span-2 row-span-2"
          eyebrow="AI"
          eyebrowStyle="accent"
          title="Z83 Support & Public Sector"
          body="Specifically built for South African government applications. Our AI handles complex selection criteria and Z83 formatting instantly — no more form-filling guesswork."
        >
          <div className="mt-8 rounded-xl border border-border bg-muted/40 p-5 font-mono text-xs space-y-2">
            <div className="flex items-center gap-2 text-foreground/40">
              <span className="size-2 rounded-full bg-secondary" />
              Z83_2024.pdf
            </div>
            <div className="h-2 w-3/4 bg-muted rounded" />
            <div className="h-2 w-1/2 bg-muted rounded" />
            <div className="h-2 w-5/6 bg-muted rounded" />
            <div className="flex gap-2 pt-2">
              <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px]">
                ✓ Section A
              </span>
              <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px]">
                ✓ Section B
              </span>
              <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px]">
                ⟳ Section C
              </span>
            </div>
          </div>
        </BentoCard>

        <BentoCard
          eyebrow="✓"
          eyebrowStyle="secondary"
          title="CV Scoring"
          body="Instant feedback based on PNet, Careers24 and LinkedIn recruiter algorithms."
        />

        <BentoCard
          eyebrow="◐"
          eyebrowStyle="accent"
          title="Interview Coach"
          body="Practice with a real-time AI voice mentor. Get scored on tone, pace, and STAR responses."
        />

        <BentoCard
          eyebrow="✦"
          eyebrowStyle="secondary"
          title="Smart Tailoring"
          body="Paste any advert — your CV is rewritten for the role, language, and culture in seconds."
        />

        <BentoCard
          eyebrow="◆"
          eyebrowStyle="accent"
          title="Application Tracker"
          body="Kanban pipeline, recruiter notes, reminders, and analytics across every job you apply to."
        />
      </div>
    </section>
  );
}

function BentoCard({
  className = "",
  eyebrow,
  eyebrowStyle,
  title,
  body,
  children,
}: {
  className?: string;
  eyebrow: string;
  eyebrowStyle: "accent" | "secondary";
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  const eyebrowClasses =
    eyebrowStyle === "accent"
      ? "bg-accent/10 text-accent"
      : "bg-secondary/10 text-secondary";
  return (
    <div
      className={`bg-card rounded-3xl p-8 md:p-10 border border-border hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ${className}`}
    >
      <div
        className={`size-12 ${eyebrowClasses} rounded-xl mb-6 flex items-center justify-center font-display font-bold text-lg`}
      >
        {eyebrow}
      </div>
      <h3 className="text-xl md:text-2xl font-display font-bold mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-foreground/60 leading-relaxed text-sm md:text-base">{body}</p>
      {children}
    </div>
  );
}

function Journey() {
  const steps = [
    {
      n: "01",
      title: "Sign up & assess",
      body: "AI career assessment maps your strengths, gaps and ambitions in under 5 minutes.",
    },
    {
      n: "02",
      title: "Build your CV",
      body: "Generate recruiter-approved, ATS-friendly versions tailored per role.",
    },
    {
      n: "03",
      title: "Apply with confidence",
      body: "Smart cover letters, tracked applications and recruiter visibility.",
    },
    {
      n: "04",
      title: "Land the offer",
      body: "Mock interviews, salary intelligence and negotiation coaching.",
    },
  ];
  return (
    <section className="border-y border-border bg-muted/30 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-4">
            From application to appointment
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-balance">
            Your career journey, on rails.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.n}
              className="bg-card rounded-2xl p-6 border border-border relative"
            >
              <div className="text-xs font-mono text-foreground/40 mb-4">{s.n}</div>
              <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      quote:
        "Within two weeks of using the CV tailor, I landed three interviews at top financial firms in Sandton. The AI feedback was spot on.",
      name: "Lerato Mokoena",
      role: "Senior Financial Analyst, Johannesburg",
    },
    {
      quote:
        "The interview prep module gave me the confidence I needed for my government panel interview. Worth every cent for graduates.",
      name: "Sipho Gumede",
      role: "Project Coordinator, Durban",
    },
    {
      quote:
        "I struggled with ATS filters for months. One-click optimization changed everything. The job is truly mine now.",
      name: "Sarah van Wyk",
      role: "Marketing Lead, Cape Town",
    },
  ];
  return (
    <section id="recruiters" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-4">
            Trusted across Mzansi
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-balance">
            Real South Africans. Real offers.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t) => (
            <figure
              key={t.name}
              className="bg-card rounded-3xl p-8 border border-border hover:border-primary/20 transition-colors flex flex-col"
            >
              <blockquote className="text-foreground/80 leading-relaxed mb-8 flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <div className="size-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-display font-bold text-sm">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-bold">{t.name}</div>
                  <div className="text-xs text-foreground/50">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="pricing" className="px-6 pb-32">
      <div className="max-w-5xl mx-auto bg-primary text-primary-foreground rounded-3xl p-12 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 size-96 bg-accent/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 size-72 bg-secondary/20 blur-3xl rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="relative">
          <p className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
            Free to start. POPIA compliant.
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-balance max-w-3xl mb-6">
            Your next role is one upload away.
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-xl mb-10">
            Join thousands of South Africans turning applications into appointments with
            the best AI career coach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-background text-primary font-bold rounded-xl text-lg hover:scale-[1.02] transition-transform">
              Get Started Free
            </button>
            <button className="px-8 py-4 bg-transparent border border-primary-foreground/20 text-primary-foreground font-bold rounded-xl text-lg hover:bg-primary-foreground/10 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  const cols = [
    {
      title: "Platform",
      links: ["AI CV Builder", "Interview Prep", "Job Matching", "Learning Hub"],
    },
    {
      title: "For",
      links: ["Job Seekers", "Graduates", "Recruiters", "Employers"],
    },
    {
      title: "Legal",
      links: ["POPIA Compliance", "Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
    {
      title: "Support",
      links: ["Help Centre", "Contact Us", "SA Labour Law", "Success Stories"],
    },
  ];
  return (
    <footer className="bg-card border-t border-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="size-7 bg-primary rounded-md flex items-center justify-center text-primary-foreground text-[11px] font-bold font-display">
                U
              </div>
              <span className="font-display font-extrabold tracking-tight text-primary text-lg">
                Umsebenzi Owakho
              </span>
            </div>
            <p className="text-sm text-foreground/50 max-w-xs leading-relaxed">
              Empowering job seekers across South Africa with intelligent, POPIA-compliant
              career technology.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-bold mb-5 text-sm">{c.title}</h4>
              <ul className="space-y-3 text-sm text-foreground/60">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-primary transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-foreground/40 font-mono uppercase tracking-wider">
            © 2026 Umsebenzi Owakho. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-foreground/40 font-mono uppercase tracking-wider">
            <span>Cape Town, ZA</span>
            <span>Johannesburg, ZA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

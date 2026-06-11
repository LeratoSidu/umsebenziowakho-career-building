import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";
import {
  Briefcase,
  Users,
  Building2,
  GraduationCap,
  School,
  Sparkles,
  Landmark,
  Loader2,
} from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in or create your account — Umsebenzi Owakho" },
      {
        name: "description",
        content:
          "Join Umsebenzi Owakho as a job seeker, recruiter, employer, training provider, university, career coach or government organisation.",
      },
    ],
  }),
  component: AuthPage,
});

type AccountKey =
  | "job_seeker"
  | "recruiter"
  | "employer"
  | "training_provider"
  | "university"
  | "career_coach"
  | "government_organisation";

const ACCOUNT_TYPES: {
  key: AccountKey;
  label: string;
  description: string;
  Icon: typeof Briefcase;
}[] = [
  { key: "job_seeker", label: "Job Seeker", description: "Find your next role with AI coaching.", Icon: Briefcase },
  { key: "recruiter", label: "Recruiter", description: "Source top candidates faster.", Icon: Users },
  { key: "employer", label: "Employer", description: "Post jobs and hire the right talent.", Icon: Building2 },
  { key: "training_provider", label: "Training Provider", description: "Offer courses and grow learners.", Icon: GraduationCap },
  { key: "university", label: "University", description: "Connect graduates with opportunities.", Icon: School },
  { key: "career_coach", label: "Career Coach", description: "Guide clients to career success.", Icon: Sparkles },
  { key: "government_organisation", label: "Government Organisation", description: "Drive employment programmes.", Icon: Landmark },
];

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [accountType, setAccountType] = useState<AccountKey>("job_seeker");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/dashboard" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        if (!fullName.trim()) {
          toast.error("Please enter your full name.");
          return;
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName.trim(), account_type: accountType },
          },
        });
        if (error) throw error;
        toast.success("Account created. Check your inbox to confirm your email.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    try {
      // Persist intended account type for first-time Google sign-ups
      localStorage.setItem("pending_account_type", accountType);
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error(result.error.message ?? "Google sign-in failed");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh font-body bg-background text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold font-display">
              U
            </div>
            <span className="font-display font-extrabold tracking-tight text-xl text-primary">
              Umsebenzi
            </span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back home
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-[1.1fr_1fr] gap-10">
        {/* Account type selector */}
        <section>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {mode === "signup"
              ? "Choose the role that best describes you. You can change this later."
              : "Sign in to continue your career journey."}
          </p>

          {mode === "signup" && (
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {ACCOUNT_TYPES.map(({ key, label, description, Icon }) => {
                const active = accountType === key;
                return (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setAccountType(key)}
                    aria-pressed={active}
                    className={`text-left rounded-2xl border p-4 transition-all ${
                      active
                        ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                        : "border-border hover:border-primary/40 hover:bg-muted/40"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`size-10 rounded-xl flex items-center justify-center ${
                          active
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground/70"
                        }`}
                      >
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <div className="font-display font-bold text-sm text-foreground">
                          {label}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* Form */}
        <section className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xl shadow-primary/5 h-fit lg:sticky lg:top-24">
          <div className="flex bg-muted rounded-full p-1 text-sm font-semibold mb-6">
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 rounded-full transition-all ${
                mode === "signup" ? "bg-background shadow text-primary" : "text-muted-foreground"
              }`}
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`flex-1 py-2 rounded-full transition-all ${
                mode === "signin" ? "bg-background shadow text-primary" : "text-muted-foreground"
              }`}
            >
              Sign in
            </button>
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 border border-border rounded-xl py-3 text-sm font-semibold hover:bg-muted/60 transition-colors disabled:opacity-50"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-5 text-xs text-muted-foreground">
            <div className="h-px bg-border flex-1" />
            or use email
            <div className="h-px bg-border flex-1" />
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  maxLength={100}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Thabo Mokoena"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="At least 8 characters"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl py-3 text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-60"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              {mode === "signup" ? "Create account" : "Sign in"}
            </button>
            <p className="text-[11px] text-muted-foreground text-center">
              By continuing you agree to our Terms and Privacy Policy.
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.32A9 9 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.04l3.01-2.32Z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .96 4.96L3.97 7.28C4.68 5.16 6.66 3.58 9 3.58Z" />
    </svg>
  );
}

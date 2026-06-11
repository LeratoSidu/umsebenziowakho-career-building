import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard — Umsebenzi Owakho" }],
  }),
  component: Dashboard,
});

const ACCOUNT_LABELS: Record<string, string> = {
  job_seeker: "Job Seeker",
  recruiter: "Recruiter",
  employer: "Employer",
  training_provider: "Training Provider",
  university: "University",
  career_coach: "Career Coach",
  government_organisation: "Government Organisation",
};

function Dashboard() {
  const navigate = useNavigate();
  const { user } = Route.useRouteContext();
  const [profile, setProfile] = useState<{ full_name: string | null; account_type: string } | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const pending = typeof window !== "undefined"
        ? localStorage.getItem("pending_account_type")
        : null;

      const { data } = await supabase
        .from("profiles")
        .select("full_name, account_type")
        .eq("id", user.id)
        .maybeSingle();

      if (pending && data && data.account_type === "job_seeker") {
        await supabase.from("profiles").update({ account_type: pending }).eq("id", user.id);
        localStorage.removeItem("pending_account_type");
        const { data: refreshed } = await supabase
          .from("profiles")
          .select("full_name, account_type")
          .eq("id", user.id)
          .maybeSingle();
        if (active) setProfile(refreshed as never);
      } else if (active) {
        setProfile(data as never);
        if (pending) localStorage.removeItem("pending_account_type");
      }
      if (active) setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [user.id]);

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("Signed out.");
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-dvh font-body bg-background">
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
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Loading your profile…
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold text-accent">
              {ACCOUNT_LABELS[profile?.account_type ?? "job_seeker"]}
            </p>
            <h1 className="mt-1 font-display text-4xl font-extrabold tracking-tight text-primary">
              Welcome{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""} 👋
            </h1>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Your AI career coach is ready. We'll wire up CV building, job matching and interview
              practice next.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {["Build your CV", "Find matching jobs", "Practice interviews"].map((t) => (
                <div
                  key={t}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-sm font-semibold text-muted-foreground">Coming soon</div>
                  <div className="mt-2 font-display text-lg font-bold text-foreground">{t}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

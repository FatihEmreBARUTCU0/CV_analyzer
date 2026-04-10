"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Clock, Award } from "lucide-react";

const trust = [
  { icon: Lock, label: "GDPR compliant" },
  { icon: Clock, label: "Results in 30 seconds" },
  { icon: Award, label: "No credit card needed" },
];

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section
      id="cta"
      className="py-24 sm:py-32 px-4 sm:px-6 bg-background"
    >
      <div className="max-w-3xl mx-auto text-center">
        <div className="relative rounded-3xl overflow-hidden border border-border bg-gradient-to-br from-[oklch(0.1_0.02_265)] via-[oklch(0.13_0.05_270)] to-[oklch(0.08_0.01_265)] px-8 py-14 sm:px-14 text-white">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, oklch(0.5 0.25 270 / 0.5) 0%, transparent 60%), radial-gradient(circle at 80% 50%, oklch(0.55 0.2 200 / 0.3) 0%, transparent 55%)",
            }}
          />
          <div className="relative z-10">
            <p className="text-sm font-semibold text-violet-300 uppercase tracking-widest mb-4">
              Get Started Today
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
              Stop losing to the algorithm.
              <br />
              Start winning interviews.
            </h2>
            <p className="text-white/65 text-lg max-w-lg mx-auto mb-10">
              Join 58,000+ professionals who optimized their CVs with AI and
              landed roles at Google, Stripe, Airbnb, and more. It starts with
              one upload.
            </p>

            {submitted ? (
              <div className="animate-scale-in flex flex-col items-center gap-3">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/30">
                  <Award className="w-7 h-7 text-emerald-400" />
                </div>
                <p className="text-lg font-semibold">You&apos;re on the list!</p>
                <p className="text-white/60 text-sm">
                  We&apos;ll send your analysis link to{" "}
                  <span className="text-white/80 font-medium">{email}</span>.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <label htmlFor="cta-email" className="sr-only">
                  Email adresiniz
                </label>
                <input
                  id="cta-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400/60 backdrop-blur-sm"
                />
                <Button
                  type="submit"
                  className="rounded-full bg-violet-500 hover:bg-violet-400 text-white gap-2 px-6 shrink-0 hover:scale-[1.03] active:scale-[0.98] transition-all"
                >
                  Analyze Free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            )}

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8">
              {trust.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-white/50 text-xs">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

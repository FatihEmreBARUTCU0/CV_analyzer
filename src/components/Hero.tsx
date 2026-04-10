"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react";

const stats = [
  { label: "CVs analyzed", value: "2.4M+", icon: TrendingUp },
  { label: "Active users", value: "58,000+", icon: Users },
  { label: "Avg. ATS score boost", value: "+34pts", icon: Sparkles },
];

export default function Hero() {
  const [email, setEmail] = useState("");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[oklch(0.1_0.02_265)] via-[oklch(0.12_0.04_270)] to-[oklch(0.08_0.01_265)] text-white px-4 sm:px-6">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 35%, oklch(0.5 0.25 270 / 0.35) 0%, transparent 55%), radial-gradient(circle at 75% 65%, oklch(0.55 0.2 200 / 0.2) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center pt-24 pb-16">
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/8 text-sm text-white/80 mb-8 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-violet-300" />
          <span>AI-powered analysis — results in under 30 seconds</span>
        </div>

        <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
          Your CV is costing{" "}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            you interviews
          </span>
        </h1>

        <p className="animate-fade-up delay-200 text-lg sm:text-xl text-white/65 max-w-2xl mx-auto mb-10 leading-relaxed">
          CVAnalyzer scans your resume against real ATS systems, finds gaps,
          rewrites weak sections, and gives you a hiring-manager-ready CV in
          minutes — not hours.
        </p>

        <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mb-12">
          <label htmlFor="email" className="sr-only">
            Email adresiniz
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400/60 backdrop-blur-sm transition-all"
          />
          <Button
            size="lg"
            className="rounded-full bg-violet-500 hover:bg-violet-400 text-white px-6 gap-2 shrink-0 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            Analyze My CV
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <p className="animate-fade-up delay-400 text-xs text-white/35 mb-16">
          Free forever · No credit card required · Instant results
        </p>

        <div className="animate-fade-up delay-500 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl bg-white/6 border border-white/10 backdrop-blur-sm"
            >
              <Icon className="w-4 h-4 text-violet-300 mb-0.5" />
              <span className="text-xl font-bold text-white">{value}</span>
              <span className="text-xs text-white/50 text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

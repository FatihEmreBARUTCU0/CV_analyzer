import { Upload, Cpu, BadgeCheck } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload Your CV",
    description:
      "Drag and drop your PDF or Word file. We accept all common resume formats. Your data is encrypted and never shared.",
    color: "text-violet-500",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    step: "02",
    icon: Cpu,
    title: "AI Scans & Scores",
    description:
      "Our model checks 120+ criteria: ATS compatibility, keyword density, formatting, action verbs, quantified achievements, and more.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
  },
  {
    step: "03",
    icon: BadgeCheck,
    title: "Get Your Optimized CV",
    description:
      "Receive a full report with actionable fixes, a rewritten summary, and a one-click export of your improved resume.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 sm:py-32 px-4 sm:px-6 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            From upload to offer letter
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Three steps. Thirty seconds. A CV that actually gets past the
            screeners.
          </p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-8">
          <div className="hidden md:block absolute top-12 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-gradient-to-r from-violet-200 via-cyan-200 to-emerald-200" />

          {steps.map(({ step, icon: Icon, title, description, color, bg, border }, idx) => (
            <div
              key={step}
              className={`relative flex flex-col items-center text-center animate-fade-up`}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div
                className={`flex items-center justify-center w-20 h-20 rounded-2xl ${bg} ${border} border-2 mb-6 group-hover:scale-110 transition-transform`}
              >
                <Icon className={`w-9 h-9 ${color}`} />
              </div>
              <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-2">
                Step {step}
              </span>
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

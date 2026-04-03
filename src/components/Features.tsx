import {
  ShieldCheck,
  Zap,
  Target,
  BrainCircuit,
  FileDown,
  MessageSquareText,
} from "lucide-react";

const features = [
  {
    id: "ats",
    icon: ShieldCheck,
    title: "ATS Score Checker",
    description:
      "Simulate how Fortune 500 applicant tracking systems parse your resume. Know exactly which keywords are missing before you apply.",
    size: "large",
    gradient: "from-violet-500/10 to-violet-500/5",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-100",
    visual: (
      <div className="mt-4 rounded-xl border border-violet-100 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-muted-foreground">ATS Compatibility Score</span>
          <span className="text-xs font-bold text-violet-600">87 / 100</span>
        </div>
        <div className="w-full bg-violet-100 rounded-full h-2 mb-4">
          <div className="bg-violet-500 h-2 rounded-full transition-all" style={{ width: "87%" }} />
        </div>
        <div className="space-y-2">
          {[
            { label: "Keyword match", score: 92 },
            { label: "Format compatibility", score: 78 },
            { label: "Section completeness", score: 95 },
          ].map(({ label, score }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-36 shrink-0">{label}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-violet-400 h-1.5 rounded-full"
                  style={{ width: `${score}%` }}
                />
              </div>
              <span className="text-xs font-medium text-foreground w-6 text-right">{score}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "keywords",
    icon: Zap,
    title: "Keyword Optimization",
    description:
      "Instantly surface high-impact keywords from any job description and embed them naturally into your CV.",
    size: "small",
    gradient: "from-amber-500/10 to-amber-500/5",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
  },
  {
    id: "match",
    icon: Target,
    title: "Job Match Score",
    description:
      "Paste a job posting and see how closely your profile aligns — with a percentage match and a prioritized fix list.",
    size: "small",
    gradient: "from-cyan-500/10 to-cyan-500/5",
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-100",
  },
  {
    id: "gaps",
    icon: BrainCircuit,
    title: "Skills Gap Analysis",
    description:
      "Find out which technical and soft skills you're missing for your target roles, with curated resources to close the gaps fast.",
    size: "medium",
    gradient: "from-indigo-500/10 to-indigo-500/5",
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-100",
  },
  {
    id: "export",
    icon: FileDown,
    title: "One-Click Export",
    description:
      "Download your optimized CV as a perfectly formatted PDF or Word doc, ready to send to any employer.",
    size: "small",
    gradient: "from-emerald-500/10 to-emerald-500/5",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
  },
  {
    id: "suggestions",
    icon: MessageSquareText,
    title: "Real-time Suggestions",
    description:
      "As you edit, our AI flags weak phrases, passive voice, and vague bullets — and suggests stronger alternatives inline.",
    size: "small",
    gradient: "from-pink-500/10 to-pink-500/5",
    iconColor: "text-pink-600",
    iconBg: "bg-pink-100",
  },
];

type FeatureItem = (typeof features)[number];

function FeatureCard({ feature }: { feature: FeatureItem }) {
  const { icon: Icon, title, description, gradient, iconColor, iconBg, visual } = feature;
  return (
    <div
      className={`relative flex flex-col rounded-2xl border border-border bg-gradient-to-br ${gradient} p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group`}
    >
      <div
        className={`flex items-center justify-center w-11 h-11 rounded-xl ${iconBg} mb-4 group-hover:scale-110 transition-transform duration-200`}
      >
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <h3 className="text-base font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      {visual}
    </div>
  );
}

export default function Features() {
  const large = features.find((f) => f.size === "large")!;
  const smalls = features.filter((f) => f.size === "small");
  const medium = features.find((f) => f.size === "medium")!;

  return (
    <section
      id="features"
      className="py-24 sm:py-32 px-4 sm:px-6 bg-muted/30"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Features
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Everything your CV needs to win
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            No guesswork. No outdated advice. Just data-backed improvements
            that get you to the interview stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 animate-fade-up">
            <FeatureCard feature={large} />
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {smalls.slice(0, 2).map((f, i) => (
              <div key={f.id} className="animate-fade-up" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                <FeatureCard feature={f} />
              </div>
            ))}
          </div>

          <div className="md:col-span-2 animate-fade-up delay-300">
            <FeatureCard feature={medium} />
          </div>

          {smalls.slice(2).map((f, i) => (
            <div key={f.id} className="animate-fade-up" style={{ animationDelay: `${(i + 4) * 100}ms` }}>
              <FeatureCard feature={f} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

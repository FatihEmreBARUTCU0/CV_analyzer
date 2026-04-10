import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Software Engineer → Senior SWE at Stripe",
    avatar: "SM",
    avatarColor: "bg-violet-700",
    rating: 5,
    quote:
      "My ATS score went from 54 to 91 after one session with CVAnalyzer. I had been applying for three months with zero callbacks. Two weeks after optimizing my CV, I had four interviews — including Stripe.",
  },
  {
    name: "James Okafor",
    role: "Marketing Manager, London",
    avatar: "JO",
    avatarColor: "bg-cyan-700",
    rating: 5,
    quote:
      "I was skeptical about AI resume tools, but this is genuinely different. It pointed out that I was using passive voice throughout and my impact statements had zero numbers. Fixed both and landed a role paying 22% more than my previous one.",
  },
  {
    name: "Priya Nair",
    role: "Career Coach, 300+ clients",
    avatar: "PN",
    avatarColor: "bg-emerald-700",
    rating: 5,
    quote:
      "I recommend CVAnalyzer to every one of my clients before they apply anywhere. The keyword gap analysis alone saves hours of research. It's become an essential part of my coaching toolkit.",
  },
  {
    name: "Daniel Krause",
    role: "Product Designer → Design Lead at Figma",
    avatar: "DK",
    avatarColor: "bg-pink-700",
    rating: 5,
    quote:
      "The job match scoring feature is incredible. I pasted the Figma job description and could see exactly where my CV fell short. Spent 40 minutes fixing it. Got the call the next week.",
  },
  {
    name: "Yuki Tanaka",
    role: "Data Analyst, Toronto",
    avatar: "YT",
    avatarColor: "bg-amber-700",
    rating: 5,
    quote:
      "As a non-native English speaker, the real-time suggestions were a game changer. It rewrote my awkward phrasing into something crisp and professional without losing my voice.",
  },
  {
    name: "Léa Dupont",
    role: "Finance Grad → Analyst at Goldman Sachs",
    avatar: "LD",
    avatarColor: "bg-indigo-700",
    rating: 5,
    quote:
      "Applied to 200 roles before using CVAnalyzer — 3 responses. Applied to 40 after — 11 responses. The math speaks for itself. I got my offer at Goldman using the optimized version.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 sm:py-32 px-4 sm:px-6 bg-muted/30"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Real people. Real offers.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Over 58,000 professionals have used CVAnalyzer to land roles at
            top companies. Here&apos;s what a few of them say.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {testimonials.map((t, idx) => (
            <div
              key={t.name}
              className="break-inside-avoid rounded-2xl border border-border bg-card p-6 animate-fade-up hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <Stars count={t.rating} />
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full ${t.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

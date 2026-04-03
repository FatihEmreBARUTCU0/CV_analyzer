import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for a one-time CV check before a big application.",
    cta: "Start for Free",
    ctaVariant: "outline" as const,
    href: "#cta",
    features: [
      "1 CV analysis per month",
      "ATS compatibility score",
      "Keyword gap report",
      "PDF export",
      "Email support",
    ],
    missing: ["Job match scoring", "Real-time suggestions", "Priority processing"],
  },
  {
    name: "Pro",
    price: "$14",
    period: "per month",
    description: "For active job seekers who need unlimited power.",
    cta: "Start 7-Day Free Trial",
    ctaVariant: "default" as const,
    href: "#cta",
    featured: true,
    badge: "Most Popular",
    features: [
      "Unlimited CV analyses",
      "ATS + Job Match scoring",
      "Keyword optimization AI",
      "Real-time inline suggestions",
      "Skills gap analysis",
      "PDF & Word export",
      "Priority processing (< 10s)",
      "Priority email & chat support",
    ],
    missing: [],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "per seat / mo",
    description: "For HR teams, career coaches, and recruiting agencies.",
    cta: "Contact Sales",
    ctaVariant: "outline" as const,
    href: "mailto:sales@cvanalyzer.io",
    features: [
      "Everything in Pro",
      "Bulk CV processing (API)",
      "White-label reports",
      "Team dashboard & analytics",
      "SSO / SAML integration",
      "Custom ATS rule sets",
      "Dedicated account manager",
      "SLA guarantee",
    ],
    missing: [],
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-24 sm:py-32 px-4 sm:px-6 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Start free. Upgrade when you land the interview. Cancel anytime —
            no questions asked.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 animate-fade-up transition-all duration-200 ${
                plan.featured
                  ? "border-primary bg-gradient-to-b from-primary/5 to-primary/[0.02] shadow-xl shadow-primary/10 scale-[1.02]"
                  : "border-border bg-card hover:shadow-md hover:-translate-y-0.5"
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-sm">
                    <Zap className="w-3 h-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                  <span className="text-muted-foreground text-sm mb-1">/{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <Button
                asChild
                variant={plan.ctaVariant}
                className={`w-full rounded-full mb-8 ${
                  plan.featured ? "bg-primary hover:bg-primary/90" : ""
                }`}
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>

              <ul className="space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
                {plan.missing.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 opacity-35">
                    <span className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center text-muted-foreground text-base leading-none">–</span>
                    <span className="text-sm line-through">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          All plans include GDPR-compliant data handling. Your CV is deleted
          from our servers within 30 days.
        </p>
      </div>
    </section>
  );
}

import Link from "next/link";
import { FileText, Globe, Link2, GitFork, Briefcase, SquareCode } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  Resources: [
    { label: "CV Writing Guide", href: "#" },
    { label: "ATS Explainer", href: "#" },
    { label: "Job Search Tips", href: "#" },
    { label: "Blog", href: "#" },
    { label: "API Docs", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press Kit", href: "#" },
    { label: "Contact", href: "mailto:hello@cvanalyzer.io" },
    { label: "Affiliates", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "GDPR", href: "#" },
  ],
};

const socials = [
  { label: "X / Twitter", icon: Globe, href: "https://twitter.com" },
  { label: "LinkedIn Social", icon: Link2, href: "https://linkedin.com" },
  { label: "GitHub", icon: GitFork, href: "https://github.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20 px-4 sm:px-6 pt-16 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-semibold mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
                <FileText className="w-4 h-4" />
              </span>
              <span>CVAnalyzer</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              AI-powered CV analysis that helps you beat the ATS and land more
              interviews.
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-8 h-8 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold mb-4">{category}</h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CVAnalyzer, Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Built by</span>
            <span className="font-medium text-foreground">Fatih Emre Barutcu</span>
            <a
              href="https://www.linkedin.com/in/fatih-emre-barut%C3%A7u-415457365/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex items-center justify-center w-6 h-6 rounded-md border border-border text-muted-foreground hover:text-[#0A66C2] hover:border-[#0A66C2]/40 transition-colors"
            >
              <Briefcase className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/FatihEmreBARUTCU0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex items-center justify-center w-6 h-6 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              <SquareCode className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Github, ShieldCheck, Sparkles } from "lucide-react";

const footerSections: Array<{ title: string; links: string[] }> = [
  { title: "Explore", links: ["Cheat Sheets", "Categories", "Trending", "AI Assistant"] },
  { title: "Security", links: ["OWASP Top 10", "Nmap", "Burp Suite", "Wireshark"] },
  { title: "Resources", links: ["Tools", "Sitemap", "Robots", "GitHub"] },
];

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-background/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3 font-display text-xl font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </span>
            SmartStack
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            A dark-first developer reference platform for programming, security, cloud, Linux, AI, and daily coding utilities.
          </p>
          <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Local-first tools. Accessible UI. Deployment-ready.
          </div>
        </div>
        {footerSections.map(({ title, links }) => (
          <div key={title}>
            <h2 className="font-display text-sm font-semibold">{title}</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {links.map((label) => (
                <li key={label}>
                  <Link className="transition hover:text-foreground" href={label === "Tools" ? "/tools" : "/#cheatsheets"}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
     <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-border/70 px-4 py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
  <p>© 2026 SmartStack. All rights reserved.</p>

  <a
    href="mailto:support@smartstack.tech"
    className="transition hover:text-foreground"
  >
    support@smartstack.tech
  </a>

  <span className="flex items-center gap-2">
    <Github className="h-4 w-4" />
    Original design, no copied assets or code.
  </span>
</div>
    </footer>
  );
}

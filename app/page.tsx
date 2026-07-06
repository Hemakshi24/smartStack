import Link from "next/link";
import { ArrowRight, BookOpen, Flame, LockKeyhole, Sparkles, Zap } from "lucide-react";
import { AnimatedCounter } from "@/components/animated-counter";
import { MotionSection } from "@/components/motion-section";
import { SearchBox } from "@/components/search/search-box";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { categories, cheatSheets, securityReferences, techTags, utilityTools } from "@/lib/data";

export default function Home() {
  const featured = cheatSheets.slice(0, 6);
  const trending = ["Python", "JavaScript", "React", "Docker", "Nmap", "Burp Suite", "Wireshark", "AI Agents", "Kubernetes", "PostgreSQL", "Linux", "GitHub Actions"];

  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-5 border-primary/30 bg-primary/10 text-foreground">
              <Sparkles className="mr-1 h-3.5 w-3.5 text-primary" />
              500+ Programming & Cybersecurity Cheat Sheets
            </Badge>
            <h1 className="text-balance font-display text-5xl font-bold tracking-normal sm:text-6xl lg:text-7xl">Learn Faster. Code Smarter.</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Search, learn, test, copy, quiz, and ship with a premium reference system for programming, cybersecurity, Linux, cloud, AI, and developer utilities.
            </p>
          </div>
          <div className="mt-10">
            <SearchBox hero />
          </div>
          <div className="mx-auto mt-7 flex max-w-4xl flex-wrap justify-center gap-2">
            {techTags.map((tag) => (
              <Badge key={tag} className="bg-background/60">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-3">
            {[
              ["Cheat sheets", 500, "+"],
              ["Local tools", utilityTools.length, ""],
              ["Domains", categories.length, ""],
            ].map(([label, value, suffix]) => (
              <Card key={label as string} className="glass p-5 text-center">
                <div className="font-display text-3xl font-bold">
                  <AnimatedCounter value={value as number} suffix={suffix as string} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <MotionSection className="px-4 py-12 sm:px-6 lg:px-8" id="cheatsheets">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Badge>
                <BookOpen className="mr-1 h-3.5 w-3.5" />
                Featured cheat sheets
              </Badge>
              <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Reference pages built for real workflows</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">Every sheet includes examples, safety notes, copy controls, terminal simulation, quizzes, bookmarks, sharing, PDF, and print support.</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/cheatsheets/python-essentials">
                Start learning
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((sheet) => (
              <Link key={sheet.slug} href={`/cheatsheets/${sheet.slug}`} className="group">
                <Card className="glass h-full p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/45">
                  <div className="flex items-center justify-between gap-3">
                    <Badge>{sheet.category}</Badge>
                    <span className="text-xs text-muted-foreground">{sheet.difficulty}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">{sheet.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{sheet.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {sheet.tags.map((tag) => (
                      <Badge key={tag} className="bg-background/60">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Open sheet
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="px-4 py-12 sm:px-6 lg:px-8" id="categories">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Badge>Popular categories</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Programming, security, systems, and AI in one stack</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card id={category.slug} key={category.slug} className="glass p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/12 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">{category.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{category.description}</p>
                  <p className="mt-4 text-sm font-medium">{category.count} references</p>
                </Card>
              );
            })}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="glass rounded-lg p-6">
            <Badge>
              <Flame className="mr-1 h-3.5 w-3.5" />
              Trending technologies
            </Badge>
            <h2 className="mt-4 font-display text-3xl font-bold">Fast paths into what developers search for now</h2>
            <p className="mt-3 text-muted-foreground">SmartStack groups fundamentals and modern workflows so users can jump from syntax to secure application quickly.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {trending.map((item) => (
              <div key={item} className="flex items-center justify-between rounded-lg border border-border bg-card/70 p-4">
                <span className="font-medium">{item}</span>
                <Zap className="h-4 w-4 text-primary" />
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="px-4 py-12 sm:px-6 lg:px-8" id="security">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <Badge>
                <LockKeyhole className="mr-1 h-3.5 w-3.5" />
                Cybersecurity toolkit
              </Badge>
              <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Security references with responsible-use context</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {securityReferences.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.name} className="glass p-5">
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 font-display text-lg font-bold">{item.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </MotionSection>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, ExternalLink } from "lucide-react";
import { AiAssistant } from "@/components/ai-assistant";
import { CheatSheetActions } from "@/components/cheatsheet-actions";
import { CodeBlock } from "@/components/code-block";
import { Quiz } from "@/components/quiz";
import { TerminalSimulator } from "@/components/terminal-simulator";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cheatSheets } from "@/lib/data";
import { readingTime } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cheatSheets.map((sheet) => ({ slug: sheet.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sheet = cheatSheets.find((item) => item.slug === slug);
  if (!sheet) return {};
  return {
    title: sheet.title,
    description: sheet.description,
    alternates: { canonical: `/cheatsheets/${sheet.slug}` },
    openGraph: {
      title: `${sheet.title} Cheat Sheet`,
      description: sheet.description,
      type: "article",
    },
  };
}

export default async function CheatSheetPage({ params }: Props) {
  const { slug } = await params;
  const sheet = cheatSheets.find((item) => item.slug === slug);
  if (!sheet) notFound();

  const articleText = [sheet.description, ...sheet.sections.flatMap((section) => [section.description, section.code ?? "", ...section.tips])].join(" ");
  const minutes = readingTime(articleText);
  const related = sheet.related.map((relatedSlug) => cheatSheets.find((item) => item.slug === relatedSlug)).filter(Boolean);

  return (
    <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            <Badge>{sheet.category}</Badge>
            {sheet.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{sheet.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">{sheet.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {minutes} min read
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Updated {sheet.updated}
            </span>
          </div>
          <div className="mt-8">
            <CheatSheetActions title={sheet.title} />
          </div>

          <div className="mt-10 space-y-8">
            {sheet.sections.map((section) => (
              <section key={section.title} className="scroll-mt-24">
                <h2 className="font-display text-2xl font-bold">{section.title}</h2>
                <p className="mt-2 text-muted-foreground">{section.description}</p>
                {section.code ? (
                  <div className="mt-4">
                    <CodeBlock code={section.code} language={section.language} />
                  </div>
                ) : null}
                <div className="mt-4 grid gap-2">
                  {section.tips.map((tip) => (
                    <div key={tip} className="rounded-md border border-border bg-card/70 p-3 text-sm text-muted-foreground">
                      {tip}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">Interactive terminal</h2>
            <div className="mt-4">
              <TerminalSimulator command={`smartstack explain "${sheet.title}"`} output={`Topic: ${sheet.title}\nMode: safe learning\nNext step: copy an example, change one parameter, then review the security tips.`} />
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">Quick quiz</h2>
            <div className="mt-4">
              <Quiz questions={sheet.quiz} />
            </div>
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <AiAssistant topic={sheet.title} />
          <Card className="glass p-5">
            <h2 className="font-display text-lg font-semibold">Related articles</h2>
            <div className="mt-4 space-y-3">
              {related.map((item) =>
                item ? (
                  <Link key={item.slug} href={`/cheatsheets/${item.slug}`} className="flex items-center justify-between rounded-md border border-border bg-background/50 p-3 text-sm transition hover:bg-muted">
                    {item.title}
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ) : null,
              )}
            </div>
          </Card>
        </aside>
      </div>
    </article>
  );
}

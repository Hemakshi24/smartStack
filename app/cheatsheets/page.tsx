import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cheatSheets } from "@/lib/data";

export const metadata = {
  title: "Cheat Sheets",
  description: "Browse SmartStack programming, cybersecurity, Linux, networking, cloud, DevOps, database, and AI cheat sheets.",
};

export default function CheatSheetsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold">Cheat Sheets</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Detailed references with code, quizzes, terminal simulations, and AI explanations.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cheatSheets.map((sheet) => (
          <Link key={sheet.slug} href={`/cheatsheets/${sheet.slug}`} className="group">
            <Card className="glass h-full p-5">
              <Badge>{sheet.category}</Badge>
              <h2 className="mt-4 font-display text-xl font-bold">{sheet.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{sheet.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Read sheet
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

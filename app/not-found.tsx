import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-bold">Reference not found</h1>
      <p className="mt-4 text-muted-foreground">That page is not in the SmartStack catalog yet.</p>
      <Button asChild className="mt-8">
        <Link href="/">Return home</Link>
      </Button>
    </section>
  );
}

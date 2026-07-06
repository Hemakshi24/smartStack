import { cn } from "@/lib/utils";

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded-md border border-border bg-secondary/70 px-2.5 py-1 text-xs font-medium text-muted-foreground", className)}>
      {children}
    </span>
  );
}

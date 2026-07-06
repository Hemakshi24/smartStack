import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-lg border border-border bg-card/80 text-card-foreground shadow-soft", className)} {...props}>
      {children}
    </div>
  );
}

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="animate-pulse space-y-6">
        <div className="h-10 w-64 rounded-md bg-muted" />
        <div className="h-5 max-w-2xl rounded-md bg-muted" />
        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-48 rounded-lg border border-border bg-muted/70" />
          ))}
        </div>
      </div>
    </div>
  );
}

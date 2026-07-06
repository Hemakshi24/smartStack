"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function TerminalSimulator({ command, output }: { command: string; output: string }) {
  const [ran, setRan] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-[#060910] p-4 font-mono text-sm text-slate-100">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
        <Button size="sm" variant="ghost" className="h-8 text-slate-200 hover:bg-white/10" onClick={() => setRan(true)}>
          <Play className="h-4 w-4" />
          Run
        </Button>
      </div>
      <p>
        <span className="text-primary">smartstack@lab</span>:~$ {command}
      </p>
      {ran ? <pre className="mt-3 whitespace-pre-wrap text-slate-300">{output}</pre> : <p className="mt-3 text-slate-500">Press Run to simulate output.</p>}
    </div>
  );
}

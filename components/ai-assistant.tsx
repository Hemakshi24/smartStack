"use client";

import { Bot, Lightbulb, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AiAssistant({ topic }: { topic: string }) {
  const [prompt, setPrompt] = useState(`Explain ${topic} with examples`);
  const answer = useMemo(() => {
    return {
      summary: `${topic} is easiest to learn by pairing a short definition with a command or syntax example, then testing a small variation.`,
      example: `Try asking: "Show me the safest ${topic} workflow for a beginner and explain each flag."`,
      security: "Validate input, avoid secrets in examples, confirm authorization for security testing, and prefer read-only commands until you understand impact.",
    };
  }, [topic]);

  return (
    <div className="glass rounded-lg p-5">
      <div className="flex items-center gap-2 font-display text-lg font-semibold">
        <Bot className="h-5 w-5 text-primary" />
        SmartStack AI
      </div>
      <div className="mt-4 flex gap-2">
        <Input value={prompt} onChange={(event) => setPrompt(event.target.value)} aria-label="Ask SmartStack AI" />
        <Button type="button">Ask</Button>
      </div>
      <div className="mt-5 grid gap-3 text-sm leading-6 text-muted-foreground">
        <p>{answer.summary}</p>
        <p className="flex gap-2">
          <Lightbulb className="mt-1 h-4 w-4 shrink-0 text-primary" />
          {answer.example}
        </p>
        <p className="flex gap-2">
          <ShieldAlert className="mt-1 h-4 w-4 shrink-0 text-primary" />
          {answer.security}
        </p>
      </div>
    </div>
  );
}

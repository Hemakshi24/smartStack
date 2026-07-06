"use client";

import { Check, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CodeBlock({ code, language = "txt" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1300);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-[#070a12] text-slate-100">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="font-mono text-xs text-slate-400">{language}</span>
        <Button type="button" size="sm" variant="ghost" className="h-8 text-slate-200 hover:bg-white/10" onClick={copy}>
          <motion.span animate={{ scale: copied ? 1.12 : 1 }} className="flex items-center gap-2">
            {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </motion.span>
        </Button>
      </div>
      <pre className="code-scrollbar overflow-x-auto p-4 font-mono text-sm leading-6">
        <code>{code}</code>
      </pre>
    </div>
  );
}

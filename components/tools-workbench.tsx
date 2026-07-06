"use client";

import { Check, Copy, KeyRound, RefreshCw, Wand2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { utilityTools } from "@/lib/data";

const sampleJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzbWFydHN0YWNrIiwicm9sZSI6ImRldmVsb3BlciIsImV4cCI6MTkyNDk5MjAwMH0.signature";

function decodeBase64Url(value: string) {
  try {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    return decodeURIComponent(
      atob(normalized)
        .split("")
        .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(""),
    );
  } catch {
    return "Unable to decode";
  }
}

function simpleMarkdown(value: string) {
  return value
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/`([^`]+)`/gim, "<code>$1</code>")
    .replace(/\n/g, "<br />");
}

export function ToolsWorkbench() {
  const [active, setActive] = useState("json-formatter");
  const [input, setInput] = useState('{"name":"SmartStack","secure":true,"tools":10}');
  const [regex, setRegex] = useState("\\bSmart\\w+");
  const [passwordLength, setPasswordLength] = useState(18);
  const [copied, setCopied] = useState(false);
  const [generation, setGeneration] = useState(0);

  const output = useMemo(() => {
    void generation;
    try {
      switch (active) {
        case "json-formatter":
          return JSON.stringify(JSON.parse(input), null, 2);
        case "base64":
          return `Encoded:\n${btoa(unescape(encodeURIComponent(input)))}\n\nDecoded if valid:\n${decodeBase64Url(input)}`;
        case "url-encoder":
          return `Encoded:\n${encodeURIComponent(input)}\n\nDecoded:\n${decodeURIComponent(input)}`;
        case "regex-tester": {
          const flags = "gi";
          const expression = new RegExp(regex, flags);
          const matches = [...input.matchAll(expression)].map((match) => match[0]);
          return matches.length ? matches.join("\n") : "No matches";
        }
        case "uuid-generator":
          return crypto.randomUUID();
        case "jwt-decoder": {
          const [header, payload] = input.split(".");
          return `Header:\n${JSON.stringify(JSON.parse(decodeBase64Url(header)), null, 2)}\n\nPayload:\n${JSON.stringify(JSON.parse(decodeBase64Url(payload)), null, 2)}\n\nSignature verification is not performed in the browser decoder.`;
        }
        case "password-generator": {
          const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
          return Array.from(crypto.getRandomValues(new Uint32Array(passwordLength)), (num) => chars[num % chars.length]).join("");
        }
        case "markdown-preview":
          return simpleMarkdown(input);
        case "color-picker": {
          const hex = input.trim().startsWith("#") ? input.trim() : "#22d3ee";
          const bigint = parseInt(hex.slice(1), 16);
          const r = (bigint >> 16) & 255;
          const g = (bigint >> 8) & 255;
          const b = bigint & 255;
          return `${hex.toUpperCase()}\nrgb(${r}, ${g}, ${b})`;
        }
        default:
          return "Hash generation requires pressing Generate SHA-256.";
      }
    } catch (error) {
      return error instanceof Error ? error.message : "Invalid input";
    }
  }, [active, input, passwordLength, regex, generation]);

  async function hashInput() {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
    const hash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
    setInput(hash);
  }

  async function copy() {
    await navigator.clipboard.writeText(output.replace(/<[^>]+>/g, ""));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <Badge>
          <Wand2 className="mr-1 h-3.5 w-3.5" />
          Developer utilities
        </Badge>
        <h1 className="mt-4 font-display text-4xl font-bold">Local-first tools for daily engineering</h1>
        <p className="mt-3 text-muted-foreground">Format, encode, decode, test, generate, and preview without sending your snippets away from the browser.</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="grid gap-2 self-start lg:sticky lg:top-24">
          {utilityTools.map((tool) => (
            <button
              id={tool.slug}
              key={tool.slug}
              type="button"
              onClick={() => {
                setActive(tool.slug);
                if (tool.slug === "jwt-decoder") setInput(sampleJwt);
                if (tool.slug === "markdown-preview") setInput("# SmartStack\n\n**Fast** references with `copy` support.");
                if (tool.slug === "color-picker") setInput("#22d3ee");
              }}
              className={`rounded-lg border p-4 text-left transition ${active === tool.slug ? "border-primary bg-primary/10" : "border-border bg-card/70 hover:bg-muted/60"}`}
            >
              <span className="block font-display font-semibold">{tool.name}</span>
              <span className="mt-1 block text-sm text-muted-foreground">{tool.description}</span>
            </button>
          ))}
        </aside>

        <Card className="glass overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
            <div>
              <h2 className="font-display text-xl font-bold">{utilityTools.find((tool) => tool.slug === active)?.name}</h2>
              <p className="text-sm text-muted-foreground">{utilityTools.find((tool) => tool.slug === active)?.category}</p>
            </div>
            <div className="flex gap-2">
              {active === "hash-generator" ? (
                <Button onClick={hashInput}>
                  <KeyRound className="h-4 w-4" />
                  Generate SHA-256
                </Button>
              ) : null}
              {(active === "uuid-generator" || active === "password-generator") && (
                <Button variant="outline" onClick={() => setGeneration((value) => value + 1)}>
                  <RefreshCw className="h-4 w-4" />
                  Generate
                </Button>
              )}
              <Button variant="outline" onClick={copy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
          <div className="grid gap-4 p-4 lg:grid-cols-2">
            <div>
              <label className="text-sm font-medium" htmlFor="tool-input">
                Input
              </label>
              {active === "regex-tester" ? (
                <Input className="mt-2" value={regex} onChange={(event) => setRegex(event.target.value)} aria-label="Regular expression" />
              ) : null}
              {active === "password-generator" ? (
                <label className="mt-3 block text-sm text-muted-foreground">
                  Length: {passwordLength}
                  <input className="mt-2 w-full accent-primary" type="range" min="8" max="48" value={passwordLength} onChange={(event) => setPasswordLength(Number(event.target.value))} />
                </label>
              ) : null}
              <textarea
                id="tool-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="mt-2 min-h-80 w-full rounded-lg border border-border bg-background/70 p-4 font-mono text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <span className="text-sm font-medium">Output</span>
              {active === "markdown-preview" ? (
                <div className="prose prose-invert mt-2 min-h-80 rounded-lg border border-border bg-background/70 p-4 text-sm" dangerouslySetInnerHTML={{ __html: output }} />
              ) : active === "color-picker" ? (
                <div className="mt-2 min-h-80 rounded-lg border border-border bg-background/70 p-4">
                  <div className="h-32 rounded-md border border-border" style={{ background: input.startsWith("#") ? input : "#22d3ee" }} />
                  <pre className="mt-4 whitespace-pre-wrap font-mono text-sm">{output}</pre>
                </div>
              ) : (
                <pre className="code-scrollbar mt-2 min-h-80 overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-[#070a12] p-4 font-mono text-sm leading-6 text-slate-100">{output}</pre>
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

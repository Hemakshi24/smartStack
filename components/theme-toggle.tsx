"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <Button aria-label="Theme" size="icon" variant="ghost" />;

  const modes = [
    { value: "light", icon: Sun, label: "Light theme" },
    { value: "dark", icon: Moon, label: "Dark theme" },
    { value: "system", icon: Laptop, label: "System theme" },
  ];

  return (
    <div className="flex rounded-md border border-border bg-background/50 p-1" aria-label="Theme selector">
      {modes.map((mode) => {
        const Icon = mode.icon;
        return (
          <Button
            key={mode.value}
            type="button"
            aria-label={mode.label}
            title={mode.label}
            size="icon"
            variant={theme === mode.value ? "secondary" : "ghost"}
            className="h-8 w-8"
            onClick={() => setTheme(mode.value)}
          >
            <Icon className="h-4 w-4" />
          </Button>
        );
      })}
    </div>
  );
}

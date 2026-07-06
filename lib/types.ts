import type { LucideIcon } from "lucide-react";

export type CheatSheetSection = {
  title: string;
  description: string;
  code?: string;
  language?: string;
  tips: string[];
};

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

export type CheatSheet = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  updated: string;
  sections: CheatSheetSection[];
  quiz: QuizQuestion[];
  related: string[];
};

export type Category = {
  name: string;
  slug: string;
  description: string;
  count: number;
  icon: LucideIcon;
};

export type UtilityTool = {
  slug: string;
  name: string;
  description: string;
  category: "Format" | "Encode" | "Security" | "Generate" | "Preview" | "Design";
};

"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";
import { type QuizQuestion } from "@/lib/types";

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div key={question.question} className="rounded-lg border border-border bg-card/70 p-4">
          <h3 className="font-display font-semibold">{question.question}</h3>
          <div className="mt-3 grid gap-2">
            {question.options.map((option) => {
              const selected = answers[index] === option;
              const correct = selected && option === question.answer;
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => setAnswers((current) => ({ ...current, [index]: option }))}
                  className={`flex items-center gap-2 rounded-md border p-3 text-left text-sm transition ${selected ? "border-primary bg-primary/10" : "border-border hover:bg-muted/60"}`}
                >
                  {correct ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <Circle className="h-4 w-4 text-muted-foreground" />}
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

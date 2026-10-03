"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export type QuestionnaireQuestion = {
  id: string;
  title: string;
  description?: string;
  type: "single" | "multiple" | "text";
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
};
export type QuestionnaireAnswers = Record<string, string | string[]>;
export type QuestionnaireProps = {
  questions: QuestionnaireQuestion[];
  onComplete: (answers: QuestionnaireAnswers) => void | Promise<void>;
  defaultAnswers?: QuestionnaireAnswers;
  className?: string;
  submitLabel?: string;
  completedMessage?: string;
};

function normalizeAnswer(question: QuestionnaireQuestion, answer: string | string[] | undefined): string | string[] | undefined {
  if (question.type === "text") return typeof answer === "string" ? answer.trim() : undefined;
  const optionValues = new Set(question.options?.map((option) => option.value));
  if (question.type === "single") return typeof answer === "string" && optionValues.has(answer) ? answer : undefined;
  return Array.isArray(answer) ? Array.from(new Set(answer.filter((value) => typeof value === "string" && optionValues.has(value)))) : undefined;
}

function hasAnswer(answer: string | string[] | undefined): boolean {
  return answer !== undefined && answer.length > 0;
}

export function Questionnaire({ questions, onComplete, defaultAnswers = {}, className, submitLabel = "Concluir", completedMessage = "Respostas enviadas. Obrigado!" }: QuestionnaireProps) {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<QuestionnaireAnswers>(defaultAnswers);
  const [error, setError] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const title = React.useRef<HTMLHeadingElement>(null);
  const firstRender = React.useRef(true);
  const baseId = React.useId();
  const currentStep = Math.min(step, Math.max(0, questions.length - 1));
  const question = questions[currentStep];
  React.useEffect(() => {
    if (firstRender.current) firstRender.current = false;
    else title.current?.focus();
  }, [currentStep]);
  if (!question) return <div className={cn("border-2 border-border bg-card p-6 text-sm shadow-nyx", className)}>Nenhuma pergunta disponível.</div>;
  if (completed) return <div role="status" className={cn("border-2 border-border bg-primary p-6 font-bold text-foreground shadow-nyx", className)}>{completedMessage}</div>;
  const answer = answers[question.id];
  const normalizedAnswer = normalizeAnswer(question, answer);
  const answered = hasAnswer(normalizedAnswer);
  const updateAnswer = (value: string | string[]) => { setAnswers((previous) => ({ ...previous, [question.id]: value })); setError(""); };
  return (
    <form className={cn("w-full max-w-xl space-y-5 border-2 border-border bg-card p-5 text-foreground shadow-nyx", className)} aria-labelledby={`${baseId}-title`} aria-busy={pending} onSubmit={async (event) => {
      event.preventDefault();
      if (pending) return;
      if (question.required && !answered) { setError("Responda esta pergunta para continuar."); return; }
      if (currentStep < questions.length - 1) { setStep(currentStep + 1); setError(""); return; }
      const submittedAnswers: QuestionnaireAnswers = {};
      for (const item of questions) {
        const value = normalizeAnswer(item, answers[item.id]);
        if (value !== undefined) submittedAnswers[item.id] = value;
      }
      const unansweredStep = questions.findIndex((item) => item.required && !hasAnswer(submittedAnswers[item.id]));
      if (unansweredStep >= 0) { setStep(unansweredStep); setError("Responda esta pergunta para continuar."); return; }
      setPending(true);
      setError("");
      try { await onComplete(submittedAnswers); setCompleted(true); }
      catch { setError("Não foi possível enviar. Tente novamente."); }
      finally { setPending(false); }
    }}>
      <div className="space-y-2"><p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Pergunta {currentStep + 1} de {questions.length}</p><progress className="block h-2 w-full border border-border accent-primary" max={questions.length} value={currentStep + 1} aria-label="Progresso do questionário" /></div>
      <div><h2 ref={title} id={`${baseId}-title`} tabIndex={-1} className="text-xl font-black outline-none">{question.title}{question.required && <span aria-label="Obrigatória"> *</span>}</h2>{question.description && <p id={`${baseId}-description`} className="mt-2 text-sm text-muted-foreground">{question.description}</p>}</div>
      <fieldset key={question.id} disabled={pending} aria-describedby={cn(question.description && `${baseId}-description`, error && `${baseId}-error`) || undefined} className="space-y-2">
        <legend className="sr-only">{question.title}</legend>
        {question.type === "text" ? <textarea value={typeof answer === "string" ? answer : ""} onChange={(event) => updateAnswer(event.target.value)} rows={4} placeholder={question.placeholder ?? "Sua resposta..."} aria-label={question.title} aria-required={question.required} aria-invalid={!!error} className="w-full resize-y border-2 border-border bg-background p-3 text-sm shadow-nyx-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" /> : question.options?.map((option, index) => {
          const checked = question.type === "single" ? answer === option.value : Array.isArray(answer) && answer.includes(option.value);
          return <label key={option.value} htmlFor={`${baseId}-${currentStep}-${index}`} className={cn("flex cursor-pointer items-center gap-3 border-2 border-border bg-background p-3 text-sm font-medium hover:bg-muted", checked && "bg-primary font-bold hover:bg-primary")}>
            <input id={`${baseId}-${currentStep}-${index}`} name={`${baseId}-${question.id}`} type={question.type === "single" ? "radio" : "checkbox"} value={option.value} checked={checked} className="size-4 accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onChange={() => {
              if (question.type === "single") updateAnswer(option.value);
              else { const values = Array.isArray(normalizedAnswer) ? normalizedAnswer : []; updateAnswer(checked ? values.filter((value) => value !== option.value) : [...values, option.value]); }
            }} />{option.label}
          </label>;
        })}
      </fieldset>
      {error && <p role="alert" id={`${baseId}-error`} className="text-sm font-bold text-destructive">{error}</p>}
      <div className="flex justify-between gap-3"><Button disabled={currentStep === 0 || pending} onClick={() => { setStep(currentStep - 1); setError(""); }}>← Voltar</Button><Button type="submit" variant="primary" disabled={pending}>{pending ? "Enviando..." : currentStep === questions.length - 1 ? submitLabel : "Continuar →"}</Button></div>
    </form>
  );
}

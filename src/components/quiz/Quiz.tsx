"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { QuizQuestion } from "@/lib/content";
import { plural } from "@/lib/utils";

/** Accessible knowledge quiz: one question at a time, immediate feedback with explanation. */
export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const q = questions[index];
  const answered = selected !== null;

  // Move focus to the new question for screen-reader and keyboard users
  useEffect(() => {
    if (index > 0 || done) headingRef.current?.focus();
  }, [index, done]);

  function choose(i: number) {
    if (answered) return;
    setSelected(i);
    if (i === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= questions.length) setDone(true);
    else {
      setIndex(index + 1);
      setSelected(null);
    }
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  }

  if (done) {
    const ratio = score / questions.length;
    const verdict =
      ratio >= 0.8
        ? "Imponująco! Świat wina nie ma przed Tobą wielu tajemnic."
        : ratio >= 0.5
          ? "Bardzo dobrze! Kilka tematów warto jeszcze zgłębić."
          : "Dobry początek. W naszych artykułach znajdziesz odpowiedzi na wszystkie pytania.";
    return (
      <div className="rounded-sm border border-cream-300 bg-white p-8 text-center md:p-12">
        <p className="eyebrow">Wynik</p>
        <h2 ref={headingRef} tabIndex={-1} className="mt-3 text-4xl font-semibold outline-none">
          {score} / {questions.length}
        </h2>
        <p className="mt-2 text-ink-muted">
          {score} {plural(score, ["poprawna odpowiedź", "poprawne odpowiedzi", "poprawnych odpowiedzi"])}
        </p>
        <p className="mx-auto mt-6 max-w-md text-lg">{verdict}</p>
        <button type="button" onClick={restart} className="mt-8 rounded-full bg-burgundy-700 px-7 py-3 text-sm font-semibold text-cream-50 hover:bg-burgundy-900">
          Spróbuj jeszcze raz
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-cream-300 bg-white p-6 md:p-10">
      <div className="flex items-center justify-between text-sm text-ink-muted">
        <span>
          Pytanie {index + 1} z {questions.length}
        </span>
        <span>Wynik: {score}</span>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded bg-cream-200" aria-hidden="true">
        <div className="h-full bg-burgundy-700 transition-all" style={{ width: `${(index / questions.length) * 100}%` }} />
      </div>

      <fieldset className="mt-8">
        <legend>
          <h2 ref={headingRef} tabIndex={-1} className="text-2xl leading-snug font-semibold outline-none md:text-3xl">
            {q.question}
          </h2>
        </legend>
        <div className="mt-6 grid gap-3">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.answer;
            const isChosen = i === selected;
            const state = !answered ? "idle" : isCorrect ? "correct" : isChosen ? "wrong" : "muted";
            return (
              <button
                key={opt}
                type="button"
                onClick={() => choose(i)}
                aria-disabled={answered}
                className={`flex items-center justify-between gap-4 rounded-sm border px-5 py-4 text-left transition-colors ${
                  state === "idle"
                    ? "border-cream-300 hover:border-burgundy-300 hover:bg-cream-50"
                    : state === "correct"
                      ? "border-green-700 bg-green-50 text-green-900"
                      : state === "wrong"
                        ? "border-burgundy-500 bg-burgundy-50 text-burgundy-900"
                        : "border-cream-200 text-ink-muted"
                }`}
              >
                <span>{opt}</span>
                {state === "correct" && <span className="text-sm font-semibold">Poprawna odpowiedź</span>}
                {state === "wrong" && <span className="text-sm font-semibold">Twoja odpowiedź</span>}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div aria-live="polite">
        {answered && (
          <div className="mt-6 border-l-2 border-gold-500 bg-cream-50 px-5 py-4">
            <p className="font-semibold">{selected === q.answer ? "Brawo, to prawidłowa odpowiedź!" : "Niestety, to nie ta odpowiedź."}</p>
            <p className="mt-1 leading-relaxed text-ink-muted">{q.explanation}</p>
            {q.link && (
              <Link href={q.link} className="mt-2 inline-block text-sm font-semibold text-burgundy-700 hover:underline">
                Przeczytaj artykuł →
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={next}
          disabled={!answered}
          className="rounded-full bg-burgundy-700 px-7 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-burgundy-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {index + 1 >= questions.length ? "Zobacz wynik" : "Następne pytanie"}
        </button>
      </div>
    </div>
  );
}

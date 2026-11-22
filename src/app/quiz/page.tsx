import { getQuiz } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Quiz } from "@/components/quiz/Quiz";

export const metadata = buildMetadata({
  title: "Quiz: sprawdź swoją wiedzę o winie",
  description:
    "Quiz o historii wina, szczepach, regionach i technikach winiarskich. Sprawdź swoją wiedzę i poznaj wyjaśnienie każdej odpowiedzi.",
  path: "/quiz",
});

export default function QuizPage() {
  const questions = getQuiz();
  return (
    <>
      <PageHeader
        eyebrow="Quiz"
        title="Sprawdź swoją wiedzę o winie"
        lead={`${questions.length} pytań o historię, szczepy, regiony i techniki winiarskie. Po każdej odpowiedzi wyjaśniamy, jak jest naprawdę.`}
        crumbs={[{ name: "Quiz", href: "/quiz" }]}
      />
      <div className="container-page max-w-3xl pt-12">
        <Quiz questions={questions} />
      </div>
    </>
  );
}

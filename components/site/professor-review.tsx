import { Badge } from "@/components/ui/badge";
import type { ProfessorReview } from "@/lib/legacy";

type ProfessorReviewProps = {
  readonly review: ProfessorReview;
};

export function ProfessorReviewSection({ review }: ProfessorReviewProps) {
  return (
    <section
      id="professor-review"
      className="detail-block scroll-mt-24"
      aria-labelledby="professor-review-title"
    >
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant={review.tier === "research-lead" ? "risk" : "celadon"}>
          {review.tierLabel}
        </Badge>
      </div>
      <h2 id="professor-review-title" className="detail-block-title mt-4">
        讀這一頁，先留意三件事
      </h2>
      <p className="professor-review-intro">{review.learningFocus}</p>

      <div className="professor-review-grid">
        <ReviewGroup index="01" title="先查哪些資料" items={review.evidenceQuestions} />
        <ReviewGroup index="02" title="放回實物怎樣看" items={review.appliedReading} />
        <ReviewGroup index="03" title="哪些結論不能急着下" items={review.boundaries} />
      </div>

    </section>
  );
}

function ReviewGroup({
  index,
  title,
  items,
}: {
  readonly index: string;
  readonly title: string;
  readonly items: readonly string[];
}) {
  return (
    <section className="professor-review-group" aria-labelledby={`review-group-${index}`}>
      <div>
        <span>{index}</span>
        <h3 id={`review-group-${index}`}>{title}</h3>
      </div>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

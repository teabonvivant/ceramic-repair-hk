import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ kicker, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <h2 className="display-serif mt-4 text-3xl leading-tight text-ink md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-pretty text-base leading-7 text-ink-soft md:text-lg">{description}</p> : null}
    </div>
  );
}

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LegacyItem } from "@/lib/legacy";

type ItemCardProps = {
  item: LegacyItem;
  href?: string;
  eyebrow?: string;
};

export function ItemCard({ item, href, eyebrow }: ItemCardProps) {
  const summary = typeof item.summary === "string" ? item.summary : typeof item.risk === "string" ? item.risk : "";
  const risk = [item.risk, item.category, item.technique].some((value) => typeof value === "string" && /不可|風險|食用|加熱|暫定|待人工|待人手|irreversible/i.test(value));

  return (
    <Card className="motion-soft h-full overflow-hidden hover:-translate-y-0.5">
      <CardHeader>
        <div className="flex flex-wrap gap-2">
          {eyebrow ? <Badge variant="outline">{eyebrow}</Badge> : null}
          {item.category ? <Badge variant={risk ? "risk" : "celadon"}>{item.category}</Badge> : null}
          {item.technique ? <Badge variant="default">{item.technique}</Badge> : null}
        </div>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {summary ? <p className="line-clamp-4 text-sm leading-6 text-ink-soft">{summary}</p> : null}
        {href ? (
          <Link href={href} className="motion-soft mt-5 inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-semibold text-indigo-ink hover:gap-3">
            查閱詳情
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        ) : null}
      </CardContent>
    </Card>
  );
}

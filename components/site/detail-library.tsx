"use client";

import { RotateCcw, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DetailSummary } from "@/lib/legacy";

type DetailLibraryProps = {
  readonly items: readonly DetailSummary[];
};

const ALL_FAMILIES = "all";

export function DetailLibrary({ items }: DetailLibraryProps) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState(ALL_FAMILIES);
  const categories = useMemo(
    () => [...new Map(items.map((item) => [item.family, item.familyLabel])).entries()],
    [items],
  );
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesFamily = family === ALL_FAMILIES || item.family === family;
      const haystack = `${item.title} ${item.description} ${item.familyLabel} ${item.searchText ?? ""}`.toLowerCase();
      return matchesFamily && (!normalized || haystack.includes(normalized));
    });
  }, [family, items, query]);
  const hasFilters = query.length > 0 || family !== ALL_FAMILIES;

  function resetFilters() {
    setQuery("");
    setFamily(ALL_FAMILIES);
  }

  return (
    <section aria-labelledby="detail-library-title">
      <div className="library-toolbar">
        <div>
          
          <h2 id="detail-library-title" className="display-serif mt-4 text-3xl leading-tight text-ink md:text-5xl">
            {`搜尋 ${items.length} 篇文章與知識條目`}
          </h2>
        </div>
        <div className="library-controls">
          <label className="library-field">
            <span>搜尋標題或內容</span>
            <span className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-soft" aria-hidden="true" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="例如：金繼、青花碗、B-72"
                className="pl-11"
              />
            </span>
          </label>
          <label className="library-field">
            <span>分類</span>
            <select value={family} onChange={(event) => setFamily(event.target.value)} className="library-select">
              <option value={ALL_FAMILIES}>全部分類</option>
              {categories.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="library-status">
        <p aria-live="polite">{`顯示 ${filtered.length} / ${items.length} 個條目`}</p>
        {hasFilters ? (
          <Button type="button" variant="ghost" size="sm" onClick={resetFilters}>
            <RotateCcw className="size-4" aria-hidden="true" />
            清除篩選
          </Button>
        ) : null}
      </div>

      {filtered.length > 0 ? (
        <div className="library-grid">
          {filtered.map((item) => (
            <Link key={item.slug} href={item.href ?? `/details/${item.slug}`} className="library-record">
              <span className="record-meta"><span>{item.familyLabel}</span><span>來源 {item.sourceCount}</span>{item.imageCount > 0 && <span>圖 {item.imageCount}</span>}</span>
              <strong>{item.title}</strong>
              <span className="record-description">{item.description}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <strong>找不到相符條目</strong>
          <p>可縮短關鍵字，或改選「全部分類」。</p>
          <Button type="button" variant="secondary" onClick={resetFilters}>
            <RotateCcw className="size-4" aria-hidden="true" />
            重設索引
          </Button>
        </div>
      )}
    </section>
  );
}


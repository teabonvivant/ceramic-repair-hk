"use client";
import Link from "next/link";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigationGroups } from "@/components/site/navigation-groups";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    setOpen(false);
    const frame = requestAnimationFrame(() => {
      if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    const closeOutside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => { window.removeEventListener("keydown", closeOnEscape); document.removeEventListener("pointerdown", closeOutside); };
  }, [open]);
  const current = (href: string) => pathname === href || pathname.startsWith(href + "/");
  return <header ref={header} className="site-header" onBlur={event => {
    if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }}>
    <div className="container header-inner">
      <button ref={toggle} className="menu-toggle" aria-label={open ? "關閉目錄" : "打開目錄"} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(!open)}>
        <svg className="menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path className="menu-line-top" d="M4 6h16" />
          <path className="menu-line-middle" d="M4 12h16" />
          <path className="menu-line-bottom" d="M4 18h16" />
        </svg><span>目錄</span>
      </button>
      <Link href="/" className="brand-link" aria-label="返回瓷器修補知識庫首頁"><span className="brand-mark" aria-hidden="true">瓷</span><strong>瓷器修補知識庫</strong></Link>
      <nav className="header-shortcuts" aria-label="快速導覽"><Link className="journal-shortcut" href="/blog" aria-current={current("/blog") ? "page" : undefined}>器物誌</Link><Link href="/details" aria-label="搜尋全部內容" aria-current={current("/details") ? "page" : undefined}><Search size={18} strokeWidth={1.5} aria-hidden="true" /><span>搜尋</span></Link></nav>
    </div>
    {open && <nav id="site-navigation" className="site-navigation" aria-label="網站目錄"><div className="container navigation-groups">
      {navigationGroups.map(group => <section key={group.title}><h2>{group.title}</h2><div>{group.links.map(item => <Link key={item.href} href={item.href} aria-current={current(item.href) ? "page" : undefined} onClick={() => { setOpen(false); toggle.current?.focus(); }}>{item.label}</Link>)}</div></section>)}
    </div></nav>}
  </header>;
}

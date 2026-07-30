import Link from "next/link";

export function SiteNav({active}: {active: "home" | "knowledge" | "action" | "coach"}) {
  const items = [
    {id: "home", href: "/", label: "产品介绍"},
    {id: "knowledge", href: "/knowledge", label: "理论知识"},
    {id: "action", href: "/action", label: "行动计划"},
    {id: "coach", href: "/coach", label: "个性化辅导"},
  ] as const;

  return (
    <header className="site-header product-header">
      <Link className="brand" href="/" aria-label="返回产品首页">
        <span className="brand-mark">AI</span>
        <span>Builder Field Kit</span>
      </Link>
      <nav aria-label="产品主导航">
        {items.map((item) => (
          <Link className={active === item.id ? "is-active" : ""} href={item.href} key={item.id}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className="header-cta" href="/action">开始第一关 ↗</Link>
    </header>
  );
}

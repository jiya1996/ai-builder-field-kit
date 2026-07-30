import Link from "next/link";

export function SiteNav({active}: {active: "home" | "knowledge" | "action" | "coach"}) {
  const items = [
    {id: "home", href: "/", label: "首页"},
    {id: "studio", href: "/learn", label: "学习工作台"},
  ] as const;
  const current = active === "home" ? "home" : "studio";

  return (
    <header className="site-header product-header">
      <Link className="brand" href="/" aria-label="返回产品首页">
        <span className="brand-mark">AI</span>
        <span>Builder Field Kit</span>
      </Link>
      <nav aria-label="产品主导航">
        {items.map((item) => (
          <Link className={current === item.id ? "is-active" : ""} href={item.href} key={item.id}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className="header-cta" href="/learn?stage=s00&view=theory">打开 S00–S10 ↗</Link>
    </header>
  );
}

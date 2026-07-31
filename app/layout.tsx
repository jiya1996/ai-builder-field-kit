import type { Metadata } from "next";
import "./globals.css";

const publicOrigin = "https://jiya1996.github.io/ai-builder-field-kit";

export const metadata: Metadata = {
  metadataBase: new URL(publicOrigin),
  title: "AI Builder Field Kit｜掌握独立完成产品的方法",
  description: "S00–S10 理论与实战双驱动学习工作台：看懂软件与 AI，完成真实产品，并获得阶段化辅导。",
  openGraph: {
    title: "学会软件如何运转、AI 如何协作、产品如何走到上线",
    description: "S00–S10｜理论 × 实战｜个性化 Agent",
    type: "website",
    url: publicOrigin,
    images: [{url: `${publicOrigin}/og.png`, width: 1200, height: 630, alt: "AI Builder Field Kit"}],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Builder Field Kit｜掌握独立完成产品的方法",
    description: "看懂软件与 AI，完成真实产品，掌握下一次独立交付的方法。",
    images: [`${publicOrigin}/og.png`],
  },
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}

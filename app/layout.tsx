import type { Metadata } from "next";
import "./globals.css";

const publicOrigin = "https://jiya1996.github.io/ai-builder-field-kit";

export const metadata: Metadata = {
  metadataBase: new URL(publicOrigin),
  title: "AI Builder Field Kit｜从理论到真实产品",
  description: "理论知识 × 五关行动计划 × 个性化辅导：从第一个公开网页到自己的 AI 产品。",
  openGraph: {
    title: "AI Builder Field Kit",
    description: "理论负责看懂，行动负责做出，个性化辅导负责把路线变成你的路线。",
    type: "website",
    url: publicOrigin,
    images: [{url: `${publicOrigin}/og.png`, width: 1200, height: 630, alt: "AI Builder Field Kit"}],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Builder Field Kit",
    description: "从第一个公开网页，到自己的 AI 产品。",
    images: [`${publicOrigin}/og.png`],
  },
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}

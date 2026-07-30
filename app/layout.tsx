import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const noto = Noto_Sans_SC({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3001";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    title: "AI Builder Delivery System｜客户真正拿到的课程产品",
    description: "知识库 × 项目库 × 教学 Agent：用八个成果关把第一个 AI 产品做完、上线并沉淀成个人工作系统。",
    openGraph: {
      title: "AI Builder Delivery System",
      description: "知识库负责查得懂，项目库负责做得出，教学 Agent 负责走得完。",
      type: "website",
      images: [{url: `${origin}/og.png`, width: 1200, height: 630, alt: "AI Builder Field Kit"}],
    },
    twitter: {
      card: "summary_large_image",
      title: "AI Builder Delivery System",
      description: "客户拿到的不只是链接，而是一套真实产品交付系统。",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="zh-CN"><body className={noto.variable}>{children}</body></html>;
}

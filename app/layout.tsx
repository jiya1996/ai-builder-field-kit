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
    title: "AI Builder Field Kit｜把第一个 AI 产品真的做完",
    description: "给零基础 AI Builder 的关卡制产品交付资料包：走完、敢上线、能重复。",
    openGraph: {
      title: "AI Builder Field Kit",
      description: "不是让 AI 写代码，是把第一款真产品做完。",
      type: "website",
      images: [{url: `${origin}/og.png`, width: 1200, height: 630, alt: "AI Builder Field Kit"}],
    },
    twitter: {
      card: "summary_large_image",
      title: "AI Builder Field Kit",
      description: "把第一个 AI 产品真的做完。",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="zh-CN"><body className={noto.variable}>{children}</body></html>;
}

import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://comma-news.vercel.app"),
  title: "comma, — 모든 것에는 100가지 이유가 있다",
  description:
    "SNS에서 바로 공유할 수 있는 카드뉴스. 매일 새로운 영감을 콤마 하나에 담았습니다.",
  openGraph: {
    title: "comma, — 모든 것에는 100가지 이유가 있다",
    description:
      "SNS에서 바로 공유할 수 있는 카드뉴스. 매일 새로운 영감을 콤마 하나에 담았습니다.",
    type: "website",
    locale: "ko_KR",
    siteName: "comma,",
    // TODO: Jiwon-studio로 OG 이미지(1200x630) 생성 후 경로 교체
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "comma, — 모든 것에는 100가지 이유가 있다",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "comma, — 모든 것에는 100가지 이유가 있다",
    description:
      "SNS에서 바로 공유할 수 있는 카드뉴스. 매일 새로운 영감을 콤마 하나에 담았습니다.",
    images: ["/og-image.png"],
  },
  // TODO: Google Search Console 인증 후 아래 주석 해제 및 코드 교체
  // verification: {
  //   google: "VERIFICATION_CODE",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4588308927468413"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${playfair.variable} ${jakarta.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

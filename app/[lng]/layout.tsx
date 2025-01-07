import type { Metadata } from "next";

import { dir } from "i18next";

import "../globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import { Header } from "./components/header";
import { Provider } from "./components/provider";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  description:
    "Monkey Kingdom 是以中国神话《西游记》为灵感的 NFT 项目。每只猴子都融入了独特的亚洲文化元素，从孙悟空到其他神话角色，展现了东方文化的深邃魅力。作为亚洲最具影响力的 NFT 项目之一，我们致力于构建一个充满活力的 Web3 社区，连接全球的亚洲文化爱好者。\n\nMonkey Kingdom is an NFT project inspired by the Chinese mythology 'Journey to the West'. Each monkey incorporates unique Asian cultural elements, from Sun Wukong to other mythological characters, showcasing the profound charm of Eastern culture. As one of Asia's most influential NFT projects, we are committed to building a vibrant Web3 community that connects Asian culture enthusiasts worldwide.",
  title: "Monkey Kingdom",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const { lng } = await params;

  return (
    <html dir={dir(lng)} lang={lng}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <Provider>
          <Header lng={lng} />
          <main className="p-4">{children}</main>
        </Provider>
      </body>
    </html>
  );
}

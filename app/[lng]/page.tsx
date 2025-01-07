import { Crown, Flame, Gem } from "lucide-react";
import Image from "next/image";

import { getTranslation } from "../i18n";
import { MintCard } from "./components/mint-card";

export default async function Home({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const { t } = await getTranslation(lng);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-background" />
        <Image
          alt="background"
          className="object-cover opacity-[0.03] dark:opacity-[0.07]"
          fill
          src="/images/pattern.png"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-24 relative">
        {/* 头部区域 */}
        <div className="text-center mb-24 space-y-8">
          <h1 className="text-5xl !leading-tight md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 animate-gradient">
            {t("welcome")}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            {t("description")}
          </p>

          {/* 项目亮点 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { desc: "feature1Desc", icon: Crown, title: "feature1Title" },
              { desc: "feature2Desc", icon: Gem, title: "feature2Title" },
              { desc: "feature3Desc", icon: Flame, title: "feature3Title" },
            ].map((feature, index) => (
              <div
                className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-blue-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5"
                key={index}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-100">
                  {t(feature.title)}
                </h3>
                <p className="text-gray-400">{t(feature.desc)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mint 卡片 */}
        <MintCard lng={lng} />
      </div>
    </div>
  );
}

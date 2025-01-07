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
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-background" />
        <Image
          alt="background"
          className="object-cover opacity-[0.03] dark:opacity-[0.07]"
          fill
          src="/images/pattern.png"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-24">
        {/* 头部区域 */}
        <div className="mb-40 space-y-8 text-center">
          <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-5xl font-bold !leading-tight text-transparent md:text-6xl">
            {t("welcome")}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400 md:text-xl">
            {t("description")}
          </p>

          {/* 项目亮点 */}
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { desc: "feature1Desc", icon: Crown, title: "feature1Title" },
              { desc: "feature2Desc", icon: Gem, title: "feature2Title" },
              { desc: "feature3Desc", icon: Flame, title: "feature3Title" },
            ].map((feature, index) => (
              <div
                className="group rounded-2xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5"
                key={index}
              >
                <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 transition-transform group-hover:scale-110">
                  <feature.icon className="size-7 text-blue-400" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-100">
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

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <Image
          alt="background"
          className="object-cover"
          fill
          src="/images/pattern.png"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 relative">
        {/* 头部区域 */}
        <div className="text-center mb-16">
          <h1 className="!leading-tight text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
            {t("welcome")}
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl max-w-2xl mx-auto mb-8">
            {t("description")}
          </p>

          {/* 项目亮点 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Crown className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {t("feature1Title")}
              </h3>
              <p className="text-gray-400">{t("feature1Desc")}</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Gem className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {t("feature2Title")}
              </h3>
              <p className="text-gray-400">{t("feature2Desc")}</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Flame className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {t("feature3Title")}
              </h3>
              <p className="text-gray-400">{t("feature3Desc")}</p>
            </div>
          </div>
        </div>

        {/* Mint 卡片 */}
        <MintCard lng={lng} />
      </div>
    </div>
  );
}

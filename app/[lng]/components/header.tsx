"use client";

import { useTranslation } from "@/app/i18n/client";
import Image from "next/image";
import Link from "next/link";

import { LanguageSwitcher } from "./language-switcher";
import { WalletConnectButton } from "./wallet-connect-button";

export function Header({ lng }: { lng: string }) {
  const { t } = useTranslation(lng);

  return (
    <header className="sticky top-0 left-0 z-10 bg-gray-800/50 backdrop-blur-md border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <Link
            className="flex items-center gap-3 transition-transform hover:scale-[1.02]"
            href="/"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg flex items-center justify-center">
              <Image
                alt="Logo"
                className="w-6 h-6 dark:invert"
                height={40}
                src="/icons/logo.svg"
                width={40}
              />
            </div>
            <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              {t("monkeyKingdom")}
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            <LanguageSwitcher lng={lng} />
            <WalletConnectButton lng={lng} />
          </div>
        </div>
      </div>
    </header>
  );
}

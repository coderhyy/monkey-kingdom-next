"use client";

import { useTranslation } from "@/app/i18n/client";
import Image from "next/image";
import Link from "next/link";

import { LanguageSwitcher } from "./language-switcher";
import { WalletConnectButton } from "./wallet-connect-button";

export function Header({ lng }: { lng: string }) {
  const { t } = useTranslation(lng);

  return (
    <header className="sticky left-0 top-0 z-10 border-b border-gray-700/50 bg-gray-800/50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            className="flex items-center gap-2 transition-transform hover:scale-[1.02]"
            href="/"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10">
              <Image
                alt="Logo"
                className="size-6 dark:invert"
                height={40}
                src="/icons/logo.svg"
                width={40}
              />
            </div>
            <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-xl font-bold text-transparent">
              <span className="hidden md:inline">{t("monkeyKingdom")}</span>
              <span className="md:hidden">{t("mk")}</span>
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

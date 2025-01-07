"use client";

import { useTranslation } from "@/app/i18n/client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import { LanguageSwitcher } from "./language-switcher";

const WalletMultiButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export function Header({ lng }: { lng: string }) {
  const { t } = useTranslation(lng);

  return (
    <header className="sticky top-0 left-0 z-10 bg-inherit flex justify-between items-center p-4">
      <Link className="flex items-center gap-2" href="/">
        <Image
          alt="Logo"
          className="invert"
          height={30}
          src="/icons/logo.svg"
          width={30}
        />
        <h1 className="font-bold text-lg">{t("monkeyKingdom")}</h1>
      </Link>

      <div className="flex items-center gap-x-2">
        <LanguageSwitcher lng={lng} />

        {/* TODO: i18n */}
        <WalletMultiButton />
      </div>
    </header>
  );
}

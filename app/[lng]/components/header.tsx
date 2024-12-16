"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

import { LanguageSwitcher } from "./language-switcher";

const WalletMultiButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export function Header({ lng }: { lng: string }) {
  return (
    <header className="flex justify-between items-center p-4">
      <div className="flex items-center gap-2">
        <Image
          alt="Logo"
          className="invert"
          height={30}
          src="/logo.svg"
          width={30}
        />
        <h1 className="font-bold text-lg">Monkey Kingdom</h1>
      </div>

      <div className="flex items-center gap-x-2">
        <LanguageSwitcher lng={lng} />

        {/* TODO: i18n */}
        <WalletMultiButton />
      </div>
    </header>
  );
}

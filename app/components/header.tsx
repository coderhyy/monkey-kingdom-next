"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const WalletMultiButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function Header() {
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

      <WalletMultiButton className="text-sm" />
    </header>
  );
}

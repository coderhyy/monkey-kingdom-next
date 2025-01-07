import { useTranslation } from "@/app/i18n/client";

import "./index.css";

import dynamic from "next/dynamic";

const BaseWalletMultiButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).BaseWalletMultiButton,
  { ssr: false }
);

export function WalletConnectButton({ lng }: { lng: string }) {
  const { t } = useTranslation(lng);

  return (
    <BaseWalletMultiButton
      labels={{
        "change-wallet": t("changeWallet"),
        connecting: t("connecting"),
        copied: t("copied"),
        "copy-address": t("copyAddress"),
        disconnect: t("disconnect"),
        "has-wallet": t("connect"),
        "no-wallet": t("selectWallet"),
      }}
    />
  );
}

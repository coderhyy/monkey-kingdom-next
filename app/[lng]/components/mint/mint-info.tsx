"use client";

import { useTranslation } from "@/app/i18n/client";
import { ellipsify, lamportsToSol } from "@/app/lib/utils";
import { useCluster } from "@/components/cluster/cluster-provider";
import { useWallet } from "@solana/wallet-adapter-react";
import { Check, Copy, Wallet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { useUmi } from "./umi-provider";

export function MintInfo({ lng }: { lng: string }) {
  const { t } = useTranslation(lng);
  const { publicKey } = useWallet();
  const { getExplorerUrl } = useCluster();
  const { balance, candyGuard, candyMachine } = useUmi();

  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string | undefined) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(t("copied"));
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg bg-gray-900/50 p-4">
      <div className="space-y-3">
        {/* SOL 余额 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500/10">
              <Wallet className="size-4 text-blue-400" />
            </div>
            <span className="text-gray-400">{t("walletBalance")}</span>
          </div>
          <div className="flex items-center gap-2">
            {publicKey ? (
              <>
                <span className="font-medium">{lamportsToSol(balance)}</span>
                <span className="text-sm text-gray-400">SOL</span>
              </>
            ) : (
              <span className="font-medium">{t("connectWallet")}</span>
            )}
          </div>
        </div>

        {/* 交易信息 */}
        <div className="my-3 border-t border-gray-700/50" />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">{t("mintPrice")}</span>
            <span className="font-medium">
              {candyGuard?.guards.solPayment.__option === "Some"
                ? `${lamportsToSol(
                    candyGuard?.guards.solPayment.value.lamports.basisPoints
                  )} SOL`
                : "0 SOL"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">{t("remaining")}</span>
            <span className="font-medium">
              {`${candyMachine?.itemsRedeemed || 0} / ${
                candyMachine?.data.itemsAvailable || 0
              }`}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">{t("maxPerWallet")}</span>
            <span className="font-medium">
              {candyGuard?.guards.mintLimit.__option === "Some"
                ? candyGuard?.guards.mintLimit.value.limit
                : t("infinite")}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">{t("collectionAddress")}</span>
            {candyMachine?.collectionMint && (
              <div className="flex items-center gap-2">
                <Link
                  className=" font-medium text-blue-400"
                  href={getExplorerUrl(
                    `/address/${candyMachine.collectionMint}`
                  )}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {ellipsify(candyMachine.collectionMint)}
                </Link>
                {copied ? (
                  <Check className="size-4 text-green-400" />
                ) : (
                  <Copy
                    className="size-4 cursor-pointer text-gray-400 hover:text-gray-300"
                    onClick={() =>
                      copyToClipboard(candyMachine?.collectionMint)
                    }
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

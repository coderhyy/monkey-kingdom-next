import { useTranslation } from "@/app/i18n/client";
import { mintV2 } from "@metaplex-foundation/mpl-candy-machine";
import { setComputeUnitLimit } from "@metaplex-foundation/mpl-toolbox";
import {
  generateSigner,
  sol,
  some,
  transactionBuilder,
} from "@metaplex-foundation/umi";
import { Ban, LoaderCircle, Sparkles, Wallet } from "lucide-react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { UmiContext } from "../logic/useUmiContext";
import { getSol } from "../logic/utils";

export function MintActions({ lng }: { lng: string }) {
  const { t } = useTranslation(lng);
  const {
    balance,
    candyGuard,
    candyMachine,
    DESTINATION_PUBLIC_KEY,
    getBalances,
    getCandyMachine,
    umi,
    wallet,
  } = useContext(UmiContext);

  const [amount, setAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleMax = useCallback(() => {
    const price =
      candyGuard?.guards.solPayment.__option === "Some"
        ? getSol(candyGuard?.guards.solPayment.value.lamports)
        : 0;

    // 获取钱包余额并计算最大可铸造数量
    const _balance = getSol(balance);
    const maxMintable = price > 0 ? Math.floor(_balance / price) : 0;

    // 确保不超过 candyMachine 的可用数量
    const availableItems = candyMachine
      ? Number(candyMachine.data.itemsAvailable)
      : 0;
    const finalMax = Math.min(maxMintable, availableItems);

    setAmount(finalMax);
  }, [balance, candyGuard, candyMachine]);

  const handleMint = useCallback(async () => {
    if (!candyMachine) return;

    setIsLoading(true);
    try {
      const nftMint = generateSigner(umi);

      await transactionBuilder()
        .add(setComputeUnitLimit(umi, { units: 800_000 }))
        .add(
          mintV2(umi, {
            candyGuard: candyGuard?.publicKey,
            candyMachine: candyMachine.publicKey,
            collectionMint: candyMachine.collectionMint,
            collectionUpdateAuthority: candyMachine.authority,
            mintArgs: {
              solPayment: some({
                destination: DESTINATION_PUBLIC_KEY,
              }),
            },
            nftMint,
          })
        )
        .sendAndConfirm(umi);

      toast.success(t("mintSuccess"));
      getCandyMachine();
      getBalances();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(t("mintError"));
      } else {
        toast.error(t("unknownError"));
      }
    } finally {
      setIsLoading(false);
    }
  }, [
    DESTINATION_PUBLIC_KEY,
    candyGuard?.publicKey,
    candyMachine,
    getBalances,
    getCandyMachine,
    t,
    umi,
  ]);

  const isInsufficientBalance = useMemo(() => {
    if (!candyGuard || !balance) return true;

    const price =
      candyGuard.guards.solPayment.__option === "Some"
        ? candyGuard.guards.solPayment.value.lamports
        : sol(0);

    return balance.basisPoints < price.basisPoints;
  }, [balance, candyGuard]);

  const buttonText = useMemo(() => {
    if (isLoading) {
      return (
        <>
          <LoaderCircle className="size-4 animate-spin" />
          <span>{t("minting")}</span>
        </>
      );
    }

    if (isInsufficientBalance) {
      return (
        <>
          <Wallet className="size-4" />
          <span>{t("insufficientBalance")}</span>
        </>
      );
    }

    if (
      candyMachine &&
      candyMachine.itemsRedeemed >= candyMachine.data.itemsAvailable
    ) {
      return (
        <>
          <Ban className="size-4" />
          <span>{t("soldOut")}</span>
        </>
      );
    }

    return (
      <>
        <Sparkles className="size-4" />
        <span>{t("mintNow")}</span>
      </>
    );
  }, [candyMachine, isInsufficientBalance, isLoading, t]);

  useEffect(() => {
    getBalances();
  }, [getBalances, wallet.publicKey]);

  useEffect(() => {
    getCandyMachine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          className="w-full flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          disabled
          max={candyMachine && Number(candyMachine?.data.itemsAvailable)}
          min="1"
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder={t("enterAmount")}
          type="number"
          value={amount}
        />
        <button
          className="rounded-lg bg-gray-700 px-4 py-3 transition-colors hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-700"
          disabled
          onClick={handleMax}
        >
          {t("max")}
        </button>
      </div>

      <button
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4 font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:from-blue-600 hover:to-purple-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:from-blue-500 disabled:hover:to-purple-500"
        disabled={
          isLoading ||
          isInsufficientBalance ||
          (candyMachine &&
            candyMachine?.itemsRedeemed >= candyMachine?.data.itemsAvailable)
        }
        onClick={handleMint}
      >
        {buttonText}
      </button>
    </div>
  );
}

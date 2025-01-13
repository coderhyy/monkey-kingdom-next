import { useTranslation } from "@/app/i18n/client";
import { cn, lamportsToSol } from "@/app/lib/utils";
import { mintV2 } from "@metaplex-foundation/mpl-candy-machine";
import { setComputeUnitLimit } from "@metaplex-foundation/mpl-toolbox";
import {
  generateSigner,
  publicKey,
  some,
  transactionBuilder,
} from "@metaplex-foundation/umi";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  CircleDollarSign,
  Coins,
  Loader2,
  PackageX,
  Wallet2,
  Wand2,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import { useUmi } from "./umi-provider";

const COMPUTE_UNITS = 800_000;

export function MintActions({ lng }: { lng: string }) {
  const { t } = useTranslation(lng);
  const {
    balance,
    candyGuard,
    candyMachine,
    getBalance,
    getCandyMachine,
    umi,
  } = useUmi();

  const [amount, setAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const calculateMaxMintable = useCallback(() => {
    if (!candyGuard || !candyMachine) return 0;

    const price =
      candyGuard.guards.solPayment.__option === "Some"
        ? lamportsToSol(candyGuard.guards.solPayment.value.lamports.basisPoints)
        : 0;

    const walletBalance = lamportsToSol(balance);
    const maxByBalance = price > 0 ? Math.floor(walletBalance / price) : 0;
    return Math.min(maxByBalance, Number(candyMachine.data.itemsAvailable));
  }, [balance, candyGuard, candyMachine]);

  const handleMax = useCallback(() => {
    setAmount(calculateMaxMintable());
  }, [calculateMaxMintable]);

  const buildMintTransaction = useCallback(() => {
    if (!candyMachine || !candyGuard) return null;

    const nftMint = generateSigner(umi);
    return transactionBuilder()
      .add(setComputeUnitLimit(umi, { units: COMPUTE_UNITS }))
      .add(
        mintV2(umi, {
          candyGuard: candyGuard.publicKey,
          candyMachine: candyMachine.publicKey,
          collectionMint: candyMachine.collectionMint,
          collectionUpdateAuthority: candyMachine.authority,
          mintArgs: {
            solPayment: some({
              destination: publicKey(
                process.env.NEXT_PUBLIC_DESTINATION_PUBLIC_KEY || ""
              ),
            }),
          },
          nftMint,
        })
      );
  }, [candyGuard, candyMachine, umi]);

  const handleMint = useCallback(async () => {
    if (!candyMachine) return;

    setIsLoading(true);
    try {
      const transaction = buildMintTransaction();
      if (!transaction) throw new Error("Failed to build transaction");
      await transaction.sendAndConfirm(umi);
      toast.success(t("mintSuccess"));
      await Promise.all([getBalance(), getCandyMachine()]);
    } catch (error) {
      toast.error(error instanceof Error ? t("mintError") : t("unknownError"));
    } finally {
      setIsLoading(false);
    }
  }, [buildMintTransaction, candyMachine, getBalance, getCandyMachine, t, umi]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          className="w-full flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          disabled
          // max={Number(candyMachine?.data.itemsAvailable)}
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

      <MintButtonContent isLoading={isLoading} lng={lng} onMint={handleMint} />
    </div>
  );
}

function MintButtonContent({
  isLoading,
  lng,
  onMint,
}: {
  isLoading: boolean;
  lng: string;
  onMint: () => void;
}) {
  const { t } = useTranslation(lng);
  const wallet = useWallet();
  const { balance, candyGuard, candyMachine } = useUmi();

  const btnClass = cn(
    "flex w-full items-center justify-center gap-2 rounded-lg",
    "bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4",
    "font-bold text-white transition-all duration-200",
    "hover:scale-[1.02] hover:from-blue-600 hover:to-purple-600",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "disabled:hover:scale-100",
    "disabled:hover:from-blue-500 disabled:hover:to-purple-500"
  );

  const isInsufficientBalance = useMemo(() => {
    if (!candyGuard || !balance) return true;

    const price =
      candyGuard.guards.solPayment.__option === "Some"
        ? candyGuard.guards.solPayment.value.lamports.basisPoints
        : 0;

    return balance < price;
  }, [balance, candyGuard]);

  if (!wallet.publicKey)
    return (
      <button className={btnClass} disabled>
        <Wallet2 className="size-4" />
        <span>{t("connectWallet")}</span>
      </button>
    );

  if (!candyMachine) {
    return (
      <button className={btnClass} disabled>
        <PackageX className="size-4" />
        <span>{t("candyMachineNotFound")}</span>
      </button>
    );
  }

  if (isLoading) {
    return (
      <button className={btnClass} disabled>
        <Loader2 className="size-4 animate-spin" />
        <span>{t("minting")}</span>
      </button>
    );
  }

  if (isInsufficientBalance) {
    return (
      <button className={btnClass} disabled>
        <CircleDollarSign className="size-4" />
        <span>{t("insufficientBalance")}</span>
      </button>
    );
  }

  if (
    candyMachine &&
    candyMachine.itemsRedeemed >= candyMachine.data.itemsAvailable
  ) {
    return (
      <button className={btnClass} disabled>
        <Coins className="size-4" />
        <span>{t("soldOut")}</span>
      </button>
    );
  }

  return (
    <button className={btnClass} onClick={onMint}>
      <Wand2 className="size-4" />
      <span>{t("mintNow")}</span>
    </button>
  );
}

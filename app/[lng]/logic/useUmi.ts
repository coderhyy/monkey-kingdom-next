import {
  CandyGuard,
  CandyMachine,
  DefaultGuardSet,
  fetchCandyGuard,
  fetchCandyMachine,
  mplCandyMachine,
} from "@metaplex-foundation/mpl-candy-machine";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { lamports, publicKey, SolAmount } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useState } from "react";

export function useUmi() {
  const NETWORK =
    process.env.NEXT_PUBLIC_NETWORK || "https://api.devnet.solana.com";

  const CANDY_MACHINE_PUBLIC_KEY = publicKey(
    process.env.NEXT_PUBLIC_CANDY_MACHINE_PUBLIC_KEY || ""
  );

  const DESTINATION_PUBLIC_KEY = publicKey(
    process.env.NEXT_PUBLIC_DESTINATION_PUBLIC_KEY || ""
  );

  const { connection } = useConnection();
  const wallet = useWallet();

  const [balance, setBalance] = useState<SolAmount>();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();
  const [candyGuard, setCandyGuard] = useState<CandyGuard<DefaultGuardSet>>();

  const umi = createUmi(NETWORK)
    .use(mplTokenMetadata())
    .use(mplCandyMachine())
    .use(walletAdapterIdentity(wallet));

  const getBalances = useCallback(async () => {
    if (!wallet.publicKey) return;
    // 获取 SOL 余额
    const balance = await connection.getBalance(wallet.publicKey);
    setBalance(lamports(balance));
  }, [connection, wallet.publicKey]);

  const getCandyMachine = useCallback(async () => {
    const _candyMachine = await fetchCandyMachine(
      umi,
      CANDY_MACHINE_PUBLIC_KEY
    );
    const _candyGuard = await fetchCandyGuard(umi, _candyMachine.mintAuthority);
    setCandyMachine(_candyMachine);
    setCandyGuard(_candyGuard);
  }, [CANDY_MACHINE_PUBLIC_KEY, umi]);

  return {
    balance,
    candyGuard,
    candyMachine,
    DESTINATION_PUBLIC_KEY,
    getBalances,
    getCandyMachine,
    NETWORK,
    umi,
    wallet,
  };
}

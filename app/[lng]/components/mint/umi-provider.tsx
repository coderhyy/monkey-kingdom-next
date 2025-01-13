import { useCluster } from "@/components/cluster/cluster-provider";
import {
  CandyGuard,
  CandyMachine,
  DefaultGuardSet,
  fetchCandyGuard,
  fetchCandyMachine,
  mplCandyMachine,
} from "@metaplex-foundation/mpl-candy-machine";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey, Umi } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface UmiProviderContext {
  balance: number;
  candyGuard: CandyGuard<DefaultGuardSet> | null;
  candyMachine: CandyMachine | null;
  getBalance: () => Promise<void>;
  getCandyMachine: () => Promise<void>;
  umi: Umi;
}

const Context = createContext<UmiProviderContext>({} as UmiProviderContext);

export function UmiProvider({ children }: { children: React.ReactNode }) {
  const { cluster } = useCluster();
  const { connection } = useConnection();
  const wallet = useWallet();

  const [balance, setBalance] = useState(0);
  const [candyMachine, setCandyMachine] = useState<CandyMachine | null>(null);
  const [candyGuard, setCandyGuard] =
    useState<CandyGuard<DefaultGuardSet> | null>(null);

  const umi = useMemo(
    () =>
      createUmi(cluster.endpoint)
        .use(mplTokenMetadata())
        .use(mplCandyMachine())
        .use(walletAdapterIdentity(wallet)),
    [cluster.endpoint, wallet]
  );

  const getBalance = useCallback(async () => {
    if (!wallet.publicKey) {
      setBalance(0);
      return;
    }
    try {
      const balance = await connection.getBalance(wallet.publicKey);
      setBalance(balance);
    } catch (error) {
      console.error(error);
      setBalance(0);
    }
  }, [connection, wallet.publicKey]);

  const getCandyMachine = useCallback(async () => {
    try {
      if (!cluster.candyMachinePublicKey) {
        setCandyMachine(null);
        setCandyGuard(null);
        return;
      }

      const _candyMachine = await fetchCandyMachine(
        umi,
        publicKey(cluster.candyMachinePublicKey)
      );
      setCandyMachine(_candyMachine);

      const _candyGuard = await fetchCandyGuard(
        umi,
        _candyMachine.mintAuthority
      );
      setCandyGuard(_candyGuard);
    } catch (error) {
      console.error(error);
      setCandyMachine(null);
      setCandyGuard(null);
    }
  }, [cluster.candyMachinePublicKey, umi]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  useEffect(() => {
    getCandyMachine();
  }, [getCandyMachine]);

  const value: UmiProviderContext = {
    balance,
    candyGuard,
    candyMachine,
    getBalance,
    getCandyMachine,
    umi,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useUmi() {
  return useContext(Context);
}

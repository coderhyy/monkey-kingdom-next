"use client";

import {
  fetchCandyMachine,
  mintV2,
  mplCandyMachine,
  safeFetchCandyGuard,
} from "@metaplex-foundation/mpl-candy-machine";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { setComputeUnitLimit } from "@metaplex-foundation/mpl-toolbox";
import {
  generateSigner,
  publicKey,
  some,
  transactionBuilder,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";

export function Balance() {
  // 收款地址
  const destination = publicKey("8SwRHB8rzuPDBGkFtUhYdfyQG7Qsjk5qXNoNAdQ2hdar");

  const wallet = useWallet();

  const umi = createUmi(clusterApiUrl(WalletAdapterNetwork.Devnet))
    .use(mplTokenMetadata())
    .use(mplCandyMachine())
    .use(walletAdapterIdentity(wallet));

  const handleMint = async () => {
    const candyMachinePublicKey = publicKey(
      "94YWELc8fFa6Pbic22ScaNuCK7yN6zEfPXS9nCMZiZiQ"
    );
    const candyMachine = await fetchCandyMachine(umi, candyMachinePublicKey);
    const candyGuard = await safeFetchCandyGuard(
      umi,
      candyMachine.mintAuthority
    );

    console.log(candyMachine, candyGuard);

    try {
      // Mint from the Candy Machine.
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
                destination,
              }),
            },
            nftMint,
          })
        )
        .sendAndConfirm(umi);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button className="p-4 bg-blue-500 text-white" onClick={handleMint}>
        Mint
      </button>
    </div>
  );
}

"use client";

import Image from "next/image";

import { MintActions } from "./mint-actions";
import { MintInfo } from "./mint-info";
import { UmiProvider } from "./umi-provider";

export function MintCard({ lng }: { lng: string }) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-gray-700 bg-gray-800/50 p-6 shadow-xl backdrop-blur-sm">
      {/* NFT 预览 */}
      <div className="relative mb-6">
        <Image
          alt="NFT Preview"
          className="w-full rounded-lg"
          height={500}
          src="/images/nft-preview.gif"
          width={500}
        />
      </div>

      <UmiProvider>
        <div className="space-y-6">
          <MintInfo lng={lng} />
          <MintActions lng={lng} />
        </div>
      </UmiProvider>
    </div>
  );
}

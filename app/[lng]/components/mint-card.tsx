"use client";

import Image from "next/image";

import { useUmi } from "../logic/useUmi";
import { UmiContext } from "../logic/useUmiContext";
import { MintActions } from "./mint-actions";
import { MintInfo } from "./mint-info";

export function MintCard({ lng }: { lng: string }) {
  const value = useUmi();

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

      <UmiContext.Provider value={value}>
        <div className="space-y-6">
          <div className="rounded-lg bg-gray-900/50 p-4">
            <MintInfo lng={lng} />
          </div>

          <MintActions lng={lng} />
        </div>
      </UmiContext.Provider>
    </div>
  );
}

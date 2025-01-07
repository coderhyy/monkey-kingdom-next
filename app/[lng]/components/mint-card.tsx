"use client";

import Image from "next/image";

import { useUmi } from "../logic/useUmi";
import { UmiContext } from "../logic/useUmiContext";
import { MintActions } from "./mint-actions";
import { MintInfo } from "./mint-info";

export function MintCard({ lng }: { lng: string }) {
  const value = useUmi();

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700 max-w-xl mx-auto">
      {/* NFT 预览 */}
      <div className="mb-6 relative">
        <Image
          alt="NFT Preview"
          className="rounded-lg w-full"
          height={500}
          src="/images/nft-preview.gif"
          width={500}
        />
      </div>

      <UmiContext.Provider value={value}>
        <div className="space-y-6">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <MintInfo lng={lng} />
          </div>

          <MintActions lng={lng} />
        </div>
      </UmiContext.Provider>
    </div>
  );
}

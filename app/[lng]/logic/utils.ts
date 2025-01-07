import { SolAmount } from "@metaplex-foundation/umi";

export const getSol = (solAmount: SolAmount | undefined) => {
  if (!solAmount) return 0;
  return Number(solAmount.basisPoints) / Math.pow(10, solAmount.decimals);
};

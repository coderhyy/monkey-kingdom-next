import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ellipsify(str = "", len = 4) {
  if (str.length > 30) {
    return (
      str.substring(0, len) + ".." + str.substring(str.length - len, str.length)
    );
  }
  return str;
}

export function lamportsToSol(lamports: bigint | number) {
  return Math.round((Number(lamports) / LAMPORTS_PER_SOL) * 100000) / 100000;
}

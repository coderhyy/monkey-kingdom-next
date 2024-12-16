"use client";

import { useTranslation } from "@/app/i18n/client";
import { languages } from "@/app/i18n/settings";
import Link from "next/link";

export function LanguageSwitcher({ lng }: { lng: string }) {
  const { t } = useTranslation(lng);

  return (
    <div>
      {languages
        .filter((l) => lng !== l)
        .map((l) => {
          return (
            <Link
              className="bg-[#512da8] leading-[48px] h-[48px] px-[24px] hover:bg-[#1a1f2e] block min-w-28 text-center rounded-[4px]"
              href={`/${l}`}
              key={l}
            >
              {t(l)}
            </Link>
          );
        })}
    </div>
  );
}

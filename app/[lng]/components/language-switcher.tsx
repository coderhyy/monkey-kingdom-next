"use client";

import { useTranslation } from "@/app/i18n/client";
import { languages } from "@/app/i18n/settings";
import { Globe } from "lucide-react";
import Link from "next/link";

export function LanguageSwitcher({ lng }: { lng: string }) {
  const { t } = useTranslation(lng);

  return (
    <div className="flex items-center gap-2">
      {languages
        .filter((l) => lng !== l)
        .map((l) => {
          return (
            <Link
              className="flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-2 font-medium text-gray-100 transition-all duration-200 hover:border-blue-500/20 hover:bg-gray-700/50"
              href={`/${l}`}
              key={l}
            >
              <Globe className="size-4 text-blue-400" />
              {t(l)}
            </Link>
          );
        })}
    </div>
  );
}

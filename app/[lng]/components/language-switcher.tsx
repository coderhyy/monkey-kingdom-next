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
              className="bg-gray-800/50 text-gray-100 hover:bg-gray-700/50 border border-gray-700 rounded-xl px-4 py-2 transition-all duration-200 hover:border-blue-500/20 font-medium flex items-center gap-2"
              href={`/${l}`}
              key={l}
            >
              <Globe className="w-4 h-4 text-blue-400" />
              {t(l)}
            </Link>
          );
        })}
    </div>
  );
}

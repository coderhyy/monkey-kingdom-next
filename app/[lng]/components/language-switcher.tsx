"use client";

import { useTranslation } from "@/app/i18n/client";
import { languages } from "@/app/i18n/settings";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function LanguageSwitcher({ lng }: { lng: string }) {
  const { t } = useTranslation(lng);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{t(lng)}</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {languages.map((l) => (
          <DropdownMenu.Item asChild key={l}>
            <Link href={`/${l}`}>{t(l)}</Link>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

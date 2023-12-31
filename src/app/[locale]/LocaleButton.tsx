"use client";

import { useChangeLocale, useCurrentLocale } from "~/locales/client";
import type { LocaleCode } from "~/locales/server";
import { Suspense } from "react";

export default function LocaleButton({ locale }: { locale: LocaleCode }) {
  const activeLocale = useCurrentLocale();
  const isActive = locale === activeLocale;
  const changeLocale = useChangeLocale({ preserveSearchParams: true });

  return (
    <Suspense>
      <button onClick={() => changeLocale(locale)} disabled={isActive}>
        {locale}
      </button>
    </Suspense>
  );
}

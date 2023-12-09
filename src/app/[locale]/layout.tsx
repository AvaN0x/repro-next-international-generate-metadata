import { Inter } from "next/font/google";
import { Providers } from "~/app/[locale]/providers";
import { getI18n, getStaticParams } from "~/locales/server";
import type { LocaleCode } from "~/locales/server";
import { fallbackLocale, locales } from "~/locales/shared";
import { notFound } from "next/navigation";
import { setStaticParamsLocale } from "next-international/server";

const inter = Inter({ subsets: ["latin"] });

export const generateMetadata = async ({
  params,
}: {
  params: { locale: LocaleCode };
}) => {
  setStaticParamsLocale(
    locales.includes(params.locale) ? params.locale : fallbackLocale
  );

  const t = await getI18n();

  // To easily test without getI18n, you can use this instead:
  // const t = (s: string) => s;

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
};

export function generateStaticParams() {
  return getStaticParams();
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: LocaleCode };
}) {
  // This is a fallback for when the locale is not valid.
  if (!locales.includes(locale)) {
    console.log("locale not found", locale);
    return notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}

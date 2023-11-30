import { getI18n } from "~/locales/server";
import { setStaticParamsLocale } from "next-international/server";
import LocaleButton from "~/app/[locale]/LocaleButton";

export default async function Page({ params }: { params: { locale: string } }) {
  setStaticParamsLocale(params.locale);
  const t = await getI18n();

  return (
    <main>
      {/* Using `a` instead of `Link` on purpose to not show the errors early from next prefetch */}
      <a href="/a.a">Link to a.a (display "Not found" in dev, not in start)</a>
      <p>{t("test")}</p>

      {/* These are not needed for the repro, but I added them for convenience */}
      <LocaleButton locale="en" />
      <LocaleButton locale="fr" />
    </main>
  );
}

import { getI18n } from "~/locales/server";
import { setStaticParamsLocale } from "next-international/server";

export default async function NotFound({
  params,
}: {
  params: { locale: string };
}) {
  setStaticParamsLocale(params.locale);
  const t = await getI18n();

  return (
    <div>
      <h1>Not found: {t("test")}</h1>
    </div>
  );
}

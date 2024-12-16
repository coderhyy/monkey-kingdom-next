import { getTranslation } from "../i18n";
import { Balance } from "./components/balance";

export default async function Home({ params }: { params: { lng: string } }) {
  const { lng } = await params;
  const { t } = await getTranslation(lng);

  return (
    <>
      <h1 className="text-2xl font-bold">{t("welcome")}</h1>
      <p>{t("description")}</p>
      <Balance />
    </>
  );
}

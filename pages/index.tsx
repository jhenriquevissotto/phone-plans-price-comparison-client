import { Fragment as MyDocument } from "react";
import { MainLayout } from "~/view/layouts/main-layout";
import { HomeScreen } from "~/view/screens/home-screen";
import { Helmet } from "react-helmet";
import { useTranslation } from "~/react/hooks";

const locales = {
  title: {
    en: "Phone Plans Price Comparison",
    br: "Comparação de Preços de Planos de Telefonia",
  },
};

export default function PageIndex() {
  const { lang } = useTranslation();

  return (
    <MyDocument>
      <Helmet title={locales.title[lang]} />
      <MainLayout>
        <HomeScreen />
      </MainLayout>
    </MyDocument>
  );
}

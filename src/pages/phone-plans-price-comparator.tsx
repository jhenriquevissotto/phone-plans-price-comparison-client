import { Fragment as MyDocument } from "react";
import { MainLayout } from "~/src/view/layouts/main-layout";
import { PhonePlansPriceComparatorScreen } from "~/src/view/screens/phone-plans-price-comparator-screen";
import { useTranslation } from "~/src/react/hooks";
import NextHead from "next/head";
// import { Helmet } from "react-helmet"

const locales = {
  title: {
    en: "Phone Plans Price Comparison",
    br: "Comparação de Preços de Planos de Telefonia",
  },
};

export default function PhonePlansPriceComparatorPage() {
  const { lang } = useTranslation();

  return (
    <MyDocument>
      {/* <Helmet title={locales.title[lang]} /> */}
      <NextHead>
        <title>{locales.title[lang]}</title>
      </NextHead>
      <MainLayout>
        <PhonePlansPriceComparatorScreen />
      </MainLayout>
    </MyDocument>
  );
}

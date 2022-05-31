import { css } from "~/src/libs/css";
import { useTranslation } from "~/src/react/hooks";
import { TanguageToogle } from "~/src/view/components/toogles/language-toogle";

const S = {
  header: css({
    height: 80,
    background: "linear-gradient(to bottom, rgba(32,32,97,1), #181549)",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  markName: css({
    fontSize: 30,
    fontWeight: 600,
  }),
};

const locales = {
  markName: {
    en: "PHONE PLANS PRICE COMPARATOR",
    br: "COMPARADOR DE PREÇOS DE PLANOS DE TELEFONIA",
  },
};

export function Header() {
  const { lang } = useTranslation();

  return (
    <header style={S.header}>
      <div></div>
      <div>
        <h1 style={S.markName}>{locales.markName[lang]}</h1>
      </div>
      <div>
        <TanguageToogle style={{ marginLeft: -120 }} />
      </div>
    </header>
  );
}

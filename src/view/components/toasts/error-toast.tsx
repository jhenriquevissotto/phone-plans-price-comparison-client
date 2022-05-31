import { css } from "~/src/libs/css";
import { useTranslation } from "~/src/react/hooks";

module Types {
  export type Props = {
    style?: React.CSSProperties;
  };
}

const S = {
  toast: css({
    height: 28,
    background: "linear-gradient(to bottom, #a71d31, #741c25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  text: css({
    marginTop: -2,
    fontSize: 15,
  }),
};

const locales = {
  fields: {
    en: 'Fields "From", "To", "Time" and "Plan" must be filled',
    br: 'Campos "Origem", "Destino", "Tempo" e "Plano" devem ser preenchidos',
  },
};

export function ErrorToast(props: Types.Props) {
  const { lang } = useTranslation();

  return (
    <div style={{ ...S.toast, ...props?.style }}>
      <p style={S.text}>{locales.fields[lang]}</p>
    </div>
  );
}

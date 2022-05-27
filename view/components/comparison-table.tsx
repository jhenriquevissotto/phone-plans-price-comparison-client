import { css } from "~/libs/css";
import { useTranslation } from "~/react/hooks";
import { isNil } from "lodash";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

module Types {
  export type Props = {
    style: React.CSSProperties;
  };
}

const S = {
  table: css({
    borderRadius: 12,
    overflow: "hidden",
  }),
  col: css({
    backgroundColor: "rgba(255,255,255, 0.20)",
    width: 120,
    height: 45,
    overflow: "hidden",
  }),
  text: css({
    textAlign: "center",
    fontSize: 15,
    whiteSpace: "nowrap",
  }),
  iconContainer: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  HighlightOffIcon: css({
    cursor: "pointer",
  }),
};

const locales = {
  edit: {
    en: "Edit",
    br: "Editar",
  },
  from: {
    en: "From",
    br: "Origem",
  },
  to: {
    en: "To",
    br: "Destino",
  },
  time: {
    en: "Time",
    br: "Tempo",
  },
  plan: {
    en: "Plan",
    br: "Plano",
  },
  withPlan: {
    en: "With Plan",
    br: "Com Plano",
  },
  withoutPlan: {
    en: "Without Plan",
    br: "Sem Plano",
  },
};

const dataset = [
  {
    from: 11,
    to: 16,
    time: 20,
    plan_slug_en: "talk-more-30",
    plan_slug_pt: "fale-mais-30",
    plan_name_en: "Talk More 30",
    plan_name_pt: "Fale Mais 30",
    withPlan: 0.0,
    withoutPlan: 38.0,
  },
  {
    from: 11,
    to: 17,
    time: 80,
    plan_slug_en: "talk-more-60",
    plan_slug_pt: "fale-mais-60",
    plan_name_en: "Talk More 60",
    plan_name_pt: "Fale Mais 60",
    withPlan: 37.4,
    withoutPlan: 136.0,
  },
  {
    from: 18,
    to: 11,
    time: 11,
    plan_slug_en: "talk-more-120",
    plan_slug_pt: "fale-mais-120",
    plan_name_en: "Talk More 120",
    plan_name_pt: "Fale Mais 120",
    withPlan: 167.2,
    withoutPlan: 380.0,
  },
  {
    from: 18,
    to: 17,
    time: 100,
    plan_slug_en: "talk-more-30",
    plan_slug_pt: "fale-mais-30",
    plan_name_en: "Talk More 30",
    plan_name_pt: "Fale Mais 30",
    withPlan: null,
    withoutPlan: null,
  },
];

export function ComparisonTable(props: Types.Props) {
  const { lang } = useTranslation();

  const handlers = {
    onClickRemove: ({ index }: { index: number }) => {
      alert(`Remove row ${index}`);
    },
  };

  return (
    <table style={{ ...S.table, ...props.style }}>
      <thead>
        <tr>
          <th style={S.col}>
            <p style={S.text}>{locales.edit[lang]}</p>
          </th>
          <th style={S.col}>
            <p style={S.text}>{locales.from[lang]}</p>
          </th>
          <th style={S.col}>
            <p style={S.text}>{locales.to[lang]}</p>
          </th>
          <th style={S.col}>
            <p style={S.text}>{locales.time[lang]}</p>
          </th>
          <th style={S.col}>
            <p style={S.text}>{locales.plan[lang]}</p>
          </th>
          <th style={S.col}>
            <p style={S.text}>{locales.withPlan[lang]}</p>
          </th>
          <th style={S.col}>
            <p style={S.text}>{locales.withoutPlan[lang]}</p>
          </th>
        </tr>
      </thead>
      <tbody>
        {dataset.map((item, index) => {
          const planName = {
            en: item.plan_name_en,
            br: item.plan_name_pt,
          }[lang];

          const withPlan = isNil(item.withPlan)
            ? ""
            : `R$${item.withPlan?.toFixed(2)}`;

          const withoutPlan = isNil(item.withoutPlan)
            ? ""
            : `R$${item.withoutPlan?.toFixed(2)}`;

          return (
            <tr key={index}>
              <td style={S.col}>
                <div style={S.iconContainer}>
                  <HighlightOffIcon
                    style={S.HighlightOffIcon}
                    onClick={() => handlers.onClickRemove({ index })}
                  />
                </div>
              </td>
              <td style={S.col}>
                <p style={S.text}>{item.from}</p>
              </td>
              <td style={S.col}>
                <p style={S.text}>{item.to}</p>
              </td>
              <td style={S.col}>
                <p style={S.text}>{item.time}</p>
              </td>
              <td style={S.col}>
                <p style={S.text}>{planName}</p>
              </td>
              <td style={S.col}>
                <p style={S.text}>{withPlan}</p>
              </td>
              <td style={S.col}>
                <p style={S.text}>{withoutPlan}</p>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

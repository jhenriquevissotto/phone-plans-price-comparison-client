import { css } from "~/src/libs/css";
import { useTranslation, useQueries, useRouter } from "~/src/react/hooks";
import { isNil } from "lodash";
import { useSelector, useDispatch } from "~/src/react/hooks/redux";
import { toast } from "~/src/redux/stores/application";
import { table } from "~/src/redux/stores/components";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { tableForm } from "~/src/redux/stores/forms";
import { tdPlan, trPrice, tdRegion } from "~/src/redux/stores/database";
import { useImmer } from "use-immer";
import { useEffect, useMemo } from "react";
import { createID } from "~/src/libs";

module Types {
  export type Props = {
    style?: React.CSSProperties;
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
  icon: css({
    cursor: "pointer",
  }),
  input: css({
    width: "100%",
    backgroundColor: "transparent",
    textAlign: "center",
    outline: "none",
    border: "none",
    fontSize: 15,
  }),
  select: css({
    width: "100%",
    backgroundColor: "transparent",
    textAlign: "center",
    outline: "none",
    border: "none",
    fontSize: 15,
  }),
  option: {
    backgroundColor: "transparent",
  },
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

export function ComparisonTable(props: Types.Props) {
  const { lang } = useTranslation();
  const { router } = useRouter();
  const { dispatch } = useDispatch();
  const { setQuery } = useQueries();

  const { dataset } = useSelector(table.selectors.getState);
  const { fields } = useSelector(tableForm.selectors.getState);
  const tdRegionData = useSelector(tdRegion.selectors.getState)?.data;
  const tdPlanData = useSelector(tdPlan.selectors.getState)?.data;

  const trPriceRowByFKs = useSelector(
    trPrice.selectors.getTrPriceRowByFKs(
      Number(fields.selectFrom),
      Number(fields.selectTo)
    )
  );

  const [state, setState] = useImmer({
    tableForm: {
      from: fields.selectFrom,
    },
  });

  const tdPlanRowById = useSelector(
    tdPlan.selectors.getTdPlanRowBySlug(state.tableForm.from)
  );

  const localeString = useMemo(() => {
    return {
      en: "en-US",
      br: "pt-BR",
    }[lang];
  }, [lang]);

  const withPlan = useMemo(() => {
    const freeMinutes = Number(tdPlanRowById?.freeMinutes);
    const premium = Number(tdPlanRowById?.premium);

    const time = Number(fields.inputTime);
    const feePerMin = Number(trPriceRowByFKs?.feePerMin);

    const isOverFreeTime = time > freeMinutes;
    const exceededFreeTime = isOverFreeTime ? time - freeMinutes : 0;

    const planCallFee = exceededFreeTime * feePerMin * (1 + premium);

    if (isNaN(planCallFee))
      return {
        value: null,
        custom: null,
      };

    return {
      value: planCallFee,
      custom: `R$${planCallFee.toLocaleString(localeString, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    };
  }, [tdPlanRowById, fields.inputTime, trPriceRowByFKs?.feePerMin]);

  const withoutPlan = useMemo(() => {
    const time = Number(fields.inputTime);
    const feePerMin = Number(trPriceRowByFKs?.feePerMin);
    const withoutPlan = time * feePerMin;

    if (isNaN(withoutPlan))
      return {
        value: null,
        custom: null,
      };

    return {
      value: withoutPlan,
      custom: `R$${withoutPlan.toLocaleString(localeString, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    };
  }, [fields.inputTime, trPriceRowByFKs?.feePerMin, localeString]);

  const handlers = {
    table: {
      onClick: {
        deleteRow({ rowID }: { rowID: string }) {
          dispatch(table.actions.deleteRow({ rowID }));
        },
        insertRow() {
          if (
            !fields.inputTime ||
            !fields.selectFrom ||
            !fields.selectPlan ||
            !fields.selectTo
          ) {
            dispatch(toast.actions.showErrorToast());
            return;
          }

          dispatch(
            table.actions.insertRow({
              rowID: createID(),
              from: Number(fields.selectFrom),
              to: Number(fields.selectTo),
              time: Number(fields.inputTime),
              plan_id: fields.selectPlan,
              plan_slug_en: tdPlanRowById.slug_en,
              plan_slug_pt: tdPlanRowById.slug_pt,
              plan_name_en: tdPlanRowById.name_en,
              plan_name_pt: tdPlanRowById.name_pt,
              withPlan: withPlan.value,
              withoutPlan: withoutPlan.value,
            })
          );

          // reset all form fields
          let _asPath = `${router.asPath}`;
          _asPath = setQuery.from(undefined, _asPath).asPath;
          _asPath = setQuery.plan(undefined, _asPath).asPath;
          _asPath = setQuery.time(undefined, _asPath).asPath;
          _asPath = setQuery.to(undefined, _asPath).asPath;
          router.push(_asPath);
        },
      },
    },
    tableForm: {
      onChange: {
        selectFrom({ from }: { from: string }) {
          router.push(setQuery.from(from || undefined).asPath);
        },
        selectTo({ to }: { to: string }) {
          router.push(setQuery.to(to || undefined).asPath);
        },
        selectPlan({ plan }: { plan: string }) {
          setState((state) => {
            state.tableForm.from = plan;
          });
        },
        inputTime({ time }: { time: number }) {
          router.push(setQuery.time(String(time) || undefined).asPath);
        },
      },
    },
  };

  useEffect(() => {
    if (state.tableForm.from == "") {
      router.push(setQuery.plan(undefined).asPath);
      return;
    }

    const planSlug = {
      en: tdPlanRowById?.slug_en,
      br: tdPlanRowById?.slug_pt,
    }[lang];

    router.push(setQuery.plan(planSlug || state.tableForm.from).asPath);
  }, [tdPlanRowById]);

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
        {dataset.map((item) => {
          const planName = {
            en: item.plan_name_en,
            br: item.plan_name_pt,
          }[lang];

          const withPlan = isNil(item.withPlan)
            ? ""
            : `R$${item.withPlan?.toLocaleString(localeString, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`;

          const withoutPlan = isNil(item.withoutPlan)
            ? ""
            : `R$${item.withoutPlan?.toLocaleString(localeString, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`;

          return (
            <tr key={item.rowID}>
              <td style={S.col}>
                <div style={S.iconContainer}>
                  <HighlightOffIcon
                    style={S.icon}
                    onClick={() =>
                      handlers.table.onClick.deleteRow({ rowID: item.rowID })
                    }
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

        <tr>
          <td style={S.col}>
            <div style={S.iconContainer}>
              <AddCircleOutlineIcon
                style={S.icon}
                onClick={handlers.table.onClick.insertRow}
              />
            </div>
          </td>
          <td style={S.col}>
            {/* ====================================== */}
            {/* ================ FROM ================ */}
            {/* ====================================== */}
            <select
              style={S.select}
              required={true}
              value={fields.selectFrom}
              onChange={(event) =>
                handlers.tableForm.onChange.selectFrom({
                  from: event.currentTarget.value,
                })
              }
            >
              <option value="" />
              {tdRegionData?.map((f) => (
                <option key={f.id_code} value={f.id_code}>
                  {f.id_code}
                </option>
              ))}
            </select>
          </td>
          <td style={S.col}>
            {/* ==================================== */}
            {/* ================ TO ================ */}
            {/* ==================================== */}
            <select
              style={S.select}
              required={true}
              value={fields.selectTo}
              onChange={(event) =>
                handlers.tableForm.onChange.selectTo({
                  to: event.currentTarget.value,
                })
              }
            >
              <option value="" />
              {tdRegionData?.map((f) => (
                <option key={f.id_code} value={f.id_code}>
                  {f.id_code}
                </option>
              ))}
            </select>
          </td>
          <td style={S.col}>
            {/* ====================================== */}
            {/* ================ TIME ================ */}
            {/* ====================================== */}
            <input
              style={S.input}
              spellCheck={false}
              type="number"
              min={0}
              step={1}
              required={true}
              value={fields.inputTime}
              onChange={(event) =>
                handlers.tableForm.onChange.inputTime({
                  time: Number(event.currentTarget.value),
                })
              }
            />
          </td>
          <td style={S.col}>
            {/* ====================================== */}
            {/* ================ PLAN ================ */}
            {/* ====================================== */}
            <select
              style={S.select}
              required={true}
              value={fields.selectPlan}
              onChange={(event) =>
                handlers.tableForm.onChange.selectPlan({
                  plan: event.currentTarget.value,
                })
              }
            >
              <option value="" />
              {tdPlanData?.map((f) => (
                <option key={f.id} value={f.id}>
                  {{ en: f.name_en, br: f.name_pt }[lang]}
                </option>
              ))}
            </select>
          </td>
          <td style={S.col}>
            <p style={S.text}>{withPlan.custom}</p>
          </td>
          <td style={S.col}>
            <p style={S.text}>{withoutPlan.custom}</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

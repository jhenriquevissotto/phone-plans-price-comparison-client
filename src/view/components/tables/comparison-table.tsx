import { css } from "~/src/libs/css";
import { useTranslation } from "~/src/react/hooks";
import { isNil } from "lodash";
import { useSelector, useDispatch } from "~/src/react/hooks/redux";
import { toast } from "~/src/redux/stores/application";
import { table } from "~/src/redux/stores/components";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useImmer } from "use-immer";
import { createID } from "~/src/libs/create-id";

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
  const { dispatch } = useDispatch();

  const { dataset } = useSelector(table.selectors.getState);

  const formCtrl = (() => {
    const [state, setState] = useImmer({
      select: {
        from: "",
        to: "",
        plan: "",
      },
      input: {
        time: "",
      },
    });

    const actions = {
      resetFields() {
        setState((state) => {
          state.select.from = "";
          state.select.to = "";
          state.select.plan = "";
          state.input.time = "";
        });
      },
    };

    return { state, setState, actions };
  })();

  const handlers = {
    table: {
      onClick: {
        deleteRow({ rowID }: { rowID: string }) {
          dispatch(table.actions.deleteRow({ rowID }));
        },
        insertRow() {
          const { from, plan, to } = formCtrl.state.select;
          const { time } = formCtrl.state.input;

          if (!from || !plan || !to || !time) {
            dispatch(toast.actions.showErrorToast());
            return;
          }

          dispatch(
            table.actions.insertRow({
              rowID: createID(),
              from: Number(from),
              to: Number(to),
              time: Number(time),
              plan_id: plan,
              plan_slug_en: null,
              plan_slug_pt: null,
              plan_name_en: null,
              plan_name_pt: null,
              withPlan: null,
              withoutPlan: null,
            })
          );

          formCtrl.actions.resetFields();
        },
      },
    },
    formCtrl: {
      onChange: {
        select: {
          from({ from }: { from: string }) {
            formCtrl.setState((state) => {
              state.select.from = from;
            });
          },
          to({ to }: { to: string }) {
            formCtrl.setState((state) => {
              state.select.to = to;
            });
          },
          plan({ plan }: { plan: string }) {
            formCtrl.setState((state) => {
              state.select.plan = plan;
            });
          },
        },
        input: {
          time({ time }: { time: number }) {
            formCtrl.setState((state) => {
              state.input.time = String(time);
            });
          },
        },
      },
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
        {dataset.map((item) => {
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
              value={formCtrl.state.select.from}
              onChange={(event) =>
                handlers.formCtrl.onChange.select.from({
                  from: event.currentTarget.value,
                })
              }
            >
              <option value="" />
              <option value="11">{11}</option>
              <option value="16">{16}</option>
              <option value="17">{17}</option>
              <option value="18">{18}</option>
            </select>
          </td>
          <td style={S.col}>
            {/* ==================================== */}
            {/* ================ TO ================ */}
            {/* ==================================== */}
            <select
              style={S.select}
              required={true}
              value={formCtrl.state.select.to}
              onChange={(event) =>
                handlers.formCtrl.onChange.select.to({
                  to: event.currentTarget.value,
                })
              }
            >
              <option value="" />
              <option value="11">{11}</option>
              <option value="16">{16}</option>
              <option value="17">{17}</option>
              <option value="18">{18}</option>
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
              value={formCtrl.state.input.time}
              onChange={(event) =>
                handlers.formCtrl.onChange.input.time({
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
              value={formCtrl.state.select.plan}
              onChange={(event) =>
                handlers.formCtrl.onChange.select.plan({
                  plan: event.currentTarget.value,
                })
              }
            >
              <option value="" />
              <option value="talk-more-30">Fale Mais 30</option>
              <option value="talk-more-60">Fale Mais 60</option>
              <option value="talk-more-120">Fale Mais 120</option>
            </select>
          </td>
          <td style={S.col}></td>
          <td style={S.col}></td>
        </tr>
      </tbody>
    </table>
  );
}

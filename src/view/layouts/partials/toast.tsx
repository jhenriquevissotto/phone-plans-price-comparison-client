import { css } from "~/src/libs/css";
import { useSelector } from "~/src/react/hooks/redux";
import { ErrorToast } from "~/src/view/components/toasts/error-toast";
import { If } from "react-if";
import { toast } from "~/src/redux/stores/application";

module Types {
  export type Props = {
    style?: React.CSSProperties;
  };
}

const S = {
  toast: css({
    width: "100%",
  }),
  ErrorToast: css({
    width: "100%",
  }),
};

export function Toast(props: Types.Props) {
  const { showErrorToast } = useSelector(toast.selectors.getState);

  return (
    <div style={{ ...S.toast, ...props?.style }}>
      <If condition={showErrorToast}>
        <ErrorToast style={S.ErrorToast} />
      </If>
    </div>
  );
}

import { useSetLanguage, useTranslation } from "~/src/react/hooks";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { AvailableLocales } from "~/src/locales/available-locales";

module Types {
  export type Props = {
    style?: React.CSSProperties;
  };
}

export function TanguageToogle(props: Types.Props) {
  const { lang } = useTranslation();

  const Components = {
    Button: (props: { lang: AvailableLocales }) => (
      <ToggleButton
        value={props.lang}
        onClick={() => useSetLanguage(props.lang)}
        style={{
          backgroundColor: lang === props.lang && "rgba(91, 171, 179, 0.2)",
        }}
      >
        <p>{props.lang.toLocaleUpperCase()}</p>
      </ToggleButton>
    ),
  };

  return (
    <ToggleButtonGroup style={props?.style} value={lang} exclusive={true}>
      <Components.Button lang="en" />
      <Components.Button lang="br" />
    </ToggleButtonGroup>
  );
}

import setLanguage from "next-translate/setLanguage";
import { AvailableLocales } from "~/src/locales/available-locales";

export function useSetLanguage(locale: AvailableLocales, scroll?: boolean) {
  return setLanguage(locale, scroll) as Promise<boolean>;
}

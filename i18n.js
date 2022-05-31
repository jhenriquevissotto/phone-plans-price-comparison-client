module.exports = {
  locales: ["en", "br"],
  defaultLocale: "en",
  pages: {
    "*": ["common"],
  },
  loadLocaleFrom: (lang, ns) => {
    return import(`./src/locales/${lang}/${ns}.json`).then((m) => m.default);
  },
};

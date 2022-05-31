/** @type {import('next').NextConfig} */

const nextTranslate = require("next-translate");
const { routes } = require("./src/router/routes");

const nextConfig = nextTranslate({
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },

  rewrites: async () => [
    {
      source: routes.phonePlansPriceComparator().url.br,
      destination: routes.phonePlansPriceComparator().url.en,
    },
  ],
});

module.exports = nextConfig;

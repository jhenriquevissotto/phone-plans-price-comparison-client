/** @type {import('next').NextConfig} */

const nextTranslate = require("next-translate");
const { nextRoutes } = require("./src/routes/next-routes");

const nextConfig = nextTranslate({
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },

  rewrites: async () => [
    {
      source: nextRoutes.phonePlansPriceComparator.url.br,
      destination: nextRoutes.phonePlansPriceComparator.url.en,
    },
  ],
});

module.exports = nextConfig;

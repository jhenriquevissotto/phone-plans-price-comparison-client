/** @type {import('next').NextConfig} */

const nextTranslate = require("next-translate");
// const { routes } = require("./src/router/routes");

const nextConfig = nextTranslate({
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },

  rewrites: async () => [
    {
      source: "/comparador-de-precos-de-planos-de-telefonia",
      destination: "/phone-plans-price-comparator",
    },
  ],
});

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en-US", "pt-BR"],
    defaultLocale: "pt-BR",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "./styles/variables.scss";`,
  },
};

module.exports = nextConfig;

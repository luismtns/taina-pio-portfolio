/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en-US", "pt-BR"],
    defaultLocale: "pt-BR",
    localeDetection: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "./styles/variables.scss";
    @import "./styles/functions.scss"; `,
  },
  async rewrites() {
    return [
      {
        source: "/projetos",
        destination: "/projects",
      },
      {
        source: "/sobre",
        destination: "/about",
      },
    ];
  },
};

module.exports = nextConfig;

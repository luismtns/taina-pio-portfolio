import PropTypes from "prop-types";
import Head from "next/head";
import { useRouter } from "next/router";

import { HEADER } from "../../constants/header";
import Meta from "../meta";
import Header from "../header";
import Cursor from "components/cursor";

const Layout = ({ children, meta }) => {
  const { locale, locales, defaultLocale, asPath } = useRouter();
  return (
    <div className="layout">
      <Meta
        {...(meta || {})}
        title={(meta || {}).title}
        description={
          (meta || {}).description ||
          "The latest font releases and recommendations. Plus code snippets, bookmarks, and project updates."
        }
      />
      <Header {...HEADER[locale]} />
      <main className="layout__main">{children}</main>
      <Cursor />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
  meta: PropTypes.object,
};

export default Layout;

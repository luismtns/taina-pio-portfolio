import PropTypes from "prop-types";
import Head from "next/head";

import Meta from "../meta";
import Header from "../header";

const Layout = ({ children, meta, header }) => {
  return (
    <div className="layout">
      <Meta
        {...(meta || {})}
        title={(meta || {}).title}
        description={
          (meta || {}).description ||
          "Tainá é designer, com foco em realizar propostas gráficas, impressas e digitais para identidades visuais, livros, sinalizações e sites."
        }
      />
      <Header name={header?.summary} aboutText={header?.body}/>
      <main className="layout__main">{children}</main>
      {/* <Cursor /> */}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
  meta: PropTypes.object,
};

export default Layout;

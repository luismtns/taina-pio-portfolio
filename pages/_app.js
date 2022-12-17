import "../styles/global.scss";
import "react-flexbox-grid/dist/react-flexbox-grid.css";
import "modern-css-reset/dist/reset.min.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

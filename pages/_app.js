import "../styles/global.scss";
import "modern-css-reset/dist/reset.min.css";
import { setConfiguration } from "react-grid-system";

function MyApp({ Component, pageProps }) {
  setConfiguration({ maxScreenClass: "xl" });
  return <Component {...pageProps} />;
}

export default MyApp;

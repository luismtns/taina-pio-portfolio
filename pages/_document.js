import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-br">
        <Head>
          {/* {!this.props.inAmpMode &&
            <>
              <script dangerouslySetInnerHTML={{ __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.GTM_CONTAINER_ID}');
              `}} />
            </>
          } */}

          {/* <meta name="google-site-verification" content="" /> */}
          {/* <meta name="p:domain_verify" content="" /> */}

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin={"true"}
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />
          {/* <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" /> */}
        </Head>

        <body>
          <Main />
          <NextScript />

          {/* {!this.props.inAmpMode &&
            <>
              <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GTM_CONTAINER_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />

              <script async defer data-pin-hover="true" data-pin-tall="true" data-pin-round="true" src="//assets.pinterest.com/js/pinit.js" />
            </>
          } */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;

import React, { ReactPropTypes } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Grid, Row, Col } from "react-flexbox-grid/dist/react-flexbox-grid";
import cn from "classnames";

import styles from "./Header.module.scss";

const Header = ({ name, links }) => {
  const { locale, locales, defaultLocale, asPath } = useRouter();
  return (
    <div className={styles.header}>
      <Grid fluid>
        <Row>
          <Col xs={12} lg={4}>
            <h2>{name}</h2>
          </Col>
          <Col xs={12} lg={4}>
            {links && (
              <ul className={styles.header__links}>
                {links.map(({ path, label }, k) => (
                  <li key={k}>
                    <Link href={path}>{label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </Col>
          <Col xs={12} lg={4}>
            {locales && (
              <div className={styles.header__locales}>
                {locales.reverse().map((local, k) => (
                  <React.Fragment key={k}>
                    <Link
                      href={`${
                        local == defaultLocale ? "" : `/${local}`
                      }${asPath}`}
                      locale={false}
                      className={cn({
                        [styles.active]: local == locale,
                      })}
                    >
                      {local.split("-")[0]}
                    </Link>
                    {k + 1 < locales.length && "/"}
                  </React.Fragment>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

Header.propTypes = {};

export default Header;

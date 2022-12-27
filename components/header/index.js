import React, { ReactPropTypes, useState } from "react";
import { Col, Container, Hidden, Row, Visible } from "react-grid-system";
import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";

import styles from "./Header.module.scss";
import Button from "components/button";

const Header = ({ name, links }) => {
  const { locale, locales, defaultLocale, asPath } = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLinkClick = () => {
    if (menuVisible) {
      setMenuVisible(false);
    }
  };
  return (
    <div className={styles.header}>
      <Container fluid>
        <Row align="center">
          <Col xs={8} lg={4}>
            <Link href={"about"} onClick={handleLinkClick}>
              <h2>{name}</h2>
            </Link>
          </Col>
          <Visible xs sm md>
            <Col xs={4} lg={0}>
              <Button
                onClick={() => setMenuVisible((v) => !v)}
                className={styles.btnMenu}
              />
            </Col>
          </Visible>
          <Col
            className={cn(styles.menu, { [styles.visible]: menuVisible })}
            xs={12}
            lg={8}
          >
            <Row>
              <Col xs={12} lg={6}>
                {links && (
                  <ul className={styles.header__links}>
                    {links.map(({ path, label }, k) => (
                      <li key={k}>
                        <Link href={path} onClick={handleLinkClick}>
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </Col>
              <Col xs={12} lg={6}>
                {locales && (
                  <div className={styles.header__locales}>
                    {locales.reverse().map((local, k) => (
                      <React.Fragment key={k}>
                        <Link
                          href={`${local == defaultLocale ? "/" : `/${local}`}`}
                          locale={false}
                          className={cn({
                            [styles.active]: local == locale,
                          })}
                          onClick={handleLinkClick}
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
          </Col>
        </Row>
      </Container>
    </div>
  );
};

Header.propTypes = {};

export default Header;

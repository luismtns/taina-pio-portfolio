import React, { ReactPropTypes, useState } from "react";
import { Col, Container, Hidden, Row, Visible } from "react-grid-system";
import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";

import styles from "./Header.module.scss";
import Button from "components/button";
import { TEXTS } from "constants/texts";

const Header = ({ name, aboutPath, links }) => {
  const { locale, locales, defaultLocale, asPath } = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);

  const handleLinkClick = () => {
    if (menuVisible) {
      setMenuVisible(false);
    }
  };
  return (
    <div className={styles.header}>
      <div
        onMouseOut={() => setTimeout(() => setAboutVisible(false), 200)}
        onMouseOver={() => setTimeout(() => setAboutVisible(true), 200)}
        className={cn(styles.about, {
          [styles["about--active"]]: !!aboutVisible,
        })}
      >
        <Container fluid>
          <Row>
            <Col xs={12} md={6}>
              <p className={styles.text}>{TEXTS[locale]?.about}</p>
            </Col>
          </Row>
        </Container>
      </div>
      <Container fluid>
        <Row align="center">
          <Col
            onMouseOver={() => setTimeout(() => setAboutVisible(true), 200)}
            onMouseOut={() => setTimeout(() => setAboutVisible(false), 200)}
            xs={8}
            md={4}
          >
            {/* <Link href={aboutPath} onClick={handleLinkClick}> */}
            <h2 className={styles.title}>{name}</h2>
            {/* </Link> */}
          </Col>
          <Visible xs sm>
            <Col xs={4} md={0}>
              <Button
                onClick={() => setMenuVisible((v) => !v)}
                className={cn(styles.btnMenu, {
                  [styles["btnMenu-active"]]: !!menuVisible,
                })}
              />
            </Col>
          </Visible>
          <Col
            className={cn(styles.menu, { [styles.visible]: menuVisible })}
            xs={12}
            md={8}
          >
            <Row>
              <Col xs={12} md={6}>
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
              <Col xs={12} md={6}>
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

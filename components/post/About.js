import { useEffect, useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { Col, Container, Row } from "react-grid-system";
import { getParagraphs, getTitle } from "utils/html";

import styles from "./About.module.scss";

const About = ({ post }) => {
  const [isMounted, setIsMounted] = useState(false);

  // const isTablet = useMediaQuery({
  //   query: "(min-width: 768px)",
  // });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && (
        <div className={styles.about}>
          <Container fluid>
            <Row>
              <Col xs={12}>
                <div
                  className={styles.title}
                  dangerouslySetInnerHTML={{ __html: getTitle(post.caption) }}
                />
                <div className={styles.content}>
                  <div className={styles.grid}>
                    {getParagraphs(post.caption).map((__html, k) => (
                      <span
                        key={k}
                        className={styles.content__text}
                        dangerouslySetInnerHTML={{ __html }}
                      />
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

About.propTypes = {
  post: PropTypes.object,
  nextPost: PropTypes.string,
  prevPost: PropTypes.string,
};

export default About;

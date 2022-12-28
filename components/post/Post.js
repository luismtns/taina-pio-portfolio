import { useEffect, useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import Link from "next/link";
import { Col, Container, Row } from "react-grid-system";
import { getParagraphs, getTitle } from "utils/html";

import styles from "./Post.module.scss";

import TextBlock from "./TextBlock";
import MediaBlock from "./MediaBlock";

const Post = ({ post, nextPost, prevPost }) => {
  const [isMounted, setIsMounted] = useState(false);

  // const isTablet = useMediaQuery({
  //   query: "(min-width: 768px)",
  // });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <article className={styles.post}>
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
      <Container>
        <Row align="center">
          <Col xs={0} lg={1}>
            <Link
              className={cn(styles.post__prev, styles.arrow)}
              href={prevPost}
            ></Link>
          </Col>
          <Col xs={12} lg={10}>
            {isMounted && (
              <div className="post__body">
                {post.type === "text" && <TextBlock post={post} />}
                {post.type === "photo" && <MediaBlock post={post} />}
                {post.type === "photoset" && <MediaBlock post={post} />}
                {post.type === "video" && <MediaBlock post={post} />}
              </div>
            )}
          </Col>
          <Col xs={0} lg={1}>
            <Link
              className={cn(styles.post__next, styles.arrow)}
              href={nextPost}
            ></Link>
          </Col>
        </Row>

        {/* {isMounted && <Details post={post} />} */}
      </Container>
    </article>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  nextPost: PropTypes.string,
  prevPost: PropTypes.string,
};

export default Post;

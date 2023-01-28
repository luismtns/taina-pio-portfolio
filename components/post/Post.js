import { useEffect, useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import Link from "next/link";
import { Col, Container, Row } from "react-grid-system";
import { getParagraphs, getTitle } from "utils/html";

import styles from "./Post.module.scss";

import TextBlock from "./TextBlock";
import MediaBlock from "./MediaBlock";

const Post = ({ post, enableImageChange }) => {
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
        <div className={styles.post__body}>
          {post.type === "text" && <TextBlock post={post} />}
          {post.type === "photo" && (
            <MediaBlock post={post} enableImageChange={enableImageChange} />
          )}
          {post.type === "photoset" && <MediaBlock post={post} />}
          {post.type === "video" && <MediaBlock post={post} />}
        </div>
      )}

      {/* {isMounted && <Details post={post} />} */}
    </article>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  nextPost: PropTypes.string,
  prevPost: PropTypes.string,
};

export default Post;

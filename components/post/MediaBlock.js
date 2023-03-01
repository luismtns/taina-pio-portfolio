import React, { useState } from "react";
import PropTypes from "prop-types";
import { Hidden, useScreenClass, Visible } from "react-grid-system";
import cn from "classnames";

import styles from "./MediaBlock.module.scss";
import MyCarousel from "components/carousel";
import PostImage from "./Image";

const MediaBlock = ({ post, enableImageChange }) => {
  const screenClass = useScreenClass();

  const [currentPhoto, setCurrentPhoto] = useState(0);
  const nextPhoto = (newIndex) => {
    setTimeout(() => {
      if (post.photos[newIndex]) {
        setCurrentPhoto(newIndex);
      } else {
        setCurrentPhoto(0);
      }
    }, 200);
  };

  React.useEffect(() => {
    setCurrentPhoto(0);
    return () => {
      setCurrentPhoto(0);
    };
  }, []);

  let PhotosWrapper = screenClass.includes("xs", "sm", "md")
    ? MyCarousel
    : (props) => <div {...props} />;
  return (
    <div className={styles.media}>
      {/* <div dangerouslySetInnerHTML={{ __html: post.caption }} /> */}
      {post && post.photos && (
        <div className={styles.photos}>
          {/* <PhotosWrapper> */}
          {post.photos.map((photo, i) => {
            return (
              <div
                className={cn(styles.photos__item, {
                  [styles.visible]: currentPhoto == i,
                  [styles.clickable]: true,
                })}
                key={i}
                onClick={
                  enableImageChange ? () => nextPhoto(currentPhoto + 1) : null
                }
              >
                <PostImage
                  alt=""
                  src={photo.original_size.url}
                  width={photo.original_size.width}
                  height={photo.original_size.height}
                />
                <div dangerouslySetInnerHTML={{ __html: photo.caption }} />
              </div>
            );
          })}
          {/* </PhotosWrapper> */}
        </div>
      )}
    </div>
  );
};

MediaBlock.propTypes = {
  post: PropTypes.object,
};

export default MediaBlock;

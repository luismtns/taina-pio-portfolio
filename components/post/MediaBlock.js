import React, { useState } from "react";
import PropTypes from "prop-types";
import { Hidden, useScreenClass, Visible } from "react-grid-system";
import cn from "classnames";
import Image from "next/image";

import styles from "./MediaBlock.module.scss";
import MyCarousel from "components/carousel";

const MediaBlock = ({ post, enableImageChange }) => {
  const screenClass = useScreenClass();

  const [currentPhoto, setCurrentPhoto] = useState(0);
  const nextPhoto = (newIndex) => {
    if (!enableImageChange) return;
    if (post.photos[newIndex]) {
      setCurrentPhoto(newIndex);
    } else {
      setCurrentPhoto(0);
    }
  };

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
                })}
                key={i}
                onClick={() => nextPhoto(currentPhoto + 1)}
              >
                <img alt="" src={photo.original_size.url} />
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

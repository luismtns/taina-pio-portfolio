import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Hidden, useScreenClass, Visible } from "react-grid-system";
import cn from "classnames";
import Image from "next/image";

import styles from "./MediaBlock.module.scss";
import MyCarousel from "components/carousel";

const MediaBlock = ({ post }) => {
  const screenClass = useScreenClass();

  const [currentPhoto, setCurrentPhoto] = useState(0);
  const nextPhoto = (newIndex) => {
    if (post.photos[newIndex]) {
      setCurrentPhoto(newIndex);
    } else {
      setCurrentPhoto(0);
    }
  };

  let PhotosWrapper = screenClass.includes("xs", "sm", "md")
    ? MyCarousel
    : Fragment;
  return (
    <div className={styles.media}>
      {/* <div dangerouslySetInnerHTML={{ __html: post.caption }} /> */}
      {post.photos && (
        <div className={styles.photos}>
          <PhotosWrapper>
            {post.photos.map((photo, i) => {
              return (
                <div
                  className={cn(styles.photos__item, {
                    [styles.visible]: screenClass.includes("xs", "sm", "md")
                      ? true
                      : currentPhoto == i,
                  })}
                  key={i}
                >
                  <img alt="" src={photo.original_size.url} />
                  <div dangerouslySetInnerHTML={{ __html: photo.caption }} />
                </div>
              );
            })}
          </PhotosWrapper>
        </div>
      )}
      <div
        className={styles.nextPhoto}
        onClick={() => nextPhoto(currentPhoto + 1)}
      />

      {/* {post.video && post.video.youtube && (
        <div className="media__content media__content--video">
          <iframe
            width="700"
            height="383"
            src={`https://www.youtube.com/embed/${post.video.youtube.video_id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )} */}
    </div>
  );
};

MediaBlock.propTypes = {
  post: PropTypes.object,
};

export default MediaBlock;

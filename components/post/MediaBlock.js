import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./MediaBlock.module.scss";
import Image from "next/image";
import cn from "classnames";

const MediaBlock = ({ post }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const nextPhoto = (newIndex) => {
    if (post.photos[newIndex]) {
      setCurrentPhoto(newIndex);
    } else {
      setCurrentPhoto(0);
    }
  };
  return (
    <div className={styles.media}>
      {/* <div dangerouslySetInnerHTML={{ __html: post.caption }} /> */}
      {post.photos && (
        <div className={styles.photos}>
          {post.photos.map((photo, i) => {
            return (
              <div
                className={cn(styles.photos__item, {
                  [styles.visible]: currentPhoto == i,
                })}
                key={i}
              >
                <img alt="" src={photo.original_size.url} />
                <div dangerouslySetInnerHTML={{ __html: photo.caption }} />
              </div>
            );
          })}
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

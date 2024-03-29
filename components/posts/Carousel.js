import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import cn from "classnames";

import { TEXTS } from "constants/texts";

import styles from "./Carousel.module.scss";

import Post from "components/post/Post";
import MyCarousel from "components/carousel";
import About from "components/post/About";

const PostsCarousel = ({ posts, initialIndex }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [index, setIndex] = useState(initialIndex);
  const { locale } = useRouter();
  const handlePostChange = (index) => {
    setIndex(index);
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div className={styles.postsCarousel}>
      {posts && posts[index] && <About post={posts[index]} />}
      {isMounted && posts ? (
        <>
          <MyCarousel
            className={styles.carousel}
            initialSlide={initialIndex}
            infinite={true}
            focusOnSelect={true}
            afterChange={handlePostChange}
            swipe={false}
            variableWidth={true}
            centerMode={true}
            adaptiveHeight={true}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {posts.map((e, k) => (
              <Post key={k} post={e} enableImageChange={k == index} />
            ))}
          </MyCarousel>
        </>
      ) : (
        <div className={cn(styles.item, styles.empty)}>
          <h2>{TEXTS[locale].projectEmpty}</h2>
        </div>
      )}
    </div>
  );
};

PostsCarousel.propTypes = {
  posts: PropTypes.array,
};

export default PostsCarousel;

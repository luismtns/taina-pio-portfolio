import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import cn from "classnames";

import { FEATURED_TAGS } from "constants/featuredTags";
import { TEXTS } from "constants/texts";
import { getTitle } from "../../utils/html";

import styles from "./List.module.scss";

import Post from "components/post/Post";
import MyCarousel from "components/carousel";
import About from "components/post/About";

const PostsList = ({ posts, initialIndex }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const { locale } = useRouter();
  const handlePostChange = (index) => {
    setIndex(index);
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div className={styles.postslist}>
      {isMounted && posts ? (
        <>
          {posts[index] && <About post={posts[index]} />}
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
          >
            {posts.map((post, k) => (
              <Post key={k} post={post} enableImageChange={k == index} />
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

PostsList.propTypes = {
  posts: PropTypes.array,
};

export default PostsList;

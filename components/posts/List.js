import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Visible } from "react-grid-system";
import cn from "classnames";

import { FEATURED_TAGS } from "constants/featuredTags";
import { TEXTS } from "constants/texts";
import { getTitle } from "../../utils/html";

import styles from "./List.module.scss";

import Button from "../button";
import Image from "next/image";
import Link from "next/link";
import Post from "components/post/Post";
import MyCarousel from "components/carousel";
import About from "components/post/About";

const PostsList = ({ posts }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const { locale } = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  console.log({ posts, index });
  return (
    <div className={styles.postslist}>
      {isMounted && posts ? (
        <>
          {posts[index] && <About post={posts[index]} />}
          <MyCarousel
            useTransform={false}
            focusOnSelect={true}
            afterChange={setIndex}
          >
            {posts.map((post, k) => (
              <Post post={post} enableImageChange={k == index} />
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

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

const PostsList = ({ posts }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { locale } = useRouter();
  const [filter, setFilter] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const handleFilterChange = (v) => {
    setFilter((current) =>
      current.includes(v) ? current.filter((e) => e != v) : [...current, v]
    );
  };

  const filteredPosts = (_posts, _filter) => {
    return _posts.filter(({ tags }) => {
      if (_filter.length < 1) {
        return true;
      } else {
        return _filter.some((v) => tags.includes(v));
      }
    });
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div className={styles.postslist}>
      <Visible xs sm md>
        <Button
          onClick={() => setFilterVisible((v) => !v)}
          className={cn(styles.toggleFilterBtn, {
            [styles.active]: filterVisible,
          })}
        >
          <h2>{TEXTS[locale].filters}</h2>
        </Button>
      </Visible>
      <div
        className={cn(styles.item, styles.tagsfilter, {
          [styles.visible]: filterVisible,
        })}
      >
        {FEATURED_TAGS.map(({ name, slug, icon }, k) => (
          <Button
            key={k}
            className={styles.btn}
            onClick={() => handleFilterChange(slug)}
            active={filter.includes(slug)}
          >
            {name[locale]}
            <Visible xs sm md>
              <Image
                className={styles.icon}
                src={icon}
                alt={name[locale] || slug}
              />
            </Visible>
          </Button>
        ))}
      </div>
      {isMounted && filteredPosts(posts, filter).length > 0 ? (
        filteredPosts(posts, filter).map((post, k) => (
          <Link href={`/${post.slug}`} className={styles.item} key={k}>
            <div
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: getTitle(post.caption) }}
            />
            <div className={styles.tags}>
              {FEATURED_TAGS.map(({ icon, name, slug }, k) => (
                <div
                  key={k}
                  className={cn(styles.tagItem, {
                    [styles.visible]: post.tags.includes(slug),
                  })}
                >
                  <Image src={icon} alt={name[locale] || slug} />
                </div>
              ))}
            </div>
          </Link>
        ))
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

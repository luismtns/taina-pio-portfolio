import PropTypes from "prop-types";
import { useState } from "react";
import { useRouter } from "next/router";
import { FEATURED_TAGS } from "constants/featuredTags";
import cn from "classnames";

import styles from "./List.module.scss";

import { getTitle } from "../../utils/html";
import Button from "../button";
import Image from "next/image";
import { TEXTS } from "constants/texts";
import Link from "next/link";

const PostsList = ({ posts }) => {
  const { locale } = useRouter();
  const [filter, setFilter] = useState([]);
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
  return (
    <div className={styles.postslist}>
      <div className={cn(styles.item, styles.tagsfilter)}>
        {FEATURED_TAGS.map(({ name, slug, icon }, k) => (
          <Button
            key={k}
            className={styles.btn}
            onClick={() => handleFilterChange(slug)}
            active={filter.includes(slug)}
          >
            {name[locale]}
          </Button>
        ))}
      </div>
      {filteredPosts(posts, filter).length > 0 ? (
        filteredPosts(posts, filter).map((post, k) => (
          <Link href={`/${post.id}`} className={styles.item} key={k}>
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

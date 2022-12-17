import PropTypes from "prop-types";
import Link from "next/link";
import styles from "./Details.styles.js";

const Details = ({ post }) => {
  return (
    <div className="details">
      <ul className="details__list">
        <li className="details__item details__item--em details__item--type">
          <Link href={post.pathname}>{post.type}</Link>
        </li>

        {(post.tags || []).map((tag, i) => {
          return (
            <li key={i} className="details__item">
              <Link href={`/tagged/${tag.replace(/ /g, "-")}`}>{tag}</Link>
            </li>
          );
        })}
      </ul>

      {post.reblogged_from_name && post.reblogged_from_url && (
        <ul className="details__list">
          <li className="details__item">
            <a href={post.reblogged_from_url}>
              Reblogged from {post.reblogged_from_name}
            </a>
          </li>
        </ul>
      )}

      <ul className="details__list">
        {post.note_count > 0 && (
          <li className="details__item details__item--em">
            <Link href={post.pathname}>
              {post.note_count} Note{post.note_count !== 1 ? "s" : ""}
            </Link>
          </li>
        )}

        <li className="details__item">
          <Link
            className="dsq-comment-count disqus-comment-count"
            href={`${process.env.NEXT_PUBLIC_BASE_URL}${post.pathname}#disqus_thread`}
          >
            Comments
          </Link>
        </li>
      </ul>

      <style jsx global>
        {styles}
      </style>
    </div>
  );
};

Details.propTypes = {
  post: PropTypes.object,
};

export default Details;

import PropTypes from "prop-types";
import Link from "next/link";
import styles from "./Pagination.styles.js";

const Pagination = ({ pagination, paginationPath }) => {
  return (
    <ul className="pagination">
      {pagination.prevPage && (
        <li className="pagination__item pagination__item--prev">
          <Link
            href={
              pagination.prevPage === 2
                ? "/"
                : `${paginationPath ? paginationPath : ""}/page/${
                    pagination.prevPage
                  }`
            }
          >
            <a
              rel="prev"
              data-ga-category="blog pagination"
              data-ga-click="true"
            >
              Prev
            </a>
          </Link>
        </li>
      )}

      {pagination.nextPage && (
        <li className="pagination__item pagination__item--next">
          <Link
            href={`${paginationPath ? paginationPath : ""}/page/${
              pagination.nextPage
            }`}
          >
            Next
          </Link>
        </li>
      )}

      <style jsx global>
        {styles}
      </style>
    </ul>
  );
};

Pagination.propTypes = {
  posts: PropTypes.array,
  pagination: PropTypes.object,
};

export default Pagination;

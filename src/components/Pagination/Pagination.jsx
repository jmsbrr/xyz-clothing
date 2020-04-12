import React from "react";
import _ from "lodash";
import "./styles.scss";

function renderPage(page, currentPage, onPageChange) {
  const currentClass = page === currentPage ? "btn--primary" : "btn--ghost";

  return (
    <li key={page} className="pagination__page">
      <button
        className={`pagination__btn btn ${currentClass}`}
        onClick={() => onPageChange(page)}
      >
        {page}
      </button>
    </li>
  );
}

const Pagination = ({ itemCount, currentPage, pageSize, onPageChange }) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  const pages = _.range(1, pageCount + 1);

  return (
    <ul className="pagination">
      {pages.map(page => renderPage(page, currentPage, onPageChange))}
    </ul>
  );
};

export default Pagination;

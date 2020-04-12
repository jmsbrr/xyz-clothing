import React from "react";
import _ from "lodash";
import Button from "../Button";
import "./styles.scss";

const getClasses = isCurrent => {
  return (isCurrent ? "button--primary" : "button--ghost") + " pagination__btn";
};

const renderPageButton = (page, currentPage, onPageChange) => {
  return (
    <li key={page} className="pagination__page">
      <Button
        label={page}
        modifier={getClasses(page === currentPage)}
        config={{ onClick: () => onPageChange(page) }}
      />
    </li>
  );
};

const Pagination = ({ itemCount, currentPage, pageSize, onPageChange }) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  const pages = _.range(1, pageCount + 1);

  return (
    <ul className="pagination">
      {pages.map(page => renderPageButton(page, currentPage, onPageChange))}
    </ul>
  );
};

export default Pagination;

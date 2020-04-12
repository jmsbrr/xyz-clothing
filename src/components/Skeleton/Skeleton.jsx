import React from "react";
import "./styles.scss";

const Skeleton = () => {
  return (
    <div className="skeleton">
      <div className="skeleton__row"></div>
      <div className="skeleton__row"></div>
      <div className="skeleton__row"></div>
    </div>
  );
};

export default Skeleton;

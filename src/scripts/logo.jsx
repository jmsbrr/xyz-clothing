import React from "react";
import logoImgSrc from "../images/XYZClothing-logo.svg";

const logo = () => {
  return (
    <div className="logo">
      <img
        className="logo__img"
        src={logoImgSrc}
        alt="XYZ Clothing company logo"
      />
    </div>
  );
};

export default logo;

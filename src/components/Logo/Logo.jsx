import React from "react";
import logoImgSrc from "../../images/XYZClothing-logo.svg";
import "./styles.scss";

const Logo = () => {
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

export default Logo;

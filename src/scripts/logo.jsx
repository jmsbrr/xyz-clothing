import React, { Component } from "react";
import logoImgSrc from "../images/XYZClothing-logo.svg";

class logo extends Component {
  render() {
    return (
      <div className="logo">
        <img
          className="logo__img"
          src={logoImgSrc}
          alt="XYZ Clothing company logo"
        />
      </div>
    );
  }
}

export default logo;

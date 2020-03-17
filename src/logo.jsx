import React, { Component } from "react";
import logoImgSrc from "./XYZClothing-logo.svg";

class logo extends Component {
  render() {
    return (
      <div className="logo">
        <img src={logoImgSrc} />
      </div>
    );
  }
}

export default logo;

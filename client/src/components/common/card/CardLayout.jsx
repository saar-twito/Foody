import React from "react";
import './style.css'

const CardLayout = (props) => (
  <div className="col-sm-12 col-md-4 col-lg-3 mb-5 d-flex align-items-stretch">
    <div className="card">{props.children}</div>
  </div>
);

export default CardLayout;

import React from "react";

const Thumb = props => {
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={props.token ? "fa fa-thumbs-o-up" : "fa fa-thumbs-o-down"}
      aria-hidden="true"
    />
  );
};

export default Thumb;

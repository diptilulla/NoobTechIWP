import React from "react";

function Col({ isOver, children }) {
  const className = isOver ? "highligh-region" : "";
  return <div className={`col${className}`}>{children}</div>;
}

export default Col;

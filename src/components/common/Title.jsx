import React from "react";

const Title = ({ children, className }) => {
  return <p className={`${className} text-2xl font-medium`}>{children} </p>;
};

export default Title;

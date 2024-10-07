import React from "react";
import "./index.scss";

interface LightProps {
  onClick: () => void; // Define the type for the onClick prop
}

const Light: React.FC<LightProps> = ({ onClick }) => {
  return <span onClick={onClick} id="light" className="loader"></span>;
};

export default Light;

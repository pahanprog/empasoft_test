import React from "react";
import "./styles.css";

interface Props {
  title: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

// custom button component, can be put inside or outside of a form
const Button = ({ disabled, title, className, onClick }: Props) => {
  return (
    <button
      className={`${className} ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      type="submit"
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;

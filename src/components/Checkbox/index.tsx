import React from "react";
import Check from "../svgs/Check";
import "./styles.css";

interface Props {
  title: string;
  checked: boolean;
  changeChecked: () => void;
}

// custom checkbox component
const Checkbox = ({ title, checked, changeChecked }: Props) => {
  return (
    <div className="checkbox_container">
      <div className="checkbox" onClick={changeChecked}>
        {checked && <Check />}
      </div>
      <div className="title">{title}</div>
    </div>
  );
};

export default Checkbox;

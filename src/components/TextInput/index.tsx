import React from "react";
import "./styles.css";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  password?: boolean;
  disablePaste?: boolean;
  error?: string;
}

// custom text input component used in forms
const TextInput = ({
  label,
  placeholder,
  value,
  onChange,
  id,
  onBlur,
  password,
  disablePaste,
  error,
}: Props) => {
  const onPasteDisabled = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    return false;
  };

  return (
    <div className="input_container">
      <div className="input_header">
        <label htmlFor={id}>{label}</label>
        {error ? <div className="input_error">{error}</div> : null}
      </div>
      <input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={password ? "password" : "text"}
        onPaste={disablePaste ? onPasteDisabled : undefined}
      />
    </div>
  );
};

export default TextInput;

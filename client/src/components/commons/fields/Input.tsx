import React, { Dispatch, SetStateAction } from "react";
import s from "./Fields.module.scss";

interface IPropsInput {
  type: string;
  placeholder: string;
  readonly: boolean;
  value: string | number;
  setValue: Dispatch<SetStateAction<string | number>>;
}

export default function Input({
  type,
  placeholder,
  readonly,
  value,
  setValue,
}: IPropsInput) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      readOnly={readonly}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

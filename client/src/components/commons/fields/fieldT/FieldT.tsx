import React, { useEffect, useState } from "react";
import s from "../Fields.module.scss";
import { useAppDispatch } from "hooks/redux.hook";
import { setField } from "redux/slice/canvas.slice";
import { IFieldT } from "../types";
import Input from "../Input";

export default function FieldT({
  label, //описание поля
  placeholder,
  type = "text", //тип поля по умолчанию text
  readonly = false, //только для чтения
  val, //значение поля
  id, // id компоненты
  field, // название поля для val компоненты
  variable = false,
}: IFieldT) {
  const [value, setValue] = useState(val);
  let rest: { [key: string]: string | number } = {};
  if (typeof value === "string" || typeof value === "number")
    rest[field] = value;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setField({ id, rest, variable }));
  }, [value]);

  return (
    <div className={s.wrapper}>
      <div className={s.label}>{label}</div>
      <div className={s.input}>
        <Input
          type={type}
          placeholder={placeholder || ""}
          readonly={readonly}
          value={val}
          setValue={setValue}
        />
      </div>
    </div>
  );
}

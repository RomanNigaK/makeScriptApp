import React, { useEffect, useState } from "react";
import s from "../Fields.module.scss";
import { IFieldS } from "../types";
import arrowSelectDownIco from "@public/image/ico/arrowSelectDown.svg";
import { v4 as uuIdv4 } from "uuid";
import { setField } from "redux/slice/canvas.slice";
import { useAppDispatch } from "hooks/redux.hook";
import Input from "../Input";

export default function FieldS({
  label,
  placeholder,
  type = "text",
  readonly = false,
  values,
  val,
  id,
  field,
}: IFieldS) {
  const dispatch = useAppDispatch();

  console.log(values);
  const [_elem, setElem] = useState<HTMLDivElement>();
  const [isShowSelect, setIsShowSelect] = useState(false);
  const [value, setValue] = useState(val);

  let rest: { [key: string]: string | number } = {};
  if (typeof value === "string" || typeof value === "number")
    rest[field] = value;

  const [idDiv, setId] = useState(uuIdv4().replaceAll("-", ""));

  useEffect(() => {
    const elem = document.querySelector(`[id='${idDiv}']`) as HTMLDivElement;
    setElem(elem);
  }, []);

  useEffect(() => {
    const select = _elem?.querySelector(
      `[id='select${idDiv}']`
    ) as HTMLDivElement;
    const img = _elem?.querySelector(`[id='img${idDiv}']`) as HTMLImageElement;

    if (_elem) {
      if (isShowSelect) {
        select.style.display = "block";
        img.style.rotate = "180deg";
      } else {
        select.style.display = "none";
        img.style.rotate = "0deg";
      }
    }
  }, [isShowSelect]);

  useEffect(() => {
    setIsShowSelect(false);
    dispatch(setField({ id, rest }));
  }, [value]);

  return (
    <div className={s.wrapper} id={idDiv}>
      <div className={s.label}>{label}</div>
      <div className={s.input}>
        <Input
          type={type}
          placeholder={placeholder || ""}
          readonly={readonly}
          value={val}
          setValue={setValue}
        />
        <div className={s.images}>
          <img
            src={arrowSelectDownIco}
            alt=""
            onClick={() => setIsShowSelect(isShowSelect ? false : true)}
            id={"img" + idDiv}
          />
        </div>
      </div>
      <div
        className={s.selectItems}
        style={{ width: _elem?.clientWidth! }}
        id={"select" + idDiv}
        onMouseLeave={() => setIsShowSelect(false)}
      >
        {values.length ? (
          values.map((e, i) => {
            return (
              <div
                className={s.item}
                key={i + "item" + label}
                onClick={() => setValue(e)}
              >
                {e}
              </div>
            );
          })
        ) : (
          <div className={s.item}>Нет данных</div>
        )}
      </div>
    </div>
  );
}

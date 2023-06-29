import React, { useEffect, useState } from "react";
import s from "../Fields.module.scss";
import { IFieldF } from "../types";

import audio from "@public/image/ico/audio.svg";

import close from "@public/image/ico/close.svg";
import { setField } from "redux/slice/canvas.slice";
import { useAppDispatch } from "hooks/redux.hook";
import { useUpload } from "hooks/files.hook";
import { setMessage } from "redux/slice/message.slice";

export default function FieldF({
  label, //описание поля
  placeholder,
  type = "text", //тип поля по умолчанию text
  readonly = false, //только для чтения
  val, //значение поля
  id, // id компоненты
  field, // название поля для val компоненты
}: IFieldF) {
  const [files, setFiles] = useState<FileList | null>(null);

  //при выборе фаила произойдет его автоматическая загрузка
  //при удалении уйдет на сервер сообщение с именем фаила для удаления его на сервере
  const { loadFile, deleteFileFromServer } = useUpload();

  const [value, setValue] = useState(val);
  const dispatch = useAppDispatch();

  let rest: { [key: string]: string | number } = {};
  if (typeof value === "string" || typeof value === "number")
    rest[field] = value;

  const loadF = async () => {
    try {
      if (files) await loadFile(files[0], "file", "http://");
      dispatch(setMessage("Фаил загружен"));
    } catch (error: any) {
      dispatch(setMessage(error.message));
    }
  };
  const delF = async () => {
    try {
      await deleteFileFromServer(val as string, "http://");
      dispatch(setMessage("Фаил удален"));
    } catch (error: any) {
      dispatch(setMessage(error.message));
    }
  };

  useEffect(() => {
    setValue(files ? files[0].name : "");
    //if (files) loadF();
    //if (!files) delF();
  }, [files]);

  useEffect(() => {
    dispatch(setField({ id, rest }));
  }, [value]);

  return (
    <div className={s.wrapper}>
      <div className={s.label}>{label}</div>

      <div className={s.input}>
        <input
          type={type}
          placeholder={placeholder}
          value={val}
          readOnly={readonly}
          title={typeof value === "string" ? value : ""}
        />
        <div className={s.images}>
          <label htmlFor={"file"}>
            <img src={audio} alt="" />
          </label>
          {/* // <img src={downloadAudio} alt="" /> */}
          {val && <img src={close} alt="" onClick={() => setFiles(null)} />}
        </div>
      </div>

      <input
        type="file"
        id={"file"}
        onChange={(e) => setFiles(e.target.files)}
        style={{ position: "absolute", marginLeft: "-1000px" }}
        readOnly={true}
      />
    </div>
  );
}

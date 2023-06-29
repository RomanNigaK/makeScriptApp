import React, { useEffect, useState } from "react";
import s from "./Message.module.scss";
import { deleteMessage } from "redux/slice/message.slice";
import { useAppDispatch, useAppSelector } from "hooks/redux.hook";

interface IPropsMessage {
  text: string;
}

export default function Message({ text }: IPropsMessage) {
  const [_elem, setElem] = useState<HTMLDivElement | undefined>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(deleteMessage()), 3000);
    const element = document.querySelector("[id=messageApp]") as HTMLDivElement;
    if (element) setElem(element);
  }, []);

  useEffect(() => {
    if (_elem) {
      const _elemHeight = _elem.offsetHeight;
      const _elemWidth = _elem.offsetWidth;
      const height = window.innerHeight;
      const width = window.innerWidth;
      _elem.style.top = String(height - _elemHeight - 100) + "px";
      _elem.style.left = String(width / 2 - _elemWidth / 2) + "px";
    }
  }, [_elem]);

  return (
    <div className={s.message} id="messageApp">
      <div> {text}</div>
    </div>
  );
}

import { useAppDispatch } from "hooks/redux.hook";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import s from "./DeleteCompCanvas.module.scss";
import { useDrop } from "react-dnd";
import { AvailableComponent, XYCoord } from "components/box/types";
import { deleteCompCanvas } from "redux/slice/canvas.slice";
export default function DeleteCompCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: ["component"],

    drop: (item: AvailableComponent, monitor) => {
      dispatch(deleteCompCanvas());
    },

    hover: (item, monitor) => {},

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  dropRef(ref);
  const [_elem, setElem] = useState<HTMLDivElement | undefined>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (_elem) {
      const height = window.innerHeight;
      const width = window.innerWidth;

      _elem.style.top = String(height - 300) + "px";
      _elem.style.left = String(width - 550) + "px";
    }
  }, [_elem]);

  useEffect(() => {
    const element = document.querySelector("[id=deleteComp]") as HTMLDivElement;
    setElem(element);
  }, []);

  const style: CSSProperties = {
    borderColor: "red",
  };

  return (
    <div
      className={s.deleteCompCanvas}
      id="deleteComp"
      ref={ref}
      style={isOver ? style : {}}
    ></div>
  );
}

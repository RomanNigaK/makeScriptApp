import React, { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import s from "./Canvas.module.scss";

import { useAppDispatch } from "hooks/redux.hook";

import { Canvas, addComponent, moveComponent } from "redux/slice/canvas.slice";

import { XYCoord, AvailableComponent } from "components/box/types";

import Component from "components/box/component/Component";
import DeleteCompCanvas from "components/delCompCanvas/DeleteCompCanvas";

interface IPropsCanvas {
  currentCanvas: Canvas | undefined;
}

export default function Canvas({ currentCanvas }: IPropsCanvas) {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [isMoveComponentOnCanvas, setIsMoveComponentOnCanvas] =
    useState<boolean>();

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: ["component"],

    drop: (item: AvailableComponent, monitor) => {
      const xy = monitor.getClientOffset() as XYCoord;

      if (!item.id) {
        Object.assign(item, xy);
        dispatch(addComponent(item));
      } else {
        if (xy)
          dispatch(moveComponent({ id: item.id, rest: { x: xy.x, y: xy.y } }));
      }
    },

    hover: (item, monitor) => {
      setIsMoveComponentOnCanvas(item.id ? true : false);
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  dropRef(ref);

  return (
    <div ref={ref} className={s.canvas}>
      <div>
        {currentCanvas &&
          currentCanvas.components.map((e, i) => {
            switch (e.type) {
              case "start":
                return (
                  <Component
                    key={i + "component"}
                    type={e.type}
                    name={e.name}
                    id={e.id}
                    x={e.x}
                    y={e.y}
                    next={e.next || 0}
                  />
                );
              case "equally":
                return (
                  <Component
                    key={i + "component"}
                    type={e.type}
                    name={e.name}
                    id={e.id}
                    x={e.x}
                    y={e.y}
                    next={e.next || 0}
                    variable={e.variable}
                    value={e.value}
                  />
                );
              case "play":
                return (
                  <Component
                    key={i + "component"}
                    type={e.type}
                    name={e.name}
                    id={e.id}
                    x={e.x}
                    y={e.y}
                    next={e.next || 0}
                    file={e.file}
                  />
                );
              case "comparison":
                return (
                  <Component
                    key={i + "component"}
                    type={e.type}
                    name={e.name}
                    id={e.id}
                    x={e.x}
                    y={e.y}
                    next={e.next || 0}
                    arg1={e.arg1}
                    arg2={e.arg2}
                    typeComparison="равно"
                    nextFalse={e.nextFalse || 0}
                  />
                );
              case "finish":
                return (
                  <Component
                    key={i + "component"}
                    type={e.type}
                    name={e.name}
                    id={e.id}
                    x={e.x}
                    y={e.y}
                  />
                );
            }
          })}
      </div>
      {isOver && isMoveComponentOnCanvas && (
        <div>
          <DeleteCompCanvas />
        </div>
      )}
    </div>
  );
}

import React from "react";
import s from "./ConstrictorScripts.module.scss";
import Menu from "./menu/Menu";
import { useAppSelector } from "hooks/redux.hook";
import { selectorCanvas, selectorCurrentCanvas } from "redux/selectors";
import Canvas from "./canvas/Canvas";
export default function ConstrictorScripts() {
  const canvas = useAppSelector((state) => selectorCanvas(state));
  const currentCanvasId = useAppSelector((state) =>
    selectorCurrentCanvas(state)
  );

  const currentCanvas = canvas.find((i) => i.id === currentCanvasId);

  return (
    <div className={s.constructorScripts}>
      <div className={s.menu}>
        <Menu canvas={canvas} currentCanvasId={currentCanvasId} />
      </div>

      <div className={s.canvas}>
        {!!!currentCanvasId ? (
          <div className={s.message}>Создайте новый сценарий</div>
        ) : (
          <Canvas currentCanvas={currentCanvas} />
        )}
      </div>
    </div>
  );
}

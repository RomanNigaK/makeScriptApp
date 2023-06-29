import React, { useState } from "react";
import s from "./Menu.module.scss";
import addTab from "@public/image/ico/addTab.svg";
import menu from "@public/image/ico/menu.svg";
import alignComponents from "@public/image/ico/alignComponents.svg";
import clearCanvasIco from "@public/image/ico/clearCanvas.svg";
import saveScriptIco from "@public/image/ico/save.svg";
import deleteCanvasIco from "@public/image/ico/deleteCanvas.svg";
import { useAppDispatch, useAppSelector } from "hooks/redux.hook";
import { selectorCanvas, selectorCurrentCanvas } from "redux/selectors";
import {
  Canvas,
  clearCanvas,
  deleteCanvas,
  editNameScript,
  loadServerFile,
  newCanvas,
  saveScript,
  setCurrentCanvas,
} from "redux/slice/canvas.slice";
import { setMessage } from "redux/slice/message.slice";
import pen from "@public/image/ico/pen.svg";

interface IPropsMenu {
  canvas: Canvas[];
  currentCanvasId: number;
}

export default function Menu({ canvas, currentCanvasId }: IPropsMenu) {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const dispatch = useAppDispatch();

  const newScript = () => {
    if (canvas.length > 4) {
      dispatch(setMessage("Максимальное количество вкладок 5"));
      return;
    }
    dispatch(newCanvas());
  };
  const saveScriptFn = () => {
    dispatch(loadServerFile());
  };
  return (
    <div className={s.menu}>
      <div className={s.newCanvas}>
        <img src={addTab} alt="" onClick={newScript} />
      </div>
      <div className={s.tabCanvas}>
        {canvas &&
          canvas.map((e, i) => {
            const isCurrent = e.id === currentCanvasId;
            return (
              <div
                key={i + "tab"}
                className={isCurrent ? s.active : null}
                onClick={() => {
                  dispatch(setCurrentCanvas(e.id));
                }}
              >
                <Input id={e.id} name={e.name} isCurrent={isCurrent} />
              </div>
            );
          })}
      </div>
      <div className={s.options}>
        <img
          src={menu}
          alt=""
          onClick={() => {
            setIsShowMenu(isShowMenu ? false : true);
          }}
        />
        {isShowMenu && (
          <div className={s.itemsMenu}>
            <div>
              <div>
                <img src={alignComponents} alt="" />
              </div>
              <div>Выровнять</div>
            </div>
            <div>
              <div onClick={() => dispatch(deleteCanvas())}>
                <img src={deleteCanvasIco} alt="" />
              </div>
              <div>Удалить</div>
            </div>
            <div>
              <div onClick={() => dispatch(clearCanvas())}>
                <img src={clearCanvasIco} alt="" />
              </div>
              <div>Очистить</div>
            </div>
            <div>
              <div onClick={saveScriptFn}>
                <img src={saveScriptIco} alt="" />
              </div>
              <div>Сохранить</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface IPropsInput {
  id: number;
  name: string;
  isCurrent: boolean;
}

function Input({ id, name, isCurrent }: IPropsInput) {
  const [isEdit, setIsEdit] = useState(false);
  const [nameScript, setNameScript] = useState(name);
  const dispatch = useAppDispatch();
  const saveNameScript = () => {
    setIsEdit(false);
    dispatch(editNameScript({ id, name: nameScript }));
  };

  return (
    <>
      <div>
        {isEdit ? (
          <input
            type="text"
            onFocus={(e) => e.target.select()}
            value={nameScript}
            onChange={(e) => setNameScript(e.target.value)}
            onBlur={saveNameScript}
            autoFocus
          />
        ) : (
          name
        )}
      </div>
      {isCurrent && (
        <div>
          <img src={pen} alt="" onClick={() => setIsEdit(true)} />
        </div>
      )}
    </>
  );
}

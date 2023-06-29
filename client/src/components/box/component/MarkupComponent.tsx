import React from "react";
import s from "./../box.module.scss";
import { useSelectComponent } from "hooks/select.hook";

import nextIco from "@public/image/ico/back.svg";
import previousIco from "@public/image/ico/next.svg";
import { setComponent } from "redux/slice/canvas.slice";

export default function MarkupComponent(props: any) {
  const { setId, setComp, next, nextFalse, previous, dispatch } =
    useSelectComponent(props.id);

  const isShowNav = props.id > 0 && !!!props.notDrag;

  return (
    <div
      className={props.isChange ? s.box + " " + s.active : s.box}
      style={props.style}
      onMouseUp={setComp}
      onMouseDown={setId}
    >
      <div className={s.header} style={{ background: props.style.borderColor }}>
        <div>
          <div>
            <img src={props.ico} alt="" />
          </div>
          <div>{props.nameHeader}</div>
        </div>
        <div>
          {isShowNav && (
            <>
              {props.type !== "start" && (
                <div>
                  <img
                    src={previousIco}
                    alt=""
                    style={{ opacity: previous ? 1 : 0.4 }}
                  />
                </div>
              )}

              {props.type !== "finish" && (
                <div>
                  <img
                    src={nextIco}
                    alt=""
                    style={{ opacity: next ? 1 : 0.4 }}
                  />
                </div>
              )}
              {props.type === "comparison" && (
                <div>
                  <img
                    src={nextIco}
                    alt=""
                    style={{ opacity: nextFalse ? 1 : 0.4 }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className={s.data}>
        <div>{props.name}</div>

        <div></div>
      </div>
    </div>
  );
}

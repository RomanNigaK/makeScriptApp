import React, { useRef } from "react";
import s from "./Next.module.scss";
import { AvailableComponent, IBox, IStart } from "components/box/types";
import { useDrop } from "react-dnd";
import { useAppDispatch, useAppSelector } from "hooks/redux.hook";
import { setNextCurrentComponent } from "redux/slice/canvas.slice";
import { selectorComponentId, selectorMoveId } from "redux/selectors";
import Component from "components/box/component/Component";
import { setMessage } from "redux/slice/message.slice";

interface IPropsNext {
  id: number;
  next: number;
  label: string;
  field: string; // название поля для val компоненты
}

export default function Next({ id, next, label, field }: IPropsNext) {
  const moveId = useAppSelector((state) => selectorMoveId(state));
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: ["component"],

    drop: (item: AvailableComponent, monitor) => {
      if (item.id === id) {
        return dispatch(
          setMessage("Ошибка: Нельзя назначить этот  компонент как следующий")
        );
      }

      let rest: { [key: string]: string | number } = {};

      rest[field] = moveId;

      dispatch(setNextCurrentComponent({ id, rest }));
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  dropRef(ref);

  const nextComponent = useAppSelector((state) =>
    selectorComponentId(state, next)
  ) as IStart;

  return (
    <div className={s.next} ref={ref}>
      <div className={s.label}>{label}</div>
      <div className={canDrop ? s.animate : undefined}>
        {next ? (
          <Component {...nextComponent} notDrag={true} />
        ) : (
          " Перенесите следующий компонент"
        )}
      </div>
    </div>
  );
}

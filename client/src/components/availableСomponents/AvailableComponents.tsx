import React from "react";
import s from "./AvailableComponents.module.scss";

import Component from "components/box/component/Component";
import { useAppSelector } from "hooks/redux.hook";
import { selectorAvailableComponents } from "redux/selectors";
export default function AvailableComponents() {
  const availableComponents = useAppSelector((state) =>
    selectorAvailableComponents(state)
  );

  return (
    <div className={s.availableComponents}>
      <div className={s.header}>Доступные компоненты</div>
      <div className={s.content}>
        {availableComponents.map((e, i) => {
          return <Component {...e} key={i + "AvailableComponents"} />;
        })}
      </div>
    </div>
  );
}

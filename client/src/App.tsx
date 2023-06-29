import React, { useEffect, useState } from "react";
import "./style/global.scss";
import s from "./App.module.scss";
import AvailableComponents from "components/availableСomponents/AvailableComponents";
import Features from "components/features/Features";
import FieldT from "components/commons/fields/fieldT/FieldT";
import FieldS from "components/commons/fields/fieldS/FieldS";
import FieldF from "components/commons/fields/fieldF/FieldF";
import ConstrictorScripts from "components/constructorScripts/ConstrictorScripts";
import Message from "components/commons/message/Message";
import { useAppDispatch, useAppSelector } from "hooks/redux.hook";
import {
  selectorCurrentComponent,
  selectorErrors,
  selectorMessage,
  selectorVariables,
} from "redux/selectors";
import {
  AvailableComponent,
  AvailableComponentIntersection,
} from "components/box/types";
import { setMessage } from "redux/slice/message.slice";

export default function App() {
  const message = useAppSelector((state) => selectorMessage(state));

  const currentComponent = useAppSelector((state) =>
    selectorCurrentComponent(state)
  );

  const variables = useAppSelector((state) => selectorVariables(state)) || [];

  const errors = useAppSelector((state) => selectorErrors(state));

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (errors.length) {
      dispatch(setMessage(errors[errors.length - 1]));
    }
  }, [errors]);

  return (
    <div className={s.app}>
      <div className={s.components}>
        <AvailableComponents />
      </div>
      <div className={s.options}>
        <Features
          currentComponent={currentComponent}
          variables={variables}
        ></Features>
      </div>
      <div className={s.scripts}>
        <ConstrictorScripts />
      </div>
      {message && <Message text={message} />}
    </div>
  );
}

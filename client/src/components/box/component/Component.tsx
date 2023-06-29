import React, { useEffect, useRef, useState } from "react";

import s from "./../start/Start.module.scss";

import { useDrag } from "react-dnd";
import { CSSProperties } from "styled-components";
import { useSelectComponent } from "hooks/select.hook";
import { addCssComponentDrag } from "scripts";
import {
  AvailableComponent,
  IComparison,
  IEqually,
  IFinish,
  IPlay,
  IStart,
} from "../types";
import { WrapperComponent } from "HOC/WrapperComponent.hook";
import MarkupComponent from "./MarkupComponent";
import { useAppDispatch, useAppSelector } from "hooks/redux.hook";

export default function Component(
  props: (IStart | IFinish | IEqually | IComparison | IPlay) & {
    notDrag?: boolean;
  }
) {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "component",

    item: {
      ...props,
    },

    end: (item) => {},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(ref);

  const ResultComponent = WrapperComponent(MarkupComponent);

  return (
    <div ref={!props.notDrag ? ref : null} style={{ position: "inherit" }}>
      <ResultComponent
        {...props}
        isDragging={isDragging}
        notDrag={props.notDrag}
      />
    </div>
  );
}

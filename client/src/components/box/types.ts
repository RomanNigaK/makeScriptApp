interface XYCoord {
  x: number;
  y: number;
}

interface IBox extends XYCoord {
  id: number;
  name: string;
  next?: number;
  nextFalse?: number;
}

interface IStart extends IBox {
  type: "start";
}

interface IEqually extends IBox {
  variable: string | null;
  value: string | number;
  type: "equally";
}

interface IPlay extends IBox {
  file: string;
  type: "play";
}

interface IComparison extends IBox {
  arg1: number | string;
  arg2: number | string;
  typeComparison: "равно" | "больше" | "меньше" | "не равно";
  type: "comparison";
}

interface IFinish extends IBox {
  type: "finish";
}

type AvailableComponent = IStart | IFinish | IEqually | IPlay | IComparison;
type AvailableComponentIntersection = IStart &
  IFinish &
  IEqually &
  IPlay &
  IComparison;
export type {
  XYCoord,
  IStart,
  IBox,
  IFinish,
  IEqually,
  IComparison,
  IPlay,
  AvailableComponent,
  AvailableComponentIntersection,
};

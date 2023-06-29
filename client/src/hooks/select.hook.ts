import { setComponent, setMoveId } from "redux/slice/canvas.slice";
import { useAppDispatch, useAppSelector } from "./redux.hook";
import { useEffect, useState } from "react";
import {
  selectorNext,
  selectorNextFalse,
  selectorPrevious,
} from "redux/selectors";

export const useSelectComponent = (id: number) => {
  const dispatch = useAppDispatch();

  const nextId = useAppSelector((state) => selectorNext(state, id)) || 0;
  const nextFalseId =
    useAppSelector((state) => selectorNextFalse(state, id)) || 0;
  const previousId =
    useAppSelector((state) => selectorPrevious(state, id)) || 0;

  const [next, setNext] = useState<number>();
  const [nextFalse, setNextFalse] = useState<number>();
  const [previous, setPrevious] = useState<number>();

  const setComp = () => {
    dispatch(setComponent(id));
  };

  const setId = () => {
    dispatch(setMoveId(id));
  };

  useEffect(() => {
    setNext(nextId);
    setPrevious(previousId);
    setNextFalse(nextFalseId);
  }, [nextId, previousId, nextFalseId]);

  return { setComp, setId, next, nextFalse, previous, dispatch };
};

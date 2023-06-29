import { AvailableComponentIntersection } from "components/box/types";
import { RootState } from "./store";

export const selectorCanvas = (store: RootState) => store.canvas.canvases;

export const selectorCurrentCanvas = (store: RootState) =>
  store.canvas.currentCanvasId;
export const selectorMessage = (store: RootState) => store.message.massage;

export const selectorAvailableComponents = (store: RootState) =>
  store.canvas.availableComponent;

export const selectorCurrentComponent = (store: RootState) =>
  store.canvas.currentComponent;

export const selectorComponentId = (store: RootState, id: number) => {
  return store.canvas.canvases
    .find((i) => i.id === store.canvas.currentCanvasId)
    ?.components.find((ic) => ic.id === id);
};

export const selectorErrors = (store: RootState) => store.canvas.errors;

export const selectorVariables = (store: RootState) =>
  store.canvas.canvases
    .find((i) => i.id === store.canvas.currentCanvasId)
    ?.variables.map((e) => {
      return e.name;
    });

export const selectorMoveId = (store: RootState) => store.canvas.moveId;

export const selectorPrevious = (store: RootState, id: number) =>
  store.canvas.canvases
    .find((i) => i.id === store.canvas.currentCanvasId)
    ?.components.find((i) => i.next === id)?.id;

export const selectorNext = (store: RootState, id: number) =>
  store.canvas.canvases
    .find((i) => i.id === store.canvas.currentCanvasId)
    ?.components.find((i) => i.id === id)?.next;

export const selectorNextFalse = (store: RootState, id: number) =>
  store.canvas.canvases
    .find((i) => i.id === store.canvas.currentCanvasId)
    ?.components.find((i) => i.id === id)?.nextFalse;

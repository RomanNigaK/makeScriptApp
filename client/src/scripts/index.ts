import { AvailableComponent } from "components/box/types";
import { CSSProperties } from "react";

export const addCssComponentDrag = (
  obj: CSSProperties,
  x: number,
  y: number,
  isDragging: boolean
): CSSProperties => {
  obj.top = 0;
  obj.left = 0;
  obj.marginTop = y - 50;
  obj.marginLeft = x - 350;
  obj.opacity = isDragging ? 0 : 1;
  obj.position = "absolute";
  return obj;
};

export const validators = (component: AvailableComponent, ids: number[]) => {
  if (component.type === "finish") {
    if (ids.length) {
      return ids.pop();
    }
    return "Проверка окончена";
  }

  if ("next" in component) {
    if (component.next === 0)
      return `Для компоненты ${component.name} нет следующей  компоненты`;
  }

  if ("file" in component) {
    if (!!!component.file)
      return `Для компоненты ${component.name} нет выбранного файла`;
  }
  if ("value" in component) {
    if (!!!component.value)
      return `Для компоненты ${component.name} не указано значение`;
  }
  if ("variable" in component) {
    if (!!!component.variable)
      return `Для компоненты ${component.name} не указано имя переменной`;
  }
  if ("arg1" in component) {
    if (!!!component.arg1)
      return `Для компоненты ${component.name} не указано значение или переменная`;
  }
  if ("arg2" in component) {
    if (!!!component.arg2)
      return `Для компоненты ${component.name} не указано значение или переменная`;
  }
  if ("nextFalse" in component) {
    if (!!!component.nextFalse)
      return `Для компоненты ${component.name} не указано следующая компонента при ложном вычислении`;
  }

  return component.next;
};

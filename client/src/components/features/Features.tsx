import React, { PropsWithChildren, useEffect, useState } from "react";
import s from "./Features.module.scss";
import { AvailableComponent } from "components/box/types";
import FieldT from "components/commons/fields/fieldT/FieldT";
import Next from "components/commons/next/Next";
import FieldS from "components/commons/fields/fieldS/FieldS";
import FieldF from "components/commons/fields/fieldF/FieldF";

interface IPropsFeatures extends PropsWithChildren {
  currentComponent: AvailableComponent | null;
  variables: string[];
}
export default function Features({
  children,
  currentComponent,
  variables,
}: IPropsFeatures) {
  return (
    <div className={s.features}>
      <div className={s.header}>Свойства: {currentComponent?.name}</div>
      <div className={s.content}>
        {!currentComponent && (
          <ul>
            <li>Выберите компонент</li>
          </ul>
        )}

        {currentComponent?.id && (
          <FieldT
            label="ID компоненты"
            val={currentComponent.id}
            id={currentComponent.id}
            field="id"
            readonly
          />
        )}
        {currentComponent && "name" in currentComponent && (
          <FieldT
            label="Наименование"
            val={currentComponent.name}
            id={currentComponent.id}
            field="name"
          />
        )}
        {currentComponent && "variable" in currentComponent && (
          <FieldT
            label="Переменная"
            val={currentComponent.variable || ""}
            id={currentComponent.id}
            field="variable"
          />
        )}
        {currentComponent && "value" in currentComponent && (
          <FieldT
            label="Значение"
            val={currentComponent.value || ""}
            id={currentComponent.id}
            field="value"
            variable
          />
        )}

        {currentComponent && "arg1" in currentComponent && (
          <FieldS
            label="Аргумент1"
            val={currentComponent.arg1 || ""}
            values={variables}
            id={currentComponent.id}
            field="arg1"
          />
        )}
        {currentComponent && "typeComparison" in currentComponent && (
          <FieldS
            label="Сравнение"
            values={["равно", "больше", "меньше", "не равно"]}
            readonly
            id={currentComponent.id}
            field="typeComparison"
            val={currentComponent.typeComparison}
          />
        )}

        {currentComponent && "arg2" in currentComponent && (
          <FieldS
            label="Аргумент2"
            val={currentComponent.arg2 || ""}
            id={currentComponent.id}
            field="arg2"
            values={variables}
          />
        )}

        {currentComponent && "file" in currentComponent && (
          <FieldF
            label="Аудиофаил"
            val={currentComponent.file || ""}
            id={currentComponent.id}
            field="file"
          />
        )}

        {currentComponent && currentComponent?.type !== "finish" && (
          <Next
            id={currentComponent.id}
            next={currentComponent.next || 0}
            label="Следующий компонент"
            field="next"
          />
        )}

        {currentComponent &&
          currentComponent?.type !== "finish" &&
          "nextFalse" in currentComponent && (
            <Next
              id={currentComponent.id}
              next={currentComponent.nextFalse || 0}
              label="Следующий компонент(ложь)"
              field="nextFalse"
            />
          )}
      </div>
    </div>
  );
}

// {currentComponent?.id && (

// )}

// <FieldS
//   label="Аргумент1"
//   values={["150", "200", "300", "400", "value22"]}
//   placeholder="Переменная или значение"
// />
// <FieldS
//   label="Сравнение"
//   values={["равно", "больше", "меньше", "не равно"]}
//   readonly
//   placeholder="Вид сравнения"
// />
// <FieldF label="Аудиофаил" placeholder="Добавьте аудиофайл" />

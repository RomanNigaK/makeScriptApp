import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AvailableComponent } from "components/box/types";
import { RootState } from "redux/store";
import { validators } from "scripts";
import { setMessage } from "./message.slice";

export const loadServerFile = createAsyncThunk(
  "canvas/loadServerFile",
  async function (_, { getState, dispatch }) {
    try {
      const state = getState() as RootState;

      const canvas = state.canvas.canvases.find(
        (i) => i.id === state.canvas.currentCanvasId
      );

      //ищем начала сценария
      const start = canvas?.components.find((i) => i.type === "start");
      if (!start) {
        throw new Error("Нет начала сценария");
      }

      let otherBranchesIds: number[] = [];
      let islLoopScript: number[] = [];

      const validScript = (
        component: AvailableComponent,
        canvas: Canvas
      ): string => {
        if (component) {
          if (islLoopScript.includes(component.id)) {
            return `Обнаружена  цикличность сценария 2 ссылки на компоненту ${component.name}`;
          } else {
            islLoopScript.push(component.id);
          }

          if ("nextFalse" in component) {
            otherBranchesIds.push(component.nextFalse!);
          }

          const result = validators(component, otherBranchesIds);
          if (typeof result === "string") {
            return result;
          }
          if (typeof result === "number") {
            const currentBranch = canvas.components.find(
              (i) => i.id === result
            );

            return validScript(currentBranch!, canvas);
          }
        }
        return "";
      };

      //рекурсивно вызываем для обхода всех компонентов сценария
      let result = validScript(start, canvas!);

      if (result !== "Проверка окончена") {
        throw new Error(result);
      }

      const json = JSON.stringify(canvas);

      const data = await fetch("/api/load", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          json: json,
        }),
      });

      if (!data.ok) {
        throw new Error("Ошибка загрузки");
      }
      const response = await data.json();

      dispatch(setMessage(response.result));
    } catch (error: any) {
      dispatch(setMessage(error.message));
    }
  }
);

type Variables = {
  id: number;
  type: "int" | "string";
  name: string;
};

type Canvas = {
  id: number;
  name: string;
  variables: Variables[];
  components: Array<AvailableComponent>;
};
export type { Canvas };

type IState = {
  canvases: Canvas[];
  fileList: File[] | [];
  currentCanvasId: number;
  componentsId: number[];
  availableComponent: Array<AvailableComponent>;
  currentComponent: AvailableComponent | null;
  errors: string[];

  moveId: number;
};

const initialState: IState = {
  fileList: [],
  errors: [],
  moveId: 0,
  currentComponent: null,
  canvases: [],
  currentCanvasId: 0,
  componentsId: [],
  availableComponent: [
    {
      id: 0,
      name: "Старт",
      type: "start",
      x: 0,
      y: 0,
      next: 0,
    },
    {
      id: 0,
      name: "Финиш",
      type: "finish",
      x: 0,
      y: 0,
      next: 0,
    },
    {
      id: 0,
      name: "Воспроизведение",
      type: "play",
      x: 0,
      y: 0,
      next: 0,
      file: "",
    },
    {
      id: 0,
      name: "Присвоение",
      type: "equally",
      x: 0,
      y: 0,
      next: 0,
      variable: "",
      value: "",
    },
    {
      id: 0,
      name: "Сравнение",
      type: "comparison",
      x: 0,
      y: 0,
      next: 0,
      arg1: "",
      arg2: "",
      typeComparison: "равно",
      nextFalse: 0,
    },
  ],
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setMoveId: (state, action) => {
      state.moveId = action.payload;
    },
    deleteCompCanvas: (state) => {
      const id = state.moveId;
      let arr: AvailableComponent[] = [];
      state.canvases
        .find((i) => i.id === state.currentCanvasId)
        ?.components.forEach((e) => {
          if (e.id !== id) {
            const rest: { next?: number; nextFalse?: number } = {};
            if ("next" in e && e.next === id) {
              rest.next = 0;
            }
            if ("nextFalse" in e && e.nextFalse === id) {
              rest.nextFalse = 0;
            }

            arr.push({ ...e, ...rest });
          }
        });

      const variables =
        state.canvases
          .find((i) => i.id === state.currentCanvasId)
          ?.variables.filter((i) => i.id !== id) || [];

      state.canvases = updateVariableCanvas(state, variables);

      state.canvases = updateComponentsCanvas(state, arr);

      canvasSlice.caseReducers.setComponent(state, {
        type: "setComponent",
        payload: state.currentComponent?.id,
      });
    },
    deleteCanvas: (state) => {
      state.canvases = state.canvases.filter(
        (i) => i.id !== state.currentCanvasId
      );
      state.currentCanvasId =
        state.canvases.find((i) => i.id !== state.currentCanvasId)?.id || 0;
      state.currentComponent = null;
    },

    clearCanvas: (state) => {
      state.canvases = updateComponentsCanvas(state, []);
      state.canvases = updateVariableCanvas(state, []);
      state.currentComponent = null;
    },

    setField: (state, action) => {
      const { id, rest } = action.payload;

      editComponentsProperty(id, rest, state);

      if (state.currentComponent) {
        state.currentComponent = { ...state.currentComponent, ...rest };
      }

      const IdEqually = state.canvases
        .find((i) => i.id === state.currentCanvasId)
        ?.variables.find((e) => e.id)?.id;

      if (IdEqually) {
        const typeValue = Number(rest.value);
        const mutationRest = { type: typeValue ? "int" : "string" };
        editVariablesProperty(id, mutationRest, state);
      }

      if (Object.keys(rest)[0] === "variable") {
        const val = Object.values<string>(rest)[0];

        const mutationRest = { name: val };

        editVariablesProperty(id, mutationRest, state);
      }
    },

    setNextCurrentComponent: (state, action) => {
      const { id, rest } = action.payload;

      editComponentsProperty(id, rest, state);

      canvasSlice.caseReducers.setComponent(state, {
        type: "setComponent",
        payload: id,
      });
    },
    setComponent: (state, action) => {
      state.currentComponent =
        state.canvases
          .find((i) => i.id === state.currentCanvasId)
          ?.components.find((i) => i.id === action.payload) || null;
    },
    moveComponent: (state, action) => {
      const { id, rest } = action.payload;

      editComponentsProperty(id, rest, state);
    },
    addComponent: (state, action) => {
      const canvas = state.canvases.find(
        (i) => i.id === state.currentCanvasId
      )!;

      //проверяем есть ли компонент старт/финиш уже на полотне
      const isStart = canvas.components.some((i) => i.type === "start");
      if (isStart && action.payload.type === "start") {
        state.errors.push("Компонент старт уже присутствует на полотне");
        return;
      }

      const newId = state.componentsId[state.componentsId.length - 1] + 1 || 1;

      const quantityThisTypeComponents = state.canvases.map(
        (e) => e.components.filter((i) => i.type === action.payload.type).length
      )[0];

      let variable = canvas.variables;

      if (action.payload.type === "equally") {
        variable.push({ id: newId, type: "string", name: "" });
      }

      canvas.variables = variable;

      canvas.components.push({
        ...action.payload,
        name: action.payload.name + "_" + (quantityThisTypeComponents + 1),
        id: newId,
      });

      state.componentsId.push(newId);
    },
    newCanvas: (state) => {
      const lastId = state.canvases[state.canvases.length - 1]?.id + 1 || 1;
      state.currentCanvasId = lastId;

      state.canvases.push({
        id: lastId,
        name: `Сценарий_${lastId}`,
        variables: [],
        components: [],
      });
      state.currentComponent = null;
    },
    setCurrentCanvas: (state, action) => {
      const id = action.payload;
      state.currentCanvasId = id;
      state.currentComponent = null;
    },
    editNameScript: (state, action) => {
      const { id, name } = action.payload;

      state.canvases = state.canvases.map((e) => {
        if (e.id === id) {
          return { ...e, name: name };
        }
        return { ...e };
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadServerFile.fulfilled, (state, action) => {
      // state.errors.push("Фаил успешно загружен");
    });

    builder.addCase(loadServerFile.pending, (state, action) => {
      // state.errors.push("Загрузка");
    });
    builder.addCase(loadServerFile.rejected, (state, action) => {
      state.errors.push("Ошибка загрузки");
    });
  },
});

export const {
  newCanvas,
  setCurrentCanvas,
  editNameScript,
  addComponent,
  moveComponent,
  setComponent,
  setNextCurrentComponent,
  setField,
  deleteCanvas,
  clearCanvas,
  deleteCompCanvas,
  setMoveId,
} = canvasSlice.actions;
export default canvasSlice.reducer;

type Rest = {
  [key: string]: number | string;
};

const editProperty = <T extends { id: number }>(
  arr: T[],
  rest: Rest,
  id: number
): T[] => {
  let edit: T[] = [];
  arr.forEach((elem) => {
    if (elem.id === id) {
      edit.push({ ...elem, ...rest });
    } else {
      edit.push({ ...elem });
    }
  });

  return edit;
};

const editComponentsProperty = (id: number, rest: Rest, state: IState) => {
  const canvas = state.canvases.find((i) => i.id === state.currentCanvasId)!;

  const arr = editProperty(canvas.components, rest, id);

  state.canvases = updateComponentsCanvas(state, arr);
};

const editVariablesProperty = (id: number, rest: Rest, state: IState) => {
  const canvas = state.canvases.find((i) => i.id === state.currentCanvasId)!;

  const arr = editProperty(canvas.variables, rest, id);

  state.canvases = state.canvases.map((i) => {
    if (i.id === state.currentCanvasId) {
      return { ...i, variables: arr };
    }
    return { ...i };
  });
};

const updateComponentsCanvas = (
  state: IState,
  newComponents: AvailableComponent[]
) => {
  return state.canvases.map((i) => {
    if (i.id === state.currentCanvasId) {
      return { ...i, components: newComponents };
    }
    return { ...i };
  });
};

const updateVariableCanvas = (state: IState, newVariables: Variables[]) => {
  return state.canvases.map((i) => {
    if (i.id === state.currentCanvasId) {
      return { ...i, variables: newVariables };
    }
    return { ...i };
  });
};

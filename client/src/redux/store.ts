import { configureStore } from "@reduxjs/toolkit";
import canvasSlice from "./slice/canvas.slice";
import messageSlice from "./slice/message.slice";
export const store = configureStore({
  reducer: {
    canvas: canvasSlice,
    message: messageSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;
export type { RootState };

type AppDispatch = typeof store.dispatch;
export type { AppDispatch };

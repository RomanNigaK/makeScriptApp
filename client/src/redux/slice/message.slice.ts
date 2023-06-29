import { createSlice } from "@reduxjs/toolkit";

type IState = {
  massage: string;
};

const initialState: IState = {
  massage: "",
};

const messageSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.massage = action.payload;
    },
    deleteMessage: (state) => {
      state.massage = "";
    },
  },
});

export const { setMessage, deleteMessage } = messageSlice.actions;
export default messageSlice.reducer;

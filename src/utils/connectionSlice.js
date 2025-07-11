import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnection: (state, action) => action.payload,
    removeConneciton: (state, action) => null,
  },
});

export const { addConnection, removeConneciton } = connectionSlice.actions;

export default connectionSlice.reducer;

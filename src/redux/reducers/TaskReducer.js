import { createSlice } from "@reduxjs/toolkit";

const initState = {
  taskList: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState: initState,
  reducers: {
    setTaskList: (state, action) => {
      state.taskList = action.payload;
    },
  },
});
export const { setTaskList } = taskSlice.actions;

export default taskSlice.reducer;

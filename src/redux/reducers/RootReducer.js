import { combineReducers } from "redux";

import taskSlice from "./TaskReducer";

const rootReducer = combineReducers({
  task: taskSlice,
});

export default rootReducer;

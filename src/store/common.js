import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../redux/reducers/RootReducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // exemplo de slice

const store = configureStore({
  reducer: {
    user: userReducer, // outros reducers podem ser adicionados aqui
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { configureStore } from "@reduxjs/toolkit";
import selectedChatReducer from "./slices/sidebar";

export const store = configureStore({
  reducer: {
    selectedChat: selectedChatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
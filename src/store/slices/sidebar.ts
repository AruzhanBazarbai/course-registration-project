import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type SelectedChat = {
    id: number;
}

const initialState: SelectedChat = {
    id: 1,
}

export const SelectedChatSlice = createSlice({
    name: "selectedChat",
    initialState,
    reducers: {
        setSelectedChatState: (state, action: PayloadAction<any>) => {
            state.id = action.payload;
        }
    }
});

export const { setSelectedChatState } = SelectedChatSlice.actions;

export const selectedChatState = (state: RootState) => state.selectedChat;

export default SelectedChatSlice.reducer;
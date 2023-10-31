import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        currentUser: null,
    },
    reducers: {
        SetCurrentUser: (state,actions) => {
            state.currentUser= actions.payload;
        },
    },
});

export const { SetCurrentUser } = usersSlice.actions;
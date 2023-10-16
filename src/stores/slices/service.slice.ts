import { createSlice } from "@reduxjs/toolkit";


export interface Services {
    id: string;
    name: string;
    desc: string;
    // active: Boolean;
    avatar: string;
    price: string;


}

const initialState: {
    data: null | undefined | Services[]
} = {
    data: null
};

const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
        insertService: function (state, action) {
            state.data?.unshift(action.payload)
        },


    },
});

export const serviceActions = {
    ...serviceSlice.actions,
};

export const serviceReducer = serviceSlice.reducer;

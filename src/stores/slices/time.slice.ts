import { createSlice } from "@reduxjs/toolkit";

export interface Time {
    stepMinute: number,
    duration: number
}

export interface TimeState {
    data: Time | null;
}

export const initialState = {
    data: null,
}

const timeSlice = createSlice({
    name: "time",
    initialState,
    reducers: {
        setData: function (state, action) {
            return {
                ...state,
                data: action.payload
            }
        }
    }
})

export const timeAction = {
    ...timeSlice.actions
}

export const timeReducer = timeSlice.reducer
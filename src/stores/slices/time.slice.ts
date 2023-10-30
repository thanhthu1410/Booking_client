import { createSlice } from "@reduxjs/toolkit";

export interface Time {
    startTime: string,
    endTime: string,
    stepMinute: number,
    duration: number,
    maxDate: number,
    reminderTime: number
}

export interface TimeState {
    data: Time | null;
}

export const initialState: TimeState = {
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
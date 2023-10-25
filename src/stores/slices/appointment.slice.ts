import { createSlice } from "@reduxjs/toolkit";
import { AppointmentDetail } from "./staff.slice";

export interface Customer {
    fullName: string
}

export enum AppointmentStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    DONE = 'DONE'
}

export interface Appointment {
    id: number
    IsDelete: boolean
    customerId: string
    date: string
    reasonDelete: string
    status: AppointmentStatus
    time: string
    total: number
    createdAt: string
    updatedAt: string
    appointmentDetails: AppointmentDetail[]
    customer: Customer
}

const initialState: {
    data: null | undefined | Appointment[]
} = {
    data: null
};

const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {
        setData: function (state, action) {
            return {
                ...state,
                data: action.payload
            }
        },
    },
});

export const appointmentActions = {
    ...appointmentSlice.actions,
};

export const appointmentReducer = appointmentSlice.reducer;

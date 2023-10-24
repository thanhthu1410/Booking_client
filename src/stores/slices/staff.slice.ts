import { createSlice } from "@reduxjs/toolkit";

export interface AppointmentDetail {
    id: number,
    price: number,
    slot: number,
    createdAt: string,
    updatedAt: string,
    IsDelete: boolean,
    appointmentId: number,
    serviceId: number,
    staffId: number,
    service: Service
}

export interface Staff {
    id: number
    name: string
    avatar: string
    experience: string
    appointmentDetails: AppointmentDetail[]
}

export interface StaffService {
    id: number
    createdAt: Date
    updatedAt: Date
    IsDelete: boolean
    serviceId: number
    staffId: number
    staff: Staff
}

export interface Service {
    id: number;
    name: string;
    desc: string;
    avatar: string;
    price: number;
    staffServices: StaffService[]
}

export interface StaffState {
    data: null | undefined | Staff[]
    reLoad: boolean
}

const initialState: StaffState = {
    data: null,
    reLoad: false

}


const staffSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        insertStaff: function (state, action) {
            state.data?.unshift(action.payload)
        },
        reload: (state) => {
            return {
                ...state,
                reLoad: !state.reLoad,

            }
        },
        setDataStaff: function (state, action) {
            return {
                ...state,
                data: action.payload
            }
        },


    },
});

export const staffActions = {
    ...staffSlice.actions,
};

export const staffReducer = staffSlice.reducer;

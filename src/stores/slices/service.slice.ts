import { createSlice } from "@reduxjs/toolkit";

export interface Staff {
    id: number
    name: string
    avatar: string
    experience: string
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

export interface ServicesState {
    data: null | undefined | Service[]
    reLoad: boolean
}

const initialState: ServicesState = {
    data: null,
    reLoad: false
}

const serviceSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        insertService: function (state, action) {
            state.data?.unshift(action.payload)
        },
        reload: function (state) {
            return {
                ...state,
                reLoad: !state.reLoad,

            }
        },
        setDataService: function (state, action) {
            return {
                ...state,
                data: action.payload
            }
        },


    },
});

export const serviceActions = {
    ...serviceSlice.actions,
};

export const serviceReducer = serviceSlice.reducer;

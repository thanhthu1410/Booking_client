import { createSlice } from "@reduxjs/toolkit";

export interface Customer {
    id: number
    fullName: string
    phoneNumber: string
    email: string
    createdAt: string
    updatedAt: string
    IsDelete: boolean
    status: boolean
    appointments: Appointment[]

}

export interface Appointment {
    id: number
    date: string
    time: string
    createdAt: string
    updatedAt: string
    IsDelete: boolean
    reasonDelete: string
    total: number
    customerId: number
    customer: Customer
    appointmentDetails: AppointmentDetail[]
}

export interface AppointmentDetail {
    id: number
    price: number
    slot: number
    createdAt: string
    updatedAt: string
    IsDelete: boolean
    appointmentId: number
    appointment: Appointment
    serviceId: number
    service: Service
    staffId: number
    staff: Staff
}
export interface Staff {
    id: number
    name: string
    avatar: string
    experience: string
}
export interface Service {
    id: number;
    name: string;
    desc: string;
    avatar: string;
    price: number;
    staffServices: StaffService[]
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


export interface CustomerState {
    data: null | undefined | Customer[]
    reLoad: boolean
}

const initialState: CustomerState = {
    data: null,
    reLoad: false
}

const customerSlice = createSlice({
    name: "services",
    initialState,
    reducers: {

        reload: function (state) {
            return {
                ...state,
                reLoad: !state.reLoad,

            }
        },
        setDataCustomer: function (state, action) {
            return {
                ...state,
                data: action.payload
            }
        },


    },
});

export const customerActions = {
    ...customerSlice.actions,
};

export const customerReducer = customerSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";


export interface Staff {
    id: string;
    name: string;
    desc: string;
    birthDay: string;
    avatar: string;
    phoneNumber: string;
    experience: string;
    serviceList: Array<number>
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

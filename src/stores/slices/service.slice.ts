import { createSlice } from "@reduxjs/toolkit";


export interface Services {
    id: string;
    name: string;
    desc: string;
    // active: Boolean;
    avatar: string;
    price: string;


}

export interface ServicesState {
    data: null | undefined | Services[]
    reLoad: boolean
}

const initialState: ServicesState = {
    data: null,
    reLoad: false

}

// const initialState: {
//     data: null | undefined | Services[]
// } = {

//      reLoad: false
// };

const serviceSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        insertService: function (state, action) {
            state.data?.unshift(action.payload)
        },
        reload: (state) => {
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

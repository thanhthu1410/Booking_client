import { createSlice } from "@reduxjs/toolkit";
enum DiscountType {
    percent = "percent",
    cash = "cash"
}
export interface Voucher {
    title: string
    code: string
    status: boolean
    discountType: DiscountType
    value : number
    creatAt: string
    id: number
}

export interface VoucherState {
    data: Voucher | null;
}

export const initialState = {
    data: null,
    reLoad: false
}

const voucherSlice = createSlice({
    name: "voucher",
    initialState,
    reducers: {
        setData: function (state, action) {
            return {
                ...state,
                data: action.payload
            }
        },
        setReLoad: function (state) {
            return {
                ...state,
                reLoad: !state.reLoad
            }
        }
    }
})

export const voucherAction = {
    ...voucherSlice.actions
}

export const voucherReducer = voucherSlice.reducer
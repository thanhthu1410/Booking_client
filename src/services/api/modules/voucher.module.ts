import { Voucher } from "@/stores/slices/voucher.slice";
import axios from "axios";

export default {
    create: async function (data: any) {
        return await axios.post(import.meta.env.VITE_APP_SERVER_HOST_API + "vouchers", data)
    },
    findMany: async function () {
        return await axios.get(import.meta.env.VITE_APP_SERVER_HOST_API + "vouchers/search");
    },
    update:  async function (voucher:Voucher) {
        return await axios.patch(import.meta.env.VITE_APP_SERVER_HOST_API + "vouchers/" + voucher.id, voucher);
    },
    findAllPagination: async function (take: number, skip: number) {
        return await axios.get(`${import.meta.env.VITE_APP_SERVER_HOST_API}vouchers?take=${take}&skip=${skip}`);
      },
    search: async (keysearch: string) => {
        return await axios.get(import.meta.env.VITE_APP_SERVER_HOST_API + `vouchers/search?search=${keysearch}`)
      },
}
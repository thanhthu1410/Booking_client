import axios from "axios";

export default {
    create: async function (data: any) {
        return await axios.post(import.meta.env.VITE_APP_SERVER_HOST_API + "vouchers", data)
    },
    findMany: async function () {
        return await axios.get(import.meta.env.VITE_APP_SERVER_HOST_API + "vouchers");
    },
    delete:  async function (id: number) {
        return await axios.get(import.meta.env.VITE_APP_SERVER_HOST_API + "vouchers/" + id);
    },
}
import axios from "axios";

export default {
    findMany: async function (take: number, skip: number) {
        return await axios.get(`${import.meta.env.VITE_APP_SERVER_HOST_API}customers?take=${take}&skip=${skip}`);
    },
    findAllCustomer: async function () {
        return await axios.get(import.meta.env.VITE_APP_SERVER_HOST_API + "customers/search?");
    },
    searchCustomer: async function (searchString: string) {
        return await axios.get(`${import.meta.env.VITE_APP_SERVER_HOST_API}customers/search?q=${searchString}`)
    },
}
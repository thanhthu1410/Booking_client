import axios from "axios";

export default {
    create: async function (formData: FormData) {
        return await axios.post(import.meta.env.VITE_APP_SERVER_HOST_API + "services", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                authorization:`Bearer ${localStorage.getItem("access_token")}`,  
            }
        })
    },
    findMany: async function (take: number, skip: number) {
        return await axios.get(`${import.meta.env.VITE_APP_SERVER_HOST_API}services?take=${take}&skip=${skip}`);
    },
    findAllService: async function () {
        return await axios.get(import.meta.env.VITE_APP_SERVER_HOST_API + "services/search?");
    },
    searchService: async function (searchString: string) {
        return await axios.get(`${import.meta.env.VITE_APP_SERVER_HOST_API}services/search?q=${searchString}`)
    },
    delete: async function (id: any) {
        return await axios.delete(`${import.meta.env.VITE_APP_SERVER_HOST_API}services/${id}`, {
            headers: {
                authorization:`Bearer ${localStorage.getItem("access_token")}`,  
            }
        })
    },
    update: async function (id: any, formData: FormData) {
        return await axios.patch(
            `${import.meta.env.VITE_APP_SERVER_HOST_API}services/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization:`Bearer ${localStorage.getItem("access_token")}`,  
                },
            },
        );
    },

}
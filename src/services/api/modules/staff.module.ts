import axios from "axios";

export default {
    create: async function (formData: FormData) {
        return await axios.post(import.meta.env.VITE_APP_SERVER_HOST_API + "staffs", formData, {
            headers: { 
                "Content-Type": "multipart/form-data",
                authorization:`Bearer ${localStorage.getItem("access_token")}`, 
            }
        })
    },
    createStaffService: async function (serviceData: any) {
        return await axios.post(import.meta.env.VITE_APP_SERVER_HOST_API + "staff-services", serviceData
        , {
            headers: {
                authorization:`Bearer ${localStorage.getItem("access_token")}`,  
            }
        })
    },
    findAllStaff: async function () {
        return await axios.get(import.meta.env.VITE_APP_SERVER_HOST_API + "staffs/search?");
    },
    searchStaff: async function (searchString: string) {
        return await axios.get(`${import.meta.env.VITE_APP_SERVER_HOST_API}staffs/search?q=${searchString}`)
    },
    findAll: async function (take: number, skip: number) {
        return await axios.get(`${import.meta.env.VITE_APP_SERVER_HOST_API}staffs?take=${take}&skip=${skip}`);
    },
    delete: async function (id: any) {
        return await axios.delete(`${import.meta.env.VITE_APP_SERVER_HOST_API}staffs/${id}`, {
            headers: {
                authorization:`Bearer ${localStorage.getItem("access_token")}`,  
            }
        })
    },
    update: async function (id: any, formData: FormData) {
        return await axios.patch(
            `${import.meta.env.VITE_APP_SERVER_HOST_API}staffs/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization:`Bearer ${localStorage.getItem("access_token")}`
                },
            },
        );
    },
    deleteStaffService: async function (id: any) {
        return await axios.delete(`${import.meta.env.VITE_APP_SERVER_HOST_API}staff-services/${id}`, {
            headers: {
                authorization:`Bearer ${localStorage.getItem("access_token")}`,  
            }
        })
    }
}
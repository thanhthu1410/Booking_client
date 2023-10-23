import axios from "axios";

export default {
    create: async function (formData: FormData) {
        return await axios.post(import.meta.env.VITE_APP_SERVER_HOST_API + "staffs", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    createStaffService: async function (serviceData: any) {
        return await axios.post(import.meta.env.VITE_APP_SERVER_HOST_API + "staff-services", serviceData)
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
        return await axios.delete(`${import.meta.env.VITE_APP_SERVER_HOST_API}staffs/${id}`)
    },
    update: async function (id: any, formData: FormData) {
        return await axios.patch(
            `${import.meta.env.VITE_APP_SERVER_HOST_API}staffs/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );
    },
    deleteStaffService: async function (id: any) {
        return await axios.delete(`${import.meta.env.VITE_APP_SERVER_HOST_API}staff-services/${id}`)
    }
}
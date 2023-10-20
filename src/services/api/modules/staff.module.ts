import axios from "axios";

export default {
    create: async function (formData: FormData) {
        return await axios.post(import.meta.env.VITE_APP_SERVER_HOST_API + "staffs", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    findAll: async function () {
        return await axios.get(`${import.meta.env.VITE_APP_SERVER_HOST_API}staffs`);
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
}
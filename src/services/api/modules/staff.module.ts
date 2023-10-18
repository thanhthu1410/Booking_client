import axios from "axios";

export default {
    create: async function (formData: FormData) {
        return await axios.post(import.meta.env.VITE_APP_SERVER_HOST_API + "staffs", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
}
import axios from "axios";

export default {
    update: async function (id: number, data: any) {
        return await axios.patch(import.meta.env.VITE_APP_SERVER_HOST_API + `appointments/information/${id}`, data, {
            headers: {
                authorization:`Bearer ${localStorage.getItem("access_token")}`,  
            }
        });
    },
}
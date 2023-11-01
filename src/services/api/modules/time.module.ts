import axios from "axios";

export default {
    findAll: async () => {
        return await axios.get(import.meta.env.VITE_APP_SERVER_HOST_API + "time")
    },
    update: async (data: any) => {
        return await axios.patch(import.meta.env.VITE_APP_SERVER_HOST_API + "time", data,{
            headers: {
                authorization:`Bearer ${localStorage.getItem("access_token")}`,  
            }
        })
    }
}
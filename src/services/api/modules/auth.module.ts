import axios from "axios";

export default {
    login: async (loginData:{userName:string, password: string}) => {
        return await axios.post(import.meta.env.VITE_APP_SERVER_HOST_API + "auth/login", loginData)
    },
   
}
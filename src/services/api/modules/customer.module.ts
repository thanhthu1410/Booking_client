import axios from "axios";

export default {
    findMany: async function (take: number, skip: number) {
        return await axios.get(
            `${
                import.meta.env.VITE_APP_SERVER_HOST_API
            }customers?take=${take}&skip=${skip}`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        "access_token"
                    )}`,
                },
            }
        );
    },
    findAllCustomer: async function () {
        return await axios.get(
            import.meta.env.VITE_APP_SERVER_HOST_API + "customers/search?",
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        "access_token"
                    )}`,
                },
            }
        );
    },
    searchCustomer: async function (searchString: string) {
        return await axios.get(
            `${
                import.meta.env.VITE_APP_SERVER_HOST_API
            }customers/search?q=${searchString}`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        "access_token"
                    )}`,
                },
            }
        );
    },
};

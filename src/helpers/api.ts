import axios from 'axios'

export default function requestApi(endpoint:string, method:string, body:any, responseType:any = 'json') {
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }

    const instance = axios.create({ headers });

    instance.interceptors.request.use(
        
        
        (config) => {
            
            const token = localStorage.getItem('access_token')
            console.log("🚀 ~ file: api.ts:18 ~ requestApi ~ token:", token)
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`
            }
            return config;
        },
        (error) => {
            return Promise.reject(error)
        }
    );

    instance.interceptors.response.use(
        (response) => {
            return response
        },
        async (error) => {
            const originalConfig = error.config;
            console.log("Access token expired")
            if (error.response && error.response.status === 419) {
                try {
                    console.log("call refresh token api")
                    const result = await instance.post(`${import.meta.env.VITE_APP_SERVER_HOST_API}auth/refresh-token`, {
                        refresh_token: localStorage.getItem('refresh_token')
                   
                    })
                    const { access_token, refresh_token } = result.data;
                    localStorage.setItem('access_token', access_token)
                    localStorage.setItem('refresh_token', refresh_token)
                    originalConfig.headers['Authorization'] = `Bearer ${access_token}`

                    return instance(originalConfig)
                } catch (err:any) {
                    if (err.response && err.response.status === 400) {
                        localStorage.removeItem('access_token')
                        localStorage.removeItem('refresh_token')
                        window.location.href = '/login'
                    }
                    return Promise.reject(err)
                }
            }
            return Promise.reject(error)
        }
    )

    return instance.request({
        method: method,
        url: `${import.meta.env.VITE_APP_SERVER_HOST_API}${endpoint}`,
        data: body,
        responseType: responseType
    })
}
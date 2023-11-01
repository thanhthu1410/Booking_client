import api from '@/services/api';
import { message } from 'antd';
import React, { useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const navigate = useNavigate();

   /*  let token = localStorage.getItem('access_token') || false;
    return (
        token ? <Outlet /> : <Navigate to="/login" />
    ) */

            api.authApi.checkToken()
            .then((result) => {
            console.log("🚀 ~ file: PrivateRoutes.tsx:15 ~ .then ~ result:", result.data)
            return (
                result.data==true ? true : false
            )
            }).catch((err) => {
            console.log("🚀 ~ file: PrivateRoutes.tsx:21 ~ .then ~ err:", err)

                navigate("/login")
                message.warning(err.response.data.message)
            });


    
    // console.log("🚀 ~ file: PrivateRoutes.tsx:8 ~ PrivateRoutes ~ roleAdmin:", roleAdmin)
    return (
        true ? <Outlet /> : <Navigate to="/login" />
    )

}

export default PrivateRoutes
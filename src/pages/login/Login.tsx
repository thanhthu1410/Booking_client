import React from 'react';
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import "./login.scss"
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import api from '@/services/api';
import { message } from 'antd';
import requestApi from "@helpers/api";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
    const navigate = useNavigate();

   /*  const handleLogin = async (e:any)=>{
        e.preventDefault();
        const loginData = {
            userName: e.target.userName.value,
            password: e.target.password.value,
        }
       await api.authApi.login(loginData)
       .then((res) => {
            if(res.status!=201){
                   message.warning("Please check your account ! ")
                    
            }else{
                localStorage.setItem("token", res.data.accessToken)
                message.success("Đăng Nhập thành công")
                setTimeout(() => {
                    window.location.href="/"
                  }, 2000)
            }
           
       }).catch((err) => {
            message.warning(err.response.data.message)
       });
    } */
    const handleLogin = async (e:any)=>{
        e.preventDefault();
        const loginData = {
            userName: e.target.userName.value,
            password: e.target.password.value,
        }
        requestApi('auth/login', 'POST', loginData)
        .then((res) => {
            console.log(res)
            localStorage.setItem('access_token', res.data.accessToken
            );
            localStorage.setItem('refresh_token', res.data.refreshToken);
            message.success(res.data.message)
           
        })
        .catch(err => {
            console.log(err)
            if (typeof err.response !== "undefined") {
                if (err.response.status !== 201) {
                    message.warning(err.response.data.message)
                }
            } else {
                message.warning("Server is down. Please try again!")
            }
        })

    }
    const findUser=()=>{
        requestApi('users', 'GET', [])
        .then((result) => {
            console.log("🚀 ~ file: Login.tsx:75 ~ .then ~ result:", result)
            
        }).catch((err) => {
            
        });
    }
    return (
        <div className='login_container'>
            <h2>LOGIN ADMIN</h2>
            <button onClick={findUser}>tessss</button>
            <MDBContainer className="p-3 d-flex flex-column w-50 login_container_chirld">
                <form action="" onSubmit={handleLogin}>
                <MDBInput wrapperClass='mb-4' label='User Name' id='form1' type='text' name='userName'/>
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'  name='password'/>

                <div className="d-flex justify-content-between mx-3 mb-4">
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                    <a href="!#">Forgot password?</a>
                </div>

                <MDBBtn type='submit' className="mb-4">Sign in</MDBBtn>
                </form>
               

              

            </MDBContainer>
        </div>

    );
}

export default Login;
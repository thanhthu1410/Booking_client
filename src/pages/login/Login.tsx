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
function Login() {
    const handleLogin = async (e:any)=>{
        e.preventDefault();
        const loginData = {
            userName: e.target.userName.value,
            password: e.target.password.value,
        }
       await api.authApi.login(loginData)
       .then((res) => {
            if(res.status!=201){

            }else{
                localStorage.setItem("token", res.data.accessToken)
                message.success("Đăng Nhập thành công")
                setTimeout(() => {
                    window.location.href="/"
                  }, 2000)
            }
           console.log("res", res.status);
           
       }).catch((err) => {
            message.warning(err.response.data.message)
       });
    }
    return (
        <div className='login_container'>
            <h2>LOGIN ADMIN</h2>
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
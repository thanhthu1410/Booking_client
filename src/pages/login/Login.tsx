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
function Login() {
    return (
        <div className='login_container'>
            <h2>LOGIN ADMIN</h2>
            <MDBContainer className="p-3 d-flex flex-column w-50 login_container_chirld">

                <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' />
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' />

                <div className="d-flex justify-content-between mx-3 mb-4">
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                    <a href="!#">Forgot password?</a>
                </div>

                <MDBBtn className="mb-4">Sign in</MDBBtn>

              

            </MDBContainer>
        </div>

    );
}

export default Login;
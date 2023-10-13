
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/homes/Home'
import Layout from '../pages/homes/components/Layout'
import Login from '../pages/login/Login'
import Service from '../pages/services/Service'

export default function RouteSetup() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}>
                    <Route index element={<Layout />}></Route>
                    <Route path='/service' element={<Service/>}></Route>
                
                </Route>
                <Route path='/login' element={<Login/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

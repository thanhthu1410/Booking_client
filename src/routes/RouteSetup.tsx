
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/homes/Home'
import Layout from '../pages/homes/components/Layout'
import Login from '../pages/login/Login'

export default function RouteSetup() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}>
                    <Route index element={<Layout />}></Route>
                
                </Route>
                <Route path='/login' element={<Login/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

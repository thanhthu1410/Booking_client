
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/homes/Home'
import Layout from '../pages/homes/components/Layout'

export default function RouteSetup() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}>
                    <Route index element={<Layout />}></Route>
                </Route>
                
            </Routes>
        </BrowserRouter>
    )
}

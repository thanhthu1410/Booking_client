
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/homes/Home'
import Layout from '../pages/homes/components/Layout'
import Lazy from '@/utils/Lazy/Lazy'

export default function RouteSetup() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}>
                    <Route index element={<Layout />}></Route>
                    <Route path="/booking" element={Lazy(() => import("@pages/booking/Booking"))()}></Route>
                    <Route path="/service" element={Lazy(() => import("@pages/services/Service"))()}></Route>
                </Route>
                
            </Routes>
        </BrowserRouter>
    )
}

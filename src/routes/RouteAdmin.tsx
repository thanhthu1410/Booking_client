import Sidebar from "@/pages/admin/Admin";
import ListCustomer from "@/pages/admin/customerManager/ListCustomer";
import AddService from "@/pages/admin/serviceManager/AddService";
import ListService from "@/pages/admin/serviceManager/ListService";
import AddStaff from "@/pages/admin/staffManager/AddStaff";
import ListStaff from "@/pages/admin/staffManager/ListStaff";
import { Route } from "react-router-dom";

export default
    <Route>
        <Route path='admin' element={<Sidebar />}>
            <Route index path="service" element={<ListService />}></Route>
            <Route path='addService' element={<AddService />}></Route>
            <Route path='listCustomer' element={<ListCustomer />}></Route>
            <Route path='listStaff' element={<ListStaff />}></Route>
            <Route path='addStaff' element={<AddStaff />}></Route>
        </Route>
    </Route>
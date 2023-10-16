import Sidebar from "@/pages/admin/Admin";
import ListCustomer from "@/pages/admin/customerManager/ListCustomer";
import AddService from "@/pages/admin/serviceManager/AddService";
import ListService from "@/pages/admin/serviceManager/ListService";
import Lazy from "@/utils/Lazy/Lazy";
import { Route } from "react-router-dom";

export default
    <Route>
        <Route path='admin' element={<Sidebar />}>
            <Route index path="service" element={<ListService />}></Route>
            <Route path='addService' element={<AddService />}></Route>
        </Route>
    </Route>
import Sidebar from "@/pages/admin/Admin";
import AddService from "@/pages/admin/serviceManager/AddService";
import ListService from "@/pages/admin/serviceManager/ListService";
import Lazy from "@/utils/Lazy/Lazy";
import { Route } from "react-router-dom";

export default
    <Route>
        <Route path='admin' element={<Sidebar />}>
            <Route path='service' element={<ListService />}></Route>
            <Route path='add' element={<AddService />}></Route>
        </Route>
    </Route>
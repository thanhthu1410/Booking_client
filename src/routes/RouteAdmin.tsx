import Sidebar from "@/pages/admin/Admin";
import Time from "@/pages/admin/Time";
import ListAppointment from "@/pages/admin/appointmentManager/ListAppointment";
import Chart from "@/pages/admin/chartManager/Chart";
import ChartService from "@/pages/admin/chartManager/ChartService";
import ListCustomer from "@/pages/admin/customerManager/ListCustomer";
import AddService from "@/pages/admin/serviceManager/AddService";
import ListService from "@/pages/admin/serviceManager/ListService";
import AddStaff from "@/pages/admin/staffManager/AddStaff";
import ListStaff from "@/pages/admin/staffManager/ListStaff";
import ListVouchers from "@/pages/admin/voucherManager/ListVouchers";
import Voucher from "@/pages/admin/voucherManager/Voucher";
import { Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
//element={<PrivateRoutes />}
export default
    <Route element={<PrivateRoutes />}>
        <Route path='admin' element={<Sidebar />}>
            <Route index path="service" element={<ListService />}></Route>
            <Route path='addService' element={<AddService />}></Route>
            <Route path='listCustomer' element={<ListCustomer />}></Route>
            <Route path='listStaff' element={<ListStaff />}></Route>
            <Route path='addStaff' element={<AddStaff />}></Route>
            <Route path="voucher" element={<Voucher />}></Route>
            <Route path="listvoucher" element={<ListVouchers />}></Route>
            <Route path="setting" element={<Time />}></Route>
            <Route path="appointment" element={<ListAppointment />}></Route>
            <Route path="chart-avenue" element={<Chart />}></Route>
            <Route path="chart-service" element={<ChartService />}></Route>
        </Route>
    </Route>
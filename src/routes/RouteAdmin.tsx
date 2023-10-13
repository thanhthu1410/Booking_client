import Lazy from "@/utils/Lazy/Lazy";
import { Route } from "react-router-dom";

export default
    <Route path="/admin" element={Lazy(() => import("@/pages/admin/Admin"))()}>

    </Route>
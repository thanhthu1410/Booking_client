import serviceModule from "./modules/service.module";
import timeModule from "./modules/time.module";
import voucherModule from "./modules/voucher.module";
import authModule from "./modules/auth.module";
import staffModule from "./modules/staff.module";
import appointmentModule from "./modules/appointment.module";
import customerModule from "./modules/customer.module";

export default {
    authApi: authModule,
    timeApi: timeModule,
    serviceApi: serviceModule,
    voucherApi: voucherModule,
    staffApi: staffModule,
    appointmentApi: appointmentModule,
    customerApi: customerModule
}
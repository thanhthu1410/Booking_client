import serviceModule from "./modules/service.module";
import timeModule from "./modules/time.module";
import voucherModule from "./modules/voucher.module";
import authModule from "./modules/auth.module";

export default {
    authApi: authModule,
    timeApi: timeModule,
    serviceApi: serviceModule,
    voucherApi: voucherModule
}
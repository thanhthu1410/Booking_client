import { useDispatch, useSelector } from "react-redux";
import RouteSetup from "./routes/RouteSetup"
import { useEffect } from "react";
import api from "./services/api";
import { timeAction } from "./stores/slices/time.slice";
import { voucherAction } from "./stores/slices/voucher.slice";
import { StoreType } from "./stores";
import { serviceActions } from "./stores/slices/service.slice";
function App() {
  const store = useSelector((store: StoreType) => store)

  const dispatch = useDispatch();

  useEffect(() => {
    api.timeApi.findAll()
      .then(res => {
        if (res.status == 200) {
          console.log("res", res.data.data);
          dispatch(timeAction.setData(res.data.data));
        }
      })
    api.voucherApi.findMany()
      .then(res => {
        if (res.status == 200) {
          console.log("listvoucher", res)
          dispatch(voucherAction.setData(res.data.data))
        }
      })
  }, [store.voucherStore.reLoad])

  useEffect(() => {
    api.serviceApi.findAllService()
      .then(res => {
        if (res.status == 200) {
          console.log("serviceList", res.data.data);
          dispatch(serviceActions.setDataService(res.data.data))

        }
      })
  }, [store.serviceStore.reLoad])


  return (
    <>
      <RouteSetup />
    </>
  )
}

export default App

import { useDispatch, useSelector } from "react-redux";
import RouteSetup from "./routes/RouteSetup"
import { useEffect } from "react";
import api from "./services/api";
import { timeAction } from "./stores/slices/time.slice";
import { voucherAction } from "./stores/slices/voucher.slice";
import { StoreType } from "./stores";
import { serviceActions } from "./stores/slices/service.slice";
import { staffActions } from "./stores/slices/staff.slice";
import { Socket, io } from "socket.io-client";
import { appointmentActions } from "./stores/slices/appointment.slice";
import { customerActions } from "./stores/slices/customer.slice";

function App() {
  const store = useSelector((store: StoreType) => store)

  const dispatch = useDispatch();

  useEffect(() => {
    api.timeApi.findAll()
      .then(res => {
        if (res.status == 200) {
          dispatch(timeAction.setData(res.data.data));
        }
      })
    api.voucherApi.findMany()
      .then(res => {
        if (res.status == 200) {
          dispatch(voucherAction.setData(res.data.data))
        }
      })
  }, [store.voucherStore.reLoad])

  useEffect(() => {
    api.serviceApi.findAllService()
      .then(res => {
        if (res.status == 200) {
          dispatch(serviceActions.setDataService(res.data.data));
          console.log("abc");
          

        }
      })
  }, [store.serviceStore.reLoad])

  useEffect(() => {
    api.staffApi.searchStaff('')
      .then(res => {
        if (res.status == 200) {
          dispatch(staffActions.setDataStaff(res.data.data))

        }
      })
  }, [store.staffStore.reLoad])

  useEffect(() => {
    api.customerApi.searchCustomer('')
      .then(res => {
        if (res.status == 200) {
          //console.log("customer", res.data.data);
          dispatch(customerActions.setDataCustomer(res.data.data))
        }
      })
  }, [store.customerStore.reLoad])

  useEffect(() => {
    let socket: Socket = io("http://localhost:3003")
    socket.on("connectStatus", (data: { status: boolean, message: string }) => {
      if (data.status) {
        console.log(data.message)
      } else {
        console.log(data.message)
      }
    })

    socket.on("listAppointments", (listAppointments) => {
      try {
        dispatch(appointmentActions.setData(listAppointments));
      } catch (error) {
        console.error("Error updating appointment store:", error);
      }
    });

    socket.on("bookingFail", (data) => {
      console.log("data", data);
    });

    socket.on("notifications", (data) => {
      console.log("data", data)
      dispatch(appointmentActions.setMessage(data))
    })

  }, [])


  return (
    <>
      <RouteSetup />
    </>
  )
}

export default App

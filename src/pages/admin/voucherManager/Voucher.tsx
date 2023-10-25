import { message } from "antd";
import "./voucher.scss"
import api from "@/services/api";
import { useDispatch } from "react-redux";
import { voucherAction } from "@/stores/slices/voucher.slice";
import DateTimeVoucher from "@/pages/bookings/Booking";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface VoucherTime {
  start: string
  end: string
}
export default function Voucher() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [voucherTime, setVoucherTime] = useState<VoucherTime>();
  let timeStart: string;
  let timeEnd: string;

  if (voucherTime) {
    const dataObjStart = new Date(voucherTime.start);
    const dataObjEnd = new Date(voucherTime.end);
    timeStart = dataObjStart.getTime().toString()
    timeEnd = dataObjEnd.getTime().toString()
  }


  function createVoucher(e: any) {
    if (e.target.title.value == "") {
      message.warning("Please enter The Title of Voucher")
      return
    } else if (e.target.type.value == "") {
      message.warning("Please Choose Type of Voucher")
      return
    } else if (e.target.valueDiscount.value == "") {
      message.warning("Please enter value discount of Voucher")
      return
    } else if (e.target.quantity.value == "") {
      message.warning("Please enter quantity of Voucher")
      return
    } else if (e.target.type.value == "percent") {
      if (Number(e.target.valueDiscount.value) > 100) {
        message.warning("Percent over 100%")
        return
      }
    }
    const data = {
      title: e.target.title.value,
      discountType: e.target.type.value,
      value: e.target.valueDiscount.value,
      quantity: e.target.quantity.value,
      endAt: timeEnd,
      startAt: timeStart,
    }
    api.voucherApi.create(data)
      .then(res => {
        message.success("Create Voucher Successfull !");
        (document.getElementById("title") as HTMLInputElement
        ).value = "";
        (document.getElementById("valueDiscount") as HTMLInputElement
        ).value = "";
        (document.getElementById("quantity") as HTMLInputElement
        ).value = "";
        api.voucherApi.findMany()
          .then(res => dispatch(voucherAction.setData(res.data.data)))
          .catch(err => console.log("err", err))
      })


      .catch(err => console.log("err", err))

  }
  return (
    <div className="voucher_container">
        <div className='admin_title'>
                <h3 onClick={() => navigate("/admin/service")} className='title_1'>Admin / </h3>
                <h3>Add Vouchers</h3>
            </div>
      <div className="add_voucher_container">
    
        <label htmlFor=""> Expiry Date : </label>
        <DateTimeVoucher setVoucherTime={setVoucherTime} />
        <form onSubmit={(e: any) => {
          e.preventDefault();

          createVoucher(e)
        }}>
          <label htmlFor="">Discount Type</label>
          <select name="type" id="">
            <option value="percent">Percent</option>
            <option value="cash">Cash</option>
          </select> <br />
          <label>Title :</label> <br />
          <input type="text" name="title" placeholder="Title of new Voucher" id="title" /><br />
          <label>Quantity :</label><br />
          <input type="number" placeholder="Quantity of Vouchers" name="quantity" id="quantity" /><br />
          <label>Value:</label><br />
          <input type="number" name="valueDiscount" placeholder="10% or 100.000" id="valueDiscount" /><br />
          <button type="submit">Create Voucher</button>
        </form>

      </div>

    </div>
  )
}

import { message } from "antd";
import "./voucher.scss"

export default function Voucher() {
  function createVoucher (e: any) {
    const data = {
      title : e.target.title.value,
      discountType : e.target.type.value,
      value: e.target.valueDiscount.value,
      quantity:e.target.quantity.value
    }
  }
  return (
    <div className="voucher_container">
      <div className="add_voucher_container">
        <h4><i className="fa-solid fa-plus"></i> Add Voucher :</h4>
       
          <form onSubmit={(e: any) => {
            e.preventDefault();
              if (e.target.type.value == "percent") {
                if (Number(e.target.valueDiscount.value) > 100) {
                  message.warning("Percent over 100%")
                }
              }
              createVoucher(e)
          }}>
            <label htmlFor="">Discount Type</label> 
            <select name="type" id="">
              <option value="percent">Percent</option>
              <option value="cash">Cash</option>
            </select> <br/>
            <label>Title :</label> <br/>
            <input type="text" name="title" placeholder="Title of new Voucher" /><br/>
            <label>Quantity :</label><br/>
            <input type="number" placeholder="Quantity of Vouchers" name="quantity" /><br/>
            <label>Value:</label><br/>
            <input type="number" name="valueDiscount" placeholder="10% or 100.000"/><br/>
            <button type="submit">Create Voucher</button>
          </form>
       
      </div>
     
    </div>
  )
}

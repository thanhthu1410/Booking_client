import { useState } from "react";

export default function Booking() {
    const [voucher,setVoucher] = useState<object[]>([])
    function generateRandomVoucher(length: number) {
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          let randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
        console.log("result",result);     
        return result;
      }  
      function generateVouchers(quantity: number,length:number,type:string,value:number,title: string) {
        let vouchers = [];
      
        for (let i = 0; i < quantity; i++) {
          let voucher = generateRandomVoucher(length);
          const formartVoucher = {
            code: voucher,
            type,
            value,
            title
          }
          console.log("formartVoucher",formartVoucher);
          vouchers.push(formartVoucher);
        }
        return setVoucher(vouchers) ;
      }
      console.log(voucher);
  return (
    <div>Create Voucher
        <form onSubmit={(e: any)=>{ 
            e.preventDefault();
            if(e.target.type.value == "percent"){
              if(Number( e.target.valueDiscount.value) > 100 ){
                    alert("percent over 100")
              }
            }
            generateVouchers(e.target.quantity.value,6,e.target.type.value,Number(e.target.valueDiscount.value),e.target.title.value)}}>
            <select name="type" id="">
              <option value="percent">Percent</option>
              <option value="cash">Cash</option>
            </select>
        <p>Title</p>
        <input type="text" name="title"/>
        <input type="number" placeholder="enter quantity voucher" name="quantity"/>
        <p>Value:</p>
        <input type="number" name="valueDiscount" />
        <button type="submit">create voucher</button>
        </form>
    </div>
  )
}

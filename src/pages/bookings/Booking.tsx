import { Datepicker } from "@mobiscroll/react";
import axios from "axios";
import { useEffect, useState } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

export default function Booking() {
    const [voucher,setVoucher] = useState<object[]>([])
    // const [start, setStart] = useState<string>();
    // const [end, setEnd] = useState<string>();
    const [time, setTime] = useState<string[]>();
    useEffect(() => {
      if(time){
        console.log("time[0]", time[0]);
      }
    }, [time])
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
            discountType: type,
            value,
            title
          }
          console.log("formartVoucher",formartVoucher);

          vouchers.push(formartVoucher);
        }
        return setVoucher(vouchers) ;
      }
      console.log(voucher);
      useEffect(() => {
        if(voucher.length > 0){
            axios.post("http://localhost:3000/api/v1/vouchers",voucher)
            .then(res => console.log("res",res))
            .catch(err => console.log("err",err)
            ) 
        }
      },[voucher])
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
        
        <Datepicker
                controls={['date']}
                select="range"
                // startInput={start}
                // endInput={end}
                onChange={(e) => setTime(e.value)}
            />

        <button type="submit">create voucher</button>

        </form>
        
    </div>
  )
}

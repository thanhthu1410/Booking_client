import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;
interface Props{
  setVoucherTime: any
}
const DateTimeVoucher = (props: Props) => {
  console.log("props",props.setVoucherTime);
  
  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    // dates là một mảng chứa 2 đối tượng moment, tương ứng với ngày bắt đầu và kết thúc
    // dateStrings là một mảng chứa 2 chuỗi đại diện cho ngày bắt đầu và kết thúc

    const [start, end] = dateStrings;
    console.log(`Ngày bắt đầu: ${start}, Ngày kết thúc: ${end}`);
    props.setVoucherTime({ start: start, end: end });
  }

  return (
    <RangePicker onChange={handleDateChange} />
  );
}

export default DateTimeVoucher;
import { useEffect, useState } from 'react';
import "./booking.scss";
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import api from '@/services/api';
import { serviceActions } from '@/stores/slices/service.slice';
import CalendarAntd from '@/components/calendarAntd/CalendarAntd';
import TimePicker from '@/components/timePicker/TimePicker';
import dayjs from 'dayjs';
import { Socket, io } from 'socket.io-client'
import { Alert, Modal, Select, Space, message } from 'antd';
import TimePickerAll from '@/components/timePicker/TimePickerAll';

export default function Booking() {
    const timeStore = useSelector((store: StoreType) => {
        return store.timeStore
    })
    const [showServiceSelection, setShowServiceSelection] = useState(true);
    const [showService, setShowService] = useState(true);
    const [showTimeBook, setShowTimeBook] = useState(false);
    const [showInforForm, setShowInforForm] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [showMessage, setShowMessage] = useState(true);

    const [activeServices, setActiveServices] = useState<any[]>([]);

    const [selectedServices, setSelectedServices] = useState<any[]>([]);

    const [selectedStaff, setSelectedStaff] = useState<{ [key: string]: string }>({});

    const [fullName, setFullName] = useState<string>("");

    const [email, setEmail] = useState<string>("");

    const [voucherCode, setVoucherCode] = useState<string>("");

    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const [dateBooking, setDateBooking] = useState(dayjs().format('DD/MM/YYYY'));

    const [timeBooking, setTimeBooking] = useState<string | undefined>();

    const [voucherData, setVoucherData] = useState(null);

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    function isValidEmail(email: any) {
        // You can implement your email validation logic here
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const validateName = (name: any) => {
        if (name.length == 0) {
            setNameError("Please Enter Full Name");
            return false;
        } else {
            setNameError('');
            return true;
        }
    };

    const validateEmail = (email: any) => {
        if (email.length === 0) {
            setEmailError("Please Enter Your Email");
            return true;
        }
        if (!isValidEmail(email)) {
            setEmailError("Email is not valid");
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };

    const validatePhone = (phone: any) => {
        if (phone.length == 0) {
            setPhoneError("Please Enter Your Phone Number");
            return false;
        } else {
            setPhoneError('');
            return true;
        }
    };

    function handleChooseService(serviceId: number, price: number, slot: number = 1) {
        setShowMessage(!showMessage);
        if (activeServices.includes(serviceId)) {
            // Bỏ chọn dịch vụ nếu nó đã được chọn
            setActiveServices(prevActiveServices => prevActiveServices.filter(id => id !== serviceId));
            setSelectedServices(prevSelectedServices => prevSelectedServices.filter(service => service.serviceId !== serviceId));
        } else {
            // Chọn dịch vụ nếu nó chưa được chọn
            setActiveServices(prevActiveServices => [...prevActiveServices, serviceId]);
            setSelectedServices(prevSelectedServices => [
                ...prevSelectedServices,
                { serviceId, staffId: null, price: Number(price), slot }
            ]);
        }
    }

    let socket: Socket = io("http://localhost:3003")

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        let appointment = {
            date: dateBooking,
            time: timeBooking
        }


        let details = selectedServices;

        let customer = {
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber
        }

        let voucher = voucherData

        let data;

        if (voucher != null) {

            data = {
                customer,
                appointment,
                details,
                voucher
            }
            socket.emit("booking", data)
            Modal.success({
                title: "Booking successfull ",
                content: "We has already send to you an Email - Please confirm appointment in your Email ",
                onOk: () => {
                    window.location.href = "/"
                }
            })
        } else {

            data = {
                customer,
                appointment,
                details
            }
            socket.emit("booking", data)

            Modal.success({
                title: "Booking successfull",
                content: "We has already send to you an Email - Please confirm appointment in your Email ",
                onOk: () => {
                    window.location.href = "/"
                }
            })
        }
    }

    function handleCalculateSubTotal(type: string, value: number) {
        const subTotalBefore = selectedServices.reduce((total, item) => {
            const service = serviceStore.data?.find(service => service.id == item.serviceId);
            return total + (service ? Number(service.price) : 0)
        }, 0);

        if (type == "percent") {
            setAddVoucher(true);
            setSubTotalVoucher(subTotalBefore - subTotalBefore * value / 100);
        } else if (type == "cash") {
            setAddVoucher(true);
            if (subTotalBefore - value > 0) {
                setSubTotalVoucher(subTotalBefore - value)
            } else {
                setSubTotalVoucher(0)
            }
        }
    }

    const [subTotalVoucher, setSubTotalVoucher] = useState<number>(0)

    const [addVoucher, setAddVoucher] = useState(false);
    const [discountPercent, setDiscountPercent] = useState(null)
    const [discountCash, setDiscountCash] = useState(null)

    function handleAddVoucher() {
        api.voucherApi.getVoucher(voucherCode)
            .then(res => {
                if (res.status) {
                    if (res.data.status) {
                        if (res.data.data.discountType == "percent") {
                            handleCalculateSubTotal("percent", res.data.data.value);
                            setDiscountPercent(res.data.data.value);
                        } else if (res.data.data.discountType == "cash") {
                            handleCalculateSubTotal("cash", res.data.data.value);
                            setDiscountCash(res.data.data.value);
                        }
                        message.success(res.data.message)
                        setVoucherData(res.data.data)
                    } else {
                        message.warning(res.data.message)
                    }
                } else {
                    message.warning(res.data.message)
                }
            })
            .catch(err => {
                console.log("err", err);
            })
    }

    const dispatch = useDispatch();
    const serviceStore = useSelector((store: StoreType) => {
        return store.serviceStore
    })

    useEffect(() => {
        api.serviceApi.findAllService()
            .then(res => {
                if (res.status == 200) {
                    dispatch(serviceActions.setDataService(res.data.data))
                }
            })
    }, [])


    function handleShowTime() {
        if (selectedServices.length == 0) {
            message.warning('Please Choose Service')
        } else {
            if (!selectedServices.every(service => !!selectedStaff[service.serviceId])) {
                message.warning("Please Choose Staff For All Service")
            } else {
                setShowServiceSelection(false);
                setShowTimeBook(true);
                setShowService(false);
            }
        }
    }

    function handleShowInformation() {
        if (timeBooking) {
            setShowInforForm(true);
            setShowTimeBook(false);
        } else {
            message.warning("Please Choose Time For Booking");
        }
    }

    function handleShowPayment() {
        if (fullName !== "" && email !== "" && phoneNumber !== "") {
            setShowInforForm(false);
            setShowPaymentForm(true);
        } else {
            message.warning("Please Enter All Your Information")
        }
    }

    const handleChange = (value: string, serviceId: number) => {

        setSelectedStaff(prevSelectedStaff => ({
            ...prevSelectedStaff,
            [serviceId]: value,
        }));

        setSelectedServices(prevSelectedServices => prevSelectedServices.map(service =>
            service.serviceId === serviceId ? { ...service, staffId: Number(value) } : service
        ));
    };
    function currencyFormat(num: number) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <div className='booking_container'>
            <div className='booking_left'>
                <div className={`booking_left_step ${showService ? 'showService' : ''}`}>
                    <p>Service Selection</p>
                </div>
                <div className={`booking_left_step ${showTimeBook ? 'showTime' : ''}`}>
                    <p>Date & Time</p>
                </div>
                <div className={`booking_left_step ${showInforForm ? 'showInformation' : ''}`}>
                    <p>Your Information</p>
                </div>
                <div className={`booking_left_step ${showPaymentForm ? 'showPayment' : ''}`}>
                    <p>Payments</p>
                </div>
            </div>
            <form className='booking_right' onSubmit={(e) => handleSubmit(e)}>
                {selectedServices.length == 0 && <Space direction="vertical" style={{ width: '50%', marginBottom: "20px" }}>
                    <Alert className="bounce-alert" message="Please Choose Service" type="info" showIcon />
                </Space>}

                {showServiceSelection && (
                    <div className='booking_right_service'>
                        {serviceStore.data?.map((service) => (
                            <div className={`booking_right_service_detail ${activeServices.includes(service.id) ? 'active' : ''}`} key={Math.random() * Date.now()}>
                                <div className='booking_right_service_detail_choose'>
                                    <img className='service_image' src={service.avatar} alt="" />

                                    <div className="service_choose_button" onClick={() => handleChooseService(service.id, service.price)}>Choose</div>
                                </div>
                                <div className='booking_choose_right'>
                                    <div className='booking_choose_right_inforservice'>
                                        <h5>{service.name}</h5>
                                        <p>Price: {currencyFormat(service.price)}</p>
                                        <p><i className="fa-solid fa-heart icondesc"></i>{service.desc}</p>
                                    </div>
                                    {activeServices.includes(service.id) && (
                                        <div className='staff_list'>
                                            {selectedStaff[service.id] === undefined && (
                                                <Space direction="vertical" style={{ width: '70%', marginBottom: "20px" }}>
                                                    <Alert className="bounce-alert" message="Please Select Staff" type="info" showIcon />
                                                </Space>
                                            )}
                                            <br />
                                            <Space wrap>
                                                <Select
                                                    defaultValue="Select staff"
                                                    style={{ width: 265, height: 50 }}
                                                    onChange={(value) => handleChange(value, service.id)}
                                                    value={selectedStaff[service.id.toString()] || "Select staff"}
                                                >
                                                    {service.staffServices?.map((item) => (
                                                        <Select.Option key={item.staff.id} value={item.staff.id}>
                                                            <div>
                                                                <img src={item.staff.avatar} alt="Staff Image" style={{ width: '40px', marginRight: '8px' }} />
                                                                {item.staff.name} {`(${item.staff.experience})`}
                                                            </div>
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            </Space>
                                        </div>)}
                                </div>

                            </div>
                        ))}
                        <div className='booking_right_service_button'>
                            <button className={`continue_button ${selectedServices.length > 0 && selectedServices.every(service => !!selectedStaff[service.serviceId]) ? "enable" : ""}`} type='button' onClick={() => handleShowTime()}>Continue</button>
                        </div>
                    </div>
                )}

                {showTimeBook && (
                    <div className='booking_calendar'>
                        {/* <Calendar /> */}
                        <div className='booking_calendar_wrapper'>
                            <CalendarAntd dateBooking={dateBooking} setDateBooking={setDateBooking} maxDate={timeStore.data?.maxDate} />
                            {dateBooking === dayjs().format('DD/MM/YYYY') ?
                                <TimePicker startTime={timeStore.data?.startTime} endTime={timeStore.data?.endTime} minTime={timeStore.data?.duration}
                                    timeBooking={timeBooking} setTimeBooking={setTimeBooking} stepMinute={timeStore.data?.stepMinute} dateBooking={dateBooking}
                                />
                                :
                                <TimePickerAll startTime={timeStore.data?.startTime} endTime={timeStore.data?.endTime} minTime={timeStore.data?.duration}
                                    timeBooking={timeBooking} setTimeBooking={setTimeBooking} stepMinute={timeStore.data?.stepMinute} dateBooking={dateBooking} />}
                        </div>
                        <div className='booking_right_service_button'>
                            <button className={`continue_button ${timeBooking ? "enable" : ""}`} type='button' onClick={() => handleShowInformation()}>Continue</button>
                        </div>
                    </div>
                )}
                {
                    showInforForm ? <div className='infor_container'>
                        <h4>Your Information : </h4>
                        <div>
                            <div>
                                <label htmlFor="">Full Name :</label> <br />
                                <input type="text" placeholder='Alex Join' name='fullName' defaultValue={fullName} onChange={(e) => {
                                    setFullName(e.target.value)
                                    validateName(e.target.value)
                                }} /><br />
                                {nameError && <span className="error_message">{nameError}</span>}
                            </div>
                            <div>
                                <label htmlFor="">Email :</label><br />
                                <input type="email" placeholder='alexjoin@gmail.com' name='email' onChange={(e) => {
                                    setEmail(e.target.value)
                                    validateEmail(e.target.value)
                                }} value={email} /><br />
                                {emailError && <span className="error_message">{emailError}</span>}
                            </div>
                            <div>
                                <label htmlFor="">Phone Number :</label><br />
                                <input type="text" placeholder='+0123456789' name='phoneNumber' onChange={(e) => {
                                    setPhoneNumber(e.target.value)
                                    validatePhone(e.target.value)
                                }} value={phoneNumber} /><br />
                                {phoneError && <span className="error_message">{phoneError}</span>}
                            </div>
                            <button style={{ marginTop: "20px" }} className='continue_button' type='button' onClick={() => handleShowPayment()}>Continue</button>

                        </div>
                    </div> : <div></div>
                }

                {
                    showPaymentForm ? <div className='payment_container'>
                        <h4>Check Out</h4>
                        <div>
                            <p className='sumamry'>Summary :</p>
                            {selectedServices.map((item, index) => {
                                const service = serviceStore.data?.find(service => service.id === item.serviceId);
                                if (service) {
                                    return (
                                        <div className='payment_detail' key={index}>
                                            <span>{`${service.name} ($${service.price}) x 1 slot`}</span>
                                            <span>{` $${service.price}`}</span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                            <span className='subtotal'>Subtotal:  {` ${currencyFormat(selectedServices.reduce((acc, item) => {
                                const service = serviceStore.data?.find(service => service.id === item.serviceId);
                                return acc + (service ? Number(service.price) : 0);
                            }, 0))}`}  </span>
                            <div className='voucher_container'>
                                <label htmlFor="">Enter Voucher :</label> <br />
                                <input type="text" placeholder='aB3%d' name='voucherCode' onChange={(e) => setVoucherCode(e.target.value)} value={voucherCode} />
                                <button className="btn-80" type='button' onClick={() => {
                                    handleAddVoucher()
                                }}><span>Add</span></button>
                            </div>

                            <p className='total_amount'>Discount Amount : {
                                !addVoucher
                                    ? 0
                                    : discountCash
                                        ? currencyFormat(discountCash)
                                        : currencyFormat((discountPercent ?? 0) / 100 * selectedServices.reduce((acc, item) => {
                                            const service = serviceStore.data?.find(service => service.id === item.serviceId);
                                            return acc + (service ? Number(service.price) : 0);
                                        }, 0))
                            }
                            </p>


                            <p className='total_amount'>Total Amount : {!addVoucher ?
                                ` ${currencyFormat(selectedServices.reduce((acc, item) => {
                                    const service = serviceStore.data?.find(service => service.id === item.serviceId);
                                    return acc + (service ? Number(service.price) : 0);
                                }, 0))}`
                                : currencyFormat(subTotalVoucher)}</p>
                            <button className='checkout' type='submit'>CHECK OUT</button>

                        </div>
                    </div> : <div></div>
                }
            </form>
        </div>
    )
}

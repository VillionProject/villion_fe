import React, {useEffect, useState} from 'react';
import classes from '../../styles/blocks/RentalConfirm.module.css';
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import {getProductsByCategory, getProductsByUser} from "../../common/api/ApiGetService";
import {addDeliveryOrder} from "../../common/api/ApiPostService";
import {useSelector} from "react-redux";
import PopupDom from "./PopupDom";
import MsgPopup from "./MsgPopup";
import ConfirmPopup from "./ConfirmPopup";
import {useNavigate} from "react-router-dom";
import {emailCheck} from "../../common/Reg";


const RentalConfirm = () => {

    const [currData, setCurrData] = useState('');
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userMemo, setUserMemo] = useState('');
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [userPoint, setUserPoint] = useState(0);
    const userInfo = useSelector(state => state.loginCheck.loginInfo);
    const [isMsgPopupOpen, setIsMsgPopupOpen] = useState({show : false, msg: ''});
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState({show : false, msg: ''});
    const navigate = useNavigate();


    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const currData = JSON.parse(urlParams.get('data'));
        setCurrData(currData.info)
        setTitle(currData.title)
        console.log(currData.info)

    }, []);

    const paySubmit = () => {

        if (currData.rentalMethod == 'FACE_TO_FACE') {
            setIsMsgPopupOpen({show: true, msg: '구매신청 채팅으로 이동합니다.', gb : 'successRental'});
            return;
        }

        if (userName == '') {
            setIsMsgPopupOpen({show: true, msg: '이름을 입력해 주세요.', gb : ''});
            return ;
        }

        if (userPhone == '') {
            setIsMsgPopupOpen({show: true, msg: '번호를 입력해 주세요.', gb : ''});
            return ;
        }

        if (userMemo == '') {
            setIsMsgPopupOpen({show: true, msg: '유의사항을 입력해 주세요.', gb : ''});
            return ;
        }



        addDeliveryOrder(
            currData.ownerUserId,
            userInfo.userId,
            userName,
            userPhone,
            "인계동",
            userMemo,
            "",
            "",
            userPoint,
            0,
            [
                {
                    productId: currData.productId,
                    quantity: 1
                }
            ],
            "CREDIT_CARD"
        ).then((res) => {
            if(res.status == 200) {



                setIsMsgPopupOpen({show: true, msg: '구매신청이 완료되었습니다.', gb : 'success'});

            }
        }).catch((err) => {
            setIsMsgPopupOpen({ show: true, msg: "책 구매 중 오류가 발생했습니다.", gb: 'error' });
        })
    }

    const paySubmit2 = () => {

        if (currData.rentalMethod == 'FACE_TO_FACE') {
            setIsMsgPopupOpen({show: true, msg: '대여신청 채팅으로 이동합니다.', gb : 'successRental'});
            return;
        }

        if (userName == '') {
            setIsMsgPopupOpen({show: true, msg: '이름을 입력해 주세요.', gb : ''});
            return ;
        }

        if (userPhone == '') {
            setIsMsgPopupOpen({show: true, msg: '번호를 입력해 주세요.', gb : ''});
            return ;
        }

        if (userMemo == '') {
            setIsMsgPopupOpen({show: true, msg: '유의사항을 입력해 주세요.', gb : ''});
            return ;
        }

        if (startDate == '') {
            setIsMsgPopupOpen({show: true, msg: '대여시작날짜를 입력해 주세요.', gb : ''});
            return ;
        }

        if (endDate == '') {
            setIsMsgPopupOpen({show: true, msg: '대여종료날짜 입력해 주세요.', gb : ''});
            return ;
        }

        addDeliveryOrder(
            currData.ownerUserId,
            userInfo.userId,
            userName,
            userPhone,
            "인계동",
            userMemo,
            startDate,
            endDate,
            userPoint,
            0,
            [
                {
                    productId: currData.productId,
                    quantity: 1
                }
            ],
            "CREDIT_CARD"
        ).then((res) => {
            if(res.status == 200) {

                setIsMsgPopupOpen({show: true, msg: '대여신청이 완료되었습니다.', gb : 'success'});
                // setIsMsgPopupOpen({show: true, msg: '대여신청이 완료되었습니다.', gb : 'successRental'});

            }
        }).catch((err) => {
            setIsMsgPopupOpen({ show: true, msg: "책 구매 중 오류가 발생했습니다.", gb: 'error' });
        })
    }
    const nameMethods = (e) => {
        setUserName(e.target.value)
    }

    const phoneMethods = (e) => {
        setUserPhone(e.target.value)
    }
     const memoMethods = (e) => {
         setUserMemo(e.target.value)
    }

    const pointMethods = (e) => {
        setUserPoint(e.target.value)
    }
    const closeMsgPopup = () => {
        if (isMsgPopupOpen.gb === 'success') {
            // navigate('/home');
        }

        if (isMsgPopupOpen.gb === 'successRental') {
            // navigate('/home');
            navigate(`/chatTest3?test=${userInfo.libraryName}&productId=${currData.productId}&gb=${true}`)
        }

        setIsMsgPopupOpen({show: false, msg: ''});
    }
    const confirmHandler = () => {
        alert("asdsad")
    }

    const closeConfirmPopup = () => {
        setIsConfirmPopupOpen({show: false, msg: ''});
    }

    const startDateChange = (e) => {
        setStartDate(e.target.value)
    }

    const endDateChange = (e) => {
        setEndDate(e.target.value)
    }


    return (
        <>
            <div className={classes.wrap}>
                <div className={classes.topArea}>
                    <p>{title}</p>
                </div>
                <div className={classes.styleBlock}>
                    <p>빌런배송</p>
                </div>

                <div className={classes.contentArea}>
                    <Input onChange={nameMethods} value="이름" placeholder="이름을 입력하세요. 변경 불가능합니다." type="text"/>
                    <Input onChange={phoneMethods} value="핸드폰 번호" placeholder="핸드폰번호를 입력하세요. 변경 불가능합니다." type="text"/>
                    <Input onChange={memoMethods} value="배송유의사항" placeholder="배송유의사항을 입력하세요. 변경 불가능합니다." type="text"/>
                    {title == '대여하기' &&
                        <>
                            <Input onChange={startDateChange} value="대여시작날짜" placeholder="2024-08-08" type="text"/>
                            <Input onChange={endDateChange} value="대여종료날짜" placeholder="2024-08-10" type="text"/>
                        </>
                    }

                </div>

                <div className={classes.summary}>
                    <div className={classes.summaryTitle}>
                        <p>주문내역</p>
                    </div>

                    <div className={classes.tradeHistory}>
                        <div>
                            <div className={classes.innerDiv}>
                                <p>1</p>
                                <p>{currData.bookName}</p>
                            </div>
                            <p>{currData.productStatus} <span>|</span> {currData.rentalPrice}원</p>
                        </div>

                    </div>

                    <div className={classes.payTitle}>
                        <p>결제금액</p>
                    </div>


                    <div className={classes.payHistory}>

                        {currData.title == '대여하기' &&
                            <div>
                                <p>대여기간</p>
                                <p>15일</p>
                            </div>
                        }


                        <div>
                            <p>권수</p>
                            <p>1권</p>
                        </div>

                        <div>
                            <p>배송비</p>
                            <p>3000원</p>
                        </div>
                    </div>
                </div>

                <div className={classes.totalPrice}>
                    <Input onChange={pointMethods} value="사용할 포인트" placeholder="사용할 포인트를 입력하세요." type="text"/>
                    <p>사용 가능한 포인트<span>0</span></p>
                </div>

                {title == '구매하기' && <Button onClick ={paySubmit} value={title}></Button>}
                {title == '대여하기' && <Button onClick ={paySubmit2} value={title}></Button>}


            </div>
            <div id='popupDom'>
                {isMsgPopupOpen.show && <PopupDom>
                    <MsgPopup onClick={closeMsgPopup} msg={isMsgPopupOpen.msg} />
                </PopupDom>}
                {isConfirmPopupOpen.show && <PopupDom>
                    <ConfirmPopup onConfirm={confirmHandler} onClick={closeConfirmPopup} msg={isConfirmPopupOpen.msg} />
                </PopupDom>}
            </div>
        </>
    );
};

export default RentalConfirm;
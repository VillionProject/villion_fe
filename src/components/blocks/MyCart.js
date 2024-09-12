import React, {useEffect, useState} from 'react';
import classes from '../../styles/blocks/MyCart.module.css';
import back from "../../asset/images/back.webp";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getProductsByUser, getProductsByUser2, getUser, getUserRental} from "../../common/api/ApiGetService";
import bookImg3 from "../../asset/books/image 3.png";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import {deleteCart} from "../../common/api/ApiPostService";
import Loading from "./Loading";
import PopupDom from "./PopupDom";
import MsgPopup from "./MsgPopup";
import ConfirmPopup from "./ConfirmPopup";

const MyCart = () => {
    const [activeTab, setActiveTab] = useState('directTrade'); // 초기값으로 '직거래' 탭을 활성화
    const nav = useNavigate()
    const userInfo = useSelector(state => state.loginCheck.loginInfo);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [rentableItems, setRentableItems] = useState([]); // rentable이 true인 아이템
    const [nonRentableItems, setNonRentableItems] = useState([]); // rentable이 false인 아이템
    const [rentableChecked, setRentableChecked] = useState(false); // To track the "대여" checkbox
    const [nonRentableChecked, setNonRentableChecked] = useState(false); // To track the "구매" checkbox
    const [selectedRentable, setSelectedRentable] = useState([]); // To track selected rentable items
    const [selectedNonRentable, setSelectedNonRentable] = useState([]); // To track selected non-rentable items
    const [startDates, setStartDates] = useState([]); // 각 아이템의 대여 시작 날짜 배열
    const [endDates, setEndDates] = useState([]); // 각 아이템의 대여 종료 날짜 배열
    const [rentalPeriods, setRentalPeriods] = useState([]); // 각 아이템의 대여 기간 배열
    const [isMsgPopupOpen, setIsMsgPopupOpen] = useState({ show: false, msg: '', gb: '' });
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState({ show: false, msg: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const backHandler = () => {
        nav('/home');
    }

    // 대여 시작 날짜 변경 핸들러
    const handleStartDateChange = (idx, value) => {
        const updatedStartDates = [...startDates];
        updatedStartDates[idx] = value;
        setStartDates(updatedStartDates);

        updateRentalPeriod(idx, value, endDates[idx]);
    };

    // 대여 종료 날짜 변경 핸들러
    const handleEndDateChange = (idx, value) => {
        const updatedEndDates = [...endDates];
        updatedEndDates[idx] = value;
        setEndDates(updatedEndDates);

        updateRentalPeriod(idx, startDates[idx], value);
    };

    // 대여 기간 계산 함수
    const updateRentalPeriod = (idx, start, end) => {
        if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const updatedRentalPeriods = [...rentalPeriods];
            updatedRentalPeriods[idx] = diffDays;
            setRentalPeriods(updatedRentalPeriods);
        }
    };

    useEffect(() => {
        getUserRental(userInfo.userId)
            .then((res) => {
                if (res.status === 200) {
                    const rentableItems = [];
                    const nonRentableItems = [];

                    const promises = res.data.map((item) => {
                        return getProductsByUser2(item.productId)
                            .then((productRes) => {
                                if (productRes.status === 200) {
                                    // 상품 세부 정보를 얻은 후
                                    return getUser(item.ownerUserId) // ownerId로 사용자 정보 가져오기
                                        .then((ownerRes) => {
                                            if (ownerRes.status === 200) {
                                                // item 객체에 productDetails와 ownerDetails를 추가
                                                const itemWithDetails = {
                                                    ...item,
                                                    productDetails: productRes.data,
                                                    ownerDetails: ownerRes.data
                                                };

                                                if (item.rentable) {
                                                    rentableItems.push(itemWithDetails);
                                                } else {
                                                    nonRentableItems.push(itemWithDetails);
                                                }
                                            }
                                        })
                                        .catch((err) => {
                                            console.error(`Error fetching owner details for ${item.ownerId}:`, err);
                                        });
                                }
                            })
                            .catch((err) => {
                                console.error(`Error fetching product details for ${item.productId}:`, err);
                            });
                    });

                    // 모든 API 호출이 완료되면 상태를 업데이트
                    Promise.all(promises)
                        .then(() => {
                            setRentableItems(rentableItems); // 대여 가능한 아이템
                            setNonRentableItems(nonRentableItems); // 대여 불가능한 아이템

                            console.log("Rentable Items:", rentableItems);
                            console.log("Non-Rentable Items:", nonRentableItems);
                        })
                        .catch((err) => {
                            console.error("Error processing rentals:", err);
                        });
                }
            })
            .catch((err) => {
                console.error("Error fetching user rentals:", err);
            });
    }, []);



    const startDateChange = (e) => {
        setStartDate(e.target.value);
    }

    const endDateChange = (e) => {
        setEndDate(e.target.value);
    }

    const rentalMethods = (item) => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false)
            navigate(`/chatTest3?test=${userInfo.libraryName}&productId=${item.productId}&gb=${true}`)
        }, 1000)

    }

    const rentalMethods2 = (item) => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false)

            const tradeObj =  {
                title : '구매하기',
                info : item.productDetails
            }

            nav(`/rentalConfirm?data=${JSON.stringify(tradeObj)}`)
            // navigate(`/chatTest3?test=${userInfo.libraryName}&productId=${item.productId}&gb=${true}`)
        }, 1000)

    }

    // Handle main "대여" checkbox toggle
    const handleRentableCheck = (e) => {
        const checked = e.target.checked;
        setRentableChecked(checked);
        setSelectedRentable(rentableItems.map(() => checked));
    };

    // Handle main "구매" checkbox toggle
    const handleNonRentableCheck = (e) => {
        const checked = e.target.checked;
        setNonRentableChecked(checked);
        setSelectedNonRentable(nonRentableItems.map(() => checked));
    };

    // Handle individual checkbox toggle for rentable items
    const toggleRentableItem = (idx) => {
        const updatedSelection = [...selectedRentable];
        updatedSelection[idx] = !updatedSelection[idx];
        setSelectedRentable(updatedSelection);
    };

    // Handle individual checkbox toggle for non-rentable items
    const toggleNonRentableItem = (idx) => {
        const updatedSelection = [...selectedNonRentable];
        updatedSelection[idx] = !updatedSelection[idx];
        setSelectedNonRentable(updatedSelection);
    };

    const deleteCartMethod = (item) => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            deleteCart(userInfo.userId, item.productId)
                .then((res) => {
                    if(res.status == 200) {
                        setIsMsgPopupOpen({show: true, msg: '장바구니에서 삭제 되었습니다.', gb : 'success'});
                    }
                }).catch((err) => {

            })
        }, 1000)


    }

    const closeMsgPopup = () => {
        if (isMsgPopupOpen.gb === 'success') {
            window.location.reload();
        }

        if (isMsgPopupOpen.gb === 'successRental') {
            // navigate('/home');

        }

        setIsMsgPopupOpen({ show: false, msg: '', gb: '' });
    }

    const confirmHandler = () => {
        alert("asdsad");
    }

    const closeConfirmPopup = () => {
        setIsConfirmPopupOpen({ show: false, msg: '' });
    }

    return (
        <>
        <div className={classes.cartContainer}>
            <div className={classes.searchHeader}>
                <div className={classes.headerLeftImg} onClick={backHandler}>
                    <img src={back} />
                </div>
                <h2>장바구니</h2>
                <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
            </div>
            <div className={classes.tabs}>
                <button
                    className={activeTab === 'directTrade' ? `${classes.tab} ${classes.active}` : classes.tab}
                    onClick={() => setActiveTab('directTrade')}
                >
                    직거래
                </button>
                <button
                    className={activeTab === 'villainDelivery' ? `${classes.tab} ${classes.active}` : classes.tab}
                    onClick={() => setActiveTab('villainDelivery')}
                >
                    직배송(빌런배송)
                </button>
            </div>

            <div className={classes.tabContent}>
                {activeTab === 'directTrade' && (
                    <>
                        <div style={{display: 'flex', gap : '5px', marginBottom: '25px', justifyContent: 'space-between'}}>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <input
                                    type="checkbox"
                                    id="rent-checkbox"
                                    checked={rentableChecked}
                                    onChange={handleRentableCheck}
                                />
                                <label htmlFor="rent-checkbox">대여</label>
                            </div>

                            <div style={{display: 'flex', gap : '5px', color: '#71727A', fontSize: '14px'}}>
                                <p style={{cursor: 'pointer'}}></p>
                                <p style={{cursor: 'pointer'}}></p>
                            </div>
                        </div>

                        {rentableItems.map((item, idx) => (
                            <div style={{marginBottom: '40px'}}>
                                <div className={classes.titleWrap}>
                                    <div style={{display: 'flex', gap: '5px', justifyContent : 'center'}}>
                                        <input
                                            type="checkbox"
                                            checked={selectedRentable[idx]}
                                            onChange={() => toggleRentableItem(idx)}
                                        />
                                        <h2>{item.ownerDetails.libraryName}<span>님의 도서관</span></h2>
                                    </div>
                                    <div onClick={() => {deleteCartMethod(item)}} className={classes.titleWrapInner}>
                                        <p>×</p>
                                    </div>
                                </div>
                                <div className={classes.chattingWrap}>
                                    <div className={classes.messageBox}>
                                        <div className={classes.firstMessage}>
                                            <div className={classes.bookDetailWrap}>
                                                <img src={item.productDetails.productImg} alt="책 이미지" />
                                                <div className={classes.bookDetailElement}>
                                                    <div className={classes.bookName}>{item.productDetails.bookName}</div>
                                                    <div className={classes.bookPublisher}>
                                                        <div>이동명 지음</div>
                                                        <div>|</div>
                                                        <div>반바지스킨 펴냄</div>
                                                    </div>
                                                    <div className={classes.bookStatus}>
                                                        <div>{item.productDetails.productStatus}</div>
                                                        <div>|</div>
                                                        <div>{item.productDetails.rentalPrice}원</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*<Input onChange={startDateChange} value="대여시작날짜" placeholder="2024-08-08" type="text"/>*/}
                                {/*<Input onChange={endDateChange} value="대여종료날짜" placeholder="2024-08-10" type="text"/>*/}
                                <Input
                                    onChange={(e) => handleStartDateChange(idx, e.target.value)}
                                    value={startDates[idx]}
                                    placeholder="대여시작날짜"
                                    type="date"
                                />
                                <Input
                                    onChange={(e) => handleEndDateChange(idx, e.target.value)}
                                    value={endDates[idx]}
                                    placeholder="대여종료날짜"
                                    type="date"
                                />
                                <div className={classes.line}></div>
                                <div className={classes.summary1}>
                                    <p>대여기간</p>
                                    <p>{rentalPeriods[idx]}일</p>
                                </div>
                                <div className={classes.summary2}>
                                    <p>권수</p>
                                    <p>1 권</p>
                                </div>
                                <div className={classes.summary3}>
                                    <p>총 대여금액</p>
                                    <p>{rentalPeriods[idx] == null ? '0' : (item.productDetails.rentalPrice * rentalPeriods[idx]).toLocaleString()} 원</p>

                                </div>
                                <Button value="직거래 신청" onClick={() => {rentalMethods(item)}} />
                            </div>
                        ))}

                    </>
                )}

                {activeTab === 'villainDelivery' && (
                    <div className={classes.content}>
                        <div style={{display: 'flex', gap : '5px', marginBottom: '25px', justifyContent: 'space-between'}}>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <input
                                    className={classes.purchaseCheckbox}
                                    type="checkbox"
                                    id="purchase-checkbox"
                                    checked={nonRentableChecked}
                                    onChange={handleNonRentableCheck}
                                />
                                <label htmlFor="purchase-checkbox">구매</label>
                            </div>

                            <div style={{display: 'flex', gap : '5px', color: '#71727A', fontSize: '14px'}}>
                                <p style={{cursor: 'pointer'}}></p>
                                <p style={{cursor: 'pointer'}}></p>
                            </div>
                        </div>
                        {nonRentableItems.map((item, idx) => (
                            <div style={{marginBottom: '40px'}}>
                                <div className={classes.titleWrap}>
                                    <div style={{display: 'flex', gap: '5px', justifyContent : 'center'}}>
                                        <input
                                            className={classes.purchaseCheckbox}
                                            type="checkbox"
                                            checked={selectedNonRentable[idx]}
                                            onChange={() => toggleNonRentableItem(idx)}
                                        />
                                        <h2>{item.ownerDetails.libraryName}<span>님의 도서관</span></h2>
                                    </div>
                                    <div onClick={() => {deleteCartMethod(item)}} className={classes.titleWrapInner}>
                                        <p>×</p>
                                    </div>
                                </div>
                                <div className={classes.chattingWrap}>
                                    <div className={classes.messageBox}>
                                        <div className={classes.firstMessage}>
                                            <div className={classes.bookDetailWrap}>
                                                <img src={item.productDetails.productImg} alt="책 이미지" />
                                                <div className={classes.bookDetailElement}>
                                                    <div className={classes.bookName}>{item.productDetails.bookName}</div>
                                                    <div className={classes.bookPublisher}>
                                                        <div>이동명 지음</div>
                                                        <div>|</div>
                                                        <div>반바지스킨 펴냄</div>
                                                    </div>
                                                    <div className={classes.bookStatus}>
                                                        <div>{item.productDetails.productStatus}</div>
                                                        <div>|</div>
                                                        <div>{item.productDetails.rentalPrice}원</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*<Input onChange={startDateChange} value="대여시작날짜" placeholder="2024-08-08" type="text"/>*/}
                                {/*<Input onChange={endDateChange} value="대여종료날짜" placeholder="2024-08-10" type="text"/>*/}
                                <div className={classes.line}></div>
                                <div className={classes.summary2}>
                                    <p>권수</p>
                                    <p>1 권</p>
                                </div>
                                <div className={classes.summary3}>
                                    <p>총 대여금액</p>
                                    <p>8000 원</p>
                                </div>
                                <Button value="직배송 신청" onClick={() => {rentalMethods2(item)}} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
        {loading && <Loading />}
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

export default MyCart;

import React, {useEffect, useState} from 'react';
import classes from '../../styles/blocks/ProductDetail.module.css';
import Heart from "../../asset/images/Heart_Outlined.svg";
import Bag from "../../asset/images/Shopping_Bag_Outlined.svg"
import ChattingPng from "../../asset/images/chat.png";
import trade from "../../asset/images/trade.png";
import heartFill from "../../asset/images/heartfill.webp";


import {
    getMyWished,
    getProductsByCategory,
    getProductsByUser,
    getProductsByUser2
} from "../../common/api/ApiGetService";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import '../../styles/blocks/swiper.css';
import {FreeMode, Pagination} from "swiper/modules";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {addCart, wishedToggle} from "../../common/api/ApiPostService";
import Loading from "./Loading";
import PopupDom from "./PopupDom";
import MsgPopup from "./MsgPopup";
import ConfirmPopup from "./ConfirmPopup";
const ProductDetail = () => {
    const [bookInfo, setBookInfo] = useState('');
    const [libUserInfo, setLibUserInfo] = useState([]);
    const [categoryBook, setCategoryBook] = useState([]);
    const nav = useNavigate();
    const userInfo = useSelector(state => state.loginCheck.loginInfo);
    const [loading, setLoading] = useState(false);
    const [isMsgPopupOpen, setIsMsgPopupOpen] = useState({ show: false, msg: '', gb: '' });
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState({ show: false, msg: '' });
    const navigate = useNavigate();
    const [bookArray, setBookArray] = useState([]);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const bookInfoData = JSON.parse(urlParams.get('detail'));
        setBookInfo(bookInfoData);
        console.log(bookInfoData)

        getProductsByUser(bookInfoData.productId)
            .then((res) => {
                if (res.status === 200) {
                    setLibUserInfo(res.data)

                    // getProductsByUser
                }
            }).catch((err) => {

        })

        getProductsByCategory(bookInfoData.productId)
            .then((res) => {
                if (res.status === 200) {

                    setCategoryBook(res.data)
                }
            }).catch((err) => {

        })

        getMyWished(userInfo.userId)
            .then((res) => {
                // res.data의 모든 요소에 대해 순회하면서 products를 하나의 배열로 병합
                const allProductsArray = res.data.reduce((acc, current) => {
                    const productsString = current.products; // 각 요소의 products 값 (문자열)
                    if (productsString) { // null 또는 undefined 확인
                        const productsArray = JSON.parse(productsString); // 배열로 변환
                        return acc.concat(productsArray); // 누적 배열에 병합
                    }
                    return acc; // null이면 기존 배열(acc) 반환
                }, []); // 빈 배열에서 시작

                const resultArray = []; // 결과를 저장할 빈 배열

                // 모든 비동기 작업이 끝난 후 상태 업데이트
                Promise.all(allProductsArray.map((item) => {
                    return getProductsByUser2(item)
                        .then((res) => {
                            resultArray.push(res.data); // 각 product의 데이터를 resultArray에 추가
                        })
                        .catch((err) => {
                            console.error(`Error fetching product for item ${item}:`, err);
                        });
                })).then(() => {
                    setBookArray(resultArray); // 모든 비동기 작업이 완료되면 bookArray 상태 업데이트
                });
            })
            .catch((err) => {
                console.error("Error fetching wished products:", err);
            });



    }, []);

    const chattingMethod = (libraryName, productId) => {
        nav(`/chatTest3?test=${libraryName}&productId=${productId}&gb=${true}`)
    }

    const rentalMethods = (value) => {

        console.log(bookInfo)
        console.log(libUserInfo)

        switch (value) {
            case '대여' :
                const rentalObj =  {
                    title : '대여하기',
                    info : bookInfo
                }

                nav(`/rentalConfirm?data=${JSON.stringify(rentalObj)}`)

            break

            case '구매' :

                const tradeObj =  {
                    title : '구매하기',
                    info : bookInfo
                }

                nav(`/rentalConfirm?data=${JSON.stringify(tradeObj)}`)

            break
        }
    }
    const closeMsgPopup = () => {
        setIsMsgPopupOpen({ show: false, msg: '', gb: '' });
    }

    const confirmHandler = () => {
        alert("asdsad");
    }

    const closeConfirmPopup = () => {
        setIsConfirmPopupOpen({ show: false, msg: '' });
    }

    const addCartMethod = () => {

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            addCart(
                userInfo.userId,
                bookInfo.ownerUserId,
                bookInfo.productId,
                'test',
                'test',
                bookInfo.productStatus,
                bookInfo.stockQuantity,
                "2024-06-01",
                bookInfo.rentalPrice,
                bookInfo.rentable,
                bookInfo.purchasable,
                bookInfo.rentalMethod
            ).then((res) => {
                if (res.status == 200) {
                    setIsMsgPopupOpen({show: true, msg: '카트에 추가 되었습니다.', gb : 'success'});
                }
            }).catch((err) => {
                setIsMsgPopupOpen({ show: true, msg: "카트에 추가중 오류가 발생했습니다.", gb: 'error' });
            })
        }, 1000)


    }

    const heartToggleMethods = (productId) => {
        setLoading(true);

        nav(`/myFolderList?productId=${productId}`)

        return ;

        // setTimeout(() => {
        //     setLoading(false);
        //
        //     wishedToggle(userInfo.userId, '기본폴더', productId)
        //         .then((res) => {
        //
        //             if(res.status == 200) {
        //                 // setIsMsgPopupOpen({show: true, msg: '찜 목록이 업데이트 되었습니다.', gb : 'success'});
        //                 window.location.reload();
        //             }
        //
        //         }).catch((err) => {
        //
        //     })
        // }, 1000)


    }

    return (
        <>
        <div className={classes.wrapArea}>

            <div className={classes.paddingArea}>
                <div className={classes.titleArea}>
                    <h2>{bookInfo.bookName}</h2>
                    <span>김호연 지음</span><span>|</span><span>나무옆의자 펴냄</span>
                </div>

                <div className={classes.imgArea}>
                    <div className={classes.imgWra}>
                        <img src={bookInfo.productImg} />
                    </div>
                </div>

                <div className={classes.priceArea}>
                    <div className={classes.priceTopArea}>
                        <div className={classes.priceLeftArea}>
                            <span>{bookInfo.productStatus === 'EXCELLENT' ? '최상' : '중상'}</span><span>|</span><span>{bookInfo.rentalPrice}원</span>
                        </div>
                        {bookInfo.ownerUserId != userInfo.userId &&
                            <div className={classes.priceRightArea}>
                                {bookArray.some(book => book.productId === bookInfo.productId) ? (
                                    <img onClick={() => heartToggleMethods(bookInfo.productId)} style={{width: '24px', height : '24px'}} src={heartFill} />

                                ) : (
                                    <img onClick={() => heartToggleMethods(bookInfo.productId)} src={Heart} />
                                )}
                                <img onClick={addCartMethod} src={Bag} />
                            </div>
                        }

                    </div>
                    <div className={classes.priceBottomArea}>
                        <p>같은 책 모두 보기 (3)</p>
                    </div>
                </div>

            </div>


            <div className={classes.tradeArea}>
                <h2>이 책이 있는 직거래 도서관</h2>
                {libUserInfo.map((item, idx) => (
                    <div key={idx} className={classes.libArea}>
                        <div className={classes.leftImgArea}>
                            <img src={trade} />
                        </div>
                        <div className={classes.centerArea}>
                            <p><span className={classes.higlight}>{item.libraryName}</span> 님의 도서관</p>
                            <p className={classes.location}>4.9 km <span>{item.rentalLocation}</span></p>
                            <div className={classes.botArea}>
                                <div className={classes.status}>
                                    <span>{item.productStatus === 'EXCELLENT' ? '최상' : '중상'}</span><span>|</span><span className={classes.higlight2}>{item.rentalPrice}원</span>
                                </div>
                                {item.rentable && <div className={classes.tradeBox}>
                                    <p className={classes.noMargin}>직거래 대여</p>
                                </div>}
                                {item.purchasable && <div className={classes.tradeBox2}>
                                    <p className={classes.noMargin}>직거래 구매</p>
                                </div>}
                            </div>
                        </div>
                        <div onClick={() => {chattingMethod(item.libraryName, item.productId)}} className={classes.rightImgArea}>
                            <img src={ChattingPng} />
                        </div>
                    </div>
                ))}
            </div>

            <div className={classes.sameCategoryArea}>
                <h2>이 책과 같은 카테고리 도서 목록</h2>

                <div className={classes.imgWrap}>
                    <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    freeMode={true}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                    >
                    {categoryBook.map((item, idx) => (
                        <SwiperSlide>
                            <div key={idx} className={classes.imgWra2}>
                                <img src={item.productImg} />
                            </div>
                        </SwiperSlide>
                    ))}
                    </Swiper>
                </div>
            </div>


            {bookInfo.ownerUserId != userInfo.userId &&
                <div className={classes.btnArea}>
                    {bookInfo.rentable && <div onClick={() => {rentalMethods('대여')}}><p>바로 대여</p></div>}
                    {bookInfo.purchasable && <div onClick={() => {rentalMethods('구매')}}><p>바로 구매</p></div>}
                </div>}

            {bookInfo.ownerUserId == userInfo.userId &&
                <div className={classes.btnArea}>
                    <div><p>내가올린</p></div>
                    <div><p>게시물임</p></div>
                </div>
            }

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

export default ProductDetail;
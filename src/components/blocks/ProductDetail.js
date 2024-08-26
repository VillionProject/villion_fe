import React, {useEffect, useState} from 'react';
import classes from '../../styles/blocks/ProductDetail.module.css';
import Heart from "../../asset/images/Heart_Outlined.svg";
import Bag from "../../asset/images/Shopping_Bag_Outlined.svg"
import ChattingPng from "../../asset/images/chat.png";
import trade from "../../asset/images/trade.png";
import {getProductsByCategory, getProductsByUser} from "../../common/api/ApiGetService";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import '../../styles/blocks/swiper.css';
import {FreeMode, Pagination} from "swiper/modules";
import {useNavigate} from "react-router-dom";
const ProductDetail = () => {
    const [bookInfo, setBookInfo] = useState('');
    const [libUserInfo, setLibUserInfo] = useState([]);
    const [categoryBook, setCategoryBook] = useState([]);
    const nav = useNavigate();

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
                    bookName : bookInfo.bookName,
                    productStatus : bookInfo.productStatus,
                    rentalPrice : bookInfo.rentalPrice,
                }

                nav(`/rentalConfirm?data=${JSON.stringify(rentalObj)}`)

            break

            case '구매' :
                const tradeObj =  {
                    title : '구매하기',
                    bookName : bookInfo.bookName,
                    productStatus : bookInfo.productStatus,
                    rentalPrice : bookInfo.rentalPrice,
                }

                nav(`/rentalConfirm?data=${JSON.stringify(tradeObj)}`)

            break
        }
    }

    return (
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
                        <div className={classes.priceRightArea}>
                            <img src={Heart} />
                            <img src={Bag} />
                        </div>
                    </div>
                    <div className={classes.priceBottomArea}>
                        <p>같은 책 모두 보기 (3)</p>
                    </div>
                </div>

            </div>


            {/*<div className={classes.reviewArea}>*/}
            {/*    <h2>리뷰</h2>*/}
            {/*</div>*/}

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

            {/*<div className={classes.sameCategoryArea}>*/}
            {/*    <h2>이 시리즈의 다른 책</h2>*/}

            {/*    <div className={classes.imgWrap}>*/}
            {/*        <div className={classes.imgWra2}>*/}

            {/*        </div>*/}
            {/*        <div className={classes.imgWra2}>*/}

            {/*        </div>*/}
            {/*        <div className={classes.imgWra2}>*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className={classes.sameCategoryArea}>*/}
            {/*    <h2>이 책과 함께 주문된 도서</h2>*/}

            {/*    <div className={classes.imgWrap}>*/}
            {/*        <div className={classes.imgWra2}>*/}

            {/*        </div>*/}
            {/*        <div className={classes.imgWra2}>*/}

            {/*        </div>*/}
            {/*        <div className={classes.imgWra2}>*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className={classes.btnArea}>
                <div onClick={() => {rentalMethods('대여')}}><p>바로 대여</p></div>
                <div onClick={() => {rentalMethods('구매')}}><p>바로 구매</p></div>
            </div>
        </div>
    );
};

export default ProductDetail;
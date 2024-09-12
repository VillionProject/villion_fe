import React, {useEffect, useState} from 'react';
import {getMyWished, getProductsByUser2} from "../../common/api/ApiGetService";
import {useSelector} from "react-redux";
import {Swiper, SwiperSlide} from "swiper/react";
import classes from "../../styles/blocks/Search.module.css";
import {useNavigate} from "react-router-dom";
import {FreeMode, Pagination} from "swiper/modules";

const Mybooks = () => {
    const userInfo = useSelector(state => state.loginCheck.loginInfo);
    const nav = useNavigate();
    const [bookArray, setBookArray] = useState([]);

    useEffect(() => {
        getMyWished(userInfo.userId)
            .then((res) => {
                const productsString = res.data[0].products; // "[4,3,2,1]" 문자열
                const productsArray = JSON.parse(productsString); // 배열로 변환 [4, 3, 2, 1]

                const resultArray = []; // 결과를 저장할 빈 배열

                // 모든 비동기 작업이 끝난 후 상태 업데이트
                Promise.all(productsArray.map((item) => {
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

    const productDetail = (productValue) => {
        nav(`/detail?detail=${JSON.stringify(productValue)}`);
    }

    return (
        <div>
            <div className={classes.searchArea} style={{ padding: '30px' }}>
                <h2 style={{ marginBottom: '20px', fontSize: '20px' }}>내 찜목록</h2>

                {bookArray.length === 0 && <p style={{fontWeight: '600'}}>찜 목록이 없습니다.</p>}

                <div className={classes.imgWrap}>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        freeMode={true}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper"
                    >
                        {bookArray.map((item, idx) => (
                            <SwiperSlide key={idx}>
                                <div onClick={() => { productDetail(item) }} className={classes.imgWra2}>
                                    <img src={item.productImg} alt={`Product ${item.id}`} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Mybooks;

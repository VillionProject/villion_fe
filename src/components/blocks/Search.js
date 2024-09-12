import React, {useEffect, useState} from 'react';
import classes from '../../styles/blocks/Search.module.css';
import {useNavigate} from "react-router-dom";
import search from '../../asset/images/search.webp';
import back from '../../asset/images/back.webp';

import axios from "axios";
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Pagination} from "swiper/modules";
import {getProducts, getProductsByCategory, getProductsBySearch} from "../../common/api/ApiGetService";
import {useSelector} from "react-redux";
import Loading from "./Loading";

const Search = () => {
    const nav = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [searchText2, setSearchText2] = useState('');
    const [observer, setObserver] = useState(false);
    const [suggestBool, setSuggestBool] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryBook, setCategoryBook] = useState([]);
    const userInfo = useSelector(state => state.loginCheck.loginInfo);

    const backHandler = () => {
        nav('/home');
    }
    const handleHeaderRightImgClick = () => {

    };
    const handleInputKeyDown = (e) => {

        if (e.key === 'Enter') {

            setLoading(true);

            setTimeout(() => {
                setLoading(false)
                setSearchText2(e.target.value)

                getProductsBySearch(searchText)
                    .then((res) => {
                        if (res.status === 200) {
                            setCategoryBook(res.data)
                        }
                    }).catch((err) => {
                })


            }, 1000)

        }
    };

    const textHandler = (e) => {
        setSearchText(e.target.value)
    }

    const productDetail = (productValue) => {
        nav(`/detail?detail=${JSON.stringify(productValue)}`)
    }

    return (
        <>
            <div className={classes.searchWrap}>
                <div className={classes.searchHeader}>
                    <div className={classes.headerLeftImg} onClick={backHandler}>
                        <img src={back} />
                    </div>
                    <div className={classes.headerInputArea}>
                        <input placeholder="검색어 입력" onKeyDown={handleInputKeyDown} onChange={textHandler} />
                    </div>
                    <div className={classes.headerRightImg} onClick={handleHeaderRightImgClick}>
                        <img src={search} />
                    </div>
                </div>
                {loading && <Loading />}
                {searchText2 != '' &&
                    <>
                        <p className={classes.suggestText}>다음 검색어에 대한 결과 포함 : <span>{searchText2}</span></p>
                        <div className={classes.searchArea}>
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
                                            <div key={idx} onClick={() => {productDetail(item)}}  className={classes.imgWra2}>
                                                <img src={item.productImg} />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </>
                }


            </div>
        </>
    );
};

export default Search;
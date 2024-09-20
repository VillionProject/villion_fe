import React, {useEffect, useState} from 'react';
import Center from "./Center";
import classes from "../../styles/blocks/Home.module.css"
import SmallLogo from "../atoms/SmallLogo";
import ArrowDown from "../../../src/asset/images/Arrow_Down.svg"
import Bell from "../../../src/asset/images/Bell.svg"
import Heart from "../../../src/asset/images/Heart_Outlined.svg"
import Bag from "../../../src/asset/images/Shopping_Bag_Outlined.svg"
import bookImg10 from "../../../src/asset/books/image 10.png"
import HomeBar from "../atoms/HomeBar";
import Header from "./Header";
import Footer from "./Footer";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getProducts} from "../../common/api/ApiGetService";
import { Swiper, SwiperSlide } from 'swiper/react';
import recomenImg from '../../asset/images/recomen.png';
import searchImg from '../../asset/images/search.webp';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import '../../styles/blocks/swiper.css';
import {FreeMode, Pagination} from "swiper/modules";


const Home = () => {

    const userInfo = useSelector(state => state.loginCheck.loginInfo);
    const nav = useNavigate();
    const [bookArray, setBookArray] = useState([]);
    const [currPage, setCurrPage] = useState('Home');


    useEffect(() => {
        if (!userInfo.login) {
            nav('/login');
            return;
        }

        getProducts(userInfo.userId)
            .then((res) => {
                if(res.status === 200) {
                    setBookArray(res.data);

                }
            }).catch((err) => {
        })

    }, []);

    const setCurrPageSetting = (value) => {
        setCurrPage(value)
    }

    const productDetail = (productValue) => {
        nav(`/detail?detail=${JSON.stringify(productValue)}`)
    }

    const mbtiLink = () => {
        nav('/mbtiStart')
    }

    const searchMethdos = () => {
        nav('/search')
    }

    const linkMethods = () => {
        nav('/myCart')
    }

    const sendLocation = () => {
        console.log(userInfo.base_location_id)

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // 위치 정보를 콘솔에 출력
                console.log("Latitude:", lat);
                console.log("Longitude:", lon);

                // 위치 정보를 서버에 전송
                fetch(`http://localhost:8000/api/v1/user/${userInfo.userId}/location`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        latitude: lat,
                        longitude: lon,
                    }),
                })
                    .then(response => response.text())
                    .then(data => {
                        console.log("Location sent to server:", data);
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }



    };


    return (
        <div>
            <Header>
                <div className={classes.topWrap}>
                    <SmallLogo></SmallLogo>
                    <div className={classes.mainIconWrap}>
                        <div className={classes.addressWrap}>
                            <h1 className={classes.address}>{userInfo.baseLocationId} </h1>
                            <svg className={classes.svgContainer} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 24"
                                 fill="none">
                                <image href={ArrowDown} onClick={sendLocation}/>
                            </svg>
                        </div>
                        <div className={classes.topSvgWrap}>
                            {/*<div style={{width: '35px', height: '35px', borderRadius : '50%', background : 'black'}}></div>*/}
                            {/*<div style={{width: '35px', height: '35px', borderRadius : '50%', background : 'black'}}></div>*/}
                            {/*<div style={{width: '35px', height: '35px', borderRadius : '50%', background : 'black'}}></div>*/}
                            {/*<svg className={classes.svgRightContainer} xmlns="http://www.w3.org/2000/svg"*/}
                            {/*     viewBox="0 0 25 24"*/}
                            {/*     fill="none">*/}
                            {/*    <image href={Bell}/>*/}
                            {/*</svg>*/}
                            <img src={searchImg} onClick={searchMethdos} />
                            {/*<svg className={classes.svgRightContainer} xmlns="http://www.w3.org/2000/svg"*/}
                            {/*     viewBox="0 0 25 24"*/}
                            {/*     fill="none">*/}
                            {/*    <image href={Heart}/>*/}
                            {/*</svg>*/}
                            <svg onClick={linkMethods} className={classes.svgRightContainer} xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 25 24"
                                 fill="none">
                                <image href={Bag}/>
                            </svg>
                        </div>
                    </div>
                </div>

            </Header>



            {currPage === 'Home' && <>
                <div>
                    <img className={classes.topAd} src={bookImg10} alt="Logo Description"/>
                </div>

                <Center>
                    <div className={classes.bookListWarp}>
                        <div className={classes.bookListContainer}>
                            <div className={classes.bookTitleWrap}>
                                <div>villion이 추천하는 책</div>
                                <div>더보기</div>
                            </div>
                            <div className={classes.bookContainer}>
                                <Swiper
                                    slidesPerView={3}
                                    spaceBetween={30}
                                    freeMode={true}
                                    modules={[FreeMode, Pagination]}
                                    className="mySwiper"
                                >
                                    {bookArray.map((item, idx) => (
                                        <SwiperSlide>
                                            <div key={idx} onClick={() => {productDetail(item)}} key={idx} className={classes.imgWrap}>
                                                <img src={item.productImg} className={classes.book} alt="Logo Description"/>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>

                        <div className={classes.bookListContainer}>
                            <div className={classes.bookTitleWrap}>
                                <div>인기 있는 책</div>
                                <div>더보기</div>
                            </div>
                            <div className={classes.bookContainer}>
                                <Swiper
                                    slidesPerView={3}
                                    spaceBetween={30}
                                    freeMode={true}
                                    modules={[FreeMode, Pagination]}
                                    className="mySwiper"
                                >
                                    {bookArray.reverse().map((item, idx) => (
                                        <SwiperSlide>
                                            <div key={idx} onClick={() => {productDetail(item)}} key={idx} className={classes.imgWrap}>
                                                <img src={item.productImg} className={classes.book} alt="Logo Description"/>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>


                        {/*<div className={classes.bookListContainer}>*/}
                        {/*    <div className={classes.bookTitleWrap}>*/}
                        {/*        <div>인기있는 책</div>*/}
                        {/*        <div>더보기</div>*/}
                        {/*    </div>*/}

                        {/*    <div className={classes.bookContainer}>*/}
                        {/*        <img src={bookImg5} className={classes.book} alt="Logo Description"/>*/}
                        {/*        <img src={bookImg7} className={classes.book} alt="Logo Description"/>*/}
                        {/*        <img src={bookImg8} className={classes.book} alt="Logo Description"/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className={classes.bookListContainer}>*/}
                        {/*    <div className={classes.bookTitleWrap}>*/}
                        {/*        <div>인기있는 책</div>*/}
                        {/*        <div>더보기</div>*/}
                        {/*    </div>*/}

                        {/*    <div className={classes.bookContainer}>*/}
                        {/*        <img src={bookImg5} className={classes.book} alt="Logo Description"/>*/}
                        {/*        <img src={bookImg7} className={classes.book} alt="Logo Description"/>*/}
                        {/*        <img src={bookImg8} className={classes.book} alt="Logo Description"/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className={classes.bookListContainer}>*/}
                        {/*    <div className={classes.bookTitleWrap}>*/}
                        {/*        <div>인기있는 책</div>*/}
                        {/*        <div>더보기</div>*/}
                        {/*    </div>*/}

                        {/*    <div className={classes.bookContainer}>*/}
                        {/*        <img src={bookImg5} className={classes.book} alt="Logo Description"/>*/}
                        {/*        <img src={bookImg7} className={classes.book} alt="Logo Description"/>*/}
                        {/*        <img src={bookImg8} className={classes.book} alt="Logo Description"/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </Center>
            </>}

            {currPage === 'recommended' && <>
                <Center>
                    <div onClick={mbtiLink} style={{textAlign : 'center', cursor : 'pointer'}}>
                        <img style={{height : '400px'}} src={recomenImg} />
                    </div>
                </Center>
            </>}


            <Footer>
                <HomeBar setCurrPageSetting={setCurrPageSetting}></HomeBar>
            </Footer>

        </div>
    );
};

export default Home;
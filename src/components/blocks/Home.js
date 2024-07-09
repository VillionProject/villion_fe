import React, {useEffect} from 'react';
import Center from "./Center";
import classes from "../../styles/blocks/Home.module.css"
import SmallLogo from "../atoms/SmallLogo";
import ArrowDown from "../../../src/asset/images/Arrow_Down.svg"
import Bell from "../../../src/asset/images/Bell.svg"
import Heart from "../../../src/asset/images/Heart_Outlined.svg"
import Bag from "../../../src/asset/images/Shopping_Bag_Outlined.svg"
import bookImg2 from "../../../src/asset/books/image 2.png"
import bookImg3 from "../../../src/asset/books/image 3.png"
import bookImg4 from "../../../src/asset/books/image 4.png"
import bookImg5 from "../../../src/asset/books/image 5.png"
import bookImg7 from "../../../src/asset/books/image 7.png"
import bookImg8 from "../../../src/asset/books/image 8.png"
import bookImg9 from "../../../src/asset/books/image 9.png"
import bookImg10 from "../../../src/asset/books/image 10.png"
import HomeBar from "../atoms/HomeBar";
import Header from "./Header";
import Footer from "./Footer";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Home = () => {

    const userInfo = useSelector(state => state.loginCheck.loginInfo);
    const nav = useNavigate();

    useEffect(() => {
        if (!userInfo.login) {
            nav('/login');
            return;
        }
    }, []);

    return (
        <div>
            <Header>
                <div className={classes.topWrap}>
                    <SmallLogo></SmallLogo>
                    <div className={classes.mainIconWrap}>
                        <div className={classes.addressWrap}>
                            <h1 className={classes.address}>인계동</h1>
                            <svg className={classes.svgContainer} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 24"
                                 fill="none">
                                <image href={ArrowDown}/>
                            </svg>
                        </div>
                        <div className={classes.topSvgWrap}>
                            {/*<div style={{width: '35px', height: '35px', borderRadius : '50%', background : 'black'}}></div>*/}
                            {/*<div style={{width: '35px', height: '35px', borderRadius : '50%', background : 'black'}}></div>*/}
                            {/*<div style={{width: '35px', height: '35px', borderRadius : '50%', background : 'black'}}></div>*/}
                            <svg className={classes.svgRightContainer} xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 25 24"
                                 fill="none">
                                <image href={Bell}/>
                            </svg>
                            <svg className={classes.svgRightContainer} xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 25 24"
                                 fill="none">
                                <image href={Heart}/>
                            </svg>
                            <svg className={classes.svgRightContainer} xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 25 24"
                                 fill="none">
                                <image href={Bag}/>
                            </svg>
                        </div>
                    </div>
                </div>

            </Header>


            <img className={classes.topAd} src={bookImg10} alt="Logo Description"/>

            <Center>
                <div className={classes.bookListWarp}>
                    <div className={classes.bookListContainer}>
                        <div className={classes.bookTitleWrap}>
                            <div>인계동에서 대여할 수 있는 책</div>
                            <div>더보기</div>
                        </div>
                        <div className={classes.bookContainer}>
                            <img src={bookImg2} className={classes.book} alt="Logo Description"/>
                            <img src={bookImg3} className={classes.book} alt="Logo Description"/>
                            <img src={bookImg4} className={classes.book} alt="Logo Description"/>
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

            {/*<img className={classes.BottomAd} src={bookImg9} alt="Logo Description"/>*/}

            <Footer>
                <HomeBar></HomeBar>
            </Footer>

        </div>
    );
};

export default Home;
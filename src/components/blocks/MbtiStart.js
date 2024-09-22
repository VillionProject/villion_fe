import React from 'react';
import classes from "../../styles/blocks/Home.module.css";
import SmallLogo from "../atoms/SmallLogo";
import ArrowDown from "../../asset/images/Arrow_Down.svg";
import Bell from "../../asset/images/Bell.svg";
import Heart from "../../asset/images/Heart_Outlined.svg";
import Bag from "../../asset/images/Shopping_Bag_Outlined.svg";
import Header from "./Header";
import Center from "./Center";
import Button from "../atoms/Button";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const MbtiStart = () => {
    const nav = useNavigate();
    const userInfo = useSelector(state => state.loginCheck.loginInfo);

    const link = () => {
        nav('/mbti')
    }

    return (
        <div>
            <Header>
                <div className={classes.topWrap}>
                    <SmallLogo></SmallLogo>
                    <div className={classes.mainIconWrap}>
                        <div className={classes.addressWrap}>
                            <h1 className={classes.address}>{userInfo.baseLocationId}</h1>
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

            <div style={{padding: '20px 40px'}}>
                <div style={{fontWeight: '600', fontSize : '34px', marginBottom: '35px'}}>
                    <h2 style={{marginBottom: '10px'}}>안녕하세요,</h2>
                    <h2>{userInfo.libraryName} 님 !</h2>
                </div>

                <div style={{fontSize: '18px', letterSpacing : '1px'}}>
                    <p style={{marginBottom: '5px'}}>{userInfo.libraryName}님에 대해 좀 더 알려주세요!</p>
                    <p style={{marginBottom: '5px'}}>빌런이 지금 {userInfo.libraryName}님의</p>
                    <p style={{marginBottom: '5px'}}>독서를 도와드립니다.</p>
                </div>
            </div>

            <div style={{marginTop: '300px'}}>
                <Button value="시작하기" onClick ={link}></Button>
            </div>

        </div>
    );
};

export default MbtiStart;
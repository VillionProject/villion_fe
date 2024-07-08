import React from 'react';
import classes from "../../styles/atoms/HomeBar.module.css"
import House from "../../../src/asset/images/House.svg"
import Group from "../../../src/asset/images/Group.svg"
import Plus from "../../../src/asset/images/Plus.svg"
import LIke from "../../../src/asset/images/LIke.svg"
import User from "../../../src/asset/images/User.svg"
import {useNavigate} from "react-router-dom";

const HomeBar = () => {

    const nav = useNavigate();

    const linkMethods = (keyword) => {
        nav(keyword);
    }

    return (
        <div className={classes.homeBarOutLined}>
            <div className={classes.homeBarContainer}>
                <div className={classes.barDetailWrap}>
                    <img src={House} className={classes.bar} alt="Logo Description"/>
                    <p>홈</p>
                </div>
                <div className={classes.barDetailWrap}>
                    <img src={Group} className={classes.bar} alt="Logo Description"/>
                    <p>채팅</p>
                </div>
                <div className={classes.barDetailWrap}>
                    <img src={Plus} className={classes.bar} alt="Logo Description"/>
                    <p>책 등록</p>
                </div>
                <div className={classes.barDetailWrap}>
                    <img src={LIke} className={classes.bar} alt="Logo Description"/>
                    <p>추천</p>
                </div>
                <div className={classes.barDetailWrap} onClick={() => {linkMethods("/settings")}}>
                    <img src={User} className={classes.bar} alt="Logo Description"/>
                    <p>내 정보</p>
                </div>
            </div>
        </div>
    );
};

export default HomeBar;
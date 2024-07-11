import React from 'react';
import classes from '../../styles/blocks/Settings.module.css'
import editImg from '../../asset/images/Edit.png';
import arrow from '../../asset/images/ArrowRight.png';
import chat from '../../asset/images/chat.png';
import friend from '../../asset/images/friends.png';
import setting from '../../asset/images/setting.png';
import {useNavigate} from "react-router-dom";

const Settings = () => {
    const nav = useNavigate();

    const linkMethods = (keyword) => {
        nav(keyword)
    }

    return (
        <div>
            <div className={classes.wrap}>
                <div className={classes.topArea}>
                    <p>내 정보 수정</p>
                </div>
                <div className={classes.userBackImg}>
                    {/*<img src={profileImg} />*/}
                    <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa2NApZ828bZQQmpKTX0J1k4lsBfDPA0Yd3w&s" />
                    <img src={editImg} />
                </div>

                <div className={classes.contentsWrap}>
                    <div className={classes.myNameArea}>
                        <p className={classes.libName}>세삼이의 도서관</p>
                        <p className={classes.tagName}>@SESAM123</p>
                    </div>

                    <div className={classes.myInfo}>
                        <ul>
                            <li onClick={() => {linkMethods("/libEdit")}}>도서관 정보</li>
                            <li>💙 찜 도서관</li>
                            <li>💛 찜 도서</li>
                            <li>장바구니</li>
                        </ul>
                    </div>

                    <div className={classes.myLibInfo}>
                        <p>직거래 대여</p>
                        <div className={classes.line}></div>
                        <p className={classes.param}>대여중 - 권 / 완료 - 권</p>
                        <img src={arrow} />
                    </div>

                    <div className={classes.myLibInfo}>
                        <p>빌런의 대여</p>
                        <div className={classes.line}></div>
                        <p className={classes.param}>대여중 - 권 / 완료 - 권</p>
                        <img src={arrow} />
                    </div>

                    <div className={classes.menuArea}>
                        <ul>
                            <li>도서관 운영 상황 <img src={arrow} /></li>
                            <li>도서관 운영 상황 <img src={arrow} /></li>
                            <li>Devices <img src={arrow} /></li>
                            <li>Notifications <img src={arrow} /></li>
                            <li>내정보 수정 <img src={arrow} /></li>
                            <li>문의하기 <img src={arrow} /></li>
                        </ul>
                    </div>

                    <div className={classes.subMenuArea}>
                        <div className={classes.subMenu}>
                            <div className={classes.imgArea}>
                                <img src={chat} />
                            </div>
                            <p>Chats</p>
                        </div>
                        <div className={classes.subMenu}>
                            <div className={classes.imgArea}>
                                <img src={friend} />
                            </div>
                            <p>Friends</p>
                        </div>
                        <div className={classes.subMenu}>
                            <div className={classes.imgArea}>
                                <img src={setting} />
                            </div>
                            <p>Settings</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Settings;
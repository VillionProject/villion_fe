import React from 'react';
import classes from '../../styles/blocks/Settings.module.css'
import editImg from '../../asset/images/Edit.png';
import arrow from '../../asset/images/ArrowRight.png';
import chat from '../../asset/images/chat.png';
import friend from '../../asset/images/friends.png';
import setting from '../../asset/images/setting.png';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginCheckAction} from "../../ducks/loginCheck";
import ProfileChange from "./ProfileChange";

const Settings = () => {
    const nav = useNavigate();
    const userInfo = useSelector(state => state.loginCheck.loginInfo);
    const dispatch = useDispatch()

    const linkMethods = (keyword) => {
        nav(keyword)
    }

    const profileImgChange = () => {
        nav('/profileChange')
    }

    return (
        <div>
            <div className={classes.wrap}>
                <div className={classes.topArea}>
                    <p>내 정보 수정</p>
                </div>
                <div className={classes.userBackImg}>
                    {/*<img src={profileImg} />*/}
                    <img src={userInfo.profileImage} />
                    <img onClick={profileImgChange} src={editImg} />
                </div>

                <div className={classes.contentsWrap}>
                    <div className={classes.myNameArea}>
                        <p className={classes.libName}>{userInfo.libraryName}</p>
                        <p className={classes.tagName}>@{userInfo.email}</p>
                    </div>

                    <div className={classes.myInfo}>
                        <ul>
                            {/*<li onClick={() => {linkMethods("/libEdit")}}>도서관 정보</li>*/}
                            <li>💙 찜 도서관</li>
                            <li onClick={() => {linkMethods("/myWished")}}>💛 찜 도서</li>
                            <li onClick={() => {linkMethods("/myCart")}}>장바구니</li>
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
                            {/*<li>도서관 운영 상황 <img src={arrow} /></li>*/}
                            {/*<li>도서관 운영 상황 <img src={arrow} /></li>*/}
                            {/*<li>Devices <img src={arrow} /></li>*/}
                            {/*<li>Notifications <img src={arrow} /></li>*/}
                            {/*<li>내정보 수정 <img src={arrow} /></li>*/}
                            <li>연간 목표 독서량 <img src={arrow} /></li>
                            <li>메뉴 추가 고민중 <img src={arrow} /></li>
                        </ul>
                    </div>

                    <div className={classes.subMenuArea}>
                        <div className={classes.subMenu}>
                            <div className={classes.imgArea} onClick={() => {linkMethods("/chatTest3")}}>
                                <img src={chat} />
                            </div>
                            <p>Chats</p>
                        </div>
                        <div className={classes.subMenu}>
                            <div className={classes.imgArea}>
                                <img src={friend} />
                            </div>
                            <p>문의하기</p>
                        </div>
                        <div className={classes.subMenu} onClick={() => {linkMethods("/libEdit")}}>
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
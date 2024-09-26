import React, {useEffect, useState} from 'react';
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
import {getMyRental} from "../../common/api/ApiGetService";

const Settings = () => {
    const nav = useNavigate();
    const userInfo = useSelector(state => state.loginCheck.loginInfo);
    const dispatch = useDispatch();
    const [rentalWithDate, setRentalWithDate] = useState([]);
    const [rentalWithoutDate, setRentalWithoutDate] = useState([]);
    const [progress, setProgress] = useState(0); // 초기값

    useEffect(() => {
        getMyRental(userInfo.userId)
            .then((res) => {
                const rentals = res.data;
                console.log(rentals);
                const rentalsWithDate = rentals.filter(item => item.rentalStartDate !== null);
                const rentalsWithoutDate = rentals.filter(item => item.rentalStartDate === null);

                setRentalWithDate(rentalsWithDate);
                setRentalWithoutDate(rentalsWithoutDate);

                // 여기서 progress를 설정
                setProgress((rentalsWithDate.length / userInfo.yearlyReadingTarget) * 100);
            })
            .catch((err) => {
                console.error(err); // 에러 처리
            });
    }, [userInfo.userId, userInfo.yearlyReadingTarget]); // userInfo.userId와 userInfo.yearlyReadingTarget을 의존성 배열에 추가


    const linkMethods = (keyword) => {
        nav(keyword)
    }

    const profileImgChange = () => {
        nav('/profileChange')
    }

    const logOut = () => {
        const res = {
            login : false,
            baseLocationId: "",
            createdAt: "",
            email: "",
            familyAccount: "",
            grade: "",
            interestCategory: [],
            libraryName: "",
            libraryStatus: "",
            phoneNumber: "",
            profileImage : "",
            userId: "",
            yearlyReadingTarget: "",
        }
        dispatch(loginCheckAction.loginInfoSet(res));
        nav('/');
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
                            <li onClick={() => {linkMethods("/myFolder")}}>💛 찜 도서</li>
                            <li onClick={() => {linkMethods("/myCart")}}>장바구니</li>
                        </ul>
                    </div>

                    <div className={classes.myLibInfo}>
                        <p>대여</p>
                        {/*<div className={classes.line}></div>*/}
                        <p className={classes.param}>대여중 {rentalWithDate.length} 권 / 완료 - 권</p>
                        <img src={arrow} />
                    </div>




                    {rentalWithDate.length < userInfo.yearlyReadingTarget &&
                        <div className={classes.myLibInfo2}>
                            {/* ProgressBar가 채워질 div */}
                            <div
                                className={classes.progressBar}
                                style={{ width: `${progress}%` }} // progress 상태에 따른 width 설정
                            ></div>
                            <p>연간 목표 도서량</p>
                            <p>{rentalWithDate.length} / {userInfo.yearlyReadingTarget}</p>
                        </div>
                    }

                    {rentalWithDate.length >= userInfo.yearlyReadingTarget &&
                        <div className={classes.myLibInfo3}>
                            <p>연간 목표 도서량 달성 완료</p>
                        </div>
                    }

                    <div className={classes.menuArea}>
                        <ul>
                            {/*<li>도서관 운영 상황 <img src={arrow} /></li>*/}
                            {/*<li>도서관 운영 상황 <img src={arrow} /></li>*/}
                            {/*<li>Devices <img src={arrow} /></li>*/}
                            {/*<li>Notifications <img src={arrow} /></li>*/}
                            {/*<li>내정보 수정 <img src={arrow} /></li>*/}
                            {/*<li>연간 목표 독서량</li>*/}
                            {/*<li>메뉴 추가 고민중 <img src={arrow} /></li>*/}
                        </ul>
                    </div>

                    <div className={classes.subMenuArea}>
                        <div className={classes.subMenu}>
                            <div className={classes.imgArea} onClick={() => {linkMethods("/home")}}>
                                <img src={chat} />
                            </div>
                            <p>Home</p>
                        </div>
                        <div className={classes.subMenu} onClick={() => {logOut("/libEdit")}}>
                            <div className={classes.imgArea}>
                                <img src={friend} />
                            </div>
                            <p>로그아웃</p>
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
import React, { useState } from 'react';
import classes from "../../styles/blocks/LibEdit.module.css";
import Input from "../atoms/Input";
import arrow from '../../asset/images/ArrowRight.png';
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import {updateLibrary} from "../../common/api/ApiPostService";
import Loading from "./Loading";
import PopupDom from "./PopupDom";
import MsgPopup from "./MsgPopup";
import ConfirmPopup from "./ConfirmPopup";
import {loginCheckAction} from "../../ducks/loginCheck";

const LibEdit = () => {
    const userInfo = useSelector(state => state.loginCheck.loginInfo);
    const nav = useNavigate();
    const [libName, setLibName] = useState('')
    const [locate, setLocate] = useState('')
    const [goal, setGoal] = useState('')
    const [loading, setLoading] = useState(false);
    const [isMsgPopupOpen, setIsMsgPopupOpen] = useState({show : false, msg: '', gb : ''});
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState({show : false, msg: ''});
    const dispatch = useDispatch();

    const [libraryStatus, setLibraryStatus] = useState(userInfo.libraryStatus);

    const toggleLibraryStatus = () => {
        setLibraryStatus(prevStatus => prevStatus === "OPEN" ? "CLOSED" : "OPEN");
    };

    const [selectedInterests, setSelectedInterests] = useState(userInfo.interestCategory);


    const modifyLibMethod = () => {

        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            updateLibrary(userInfo.userId, libName, libraryStatus, selectedInterests, goal, locate)
                .then((res) => {
                    console.log(res.data)
                    if (res.status === 200) {

                        dispatch(loginCheckAction.libNameSet(res.data.libraryName));
                        dispatch(loginCheckAction.libNameStatus(res.data.libraryStatus));
                        dispatch(loginCheckAction.yearlyReadingTargetSet(res.data.yearlyReadingTarget));
                        dispatch(loginCheckAction.interestCategorySet(selectedInterests));
                        dispatch(loginCheckAction.locateSet(locate));

                        setIsMsgPopupOpen({ show: true, msg: "수정이 완료되었습니다.", gb: 'success' });

                    }
                }).catch((err) => {
                setIsMsgPopupOpen({ show: true, msg: "도서관 정보 수정에 문제가 생겼습니다.", gb: 'error' });
            })
        }, 700)


    }

    const interests = [
        "NOT_SPECIFIED",
        "HEALTH_HOBBY",
        "ECONOMICS_MANAGEMENT",
        "SCIENCE",
        "TEXTBOOKS_PROFESSIONAL_BOOKS",
        "COMICS",
        "SOCIAL_SCIENCES",
        "FICTION_POETRY_DRAMA",
        "EXAM_PREPARATION_CERTIFICATION",
        "CHILDREN",
        "ESSAY",
        "TRAVEL",
        "HISTORY",
        "ART_POP_CULTURE",
        "FOREIGN_LANGUAGE",
        "COOKING_HOUSEKEEPING",
        "INFANTS_TODDLERS",
        "HUMANITIES",
        "SELF_HELP",
        "RELIGION_OCCULTISM",
        "GOOD_PARENTING",
        "ADOLESCENTS",
        "COMPUTER_MOBILE"
    ];

    const handleClick = (interest) => {
        setSelectedInterests(prevSelected =>
            prevSelected.includes(interest)
                ? prevSelected.filter(item => item !== interest)
                : [...prevSelected, interest]
        );
    };

    const nameHandler = (e) => {
        setLibName(e.target.value);
    }

    const locateHandler = (e) => {
        setLocate(e.target.value);
    }

    const goalHandler = (e) => {
        setGoal(e.target.value);
    }

    const closeMsgPopup = () => {
        if (isMsgPopupOpen.gb === 'success') {
            nav('/home');
        }

        setIsMsgPopupOpen({show: false, msg: '', gb : ''});
    }
    const confirmHandler = () => {
        alert("asdsad")
    }

    const closeConfirmPopup = () => {
        setIsConfirmPopupOpen({show: false, msg: ''});
    }

    return (
        <>
            <div>
                <div className={classes.topArea}>
                    <p>도서관 정보 수정</p>
                </div>

                <div className={classes.myLibInfo}>
                    <Input onChange={nameHandler} value="내 도서관 이름" placeholder={userInfo.libraryName} type="text" />
                    {/*<Input placeholder="안녕하세요 내 도서관 이야" value="내 도서관 소개" type="text" />*/}
                </div>

                <div className={classes.myLibInter}>
                    <p>내 도서관 관심사</p>
                    <div className={classes.interArea}>
                        {interests.map((interest, index) => (
                            <div
                                key={index}
                                className={classes.inter}
                                style={{
                                    background: selectedInterests.includes(interest) ? '#2897FF' : '#EAF2FF',
                                    color: selectedInterests.includes(interest) ? 'white' : 'black'
                                }}
                                onClick={() => handleClick(interest)}
                            >
                                {interest}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={classes.myLibState}>
                    <p>내 도서관 상태</p>
                    <div className={classes.statusText}
                         onClick={toggleLibraryStatus}
                         style={{ color: libraryStatus === "OPEN" ? "#2897FF" : "#FF0000" }}
                    >
                        {libraryStatus}
                    </div>
                </div>

                <div className={classes.myLibLocation}>
                    <Input onChange={locateHandler} placeholder={userInfo.base_location_id} value="내 도서관 위치" type="text" />
                </div>

                <div className={classes.myLibGoal}>
                    <Input onChange={goalHandler} placeholder={userInfo.yearlyReadingTarget} value="연간 목표 독서량" type="text" />
                </div>

                <div className={classes.my}>
                    <p>회원탈퇴</p>
                    <img src={arrow} alt="arrow"/>
                </div>

                <Button value="수정하기" onClick={modifyLibMethod}></Button>
            </div>
            {loading && <Loading />}
            <div id='popupDom'>
                {isMsgPopupOpen.show && <PopupDom>
                    <MsgPopup onClick={closeMsgPopup} msg={isMsgPopupOpen.msg} />
                </PopupDom>}
                {isConfirmPopupOpen.show && <PopupDom>
                    <ConfirmPopup onConfirm={confirmHandler} onClick={closeConfirmPopup} msg={isConfirmPopupOpen.msg} />
                </PopupDom>}
            </div>
        </>
    );
};

export default LibEdit;

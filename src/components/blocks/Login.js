import React, {useEffect, useState} from 'react';
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import classes from "../../styles/blocks/Login.module.css";
import Center from "./Center";
import Logo from "../atoms/Logo";
import {useNavigate} from "react-router-dom";
import {emailCheck, passCheck} from "../../common/Reg";
import PopupDom from "./PopupDom";
import MsgPopup from "./MsgPopup";
import ConfirmPopup from "./ConfirmPopup";
import Loading from "./Loading";
import signUp from "./SignUp";
import {userLogin, userSignUp} from "../../common/api/ApiPostService";
import axios from "axios";
import {useDispatch} from "react-redux";
import {loginCheckAction} from "../../ducks/loginCheck";
import {getProductsBySearch} from "../../common/api/ApiGetService";

const Login = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [isMsgPopupOpen, setIsMsgPopupOpen] = useState({show : false, msg: ''});
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState({show : false, msg: ''});
    const dispatch = useDispatch();

    const idChangeMethod = (e) => {
        setId(e.target.value);
    }

    const pwdChangeMethod = (e) => {
        setPassword(e.target.value);
    }

    const loginHandler = () => {


        if (!emailCheck(id)) {
            setIsMsgPopupOpen({show: true, msg: '아이디를 이메일형식으로 입력해 주세요.'});
            return ;
        }

        if (!passCheck(password)) {
            setIsMsgPopupOpen({show: true, msg: '비밀번호는 대,소문자 특수문자 포함 8글자 이상으로 입력해 주세요.'});
            return ;
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            userLogin(id, password).then((res) => {
                // 로그인 성공
                if (res.status === 200) {
                    // redux ( localStorage ) 저장..
                    dispatch(loginCheckAction.loginInfoSet(res.data.data));
                    navigate('/home');
                } else {
                    setIsMsgPopupOpen({show: true, msg: res.response.data.data.message});
                }
            }).catch((err) => {
                console.log(err)
                setIsMsgPopupOpen({ show: true, msg: "로그인 정보가 올바르지 않습니다.", gb: 'error' });
            })


        }, 700);



    }

    const closeMsgPopup = () => {
        setIsMsgPopupOpen({show: false, msg: ''});
    }
    const confirmHandler = () => {
        alert("asdsad")
    }

    const closeConfirmPopup = () => {
        setIsConfirmPopupOpen({show: false, msg: ''});
    }

    const signupMethod = () => {
        navigate("/signup")
    }

    const handleInputKeyDown = (e) => {

        if (e.key === 'Enter') {

            loginHandler()
        }
    };

    return (
        <div className={classes.loginBox}>
            <Logo></Logo>
            <Center>
                <div>
                    <div className={classes.loginWrap}>
                        <Input value="아이디"  placeholder="아이디를 입력하세요." type="text" onChange={idChangeMethod}/>
                        <Input value="비밀번호" onKeyDown={handleInputKeyDown} placeholder="비밀번호를 입력하세요." type="password" onChange={pwdChangeMethod}/>
                        <div className={classes.detailBox}>
                            <p onClick={signupMethod}>아직 회원이 아니신가요 ?</p>
                            <p></p>
                        </div>
                        <Button value="로그인" onClick ={loginHandler}></Button>
                    </div>
                </div>
            </Center>
            {loading && <Loading />}
            <div id='popupDom'>
                {isMsgPopupOpen.show && <PopupDom>
                    <MsgPopup onClick={closeMsgPopup} msg={isMsgPopupOpen.msg} />
                </PopupDom>}
                {isConfirmPopupOpen.show && <PopupDom>
                    <ConfirmPopup onConfirm={confirmHandler} onClick={closeConfirmPopup} msg={isConfirmPopupOpen.msg} />
                </PopupDom>}
            </div>
        </div>
    );
};

export default Login;
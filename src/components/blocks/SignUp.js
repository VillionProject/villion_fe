import React, {useState} from 'react';
import Logo from "../atoms/Logo";
import Center from "./Center";
import Input from "../atoms/Input";
import {useNavigate} from "react-router-dom";
import Button from "../atoms/Button";
import classes from "../../styles/blocks/SignUp.module.css"
import {emailCheck, passCheck} from "../../common/Reg";
import Loading from "./Loading";
import PopupDom from "./PopupDom";
import MsgPopup from "./MsgPopup";
import ConfirmPopup from "./ConfirmPopup";
import {userSignUp} from "../../common/api/ApiPostService";

const SignUp = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [library, setLibrary] = useState('');
    const [isMsgPopupOpen, setIsMsgPopupOpen] = useState({show : false, msg: '', gb : ''});
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState({show : false, msg: ''});
    const [loading, setLoading] = useState(false);

    const idChangeMethod = (e) => {
        setId(e.target.value);
    }

    const pwdChangeMethod = (e) => {
        setPassword(e.target.value);
    }

    const libraryChangeMethod = (e) => {
        setLibrary(e.target.value);
    }

    const signUpHandler = () => {

        if (!emailCheck(id)) {
            setIsMsgPopupOpen({show: true, msg: '아이디를 이메일형식으로 입력해 주세요.', gb : ''});
            return ;
        }

        if (!passCheck(password)) {
            setIsMsgPopupOpen({show: true, msg: '비밀번호는 대,소문자 특수문자 포함 8글자 이상으로 입력해 주세요.', gb : ''});
            return ;
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            userSignUp(id, password, library)
                .then((res) => {
                    console.log(res.data)
                    if (res.status === 200) {
                        setIsMsgPopupOpen({show: true, msg: "회원가입이 완료되었습니다.", gb : 'success'});
                        // navigate("/login");
                    }
                }).catch((err) => {
                    console.log(err)
                    setIsMsgPopupOpen({show: true, msg: err.response.data.data.message, gb : 'success'});
                })

        }, 700);


    }

    const closeMsgPopup = () => {

        if (isMsgPopupOpen.gb === 'success') {
            navigate('/login');
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
        <div className={classes.signUpBox}>
            <Logo></Logo>
            <Center>
                <div className={classes.signUpDetail}>
                    <Input value="아이디" placeholder="아이디를 입력하세요. 변경 불가능합니다." type="text" onChange={idChangeMethod}/>
                    <Input value="내 도서관 이름" placeholder="도서관 이름을 입력하세요." type="text" onChange={libraryChangeMethod}/>
                    <Input value="비밀번호" placeholder="비밀번호를 입력하세요." type="password" onChange={pwdChangeMethod}/>
                </div>
                <Button value="회원가입" onClick ={signUpHandler}></Button>
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

export default SignUp;
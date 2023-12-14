import React from 'react';
import Logo from "../atoms/Logo";
import Center from "./Center";
import Input from "../atoms/Input";
import {useNavigate} from "react-router-dom";
import Button from "../atoms/Button";
import classes from "../../styles/blocks/SignUp.module.css"

const SignUp = () => {
    const navigate = useNavigate();

    const idChangeMethod = (e) => {

    }

    const pwdChangeMethod = (e) => {

    }

    const libraryChangeMethod = (e) => {

    }

    const signUpHandler = () => {
        // TODO 아이디, 비번 저장 후 로그인
        navigate('/Login')
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
        </div>
    );
};

export default SignUp;
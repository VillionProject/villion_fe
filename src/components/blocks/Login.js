import React, {useEffect, useState} from 'react';
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import classes from "../../styles/blocks/Login.module.css";
import Center from "./Center";
import Logo from "../atoms/Logo";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');

    const idChangeMethod = () => {

    }

    const pwdChangeMethod = () => {

    }

    const loginHandler = () => {
        // TODO 아이디, 비번 저장 후 로그인
        navigate('/Home')
    }

    return (
        <div className={classes.loginBox}>
            <Logo></Logo>
            <Center>
                <div>
                    <div className={classes.loginWrap}>
                        <Input value="아이디" placeholder="아이디를 입력하세요." type="text" onChange={idChangeMethod}/>
                        <Input value="비밀번호" placeholder="비밀번호를 입력하세요." type="password" onChange={pwdChangeMethod}/>
                        <div className={classes.detailBox}>
                            <p>회원가입</p>
                            <p>비밀번호 찾기</p>
                        </div>
                        <Button value="로그인" onClick ={loginHandler}></Button>
                    </div>
                </div>
            </Center>
        </div>
    );
};

export default Login;
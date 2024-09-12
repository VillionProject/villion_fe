import React, {useState} from 'react';
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import {loginCheckAction} from "../../ducks/loginCheck";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {userProfileImageChange} from "../../common/api/ApiPostService";

const ProfileChange = () => {
    const dispatch = useDispatch();
    const nav = useNavigate()
    const userInfo = useSelector(state => state.loginCheck.loginInfo);

    const [link, setLink] = useState('');

    const submitHandler = () => {

        try {
            userProfileImageChange(userInfo.userId, link)
                .then((res) => {
                    if(res.status == 200) {
                        dispatch(loginCheckAction.profileImgInfoSet(link));
                        nav('/settings')
                    }
                })

        } catch {

        }

    }

    const lineHandler = (e) => {
        setLink(e.target.value)
    }

    return (
        <div style={{
            padding: '30px'
        }}>
            <Input onChange={lineHandler} value="변경할 프로필 이미지 링크" placeholder="프로필 이미지 링크를 입력하세요." type="text"  />
            <Button value="변경하기" onClick ={submitHandler}></Button>
        </div>
    );
};

export default ProfileChange;
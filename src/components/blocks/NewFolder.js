import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import {userFolderCreate} from "../../common/api/ApiPostService";
import {useSelector} from "react-redux";
import Loading from "./Loading";
import PopupDom from "./PopupDom";
import MsgPopup from "./MsgPopup";
import ConfirmPopup from "./ConfirmPopup";

const NewFolder = () => {
    const nav = useNavigate();
    const [folderName, setFolderName] = useState('');
    const userInfo = useSelector(state => state.loginCheck.loginInfo);
    const [isMsgPopupOpen, setIsMsgPopupOpen] = useState({show : false, msg: '', gb : ''});
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState({show : false, msg: ''});
    const [loading, setLoading] = useState(false);

    const folderNameMethods = (e) => {
        setFolderName(e.target.value)
    }

    const createFolderMethods = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            userFolderCreate(userInfo.userId, folderName)
                .then((res) => {
                    if(res.status == 200) {
                        setIsMsgPopupOpen({show: true, msg: "폴더생성이 완료되었습니다..", gb : 'success'});
                    }
                })
                .catch((err) => {
                setIsMsgPopupOpen({ show: true, msg: "폴더생성 중 오류가 발생했습니다.", gb: 'error' });
            })

        }, 1000)



    }

    const closeMsgPopup = () => {

        if (isMsgPopupOpen.gb === 'success') {
            nav('/myFolder');
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
            <div style={{
                padding: '10px'
            }}>
                <Input value="생성할 폴더 이름" onChange={folderNameMethods} placeholder="책 이름을 입력하세요. 변경 불가능합니다." type="text" />
                <Button value="생성" onClick={createFolderMethods}></Button>
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

export default NewFolder;
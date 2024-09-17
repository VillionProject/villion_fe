import React, {useEffect, useState} from 'react';
import classes from "../../styles/blocks/Settings.module.css";
import plus from "../../asset/images/Plus.png";
import arrow from "../../asset/images/ArrowRight.png";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getMyFolder} from "../../common/api/ApiGetService";
import {wishedToggle} from "../../common/api/ApiPostService";
import Loading from "./Loading";
import PopupDom from "./PopupDom";
import MsgPopup from "./MsgPopup";
import ConfirmPopup from "./ConfirmPopup";

const MyFolderList = () => {
    const nav = useNavigate();
    const userInfo = useSelector(state => state.loginCheck.loginInfo);
    const [myFolderData, setMyFolderData] = useState([]);
    const [productId, setProductId] = useState('');

    const [isMsgPopupOpen, setIsMsgPopupOpen] = useState({show : false, msg: '', gb : ''});
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState({show : false, msg: ''});
    const [loading, setLoading] = useState(false);



    useEffect(() => {

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const bookInfoData = JSON.parse(urlParams.get('productId'));
        setProductId(bookInfoData);

        getMyFolder(userInfo.userId)
            .then((res) => {
                if(res.status == 200) {
                    console.log(res.data)
                    setMyFolderData(res.data);
                }
            })
            .catch((err) => {

            })


    }, []);

    const createFolder = () => {
        nav('/newFolder')
    }

    const folderDetail = (item) => {
        setLoading(true)


        setTimeout(() => {
            setLoading(false)

            wishedToggle(userInfo.userId, item.folderName, productId)
                .then((res) => {

                    if(res.status == 200) {
                        // setIsMsgPopupOpen({show: true, msg: '찜 목록이 업데이트 되었습니다.', gb : 'success'});
                        // window.location.reload();
                        setIsMsgPopupOpen({show: true, msg: "찜목록에 추가되었습니다.", gb : 'success'});
                    }

                }).catch((err) => {

            })
        }, 1000)


    }

    const closeMsgPopup = () => {

        if (isMsgPopupOpen.gb === 'success') {
            nav(-1);
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
                <div className={classes.wrap}>
                    <div className={classes.topArea}>
                        <p>어떤 폴더에 담을지 선택해주세요.</p>
                    </div>


                    <div className={classes.contentsWrap}>
                        <div className={classes.menuArea}>
                            <ul>
                                <li onClick={createFolder} style={{color : '#B8B8B8'}}>폴더 <img src={plus} /></li>
                            </ul>
                        </div>
                        <div className={classes.menuArea}>
                            <ul>
                                {myFolderData.map((item, idx) => (
                                    <li onClick={() => {folderDetail(item)}}>{item.folderName}  <img src={arrow} /></li>
                                ))}

                            </ul>
                        </div>
                    </div>
                </div>
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

export default MyFolderList;
import React, {useEffect, useState} from 'react';
import classes from "../../styles/blocks/Settings.module.css";
import arrow from "../../asset/images/ArrowRight.png";
import plus from "../../asset/images/Plus.png";
import {useNavigate} from "react-router-dom";
import {getMyFolder} from "../../common/api/ApiGetService";
import {useSelector} from "react-redux";

const MyFolder = () => {
    const nav = useNavigate();
    const userInfo = useSelector(state => state.loginCheck.loginInfo);
    const [myFolderData, setMyFolderData] = useState([]);

    useEffect(() => {

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

        nav(`/myWished?detail=${JSON.stringify(item)}`)
    }

    return (
        <div>
            <div className={classes.wrap}>
                <div className={classes.topArea}>
                    <p>💛 찜  도서</p>
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
    );
};

export default MyFolder;
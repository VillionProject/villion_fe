import React, {useRef, useState} from 'react';
import MainCoverImg from '../../asset/images/main_cover.png'
import classes from '../../styles/blocks/MainCover.module.css'
import Login from "./Login";

const MainCover = () => {
    const [loginTab, setLoginTab] = useState(false);
    const tabRef = useRef();
    const tabRef2 = useRef();

    const loginTabClickMethod = () => {
        tabRef.current.style.left = '-100vw';
        tabRef2.current.style.left = '0' ;
    }

    return (
        <div className={classes.mainWrap}>
            <div ref={tabRef} onClick={loginTabClickMethod} className={classes.maincover}>
                <p>10억 개의 책을 빌리는 빌런이 되어 보세요.</p>
            </div>
            <div ref={tabRef2} className={classes.loginTab}>
                <Login></Login>
            </div>
        </div>
    );
};

export default MainCover;
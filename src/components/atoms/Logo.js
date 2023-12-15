import React from 'react';
import logoImg from '../../asset/images/logo.PNG'
import classes from "../../styles/atoms/Logo.module.css"

const Logo = (prop) => {
    return (
        <div className={classes.logoWrap}>
            <img src={logoImg} className={classes.mainLogo} alt="Logo Description"/>
        </div>

    );
};

export default Logo;
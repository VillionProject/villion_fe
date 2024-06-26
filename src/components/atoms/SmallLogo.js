import React from 'react';
import logoImg from "../../asset/images/logo.PNG";
import classes from "../../styles/atoms/SmallLogo.module.css";

const SmallLogo = () => {
    return (
        <div>
            <img src={logoImg} className={classes.smallLogo} alt="Logo Description"/>
        </div>
    );
};

export default SmallLogo;
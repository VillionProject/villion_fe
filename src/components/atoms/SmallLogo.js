import React from 'react';
import logoImg from "../../asset/images/logo.PNG";
import classes from "../../styles/atoms/SmallLogo.module.css";
import {useNavigate} from "react-router-dom";

const SmallLogo = () => {
    const navigate = useNavigate();

    const homeMethod = () => {
        navigate("/home")
    }

    return (
        <div>
            <img onClick={homeMethod} src={logoImg} className={classes.smallLogo} alt="Logo Description"/>
        </div>
    );
};

export default SmallLogo;
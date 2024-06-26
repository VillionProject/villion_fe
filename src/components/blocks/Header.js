import React from 'react';
import classes from "../../styles/blocks/Header.module.css"


const Header = ({children}) => {
    return (
        <div className={classes.topContainer}>
            {children}
        </div>
    );
};

export default Header;
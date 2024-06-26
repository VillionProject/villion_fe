import React from 'react';
import classes from "../../styles/blocks/footer.module.css";

const Footer = ({children}) => {
    return (
        <div className={classes.footContainer}>
            {children}
        </div>
    );
};

export default Footer;
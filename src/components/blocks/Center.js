import React from 'react';
import classes from '../../styles/blocks/Center.module.css'

const Center = (props) => {
    return (
        <div className={classes.Wrap}>{props.children}</div>
    );
};

export default Center;
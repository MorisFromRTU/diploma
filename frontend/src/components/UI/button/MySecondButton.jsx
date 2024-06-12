import React from 'react';
import classes from "./MySecondButton.module.css";
import styled from 'styled-components';

    const MySecondButton = ({course= false, children, ...props}) => {
    return (
        course
        ?
        <div {...props} className={classes.myBtn2}>
            {children}
        </div>
        :
            <div {...props} className={classes.myBtn}>
                {children}
            </div>
    );
};

export default MySecondButton;
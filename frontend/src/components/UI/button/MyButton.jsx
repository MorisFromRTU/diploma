import React from "react";
import classes from './MyButton.module.css';
const MyButton = ({children, margin, disabled = false, ...props}) => {
    return(
        <button {...props} className={classes.myBtn} style={{marginLeft: margin}} disabled={disabled}>
            {children}
        </button>
    )
}

export default MyButton;
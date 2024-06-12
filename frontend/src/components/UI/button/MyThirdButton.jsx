import React from "react";
import classes from './MyThirdButton.module.css';
const MyButton = ({children, disabled=false, ...props}) => {
    return(
        <button {...props} className={disabled ? classes.myDisBtn :classes.myBtn} disabled={disabled} >
            {children}
        </button>
    )
}

export default MyButton;
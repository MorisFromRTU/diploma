import React, { useState } from "react";
import classes from './ProgressBar.module.css'

const ProgressBar = ({value}) => {

    if (value>=15){
        return (
            <div className={classes.progress}>
                <div
                    className={classes.progressBar}
                    role="progressbar"
                    style={{ width: `${value}%` }}
                    aria-valuenow={value}
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    {value}%
                </div>
            </div>
        );
    }
    else{
        return (
            <div className={classes.progress}>
                <div
                    className={classes.progressBar2}
                    role="progressbar"
                    style={{ width: `${value}%` }}
                    aria-valuenow={value}
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    {value}%
                </div>
            </div>
        );
    }

}

export default ProgressBar;
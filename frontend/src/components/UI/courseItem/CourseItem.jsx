import React from 'react';
import classes from "./CourseItem.module.css";
import {Link} from "react-router-dom";

const CourseItem = ({to, pointer= true, background, smallText, bigText,...props}) => {
    return (
        pointer
            ?
            <Link to={to} className={classes.linkStyle}>
                <div  {...props} className={classes.courseName} style={{backgroundColor:background}}>
                    <span className={classes.smallText}>{smallText}</span>
                    <span className={classes.bigText}>{bigText}</span>
                </div>
            </Link>

            :
            <Link style={{ width: '100%'}}>
                <div  {...props} className={classes.courseName} style={{backgroundColor:background, cursor:'auto'}}>
                    <span className={classes.smallText}>{smallText}</span>
                    <span className={classes.bigText}>{bigText}</span>
                </div>
            </Link>
    );
};

export default CourseItem;
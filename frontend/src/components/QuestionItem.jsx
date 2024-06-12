import React from 'react';
import {Redirect, useNavigate} from "react-router-dom";
import MyButton from "./UI/button/MyButton";
import classes from "../styles/QuestionItem.module.css"
const QuestionItem = (props) => {
    const router = useNavigate()
    return (

        <div className={classes.question}>
            <div>
                <strong onClick={() => router(`/forum/${props.question.question_id}`)} className={classes.questionTitle}>{props.question.title}</strong>
                <div className="div">
                    {props.question.description}
                </div>
            </div>
            <div className={classes.questionBtn}>
                <MyButton onClick={() => router(`/tag/${props.question.tagTitle}`)}>{props.question.tagTitle}</MyButton> 
                <div className={classes.questionInfo}>
                    <h4 onClick={() => router(`/user/${props.question.comment_count}`)}>{props.question.comment_count} ответов</h4>
                     <h4 className={classes.questionAuthor} onClick={() => router(`/user/${props.question.user_login}`)}>{props.question.user_login}</h4> 
                </div>

            </div>

        </div>
    );
};

export default QuestionItem;
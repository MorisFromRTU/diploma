import React, { useState, useEffect } from 'react';
import Navbar from '../components/UI/navbar/Navbar';
import { useParams } from 'react-router';
import classes from '../styles/QuestionItemPage.module.css';
import axios from '../api/axios';
import MyThirdButton from '../components/UI/button/MyThirdButton';
import useAxiosPrivate from '../components/hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import MyInput from '../components/UI/input/MyInput';

const QuestionItemPage = () => {
  const params = useParams();
  const [question, setQuestion] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);
  const id = localStorage.getItem('user_id');
  const login = localStorage.getItem('loginData');
  const [commentText, setCommentText] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const getQuestion = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `/question/question/?question_id=${params.id}`,
      });
      return response.data;
    } catch (error) {
      console.error('У вас ошибка:', error);
    }
  };

  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
    if (event.target.value)
    setIsButtonDisabled(false);
    else{
        setIsButtonDisabled(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getQuestion();
      setQuestion(data);
    };
    fetchData();
  }, []);

  const deleteQuestion = async () => {
    try {
      const response = await axiosPrivate({
        method: 'delete',
        url: `/question/question/`,
        params: {
          user_id: localStorage.getItem('user_id'),
          question_id: params.id,
        },
      });
      setIsDeleted(true);
      return response.data;
    } catch (error) {
      console.error('У вас ошибка:', error);
    }
  };

  const deleteComment = async (comment_id) => {
    try {
      const response = await axiosPrivate({
        method: 'delete',
        url: `/question/deleteComment`,
        params: {
          user_id: localStorage.getItem('user_id'),
          question_id: params.id,
          comment_id: comment_id,
        },
      });
      window.location.reload();
      return response.data;
    } catch (error) {
      console.error('У вас ошибка:', error);
    }
  };

  const post_data = {
    question_id: params.id,
    text: commentText,
  };

  const postComment = async (post_data) => {
    try {
      const response = await axiosPrivate({
        method: 'post',
        url: `/question/createComment/?user_id=${id}&user_login=${login}`,
        data: JSON.stringify(post_data),
      });
      setCommentText(''); 
    } catch (error) {
      console.error('У вас ошибка:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await postComment(post_data);
      window.location.reload();
    } catch (error) {
      console.error('У вас ошибка:', error);
    }
  };

  useEffect(() => {
    if (isDeleted) {
      navigate('/forum');
    }
  }, [isDeleted, navigate]);

  return (
    <>
      <Navbar setIsHovered={setIsHovered}></Navbar>
      <div className={classes.mainBlock}>
        <div className={classes.questionBlock}>
          <div className={classes.questionTitleBlock}>
            <h1 className={classes.questionTitle}>{question?.question.title}</h1>
          </div>
          <div className={classes.questionDescBlock}>
            <pre className={classes.questionDesc}>{question?.question.description}</pre>
          </div>
          <div className={classes.questionUserBlock}>
            <h1 className={classes.questionUser}>{question?.question.user_login}</h1>
          </div>
          <div className={classes.questionTagBlock}>
            <h1 className={classes.questionTag}>{question?.question.tag}</h1>
          </div>
        </div>
        {localStorage.getItem('loginData') === question?.question.user_login && (
          <div className={classes.deleteQuestionBlock}>
            <MyThirdButton onClick={deleteQuestion}>Удалить вопрос</MyThirdButton>
          </div>
        )}
        <h1 className={classes.commentBlockTitle}>Комментарии</h1>
        
        {question?.comments.map((comment) => (
          <div className={classes.comment} key={comment.id}>
            <pre className={classes.commentText}>{comment.text}</pre>
            <div className={classes.buttonBlock}>
              {localStorage.getItem('user_id') === comment.user_id && (
                <button className={classes.deleteButton} onClick={() => deleteComment(comment.id)}>
                  Удалить комментарий
                </button>
              )}
              <div onClick={() => navigate(`/personal/${comment.user_id}`)} className={classes.commentTitle}>
                {comment.user_login}
              </div>
            </div>
          </div>
        ))}
        <textarea
          onChange={handleCommentTextChange}
          value={commentText}
          placeholder="Введите комментарий"
          className={classes.commentArea}
          id="comment"
          name="comment"
          required
        ></textarea>
        <MyThirdButton onClick={handleSubmit} disabled={isButtonDisabled}>Добавить комментарий</MyThirdButton>
      </div>
    </>
  );
};

export default QuestionItemPage;

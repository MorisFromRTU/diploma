import React, { useState, useEffect } from 'react';
import MyInput from "../components/UI/input/MyInput";
import Navbar from "../components/UI/navbar/Navbar";
import classes from "../styles/QuestionPage.module.css";
import MyThirdButton from "../components/UI/button/MyThirdButton";
import useAxiosPrivate from '../components/hooks/useAxiosPrivate'
import { useNavigate  } from 'react-router-dom';
import Select from 'react-select';

const QuestionPage = () => {


  const customStyles = {
    control: (base,state) => ({
      ...base,
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      boxShadow: '0 0 3px #000',
      border: state.selectedOption ? '#FFBF00 solid 1px' :'white solid 1px',
      color: '#232323',
      height: '50px',
      borderRadius: '0.25rem',
      fontSize: 16,
      margin: '5px 0',
      ':hover': {
        borderColor: '#FFBF00',
    }
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: 16,
      fontWeight: 'normal',
      color: state.isSelected ? '#232323' : '#232323',
      backgroundColor: state.isSelected ? 'white' : 'white',
      cursor: 'pointer',
      userSelect: 'none',
      '&:hover': {
        color: state.isSelected ? '#232323' : '#232323',
        backgroundColor: state.isSelected ? '#F1F2F4' : '#F1F2F4',
      },
    }),
    
  };

  const [isHovered, setIsHovered] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState(null);
  const [isAsked, setIsAsked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const axiosPrivate = useAxiosPrivate();
  const id = localStorage.getItem('user_id');
  
  const navigate = useNavigate();
  

  const data = {
    description: description,
    title: title,
    tag: tag?.value,
  };

  const postQuestion = async (data) => {
    try {
      const response = await axiosPrivate({
        method: 'post',
        url: `/question/createQuestion/?user_id=${id}`,
        data: JSON.stringify(data),
      });
    } catch (error) {
      console.error("У вас ошибка :", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (errorMessage===''){
      try {
        await postQuestion(data);
        setIsAsked(true);
      } catch (error) {
        console.error('У вас ошибка:', error);
      }
    }
    
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    if (event.target.value.length > 1500) {
      setErrorMessage('Максимальная длина вопроса 1500 символов');
    } else {
      setErrorMessage('');
    }
  };

  const handleSelectChange = (option) => {
    setTag(option);
    setIsButtonDisabled(false);
  };

  const options = [
    { value: "python", label: "python" },
    { value: "css", label: "css" },
    { value: "html", label: "html" },
    { value: "c++", label: "c++" },
  ];

  useEffect(() => {
    setIsAsked(false);
  }, [tag, description, title]);

  useEffect(() => {
    if (isAsked) {
      navigate('/forum');
    }
  }, [isAsked, navigate]);

  return (
    <div>
      <Navbar setIsHovered={setIsHovered} />
      <div className={classes.main}>
        <div className={classes.searchBlock}>
          <h1 className={classes.questionTitle}>Задавайте ваш вопрос</h1>
          <form>
            <MyInput
              onChange={(event) => setTitle(event.target.value)}
              name="theme"
              value={data.title}
              type="text"
              placeholder="Введите тему вопроса"
              required
            />
            <textarea
              onChange={handleDescriptionChange}
              placeholder="Введите ваш вопрос"
              className={classes.boxSizingBorder}
              id="question"
              name="question"
              value={data.description}
              required
            ></textarea>
            {errorMessage && (
              <div className={classes.error}>{errorMessage}</div>
            )}
            <Select
              styles={customStyles}
              options={options}
              value={tag}
              isSearchable
              isClearable
              onChange={handleSelectChange}
              placeholder=""
              className={classes.mySlt}
            ></Select>
            <p
              className={
                !tag || !title || !description
                  ? classes.instructions
                  : classes.offscreen
              }
            >
              Заполните все поля
            </p>
            <div>
              <MyThirdButton
                onClick={handleSubmit}
                disabled={isButtonDisabled || !title || !description}
              >
                Спросить
              </MyThirdButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
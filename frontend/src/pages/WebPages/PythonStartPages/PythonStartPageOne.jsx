import React, {useState} from 'react';
import classes from "../../../styles/WebStyles/PythonStartPage.module.css"
import Navbar from "../../../components/UI/navbar/Navbar";
import ProgressBar from "../../../components/UI/progressBar/ProgressBar";
import {Link, useNavigate} from "react-router-dom";
import MyThirdButton from '../../../components/UI/button/MyThirdButton'
const PythonStartPageOne = () => {
    const [isHovered, setIsHovered] = useState(false);
    const now = 0; // текущее значение прогресса
    const label = `${now}%`;


  const navigate = useNavigate();
  const start = () => {
    navigate('/pythonstart/unit=1/1');
  };

    return (
        <>
            <Navbar setIsHovered={setIsHovered}/>

            <div className={classes.main}>
                <div className={classes.themeList}>
                    <div className={classes.themeListHeader}>
                        <p>WEB</p>
                        <p className={classes.themeListHeaderText}>Python. Start</p>
                        <ProgressBar value={0}/>
                    </div>
                    <div>

                        <div className={classes.themeName}>
                            1. Введение
                        </div>
                        <Link to={"/pythonstart/unit=1/1"}>
                            <div className={classes.subThemeName}>
                                1.1 Теория
                            </div>
                        </Link>

                        <Link to={"/pythonstart/unit=1/2"}>
                            <div className={classes.subThemeName}>
                                1.2 Практика
                            </div>
                        </Link>

                    </div>

                    <div>

                        <div className={classes.themeName}>
                            2. Структуры данных
                        </div>
                        <Link to={"/pythonstart/unit=2/1"}>
                            <div className={classes.subThemeName}>
                                2.1 Теория
                            </div>
                        </Link>

                        <Link to={"/pythonstart/unit=2/2"}>
                            <div className={classes.subThemeName}>
                                2.2 Практика
                            </div>
                        </Link>

                    </div>
                    <div>

                        <div className={classes.themeName}>
                            3. Функции
                        </div>
                        <Link to={"/pythonstart/unit=3/1"}>
                            <div className={classes.subThemeName}>
                                3.1 Теория
                            </div>
                        </Link>

                        <Link to={"/pythonstart/unit=3/2"}>
                            <div className={classes.subThemeName}>
                                3.2 Практика
                            </div>
                        </Link>

                    </div>
                    <div>

                        <div className={classes.themeName}>
                            4. ООП
                        </div>
                        <Link to={"/pythonstart/unit=4/1"}>
                            <div className={classes.subThemeName}>
                                4.1 Теория
                            </div>
                        </Link>

                        <Link to={"/pythonstart/unit=4/2"}>
                            <div className={classes.subThemeName}>
                                4.2 Практика
                            </div>
                        </Link>

                    </div>

                </div>
                <div className={classes.contentBlock}>
                    <div className={classes.theme}> 
                        <div className={classes.firstTheme}>
                        Python.Start
                        </div>
                        <div>
                        Ваш вход в мир программирования
                        </div>
                    </div>
                    <div className={classes.info}>
                        <div className={classes.infoBlock}>
                            <p className={classes.infoText}>
                            <b>Python</b> - это мощный и гибкий язык программирования, который стал неотъемлемым инструментом для разработчиков по всему миру. <br/>
                            <br/>
                            Если вы только начинаете свой путь в программировании, курс <b>Python.Start</b> станет вашим входом в захватывающий мир програмирования.

                            В этом курсе вы узнаете все основы языка Python и приобретете необходимые навыки для создания своих программ и проектов. Независимо от того, хотите ли вы разрабатывать веб-приложения, анализировать данные, создавать игры или автоматизировать задачи, Python предоставит вам все необходимое для достижения ваших целей.<br/>
                            <br/>
                            Курс разделен на 4 блока, в каждом из которых рассматривается одна большая тема. <br/>
                            <br/>
                            На протяжении курса вы научитесь синтаксису и основам Python, познакомитесь с базовыми концепциями программирования. Вы научитесь создавать переменные, использовать условные операторы, циклы. Далее вы изучите встроенные в Python структуры данных, такие как списки, кортежи, словари и множества. После чего вы поработаете с функциями, и в конце курса изучите базовые концепции объектно-ориентированного программирования.
                            </p>
                            <MyThirdButton onClick={start}>
                                Начать сейчас
                            </MyThirdButton>
                        </div>
                    </div>
                </div>
                
               
            </div>
        </>
    );
};

export default PythonStartPageOne;
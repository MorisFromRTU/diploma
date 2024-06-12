import React, {useState} from 'react';
import classes from '../styles/CoursesPage.module.css'
import Navbar from "../components/UI/navbar/Navbar";
import MySecondButton from "../components/UI/button/MySecondButton";
import {Link} from "react-router-dom";

const CoursesPage = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (

        <div>
            <Navbar setIsHovered={setIsHovered}></Navbar>
            <div className={classes.mainBlock}>
                <div className={classes.leftBlock}>
                    <h1 className={classes.slogan}>
                        Погружение в мир IT начинается прямо сейчас
                    </h1>
                    <h3 className={classes.sloganItem}>
                        — Напиши свой первый алгоритм шифрования
                    </h3>
                    <h3 className={classes.sloganItem}>
                        — Сверстай свою первую веб-страничку
                    </h3>
                </div>
                <div className={classes.rightBlock}>
                    <Link to="/webcourses"><MySecondButton course={true}>WEB</MySecondButton></Link>

                    <MySecondButton course={true}>CRYPTO</MySecondButton>
                    <MySecondButton course={true}>PROGRAMMING</MySecondButton>
                    <MySecondButton course={true}>OC</MySecondButton>
                </div>
            </div>

        </div>
    );
};

export default CoursesPage;
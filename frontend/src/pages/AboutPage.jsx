import React, {useState} from 'react';
import Navbar from "../components/UI/navbar/Navbar";
import classes from '../styles/AboutPage.module.css'
import CourseItem from "../components/UI/courseItem/CourseItem";
import {Link} from "react-router-dom";
const AboutPage = () => {

    const [isHovered, setIsHovered] = useState(false);
    return (
        <>
            <Navbar setIsHovered={setIsHovered} />
            <div className={classes.main}>
                <h1 className={classes.head}>О Junstudy</h1>
                <div className={classes.mainLeft}>
                    <div className={classes.describe_block}>
                        <h3 className={classes.describe}>Мы в Junstudy считаем, что образование должно быть доступно всем. Заходите на наши беслптаные курсы, спрашивайте на форуме, общайтесь в личных сообщениях. IT ближе, чем вам кажется.</h3>
                        <div className={classes.infoBlock}>
                            <CourseItem pointer={false} background="white" smallText="Уровней сложности" bigText="6"></CourseItem>
                            <CourseItem pointer={false} background="white" smallText="Направлений" bigText="20+"></CourseItem>
                            <CourseItem pointer={false} background="white" smallText="Стоимость" bigText="от 0 рублей"></CourseItem>
                        </div>

                    </div>
                    <div className={classes.spaceBlock}>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutPage;
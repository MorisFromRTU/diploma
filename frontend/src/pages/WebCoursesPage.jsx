import React, {useState} from 'react';
import Navbar from "../components/UI/navbar/Navbar";
import classes from "../styles/WebCoursesPage.module.css";
import MySecondButton from "../components/UI/button/MySecondButton";
import CourseItem from "../components/UI/courseItem/CourseItem";
import {Colors} from "../colorConfig";
import {Link} from "react-router-dom";
const WebCoursesPage = () => {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <>
            <Navbar setIsHovered={setIsHovered} />
            <div className={classes.head}>
                <h1 className={classes.headText}>WEB PROGRAMMING</h1>
            </div>

            <div className={classes.mainBlock}>
                <div>
                    <h1 className={classes.mainBlockText}>BACKEND-разработка</h1>
                    <h1 className={classes.mainBlockText}>Python</h1>
                    <div className={classes.coursesBlock2}>
                            <CourseItem to="/pythonstart/unit=1" background={Colors.easyColor} smallText="lvl easy" bigText="Python. Start"> </CourseItem>
                            <CourseItem background={Colors.easyPlusColor} smallText="lvl easy+" bigText="Django. Start"></CourseItem>
                            <CourseItem background={Colors.middleColor} smallText="lvl middle" bigText="Django PRO"></CourseItem>





                    </div>
                    <h1 className={classes.mainBlockText}>JavaScript</h1>
                    <div className={classes.coursesBlock2}>
                        <CourseItem background={Colors.easyPlusColor} smallText="lvl easy+" bigText="js start"></CourseItem>
                        <CourseItem background={Colors.middleColor} smallText="lvl middle" bigText="Node.js start "></CourseItem>
                        <CourseItem background={Colors.middlePlusColor} smallText="lvl middle+" bigText="Node.js PRO "></CourseItem>
                    </div>
                    <h1 className={classes.mainBlockText}>C#</h1>
                        <div className={classes.coursesBlock2}>
                            <CourseItem background={Colors.easyPlusColor} smallText="lvl easy+" bigText="C# start"></CourseItem>
                            <CourseItem background={Colors.hardColor} smallText="lvl hard" bigText=".NET start"></CourseItem>
                            <CourseItem background={Colors.hardPlusColor} smallText="lvl hard+" bigText=".NET start PRO"></CourseItem>
                        </div>


                </div>
                <div>
                    <h1 className={classes.mainBlockText}>FRONTEND-разработка</h1>
                    <h1 className={classes.mainBlockText}>HTML+CSS</h1>
                    <div className={classes.coursesBlock2}>
                        <CourseItem background={Colors.easyColor} smallText="lvl easy" bigText="HTML start"></CourseItem>
                        <CourseItem background={Colors.easyColor} smallText="lvl easy" bigText="CSS start"></CourseItem>
                        <CourseItem background={Colors.easyPlusColor} smallText="lvl easy+" bigText="HTML+CSS PRO"></CourseItem>
                    </div>
                    <h1 className={classes.mainBlockText}>React</h1>
                    <div className={classes.coursesBlock2}>
                        <CourseItem background={Colors.easyPlusColor} smallText="lvl easy+" bigText="js start"></CourseItem>
                        <CourseItem background={Colors.hardColor} smallText="lvl hard" bigText="react start"></CourseItem>
                        <CourseItem background={Colors.hardPlusColor} smallText="lvl hard+" bigText="react PRO"></CourseItem>
                    </div>
                    <h1 className={classes.mainBlockText}>Vue.js</h1>
                    <div className={classes.coursesBlock2}>
                        <CourseItem background={Colors.easyPlusColor} smallText="lvl easy+" bigText="js start"></CourseItem>
                        <CourseItem background={Colors.middlePlusColor} smallText="lvl middle+" bigText="vue.js start"></CourseItem>
                        <CourseItem background={Colors.hardPlusColor} smallText="lvl hard+" bigText="vue.js PRO"></CourseItem>
                    </div>
                </div>
            </div>

        </>
    );
};

export default WebCoursesPage;
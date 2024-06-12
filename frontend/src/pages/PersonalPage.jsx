import React, {useEffect, useState} from 'react';
import Navbar from "../components/UI/navbar/Navbar";
import classes from "../styles/PersonalPage.module.css"
import {Link} from "react-router-dom";
import face from "../img/face.png";
import web from "../img/web.jpg"
import MyThirdButton from "../components/UI/button/MyThirdButton";
import CourseItem from "../components/UI/courseItem/CourseItem";
import { Colors } from "../colorConfig";
import useAxiosPrivate from '../components/hooks/useAxiosPrivate'

const PersonalPage = () => {
    const [isHovered, setIsHovered] = useState(false);
    const login = localStorage.getItem('loginData')
    const [loginData, setLoginData] = useState(login);
    const [statusData, setStatusData] = useState("");
    const [addressData, setAddressData] = useState("");
    const [educationData, setEducationData] = useState("");
    

    const id = localStorage.getItem('user_id');
    const axiosPrivate = useAxiosPrivate();

    const getInfo = async() => {
        try{
            const response = await axiosPrivate({
            method: 'get',
            url: `/userinfo/?user_id=${id}`,
            });
            return response.data;
        }
        catch(error){
            console.error("У вас ошибка :", error);
        }
    }

      useEffect(() => {
        const fetchData = async () => {
            const data = await getInfo();            
            const userInfoData = data.user_info;
            if (userInfoData.description){
                setStatusData(userInfoData.description);        
            }
            if (userInfoData.education){
                setEducationData(userInfoData.education);
            }
            if (userInfoData.address){
                setAddressData(userInfoData.address);
            }
        }
        fetchData();
    }, []);
    return (
        <div>
            <Navbar setIsHovered={setIsHovered}/>
            <div className={classes.infoContainer}>

                <div className={classes.leftContainer}>
                    <div className={classes.leftContainerMain}>
                        <Link to="/">
                            <img className={classes.logo} src={face} alt="web"/>
                        </Link>

                        <section className={classes.leftContainerSection}>
                            <h3 className={classes.skills}>Мои навыки</h3>
                            <ul>
                                <li className={classes.skillsItem}>HTML</li>
                                <li className={classes.skillsItem} >CSS</li>
                                <li className={classes.skillsItem}>JavaScript</li>
                                <li className={classes.skillsItem}>React</li>
                            </ul>
                        </section>

                    </div>

                        <h1 className={classes.name}>
                            {loginData}
                        </h1>
                    <h3 className={classes.edu}>{educationData}</h3>
                    <h3 className={classes.edu}>{addressData}</h3>
                    <div className={classes.messageButton}>
                        <Link to={'/user/'+ loginData+'/change'}>
                            <MyThirdButton>Редактировать страницу</MyThirdButton>
                        </Link>
                        
                    </div>




                </div>
                <div className={classes.rightContainer}>
                    <h1 style={{marginBottom: 10}}>Мой статус</h1>
                    <p style={{marginBottom: 10}}>
                        {statusData}
                    </p>
                    <h1>Мои курсы</h1>
                    <div className={classes.courses}>
                            <CourseItem background={Colors.easyColor} smallText="lvl easy" bigText="Python. Start"></CourseItem>
                            <CourseItem background={Colors.easyPlusColor} smallText="lvl easy+" bigText="Python. ООП"></CourseItem>
                            <CourseItem background={Colors.middleColor} smallText="lvl middle" bigText="Python. Django"></CourseItem>
                            <CourseItem background={Colors.middlePlusColor} smallText="lvl middle+" bigText="Python. Django+ "></CourseItem>
                            <CourseItem background={Colors.hardColor} smallText="lvl hard" bigText="Python. Big Data "></CourseItem>
                            <CourseItem background={Colors.hardPlusColor} smallText="lvl hard+" bigText="Python. Data Science "></CourseItem>
                    </div>
                </div>

            </div>





        </div>
    );
};

export default PersonalPage;
import React, {useContext, useEffect, useState} from 'react';
import classes from './Navbar.module.css'
import logo from '../../../img/logo.svg';
import MyButton from '../button/MyButton';
import {Link, useNavigate} from "react-router-dom";
import axios from '../../../api/axios'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Navbar = ({links, setIsHovered, customLinkClass}) => {
    
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState(localStorage.getItem('loginData'));
    const USERINFO_URL = '/userinfo'
    const accessToken = localStorage.getItem('accessToken');
    const user_id = localStorage.getItem('user_id');

    const axiosPrivate = useAxiosPrivate();

    // const getInfo = async (e) => {
    //     if (e) {
    //       e.preventDefault();
    //     }
    //     try {
    //       const response = await axiosPrivate.get(
    //         `${USERINFO_URL}?user_id=${user_id}`
    //       );
    //       return response.data.user.login;
    //     }catch(error){
    //         console.error("У вас ошибка :", error);
    //     } 
    //   }
      
    // useEffect(() => {
    //     const fetchData = async () => {
    //       const storedData = await getInfo();
    //       if (storedData) {
    //         setLoginData(storedData);
    //       }
    //     }
    //     fetchData();
    //   }, []);

    
    const disLogin = event => {
        event.preventDefault()
        localStorage.setItem('accessToken', '');
        localStorage.setItem('refreshToken', '');
        localStorage.setItem('loginData', '');
        navigate('/');
    }
    return (
        accessToken
            ?
        <div className= {classes.navbar}>
            <Link to="/">
                <img className={classes.logo} src={logo} alt="Junstudy"/>
            </Link>


            <ul className={classes.navbarLinks}>
                {links?.map((link, index) => (
                    <li  key={index}>
                        <a className={`${classes.navbarLink} ${customLinkClass}`} href={link.url}>{link.label}</a>
                    </li>
                ))}
            </ul>
            <div>
                <Link to={`/user/${loginData}`}>
                    <MyButton>
                        {loginData}
                    </MyButton>
                </Link>

                <MyButton margin="20px"
                    onClick={disLogin}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    Выйти
                </MyButton>



            </div>
        </div>
            :
            <div className= {classes.navbar}>
              <Link to="/">
                  <img className={classes.logo} src={logo} alt="Junstudy"/>
              </Link>


                <ul className={classes.navbarLinks}>
                  {links?.map((link, index) => (
                  <li  key={index}>
                  <a className={`${classes.navbarLink} ${customLinkClass}`} href={link.url}>{link.label}</a>
                  </li>
                  ))}
                </ul>
                <div>
                    <Link to="/registration">
                        <MyButton
                                  onMouseEnter={() => setIsHovered(true)}
                                  onMouseLeave={() => setIsHovered(false)}>
                            Регистрация
                        </MyButton>
                    </Link>

                    <Link to="/login">
                        <MyButton margin="20px"
                                  onMouseEnter={() => setIsHovered(true)}
                                  onMouseLeave={() => setIsHovered(false)}>
                            Войти
                        </MyButton>
                    </Link>

                </div>
            </div>

    );
};

export default Navbar;
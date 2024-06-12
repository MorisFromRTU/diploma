import React, {useEffect, useRef, useState} from 'react';
import classes from "../styles/LoginPage.module.css"
import {Link, useLocation, useNavigate} from "react-router-dom";
import logo from '../img/logo.svg';
import axios from '../api/axios'
import useAuth from "../components/hooks/useAuth";

const LOGIN_URL = '/login'

const LoginPage = () => {

    const emailRef = useRef();
    const errRef = useRef();

    const { isAuth, setIsAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [loginData, setLoginData] = useState(localStorage.getItem('loginData'));
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');



    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const loginFunc = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({email: email, password: password}),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            );
            const data = response?.data;
            const accessToken = data?.accessToken;
            const refreshToken = data?.refreshToken;
            const id = response?.data?.user?.id;
            const login = response?.data?.user?.login;
            localStorage.setItem('loginData', login);
            setLoginData(login)
            setIsAuth({email, password, accessToken, refreshToken});        
            navigate(from, {replace: true});

            
            localStorage.setItem('user_id', id);
            console.log(localStorage.getItem('user_id'))
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

        } catch (err){
            if (!err?.response){
                setErrMsg('Сервер не отвечает');
            } else if (err.response?.status === 400){
                setErrMsg(`Неправильный логин или пароль`);
            } else {
                setErrMsg('Не удалось авторизоваться')
            }
        }

        

    };



    return (
        <div className={classes.pageContainer}>
            <form
                className={classes.loginForm} >
                <div className={classes.upside}>
                    <h1 className={classes.loginH}>Авторизация</h1>
                    <Link to="/">
                        <img className={classes.logo} src={logo} alt="Junstudy"/>
                    </Link>
                </div>

                <div className={classes.inputMargin}>
                    <input className={classes.myInp2}
                           type="text"
                           ref={emailRef}
                           id="email"
                           placeholder="E-mail"
                           autoComplete="off"
                           onChange={(e) => setEmail(e.target.value)}
                           value={email}
                           required/>
                    <input className={classes.myInp2}
                           type="password"
                           id="password"
                           placeholder="Пароль"
                           onChange={(e) => setPassword(e.target.value)}
                           value={password}
                           required/>
                </div>



                <div className={classes.downside}>
                    <Link to="/registration">
                        <h4>Регистрация</h4>
                    </Link>
                    <Link to="/">
                        <h4>Забыли пароль?</h4>
                    </Link>
                </div>

                <p ref={errRef} className={errMsg ? classes.errMsg : classes.offscreen} aria-live="assertive">{errMsg}</p>

                <button className={classes.regBtn}
                        type="submit" onClick={loginFunc}>ВОЙТИ</button>
            </form>




        </div>
    );
};

export default LoginPage;
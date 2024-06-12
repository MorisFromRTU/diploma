import React, {useEffect, useRef, useState} from 'react';
import classes from "../styles/LoginPage.module.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import logo from "../img/logo.svg";
import axios from "../api/axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import useAuth from "../components/hooks/useAuth";

const REGISTER_URL = '/registration';

const RegistrationPage = () => {

    const LOGIN_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
    const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const loginRef = useRef('');
    const errRef = useRef('');


    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [login , setLogin] = useState('');
    const [validLogin, setValidLogin] = useState(false);
    const [loginFocus, setLoginFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const { setIsAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loginRef.current.focus();
    },[])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = LOGIN_REGEX.test(login);
        setValidLogin(result);
    }, [login])

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        setValidPassword(result);
    }, [password])

    useEffect(() => {
        setErrMsg('');
    }, [login, email, password])

    const registration = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(REGISTER_URL,
                    JSON.stringify({email: email, login: login, password: password}),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            );
            const accessToken = response?.data?.accessToken;
            const refreshToken = response?.data?.refreshToken;
            const id = response?.data?.user?.id;
            setIsAuth({email, password, accessToken,refreshToken});
            setEmail('');
            setLogin('');
            setPassword('');
            navigate(from, {replace: true});
            localStorage.setItem('user_id', id);
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            localStorage.setItem('loginData', login)
        } catch (err) {
            if (!err?.response){
                setErrMsg('Сервер не отвечает');
            } else if (err.response?.status === 400){
                setErrMsg(`Пользователь с почтовым адресом ${email} уже существует`);
            } else{
                setErrMsg('Регистрация завршилась не успешно')
            }
            ;
        }


    };


    return (
        <div className={classes.pageContainer}>
            <form className={classes.loginForm}>
                <div className={classes.upside}>
                    <Link to="/">
                        <img className={classes.logo} src={logo} alt="Junstudy"/>
                    </Link>
                </div>

                <div className={classes.inputMargin}>
                    <input className={!email ? classes.myInp2 :classes.myInp}
                           type="email"
                           id="email"
                           autoComplete="off"
                           onChange={(e) => setEmail(e.target.value)}
                           value={email}
                           placeholder="E-mail"
                           aria-invalid={validEmail ? "false" : "true"}
                           aria-describedby="emailnote"
                           onFocus={()=>setEmailFocus(true)}
                           onBlur={()=>setEmailFocus(false)}
                           required
                    />
                    <span className={validEmail ? classes.valid : classes.hide}>
                        <FontAwesomeIcon icon={faCheck}/>
                     </span>
                    <span className={!validEmail && email ? classes.invalid : classes.hide}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                        <p id="emailnote" className={emailFocus && email &&
                        !validEmail ? classes.instructions : classes.offscreen}>
                                     <span className={classes.iconContainer}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                     </span>
                            Неправильный формат эл. почты<br />

                        </p>


                    <input className={!login ? classes.myInp2 :classes.myInp}
                           type="text"
                           id="login"
                           ref={loginRef}
                           placeholder="Логин"
                           autoComplete="off"
                           onChange={(e) => setLogin(e.target.value)}
                           value={login}
                           aria-invalid={validLogin ? "false" : "true"}
                           aria-describedby="uidnote"
                           onFocus={()=>setLoginFocus(true)}
                           onBlur={()=>setLoginFocus(false)}
                           required
                    />
                    <span className={validLogin ? classes.valid : classes.hide}>
                        <FontAwesomeIcon icon={faCheck}/>
                     </span>
                    <span className={!validLogin&& login ? !classes.invalid : classes.hide}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                            <p id="uidnote" className={loginFocus && login &&
                            !validLogin ? classes.instructions : classes.offscreen}>
                                 <span className={classes.iconContainer}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                 </span>
                                от 4 до 24 символов.<br />
                                Должен начинаться с буквы.<br />
                                Разрешены латинские буквы и цифры.
                            </p>


                    <input className={!password ? classes.myInp2 :classes.myInp}
                           type="password"
                           id="password"
                           placeholder="Пароль"
                           autoComplete="off"
                           onChange={(e) => setPassword(e.target.value)}
                           value={password}
                           aria-invalid={validPassword ? "false" : "true"}
                           aria-describedby="pwdnote"
                           onFocus={()=>setPasswordFocus(true)}
                           onBlur={()=>setPasswordFocus(false)}
                           required
                    />
                    <span className={validPassword ? classes.valid : classes.hide}>
                        <FontAwesomeIcon icon={faCheck}/>
                     </span>
                    <span className={!validPassword && password ? classes.invalid : classes.hide}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                    <p id="pwdnote" className={passwordFocus && password &&
                    !validPassword ? classes.instructions : classes.offscreen}>
                                 <span className={classes.iconContainer}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                 </span>
                        от 8 до 24 символов.<br />
                        Должен содержать заглавные и строчные буквы и цифру.<br />
                        Разрешены латинские буквы и цифры.
                    </p>
                </div>

                <p ref={errRef} className={errMsg ? classes.errMsg : classes.offscreen} aria-live="assertive">{errMsg}</p>

                    <button className={classes.regBtn} disabled={!validEmail || !validLogin || !validPassword}
                          type="submit" onClick={registration} >Регистрация</button>

                <div className={classes.downside}>
                    <Link to="/login">
                        <h4>Есть аккаунт?</h4>
                    </Link>
                </div>
            </form>

        </div>
    );
};

export default RegistrationPage;
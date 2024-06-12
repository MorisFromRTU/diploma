import React, {useEffect, useState} from 'react';
import Navbar from "../components/UI/navbar/Navbar";
import classes from '../styles/ForumPage.module.css'
import QuestionFilter from "../components/QuestionFilter";
import QuestionList from "../components/QuestionList";
import {useQuestion} from "../components/hooks/useQuestion";
import useAuth from "../components/hooks/useAuth";
import axios from '../api/axios'

const ForumPage = () => {
    const {isAuth, setIsAuth} = useAuth()
    const customLinkClass = classes.customLink;
    const [isHovered, setIsHovered] = useState(false);
    const [filter, setFilter] = useState({sort:'', query:''})


    const [questions, setQuestions] = useState([]);

    const getQuestions = async () => {
        try {
            const response = await axios.get('/question/questions');
            return response.data;
        } catch (error) {
            console.error("У вас ошибка:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getQuestions();
            setQuestions(data);
        };
        fetchData();
    }, []);

    const sortedAndSearchedPosts = useQuestion(questions, filter.sort, filter.query);
    return (
        <div>
            <Navbar setIsHovered={setIsHovered} customLinkClass={customLinkClass}/>
            <div className={classes.main}>
                <div className={classes.leftBlock}></div>
                <div className={classes.searchBlock}>
                    <QuestionFilter
                        filter={filter}
                        setFilter={setFilter}
                    />
                    <QuestionList
                        questions={sortedAndSearchedPosts}
                        title="Все вопросы"
                    />
                </div>
                <div className={classes.rightBlock}></div>
            </div>


        </div>
    );
};

export default ForumPage;
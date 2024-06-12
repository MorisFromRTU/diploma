import React, {useContext} from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
import MyButton from "./UI/button/MyButton";
import classes from "../styles/QuestionFilter.module.css";
import {useNavigate} from "react-router-dom";
import MySecondButton from "./UI/button/MySecondButton";


const QuestionFilter = ({filter, setFilter}) => {
    const router = useNavigate()
    return (
        <div>
            <MyInput
                value = {filter.query}
                onChange = {e => setFilter({...filter, query: e.target.value})}
                placeholder = 'Найти'
            />
            <div className={classes.downSide}>
                <MySelect
                    value={filter.sort}
                    onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                    defaultValue="Сортировка"
                    options={[
                        {value: "title", name: "По названию"},
                        {value: "description", name: "По описанию"},
                    ]}
                />

                
                    <MySecondButton className={classes.myBtn} onClick={() => router(`/question`)}>
                        Задать вопрос
                    </MySecondButton>
                
            
            </div>

        </div>
    );
};

export default QuestionFilter;
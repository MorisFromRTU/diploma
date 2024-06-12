import React, {useContext} from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
import classes from "../styles/QuestionFilter.module.css";
import {useNavigate} from "react-router-dom";
import MySecondButton from "./UI/button/MySecondButton";


const CommunityFilter = ({filter, setFilter}) => {
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
                        {value: "tag", name: "По тэгу"},
                    ]}
                />
            
            </div>

        </div>
    );
};

export default CommunityFilter;
import {useMemo} from "react";

export const useSortedQuestions = (questions, sort) => {
    const sortedPosts = useMemo( () => {
            if (sort){
                return [...questions].sort((a,b) => a[sort].localeCompare(b[sort]))
            }
            return questions;
        },[sort, questions]
    )
    return sortedPosts;
}

export const useQuestion = (questions, sort, query) => {
    const sortedQuestions = useSortedQuestions(questions, sort);
    const sortedAndSearchedPosts = useMemo( ()=>{
            return sortedQuestions.filter(question => question.title.toLowerCase().includes(query.toLowerCase()))
        },[query, sortedQuestions]
    )
    return sortedAndSearchedPosts;
}
import React from 'react';
import {TransitionGroup, CSSTransition} from "react-transition-group";
import QuestionItem from "./QuestionItem";

const MAX_CONTENT_LENGTH = 100;

const truncateContent = (content) => {
    if (content.length > MAX_CONTENT_LENGTH) {
      return content.substring(0, MAX_CONTENT_LENGTH) + '...';
    }
    return content;
  };

const QuestionList = ({questions, title}) => {
    return (
          <div>
      <h1 style={{ textAlign: 'center', marginBottom: 10 }}>{title}</h1>
      <TransitionGroup>
        {questions.map((question, index) => (
          <CSSTransition key={question.question_id} timeout={500} classNames="question">
            <QuestionItem
              number={index + 1}
              question={{
                ...question,
                description: truncateContent(question.description), 
              }}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
    );
};

export default QuestionList;
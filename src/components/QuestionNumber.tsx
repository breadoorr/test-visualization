import React from 'react';
import {Question} from "../services/triviaService";

const QuestionNumber = (props: {questions: Question[]}) => {
    return (
        <div className="chart-container question-container">
            <h2>Number of Questions</h2>
            <h1>{props.questions.length}</h1>
        </div>
    )
}

export default QuestionNumber;
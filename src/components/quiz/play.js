import React, { Component,Fragment } from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import questions from '../../questions.json';

import isEmpty from '../../utils/is-empty';


class Play extends React.Component{
    constructor(props){
        super(props);
        this.state={
            questions,
        currentQuestion:{},
        nextQuestion:{},
        previousQuestion:{},
        answer:'',
        numberOfQuestions:0,
        numberOfAnsweredQuestions:0,
        currentQuestionIndex:0,
        score:0,
        correctAnswers:0,
        wrongAnswers:0,
        time:{}
        };
        
    }
    
    componentDidMount(){
        const {questions,currentQuestion,nextQuestion,previousQuestion} = this.state;
        this.displayQuestions(questions,currentQuestion,nextQuestion,previousQuestion);
        const url = "http://3.6.119.41:5000/quiz/questions/";
        const response = await fetch(url);
        const data=await response.json();
        this.setState({
            question: data.results[0]
        });

    }

    displayQuestions =(questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion)=> {
        let {currentQuestionIndex} = this.state;
        if(!isEmpty(this.state.questions)){
            questions=this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion =questions[currentQuestionIndex+1];
            previousQuestion = questions[currentQuestionIndex-1];
            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                answer
            });
        }
    

    };

    handleNextButtonClick = () => {
        if(this.state.nextQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex+1
            }),() => {
                this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            });
        }
    };

    handlePrevButtonClick = () => {
        if(this.state.previousQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex-1
            }),() => {
                this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            });
        }
    };

    handleQuitbuttonClick = () => {
        if(window.confirm('Are you sure you are quitting?')){
            this.props.history.push('/');
        }
    };

    handleButtonClick =(e) => {
        switch(e.target.id){
            case 'next-button':
                this.handleNextButtonClick();
                break;
            case 'prev-button': 
            this.handlePrevButtonClick();
            break;

            case 'quit-button' : 
            this.handleQuitbuttonClick();
            break;
            default: break;
            
        }
    };

    handleOptionClick= (e) =>{
        if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
            this.correctAnswer();
        }
        else
        this.wrongAnswer();
    };

    correctAnswer=() => {
        this.setState(prevState => ({
            score :prevState.score+1,
            correctAnswers: prevState.correctAnswers+1,
            currentQuestionIndex: prevState.currentQuestionIndex+1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions+1
        }),() => {
            if(this.state.nextQuestion===undefined){
                this.gameEnd();
            }
            else
            this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
        });
    }

    wrongAnswer=() => {
        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers+1,
            currentQuestionIndex: prevState.currentQuestionIndex+1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions+1
        }),() => {
            if(this.state.nextQuestion===undefined){
                this.gameEnd();
            }
            else
            this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
        });
    }


    gameEnd = () => {
        alert('Quiz Ends Now');
        const {state} = this;
        const result ={
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers
        };
        setTimeout(() => {
            this.props.history.push('/play/quizsummary', result);
        },1000);
    }
    render() {
        const {currentQuestion} =this.state;
        return(
            <Fragment>
                <Helmet><title>Game Page</title></Helmet>
                <div className="questions">
                    <h2>Game Mode</h2>
                    <div>
                        <p>
                            <span  className="left" style={{float: 'left'}}>Question 1 of 10</span>
                            <span className="right">2:15 left<span className="mdi mdi-clock-outline mdi-24px"></span></span>
                        </p>
                    </div>
                    <img src={this.state.question.categories.image} />
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                    </div>
                    <div className="options-container">
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                    </div>
                    <div className="button-container">
                        <button id="prev-button" onClick={this.handleButtonClick}>Previous Question</button>
                        <button id="next-button"onClick={this.handleButtonClick}>Next Question</button>
                        <button id="quit-button" onClick={this.handleButtonClick}>Quit Game</button>
                    </div>
                </div>
            </Fragment>
        );
    }
};

export default Play;
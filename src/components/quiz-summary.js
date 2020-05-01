import React, { Component,Fragment } from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';

class QuizSummary extends Component{
    constructor(props){
        super(props);
        this.state ={
            score: 0,
            numberOfQuestions:0,
            numberOfAnsweredQuestions:0,
            correctAnswers:0,
            wrongAnswers:0
        }
    }
    componentDidMount(){
        const {state} =this.props.location;
        this.setState({
            score: (state.score/state.numberOfQuestions*100),
            numberOfQuestions:state.numberOfQuestions,
            numberOfAnsweredQuestions:state.numberOfAnsweredQuestions,
            correctAnswers:state.correctAnswers,
            wrongAnswers:state.wrongAnswers
        });
    }
    render() {
        const {state , score}= this.props.location;
        if(state!==undefined)
        let stats ,remark;
        if(score<=30){
            remark='You need Practice';
        }
        else if(score>30 && score <=60)
        remark='Better Luck Next time';
        else if(score>60&& score <80)
        remark='Well Played! A litle Practice needed';
        else remark='Extremely Wonderful, You are genius';
        if(state !== undefined){
            stats =(
                <Fragment>
                    <div>
                        <span className="mdi mdi-checkbox-multiple-marked-circle-outline mdi-"></span>
                    </div>
                    <h1>Your Game has Ended</h1>
                    <div className="container">
                        <h4>{remark}</h4>
                        <h2>Your Score: {this.state.score.toFixed(0)}&#37</h2>
                        <span className="left">Total Number of Questions:</span>
                        <span className="right">{this.state.numberOfQuestions}</span>
                        <span className="left">Total Number of Questions:</span>
                        <span className="right">{this.state.numberOfQuestions}</span>
                        <span className="left">Total Number of  Questions:</span>
                        <span className="right">{this.state.numberOfQuestions}</span>
                        <span className="left">Total Number of Questions:</span>
                        <span className="right">{this.state.numberOfQuestions}</span>
                        <span className="left">Total Number of Questions:</span>
                        <span className="right">{this.state.numberOfQuestions}</span>
                    </div>
                </Fragment>
            );
        }
        return(
            <Fragment>
                <Helmet><title>Results</title></Helmet>
                {stats}
            </Fragment>
        );
    }
}

export default QuizSummary;
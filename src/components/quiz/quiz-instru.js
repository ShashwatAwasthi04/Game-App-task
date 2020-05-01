import React, { Component,Fragment } from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';


const QuizInstructions =() =>(
    <Fragment>
        <Helmet>
            <title>Game Instructions</title>
        </Helmet>
        <div id="instruct">
        <div className="instructions container">
                <h1>Some Rules for the game are as follows:</h1>
                <p>Please read them below to be the winner</p>
                <ul className="browser-default" id="main-list">
                    <li>The Game has 10 Questions in the form of pictures</li>
                    <li>The duration of the game is 10 minutes</li>
                    <li>Each Picture will have 4 options below it</li>
                    <li>You need to choose the option which is most related to all the pictures</li>
                    <li>Feel Free to quit as soon as you feel<span className="mdi mdi-account-remove"></span></li>
                    <li>Your Score will be dislplayed at the end of game</li>
                    <li>Click the start button below if you are ready</li>
                </ul>
            </div>
            <div className="start">
                <span className="center"><Link to="/play/quiz">Okay,Lets start</Link></span>
            </div>
            </div>
    </Fragment>
);

export default QuizInstructions;
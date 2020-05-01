import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import QuizInstructions from './components/quiz/quiz-instru';
import Play from './components/quiz/play';
import QuizSummary from './components/quiz-summary';


function App() {
  return (
         <Router>
           <Route path="/" exact component={Home} />
           <Route path="/play/instructions"  exact component={QuizInstructions} />
           <Route path="/play/quiz"  exact component={Play} />
           <Route path="/play/quizsummary"  exact component={QuizSummary} />
           
         </Router>
  );
};

export default App;

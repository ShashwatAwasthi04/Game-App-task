import React, { Fragment } from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';


const Home =() =>
    (
        <Fragment>
            <Helmet><title>Pictuinary Quiz-Home</title></Helmet>
            <div id="home">
            <section>
                <div style={{textAlign:'center'}}>
                    <span className="mdi mdi-cube-outline cube"></span>
                </div>
                <h2>Quiz App</h2>
                <div className="play-button-container">
                    <ul>
                        <li><Link className="play-button" to="/play/instructions">Set to Go</Link></li>
                    </ul>
                </div>
                <div className="auth-container">
                    <Link to="/login" className="auth-buttons" id="log">Login Here</Link>
                    <Link to="/register" className="auth-buttons" id="sup">Register with Us</Link>
                </div>
            </section>
            </div>
        </Fragment>
        
    );


export default Home;
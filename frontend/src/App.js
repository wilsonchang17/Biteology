import React, { useImperativeHandle } from "react";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { faSquareEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./styles/MainPage.css";

function App() {
    return (
        <div className="main-page">
            <header className="header">
                <img src="/images/logo.png" alt="Biteology" className="logo" />
            </header>
            <div className="content">
                <input
                    type="text"
                    placeholder="Enter ingredients"
                    className="input-field"
                />
                <div className="dropdown-container">
                    <select className="dropdown">
                        <option value="">Choose a meal</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                    <select className="dropdown">
                        <option value="">Choose a type</option>
                        <option value="chinese">Chinese</option>
                        <option value="thai">Thai</option>
                        <option value="japanese">Japanese</option>
                        <option value="chinese">Korean</option>
                        <option value="thai">American</option>
                        <option value="japanese">Italian</option>
                    </select>
                </div>
                <button className="generate-button">Generate Recipe</button>
            </div>
            <footer className="footer">
                <p className="copyright">© Biteology 2025. All rights reserved. <FontAwesomeIcon icon={faSquareGithub} className="footer-icon" /> <FontAwesomeIcon icon={faSquareEnvelope}className="footer-icon" /></p>
            </footer>
        </div>
    );
}

export default App;
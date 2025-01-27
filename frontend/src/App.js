import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { faSquareEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./styles/MainPage.css";
import RecipePage from "./RecipePage";

function App() {
    const [ingredients, setIngredients] = useState("");
    const [meal, setMeal] = useState("");
    const [type, setType] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation(); // Get current route
    const navigate = useNavigate();

    const resetFields = () => {
        setIngredients("");
        setMeal("");
        setType("");
    };

    const handleGenerateRecipe = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:5001/generate_recipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ingredients,
                    meal,
                    type,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                navigate("/recipe", { state: { recipe: data.recipe, enteredIngredients: ingredients } });
            } else {
                console.error("Failed to generate recipe");
                alert("Failed to generate recipe. Check backend for errors.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while generating the recipe.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="main-page">
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="content">
                        {isLoading ? (
                            <div className="spinner-box">
                                <div className="pulse-container">
                                    <div className="pulse-bubble pulse-bubble-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#da8359" d="M61.1 224C45 224 32 211 32 194.9c0-1.9 .2-3.7 .6-5.6C37.9 168.3 78.8 32 256 32s218.1 136.3 223.4 157.3c.5 1.9 .6 3.7 .6 5.6c0 16.1-13 29.1-29.1 29.1L61.1 224zM144 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm240 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32zM272 96a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zM16 304c0-26.5 21.5-48 48-48l384 0c26.5 0 48 21.5 48 48s-21.5 48-48 48L64 352c-26.5 0-48-21.5-48-48zm16 96c0-8.8 7.2-16 16-16l416 0c8.8 0 16 7.2 16 16l0 16c0 35.3-28.7 64-64 64L96 480c-35.3 0-64-28.7-64-64l0-16z"/></svg>
                                    </div>
                                    <div className="pulse-bubble pulse-bubble-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#da8359" d="M61.1 224C45 224 32 211 32 194.9c0-1.9 .2-3.7 .6-5.6C37.9 168.3 78.8 32 256 32s218.1 136.3 223.4 157.3c.5 1.9 .6 3.7 .6 5.6c0 16.1-13 29.1-29.1 29.1L61.1 224zM144 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm240 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32zM272 96a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zM16 304c0-26.5 21.5-48 48-48l384 0c26.5 0 48 21.5 48 48s-21.5 48-48 48L64 352c-26.5 0-48-21.5-48-48zm16 96c0-8.8 7.2-16 16-16l416 0c8.8 0 16 7.2 16 16l0 16c0 35.3-28.7 64-64 64L96 480c-35.3 0-64-28.7-64-64l0-16z"/></svg>
                                    </div>
                                    <div className="pulse-bubble pulse-bubble-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#da8359" d="M61.1 224C45 224 32 211 32 194.9c0-1.9 .2-3.7 .6-5.6C37.9 168.3 78.8 32 256 32s218.1 136.3 223.4 157.3c.5 1.9 .6 3.7 .6 5.6c0 16.1-13 29.1-29.1 29.1L61.1 224zM144 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm240 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32zM272 96a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zM16 304c0-26.5 21.5-48 48-48l384 0c26.5 0 48 21.5 48 48s-21.5 48-48 48L64 352c-26.5 0-48-21.5-48-48zm16 96c0-8.8 7.2-16 16-16l416 0c8.8 0 16 7.2 16 16l0 16c0 35.3-28.7 64-64 64L96 480c-35.3 0-64-28.7-64-64l0-16z"/></svg>
                                    </div>
                                </div>
                            </div>
                        ) : (
                                <>
                                    <header className="header">
                                        <img
                                            src="/images/logo.png"
                                            alt="Biteology"
                                            className="logo"
                                            onClick={() => {
                                                resetFields();
                                                navigate("/");
                                            }}
                                            style={{ cursor: "pointer" }}
                                        />
                                    </header>
                                    <input
                                        type="text"
                                        placeholder="Enter ingredients"
                                        value={ingredients}
                                        onChange={(e) => setIngredients(e.target.value)}
                                    />
                                    <div className="dropdown-container-main">
                                        <select
                                            className="main-select"
                                            value={meal}
                                            onChange={(e) => setMeal(e.target.value)}
                                        >
                                            <option value="">Choose a meal</option>
                                            <option value="breakfast">Breakfast</option>
                                            <option value="lunch">Lunch</option>
                                            <option value="dinner">Dinner</option>
                                        </select>
                                        <select
                                            className="main-select"
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                        >
                                            <option value="">Choose a type</option>
                                            <option value="chinese">Chinese</option>
                                            <option value="thai">Thai</option>
                                            <option value="japanese">Japanese</option>
                                            <option value="korean">Korean</option>
                                            <option value="american">American</option>
                                            <option value="italian">Italian</option>
                                        </select>
                                    </div>
                                    <button
                                        className="generate-button"
                                        onClick={handleGenerateRecipe}
                                    >
                                        Generate Recipe
                                    </button>
                                </>
                            )}
                        </div>
                    }
                />
                <Route
                    path="/recipe"
                    element={
                        <RecipePage
                            resetFields={resetFields}
                        />
                    }
                />
            </Routes>
            <footer className={`footer ${location.pathname === "/" ? "footer-fixed" : "footer-static"}`}>
                <p className="copyright">
                    © Biteology 2025. All rights reserved.
                    <FontAwesomeIcon icon={faSquareGithub} className="footer-icon" />
                    <FontAwesomeIcon icon={faSquareEnvelope} className="footer-icon" />
                </p>
            </footer>
        </div>
    );
}

export default App;
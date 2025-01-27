import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { faSquareEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./styles/MainPage.css";
import RecipePage from "./RecipePage"; // 引入 RecipePage 页面组件

function App() {
    const [ingredients, setIngredients] = useState("");
    const [meal, setMeal] = useState("");
    const [type, setType] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleGenerateRecipe = async () => {
        setIsLoading(true); // 开始加载
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
                navigate("/recipe", { state: { recipe: data.recipe } });
            } else {
                console.error("Failed to generate recipe");
                alert("Failed to generate recipe. Check backend for errors.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while generating the recipe.");
        } finally {
            setIsLoading(false); // 停止加载
        }
    };

    return (
        <div className="main-page">
            <header className="header">
                <img src="/images/logo.png" alt="Biteology" className="logo" />
            </header>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="content">
                            {isLoading ? (
                                <div className="spinner">
                                    {/* 这里是加载动画 */}
                                    <div className="loading-circle"></div>
                                </div>
                            ) : (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Enter ingredients (comma-separated)"
                                        className="input-field"
                                        value={ingredients}
                                        onChange={(e) => setIngredients(e.target.value)}
                                    />
                                    <div className="dropdown-container">
                                        <select
                                            className="dropdown"
                                            value={meal}
                                            onChange={(e) => setMeal(e.target.value)}
                                        >
                                            <option value="">Choose a meal</option>
                                            <option value="breakfast">Breakfast</option>
                                            <option value="lunch">Lunch</option>
                                            <option value="dinner">Dinner</option>
                                        </select>
                                        <select
                                            className="dropdown"
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
                <Route path="/recipe" element={<RecipePage />} />
            </Routes>
            <footer className="footer">
                <p className="copyright">
                    © Biteology 2025. All rights reserved.
                </p>
            </footer>
        </div>
    );
}

export default App;
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { faSquareEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./styles/MainPage.css";

function App() {
    const [ingredients, setIngredients] = useState("");
    const [meal, setMeal] = useState("");
    const [type, setType] = useState("");

    const handleGenerateRecipe = async () => {
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
                console.log("Generated Recipe:", data.recipe); // 临时输出到控制台
                alert("Recipe generated! Check console for details.");
            } else {
                console.error("Failed to generate recipe");
                alert("Failed to generate recipe. Check backend for errors.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while generating the recipe.");
        }
    };

    return (
        <div className="main-page">
            <header className="header">
                <img src="/images/logo.png" alt="Biteology" className="logo" />
            </header>
            <div className="content">
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
                <button className="generate-button" onClick={handleGenerateRecipe}>
                    Generate Recipe
                </button>
            </div>
            <footer className="footer">
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
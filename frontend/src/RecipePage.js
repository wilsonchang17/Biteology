import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/MainPage.css";
import "./styles/RecipePage.css";

function RecipePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const recipe = location.state?.recipe;
    const enteredIngredients = location.state?.enteredIngredients;

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
                navigate("/recipe", { state: { recipe: data.recipe, enteredIngredients: ingredients } });
            } else {
                console.error("Failed to generate recipe");
                alert("Failed to generate recipe. Check backend for errors.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while generating the recipe.");
        }
    };

    if (!recipe) {
        return (
            <div className="recipe-page">
                <h1>No Recipe Found</h1>
                <button onClick={() => navigate("/")}>Go Back</button>
            </div>
        );
    }

    return (
        <div className="">
            <header className="header">
                <img
                    src="/images/logo.png"
                    alt="Biteology"
                    className="logo"
                    onClick={() => navigate("/")}
                    style={{ cursor: "pointer" }}
                />
                <div className="header-content">
                    <input
                        type="text"
                        placeholder="Enter ingredients"
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
                </div>
            </header>

            <h1>{recipe["Recipe Name"]}</h1>
            <div className="recipe-page">
                <div className="left-section">
                    <h2>Entered Ingredients</h2>
                    <p>{enteredIngredients}</p>

                    <div className="suggest-ingredients">
                        <h2>Suggest Ingredients</h2>
                        <ul>
                            {recipe["Ingredients"].map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="right-section">
                    <h2>Instructions</h2>
                    <ol>
                        {recipe["Instructions"].map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default RecipePage;

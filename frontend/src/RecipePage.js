import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/MainPage.css";

function RecipePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const recipe = location.state?.recipe;

    if (!recipe) {
        return (
            <div className="recipe-page">
                <h1>No Recipe Found</h1>
                <button onClick={() => navigate("/")}>Go Back</button>
            </div>
        );
    }

    return (
        <div className="recipe-page">
            {/* 食谱标题 */}
            <h1>{recipe["Recipe Name"]}</h1>

            {/* 食材列表 */}
            <h2>Ingredients</h2>
            <ul>
                {recipe["Ingredients"].map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>

            {/* 制作步骤 */}
            <h2>Instructions</h2>
            <ol>
                {recipe["Instructions"].map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>

            <button onClick={() => navigate("/")}>Generate Another Recipe</button>
        </div>
    );
}

export default RecipePage;
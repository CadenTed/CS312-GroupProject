import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

const RecipeGrid = ({searchText}) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        console.log(data);
      })
      .catch((err) => console.error("Error Fetching Recipes: ", err));
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={styles.gridContainer}>
      <div style={styles.grid}>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.recipeId} recipe={recipe} />
          ))
        ) : (
          <p>No Recipes Available</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  gridContainer: {
    diplay: "flex",
    justifyContent: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "20px",
    padding: "20px",
    justifyContent: "center",
    width: "100%",
    maxWidth: "1200px", // Adjust as needed
    margin: "0 auto",
  },
};

export default RecipeGrid;

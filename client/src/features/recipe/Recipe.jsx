import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes, handleLike } from "./recipeSlice";
import Loader from "../../components/common/loader/Loader";
import Card from "./Card";
import "./recipe.css";

const Recipe = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes(state.foodCategory.categorySelection._id));
  }, [dispatch]);

  const handleIncrementLike = (recipe) => {
    dispatch(handleLike(recipe._id));
  };

  return (
    <div className="container mt-4">
      <h1 className="recipe-title mb-1">
        {state.foodCategory.categorySelection.name}
      </h1>
      <h4 className="recipe-subtitle">
        {state.foodCategory.categorySelection.description}
      </h4>
      {state.recipe.recipes.length === 0 ? (
        <h1>No recipe</h1>
      ) : state.recipe.status === "Succeed" ? (
        <div className="container p-5">
          <div className="row">
            {state.recipe.recipes.map((recipe) => (
              <Card
                key={recipe._id}
                recipe={recipe}
                handleIncrementLike={handleIncrementLike}
                // handleSelection={handleSelection}
              />
            ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Recipe;

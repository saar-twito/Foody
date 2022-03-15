import React from "react";
import { Link } from "react-router-dom";
import CardLayout from "../../components/common/card/CardLayout";
import { AiOutlineHeart } from "react-icons/ai";

const Card = ({ recipe, handleIncrementLike, handleRecipeSelection }) => (
  <CardLayout>
    <img src={recipe.filePath} className="card-img-top" alt="food category" />
    <div className="card-body">
      <h4 className="card-title mb-3">{recipe.name}</h4>
      <img
        className="chef-image"
        src={recipe.chef.filePath}
        alt="Chef's image"
      />
      <p style={{ display: "inline-block" }}>
        {recipe.chef.fullName}, {recipe.chef.status}
      </p>
      <div className="card-text mb-3">
        <p>Time: {recipe.PreparationTime}</p>
        <p>For: {recipe.forHowMany} diners</p>
      </div>

      <Link to={`/foodCategories/${recipe._id}`}>
        <button onClick={() => handleRecipeSelection()} className="btn">
          Do it yourself
        </button>
      </Link>
      <p onClick={() => handleIncrementLike(recipe)} className="likes">
        {<AiOutlineHeart />} <span>{recipe.likes} likes</span>
      </p>
    </div>
  </CardLayout>
);

export default Card;

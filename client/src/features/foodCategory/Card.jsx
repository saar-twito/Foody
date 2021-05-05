import React from "react";
import { Link } from "react-router-dom";
import CardLayout from "../../components/common/card/CardLayout";

const Card = ({ category, handleSelection }) => (
  <CardLayout>
    <img src={category.filePath} className="card-img-top" alt="food category" />
    <div className="card-body">
      <h4 className="card-title">{category.name}</h4>
      <p className="card-text">{category.description}</p>
      <Link to={`/foodCategories/${category._id}`}>
        <button
          type="button"
          onClick={() => handleSelection(category)}
          className="btn"
          
        >
          Bon appetit
        </button>
      </Link>
    </div>
  </CardLayout>
);

export default Card;

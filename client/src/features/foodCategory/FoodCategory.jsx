import Card from "./Card";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFoodCategories, select } from "./foodCategorySlice";
import Loader from "../../components/common/loader/Loader";
import "./foodCategory.css";

const FoodCategory = () => {
  const state = useSelector((state) => state.foodCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoodCategories());
  }, [dispatch]);

  const handleSelection = (category) => {
    dispatch(select(category));
  };

  return (
    <React.Fragment>
      {state.status === "Succeed" ? (
        <div className="container p-5">
          <div className="row">
            <h1 className="food-categories-header">FOOD CATEGORIES</h1>
            {state.foodCategories.map((category) => (
              <Card
                key={category._id}
                category={category}
                handleSelection={handleSelection}
              />
            ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default FoodCategory;

// Import
import { Route, Redirect, Switch } from "react-router-dom";

import React from 'react';
import Home from './components/home/Home'
import NavBar from "./components/navBar/Nav";
import FoodCategory from './features/foodCategory/FoodCategory'
import Recipe from './features/recipe/Recipe';

// * Style
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

function App() {

  // On refresh.
  if (performance.navigation.type === 1)
    window.location = '/foodCategories'


  return (
    <div className="App">
      <ToastContainer />
      <NavBar />
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/foodCategories" exact component={FoodCategory} />
        <Route path="/foodCategories/:categoryId" exact component={Recipe} />
        <Redirect from="/" to="/home" />
      </Switch>
    </div>
  );
}

export default App;

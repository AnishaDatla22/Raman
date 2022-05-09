import React from 'react';
import logo from './logo.svg';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useState } from "react";
import './App.css';
import Dashboard from './components/pages/Dashboard';
import Login from './components/Utilities/Login1';
import Categories from './components/pages/Categories';
import refCategories from './components/pages/refCategories';
import categoriesOverlay from './components/pages/CategoriesOverlay';
import ModelBuild from './components/pages/ModelBuilding';
import PredictionTab from './components/pages/PredictionTab';
import PlotsTab from './components/pages/plots/PlotsTab';
import Info from './components/pages/Info';



function App() {
const [dice, setDice] = useState(1);
const handleClick = async () => {
  const result = await window.api.rollDice();
  setDice(result);
};
  return (
       <Router>

<div className="App">




{/*<MessageBox title="cool" body='sample text in the body' buttonName='submit' />
<Success title='success' body='cool'></Success>*/}

<Switch>
 
  <Route exact path ='/' component={Login} />
  <Route exact path ='/dashboard' component={Dashboard} />
  <Route exact path ='/categories' component={Categories} />
  <Route exact path ='/refcategories' component={refCategories} />
  <Route exact path ='/categoriesOverlay' component={categoriesOverlay} />
  <Route exact path ='/modelBuild' component={ModelBuild} />

  <Route exact path ='/predictionTab' component={PredictionTab} />
  <Route exact path ='/plots' component={PlotsTab} />

  <Route exact path ='/info' component={Info} />


    







</Switch>





</div>
</Router>

     
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login.component";
import Home from "./components/home.component";
import SignUp from "./components/signup.component";
import AddCostItem from "./components/addcostitem.component";
import ShowItems from "./components/showitems.component";
import Chart from "./components/chart.component";

function App() {
  return (
    <Router>      
          <Route path="/home" exact component={Home}/>
          <Route path="/" exact component={Login}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/addcostitem" component={AddCostItem}/>
          <Route path="/showitems" component={ShowItems}/>
          <Route path="/chart" component={Chart}/>
    </Router>
  );
}

export default App;

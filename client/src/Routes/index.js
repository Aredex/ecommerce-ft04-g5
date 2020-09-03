import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import CrudComponent from "../pages/Crud";

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/product/:id" component={Product}></Route>
      <Route exact path="/CRUD/" component={CrudComponent}></Route>
    </div>
  );
};

export default Routes;

import React from "react";
import { Route } from "react-router-dom";
import Home from "pages/Home";
import Product from "pages/Product";
import SignIn from "pages/SignIn";
import Admin from "pages/Admin";

const Routes = () => {
  return (
    <>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/product/:id" component={Product}></Route>
      <Route exact path="/sign-in" component={SignIn}></Route>
      <Route path="/admin" component={Admin}></Route>
    </>
  );
};

export default Routes;

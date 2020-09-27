import React from "react";
import { Route, Switch } from "react-router-dom";
import CrudComponent from "pages/Crud";
import Product from "pages/Product";
import Reset from "pages/Reset";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import Admin from "pages/Admin";
import Home from "pages/Home";
import Products from "pages/Products";
import Checkout from "pages/Checkout";
import Success from "pages/Checkout/Success";
import Cancel from "pages/Checkout/Cancel";
import Profile from "pages/Profile";
import PageNotFound from "pages/PageNotFound";


const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/products" component={Products} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/checkout/success" component={Success} />
        <Route exact path="/checkout/cancel" component={Cancel} />
        <Route exact path="/products/:id" component={Product}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route exact path="/sign-in" component={SignIn}></Route>
        <Route exact path="/reset" component={Reset}></Route>
        <Route exact path="/sign-up" component={SignUp}></Route>
        <Route path="/admin" component={Admin}></Route>
        <Route exact path="/CRUD/" component={CrudComponent}></Route>
        <Route path="*" component={PageNotFound}></Route>
      </Switch>
    </>
  );
};

export default Routes;

import React from "react";
import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import Product from '../pages/Product';


const Routes = () => {
  return <div>
    <Route exact path='/' component={Home} ></Route>
    <Route exact path='/product/:id' component={Product} ></Route>
  </div>;
};

export default Routes;

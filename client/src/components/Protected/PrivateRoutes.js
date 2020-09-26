import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoutes = ({
  isAuthenticated,
  component: Component,
  redirectTo,
  ...rest
}) => {
  localStorage.setItem("lastPath", rest.location.pathname);

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect to={redirectTo} />
          )
      }
    />
  );
};

PrivateRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default PrivateRoutes;
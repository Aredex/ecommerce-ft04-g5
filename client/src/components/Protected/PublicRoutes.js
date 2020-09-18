import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

const PublicRoues = ({
  isAuthenticated,
  component: Component,
  redirectTo,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect to={redirectTo} />
          )
      }
    />
  );
};

PublicRoues.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default PublicRoues;
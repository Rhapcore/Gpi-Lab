import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const GuardedLogin = ({ children }) => {
    const handleRedirect = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.Rut) {
          return (<Fragment>{children}</Fragment>);
        }
        return (<Navigate replace to="/"/>);
    };
    return handleRedirect();
};
GuardedLogin.propTypes = {
  children: PropTypes.any.isRequired
};

export default GuardedLogin;

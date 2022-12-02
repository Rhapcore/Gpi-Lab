import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const GuardedOperador = ({ children }) => {
    const handleRedirect = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const permited = ['Operador'];
        if (user?.Rut && permited.includes(user?.Cargo)) {
          return (<Fragment>{children}</Fragment>);
        } else if (user?.Rut && user.Cargo === 'Operador') {
          return (<Navigate replace to="/ODashboard2da"/>);
        }
        return (<Navigate replace to="/"/>);
    };
    return handleRedirect();
};

GuardedOperador.propTypes = {
  children: PropTypes.any.isRequired
};

export default GuardedOperador;

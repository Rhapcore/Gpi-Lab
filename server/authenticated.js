'use strict';
const jwt = require('jwt-simple');
const moment = require('moment');
const { SECRET } = require('./consts');

exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'La peticion no tiene la cabecera de autenticacion' });
  }
  const token = req.headers.authorization.replace(/['"]+/g, '');
  const payload = jwt.decode(token, SECRET);

  try {
    if (payload.exp <= moment.unix()) {
      return res.status(401).send({ message: 'Token ha expirado' });
    }
  } catch (ex) {
    return res.status(404).send({ message: 'Token no valido' });
  }

  req.user = payload;
  return next();
};

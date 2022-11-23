'use strict'
var jwt = require('jwt-simple');
var secret = 'dMCcRzDpj1'

exports.createToken = function (user) {
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surename,
        email: user.email,
        role: user.role,
    };

    return jwt.encode(payload, secret);
};
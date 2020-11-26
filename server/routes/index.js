'use strict';

const routes = require('express').Router({ mergeParams: true });

module.exports = () => {
    routes.use('/user',require('./user')());
    return routes; 
};


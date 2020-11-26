'use strict'

const routes = require('express').Router({ mergeParams: true });

/**
 Routes defined for firestore
*/
module.exports = () => { 
    routes.get('/:singer/:song', require('./get-lyrics')()); 
    return routes;
};

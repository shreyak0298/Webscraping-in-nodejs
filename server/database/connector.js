'use strict';

const admin = require('firebase-admin');
const apiConfig = require("../config/index");

admin.initializeApp({
    credential: admin.credential.cert(require(apiConfig.serviceKey))
});

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

module.exports = { db };

'use strict'

const { db } = require('./connector');
const Logger = require("../logger");
const logger = new Logger.Log();
logger.setOption("file", __filename.slice(__filename.indexOf("/server/") + 7));

const insertInnerData = async(collectionName, userName, subCollectionName, innerDocName, innerDocData) => {

    try{
        const docRef = db.collection(collectionName).doc(userName);
        const innerDocRef = docRef.collection(subCollectionName).doc(innerDocName);
        const setData = await innerDocRef.set(innerDocData, {merge: true});
        return setData;

    }catch(err){
        logger.error(err);
    }
};

const updateInnerData = async(collectionName, docName, subCollectionName, innerDocName, innerDocData) => {

    try{
        const docRef = db.collection(collectionName).doc(docName);
        const innerDocRef = docRef.collection(subCollectionName).doc(innerDocName);
        const updateData = await innerDocRef.update(innerDocData);
        return updateData;
    }catch(err) {
        logger.error(err);
    }
};

const getInnerDocument = async (collectionName, docName, subCollectionName, innerDocName) => {
    try {
        const docRef = db.collection(collectionName).doc(docName);
        const innerDocRef = docRef.collection(subCollectionName).doc(innerDocName);
        const getDoc = await innerDocRef.get();
        return getDoc;
    } catch (err) {
      logger.error(err);
    }
};

module.exports = { insertInnerData, updateInnerData, getInnerDocument };
"use strict";

const Logger = require("../../../logger");
const logger = new Logger.Log();
logger.setOption("file", __filename.slice(__filename.indexOf("/server/") + 7));
const axios = require('axios');
const parseHTML = require('../../../helper/html-parser');
const firestoreQuery = require('../../../database/firestore-queries');
const constants = require('../../../config/constants');

const getLyrics = async (params) => {

    try{
        const singer = params.singer;
        const song = params.song;
        const url = `https://www.azlyrics.com/lyrics/${singer}/${song}.html`;
        const res = await axios.get(url);
        const lyricsArray = parseHTML.parseHtml(res.data);

        const innerDocData = {
            Artist: singer,
            Lyrics: lyricsArray,
            TrackName: song
        };

        const collectionName = constants.COLLECTION_NAME;
        const subCollectionName = constants.SUB_COLLECTION_NAME;
        const documentName = 'SK';

        const innerDocument = await firestoreQuery.getInnerDocument(collectionName, documentName, subCollectionName, song);
        if(innerDocument.exists) {
            const response = await firestoreQuery.updateInnerData(collectionName, documentName, subCollectionName, song, innerDocData);
        }
        const response = await firestoreQuery.insertInnerData(collectionName, documentName, subCollectionName, song, innerDocData);

        return response;
    }
    catch(error){
        console.log(error);
    }
};

module.exports = { getLyrics };


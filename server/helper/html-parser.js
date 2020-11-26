'use strict'

const cheerio = require('cheerio');

const parseHtml = (htmlData) => {

    let filteredArray = [];

    const $ = cheerio.load(htmlData);
    const data = $('div.col-xs-12.col-lg-8.text-center div').text().split('\n');
    const startIndex = 34;
    const endIndex = data.indexOf(' Submit Corrections') - startIndex - 3;
    const lyrics = data.splice(startIndex, endIndex);

    lyrics.forEach(line => {
        
        if(line !== '') {
            filteredArray.push(line);
        }
    });

    return filteredArray;
};

module.exports = { parseHtml };
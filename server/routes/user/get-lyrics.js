'use strict';

const ValidationError = require('../../helper/validation-error');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(require('./schemas/getlyrics-mapping-request.json'));
const lyrics = require("./logic/get-lyrics");
const Logger = require("../../logger");
const logger = new Logger.Log();
logger.setOption("file", __filename.slice(__filename.indexOf("/server/") + 7));

module.exports = () => {

    return async (req, res) => {
        try {
            let result;
            logger.info("get lyrics");
            const params = Object.assign(req.params);
            if (!validate(params)) {
                logger.error(validate.errors);
                result = new ValidationError(validate.errors);
                return res.status(400).send({ "data": result });
            }  
            result = await lyrics.getLyrics(params);
            return res.status(200).send({ "data": result, "msg": "lyrics added to firestore database" });
        } catch (error) {
            logger.error(error);
            if (error.statusCode === 404) {
                return res.status(404).send(error);
            }
        }
    };
};

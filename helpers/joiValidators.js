"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
var JoiValidators = (function () {
    function JoiValidators() {
    }
    JoiValidators.schema = {
        idSchema: Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        userSchema: Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required()
        }),
        userOptionalSchema: Joi.object().keys({
            firstName: Joi.string(),
            lastName: Joi.string(),
            email: Joi.string().email()
        }),
        carSchema: Joi.object().keys({
            make: Joi.string().required(),
            model: Joi.string().required(),
            year: Joi.number().required()
        }),
        newCarSchema: Joi.object().keys({
            seller: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            make: Joi.string().required(),
            model: Joi.string().required(),
            year: Joi.number().required()
        }),
    };
    JoiValidators.validateId = function (schema, name) {
        return function (req, res, next) {
            var result = Joi.validate({ param: req['params'][name] }, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            }
            else {
                if (!req.value) {
                    req.value = {};
                }
                if (!req.value['params']) {
                    req.value['params'] = {};
                }
                req.value['params'] = result.value.param;
                next();
            }
        };
    };
    JoiValidators.validateBody = function (schema) {
        return function (req, res, next) {
            var result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            }
            else {
                if (!req.value) {
                    req.value = {};
                }
                if (!req.value['body']) {
                    req.value['body'] = {};
                }
                req.value['body'] = result.value;
                next();
            }
        };
    };
    return JoiValidators;
}());
exports.JoiValidators = JoiValidators;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express-promise-router')();
var cars_1 = require("../controllers/cars");
var joiValidators_1 = require("../helpers/joiValidators");
function CarRoutes() {
    router.route('/')
        .get(cars_1.Cars.Index)
        .post(joiValidators_1.JoiValidators.validateBody(joiValidators_1.JoiValidators.schema.newCarSchema), cars_1.Cars.NewCar);
    return router;
}
module.exports = CarRoutes;

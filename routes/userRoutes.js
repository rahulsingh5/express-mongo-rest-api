"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express-promise-router')();
var users_1 = require("../controllers/users");
var joiValidators_1 = require("../helpers/joiValidators");
function UserRoutes() {
    router.route('/')
        .get(users_1.Users.Index)
        .post(joiValidators_1.JoiValidators.validateBody(joiValidators_1.JoiValidators.schema.userSchema), users_1.Users.NewUser);
    router.route('/:userId')
        .get(joiValidators_1.JoiValidators.validateId(joiValidators_1.JoiValidators.schema.idSchema, 'userId'), users_1.Users.GetUser)
        .put([
        joiValidators_1.JoiValidators.validateId(joiValidators_1.JoiValidators.schema.idSchema, 'userId'),
        joiValidators_1.JoiValidators.validateBody(joiValidators_1.JoiValidators.schema.userSchema)
    ], users_1.Users.ReplaceUser)
        .patch([
        joiValidators_1.JoiValidators.validateId(joiValidators_1.JoiValidators.schema.idSchema, 'userId'),
        joiValidators_1.JoiValidators.validateBody(joiValidators_1.JoiValidators.schema.userOptionalSchema)
    ], users_1.Users.UpdateUser);
    router.route('/:userId/cars')
        .get(joiValidators_1.JoiValidators.validateId(joiValidators_1.JoiValidators.schema.idSchema, 'userId'), users_1.Users.GetUserCars)
        .post([
        joiValidators_1.JoiValidators.validateId(joiValidators_1.JoiValidators.schema.idSchema, 'userId'),
        joiValidators_1.JoiValidators.validateBody(joiValidators_1.JoiValidators.schema.carSchema)
    ], users_1.Users.NewUserCar);
    return router;
}
module.exports = UserRoutes;

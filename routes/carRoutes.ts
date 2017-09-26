const router = require('express-promise-router')();

import { Cars } from '../controllers/cars';
import { JoiValidators } from '../helpers/joiValidators';

function CarRoutes() {

    router.route('/')
        .get(Cars.Index)
        .post(JoiValidators.validateBody(JoiValidators.schema.newCarSchema), Cars.NewCar);


    return router;
}


module.exports = CarRoutes;
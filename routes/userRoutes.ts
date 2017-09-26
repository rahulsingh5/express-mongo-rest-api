const router = require('express-promise-router')();

import { Users } from '../controllers/users';
import { JoiValidators } from '../helpers/joiValidators';

function UserRoutes() {

    router.route('/')
        .get(Users.Index)
        .post(JoiValidators.validateBody(JoiValidators.schema.userSchema), Users.NewUser);

    router.route('/:userId')
        .get(JoiValidators.validateId(JoiValidators.schema.idSchema, 'userId'), Users.GetUser)
        .put([
                JoiValidators.validateId(JoiValidators.schema.idSchema, 'userId'),
                JoiValidators.validateBody(JoiValidators.schema.userSchema)
            ],
            Users.ReplaceUser)
        .patch([
                JoiValidators.validateId(JoiValidators.schema.idSchema, 'userId'),
                JoiValidators.validateBody(JoiValidators.schema.userOptionalSchema)
            ],
            Users.UpdateUser);

    router.route('/:userId/cars')
        .get(JoiValidators.validateId(JoiValidators.schema.idSchema, 'userId'), Users.GetUserCars)
        .post([
            JoiValidators.validateId(JoiValidators.schema.idSchema, 'userId'),
            JoiValidators.validateBody(JoiValidators.schema.carSchema)
        ], Users.NewUserCar);

    return router;
}


module.exports = UserRoutes;
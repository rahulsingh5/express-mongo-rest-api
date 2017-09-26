import * as Joi from 'joi';

export class JoiValidators {

    public static schema = {
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

    public static validateId = (schema: any, name: string) => {
        return (req: any, res: any, next: any) => {
            const result: any = Joi.validate({ param: req[ 'params' ][ name ] }, schema);
            if ( result.error ) {
                return res.status(400).json(result.error);
            } else {

                if ( !req.value ) {
                    req.value = {};
                }

                if ( !req.value[ 'params' ] ) {
                    req.value[ 'params' ] = {};
                }

                req.value[ 'params' ] = result.value.param;

                next();
            }
        };
    };

    public static validateBody = (schema: any) => {
        return (req: any, res: any, next: any) => {
            const result: any = Joi.validate(req.body, schema);
            if ( result.error ) {
                return res.status(400).json(result.error);
            } else {

                if ( !req.value ) {
                    req.value = {};
                }

                if ( !req.value[ 'body' ] ) {
                    req.value[ 'body' ] = {};
                }

                req.value[ 'body' ] = result.value;

                next();
            }
        };
    };
}
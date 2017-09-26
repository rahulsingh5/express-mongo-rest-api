import { User } from '../models/user';
import { Car } from '../models/car';

export class Users {
    public static Index = async function (req: any, res: any, next: any) {

        const users = await User.find({});

        res.status(200).json(users);

    };


    public static NewUser = async function (req: any, res: any, next: any) {
        const newUser = new User(req.value.body);
        const user = await newUser.save();

        res.status(201).json(user);

    };

    public static GetUser = async function (req: any, res: any, next: any) {

        const userId = req.value.params;

        const user = await User.findById(userId);

        res.status(200).json(user);

    };

    public static ReplaceUser = async function (req: any, res: any, next: any) {
        /**
         * here we need to enforce to have all fields in req.body
         */
        const userId = req.value.params;
        const newUser = req.value.body;

        const user = await User.findByIdAndUpdate(userId, newUser);

        res.status(200).json({ success: true });

    };

    public static UpdateUser = async function (req: any, res: any, next: any) {

        /**
         * here we can have any field
         */

        const userId = req.value.params;
        const newUser = req.value.body;

        const user = await User.findByIdAndUpdate(userId, newUser);

        res.status(200).json({ success: true });

    };

    public static GetUserCars = async function (req: any, res: any, next: any) {

        const userId = req.value.params;
        const user: any = await User.findById(userId).populate('cars');
        res.status(200).json(user.cars);

    };

    public static NewUserCar = async function (req: any, res: any, next: any) {
        const userId = req.value.params;

        const newCar: any = new Car(req.value.body);

        const user: any = await User.findById(userId);

        newCar.seller = user;

        await newCar.save();

        user.cars.push(newCar);

        await user.save();

        res.status(201).json(newCar);

    };
}
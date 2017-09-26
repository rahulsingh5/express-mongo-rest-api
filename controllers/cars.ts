import { User } from '../models/user';
import { Car } from '../models/car';

export class Cars {
    public static Index = async function (req: any, res: any, next: any) {

        const cars = await Car.find({});

        res.status(200).json(cars);

    };


    public static NewCar = async function (req: any, res: any, next: any) {
        const user: any = await User.findById(req.value.body.seller);

        const newCar = req.value.body;
        delete newCar.seller;

        const car: any = new Car(newCar);
        car.seller = user;
        await car.save();

        user.cars.push(car);
        await user.save();

        res.status(201).json(car);

    };
}
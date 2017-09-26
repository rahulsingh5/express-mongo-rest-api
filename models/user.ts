import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    cars: [ {
        type: Schema.Types.ObjectId,
        ref: 'car'
    } ]
});

export const User = mongoose.model('user', userSchema);
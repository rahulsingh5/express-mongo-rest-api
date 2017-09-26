import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

const carSchema = new Schema({
    make: String,
    model: String,
    year: Number,
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

export const Car = mongoose.model('car', carSchema);
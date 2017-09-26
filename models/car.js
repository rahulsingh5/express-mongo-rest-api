"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var carSchema = new mongoose_1.Schema({
    make: String,
    model: String,
    year: Number,
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    }
});
exports.Car = mongoose.model('car', carSchema);

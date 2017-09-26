"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    email: String,
    cars: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'car'
        }]
});
exports.User = mongoose.model('user', userSchema);

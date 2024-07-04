"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, ' ID is required'],
    },
    name: {
        type: String,
        trim: true,
        required: [true, ' ID is required'],
    },
    colour: {
        type: String,
        trim: true,
        required: [true, ' colour is required'],
    },
    addedDate: {
        type: Date,
        required: [true, ' Added Date is required'],
    },
    expiry: {
        type: Date,
        required: [true, ' Expire Date is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    }
}, {
    timestamps: true,
});
productSchema.index({ name: "text" });
exports.default = (0, mongoose_1.model)('Products', productSchema);

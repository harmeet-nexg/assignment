"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = exports.getAll = exports.createUsers = exports.test = void 0;
const async_1 = __importDefault(require("../middleware/async"));
const uuid_1 = require("uuid");
const dynamo_1 = __importDefault(require("../connections/dynamo"));
const Product_1 = __importDefault(require("../models/Product"));
exports.test = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, expiry, addedDate, colour } = req.body;
    yield Product_1.default.create({
        id: (0, uuid_1.v4)(),
        name,
        price,
        expiry,
        addedDate,
        colour
    });
    res.status(200).json({
        success: true,
    });
}));
exports.createUsers = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, expiry, addedDate, colour } = req.body;
    //Validate
    if (!name || typeof name !== 'string') {
        return res.status(400).send('Invalid or missing "name" field');
    }
    if (price === undefined || typeof price !== 'number') {
        return res.status(400).send('Invalid or missing "price" field');
    }
    if (!expiry) {
        return res.status(400).send('Invalid or missing "expiry" field');
    }
    if (!addedDate) {
        return res.status(400).send('Invalid or missing "addedDate" field');
    }
    if (!colour || typeof colour !== 'string') {
        return res.status(400).send('Invalid or missing "colour" field');
    }
    const params = {
        TableName: 'Products',
        Item: {
            id: (0, uuid_1.v4)(),
            name,
            price,
            expiry,
            addedDate,
            colour
        }
    };
    const data = yield dynamo_1.default.put(params).promise();
    console.log(data);
    res.status(200).json({
        success: true,
        data: "Created successfully"
    });
}));
exports.getAll = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: 'Products'
    };
    const data = yield dynamo_1.default.scan(params).promise();
    res.status(200).json({
        success: true,
        data
    });
}));
exports.searchProducts = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    console.log(name);
    name.replace('%', ' ');
    const data = yield Product_1.default.find({
        name: { $regex: name, "$options": "i" },
    });
    res.status(200).json({
        success: true,
        data
    });
}));

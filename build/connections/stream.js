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
exports.dynamoStream = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const aws_sdk_1 = require("aws-sdk");
const dynamoStream = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('-------1111111111111--------------');
    try {
        for (const record of event.Records) {
            const updateRecored = aws_sdk_1.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
            console.log(updateRecored);
            if (record.eventName === 'INSERT') {
                // await axios.post('https://webhook.site/7a6e1bc4-6d83-44b5-9798-fa0375ac4a78',{
                //   updateRecored
                // })
                yield Product_1.default.create({
                    id: updateRecored === null || updateRecored === void 0 ? void 0 : updateRecored.id,
                    name: updateRecored === null || updateRecored === void 0 ? void 0 : updateRecored.name,
                    price: updateRecored === null || updateRecored === void 0 ? void 0 : updateRecored.price,
                    expiry: updateRecored === null || updateRecored === void 0 ? void 0 : updateRecored.expiry,
                    addedDate: updateRecored === null || updateRecored === void 0 ? void 0 : updateRecored.addedDate,
                    colour: updateRecored.colour
                });
            }
        }
        return `Document Added`;
    }
    catch (error) {
        console.error(error);
        return;
    }
});
exports.dynamoStream = dynamoStream;

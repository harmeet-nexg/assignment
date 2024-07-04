"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const router = express_1.default.Router();
router.route('/test').post(product_1.test);
router.route('/create').post(product_1.createUsers);
router.route('/all').get(product_1.getAll);
router.route('/search/:name').get(product_1.searchProducts);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSquema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductSquema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: String,
    imageURL: String,
    price: Number,
    createAt: {
        type: Date,
        default: Date.now,
    },
});
//# sourceMappingURL=product.schema.js.map
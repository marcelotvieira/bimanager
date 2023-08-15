"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHanlder = void 0;
const ApiError_1 = require("./ApiError");
const errorHanlder = (error, _req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_next) => {
    if (error instanceof ApiError_1.ApiError) {
        return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({
        message: 'Unhandled Error',
        details: error.message
    });
};
exports.errorHanlder = errorHanlder;
//# sourceMappingURL=errorHandler.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const ApiError_1 = require("../Error/ApiError");
const tokenHandle_1 = require("../utils/tokenHandle");
const checkToken = async (req, res, next) => {
    const { authorization } = req.headers;
    const isMatch = await (0, tokenHandle_1.validateToken)(authorization);
    if (!isMatch)
        return ApiError_1.ApiError.unauthorized('Unauthenticated');
    req.user = isMatch;
    next();
};
exports.checkToken = checkToken;
//# sourceMappingURL=index.js.map
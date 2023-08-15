"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
const http_status_codes_1 = require("http-status-codes");
class ApiError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
    static notFound(message) {
        throw new ApiError(message, http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    static unauthorized(message) {
        throw new ApiError(message, http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    static unprocessable(message) {
        throw new ApiError(message, http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY);
    }
    static badRequest(message) {
        throw new ApiError(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map
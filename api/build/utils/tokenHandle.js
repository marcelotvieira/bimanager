"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateToken = void 0;
const jwt = require("jsonwebtoken");
const key = process.env.SECRET_KEY;
const generateToken = (payload) => jwt.sign(payload, key);
exports.generateToken = generateToken;
const validateToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(decoded);
            }
        });
    });
};
exports.validateToken = validateToken;
//# sourceMappingURL=tokenHandle.js.map
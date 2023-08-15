"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt = require("bcrypt");
const ApiError_1 = require("../../../Error/ApiError");
const prisma_1 = require("../../../prisma/prisma");
const tokenHandle_1 = require("../../../utils/tokenHandle");
class UserService {
    constructor() {
        this._userModel = prisma_1.prisma.user;
        this._userDefaultSelect = {
            id: true,
            email: true,
            username: true,
            isRandomPassword: true,
            databases: {
                select: {
                    id: true,
                    name: true,
                    connection: true,
                    queries: true,
                }
            }
        };
    }
    async get(where) {
        return await this._userModel.findMany({
            where,
            select: this._userDefaultSelect,
        });
    }
    async getOne(where) {
        return await this._userModel.findFirst({
            where,
            select: this._userDefaultSelect,
        });
    }
    async getUserConnections(id) {
        const userData = await this.getOne({ id: Number(id) });
        return userData;
    }
    async update(id, data) {
        return await this._userModel.update({
            where: { id: Number(id) },
            data
        });
    }
    async activate(id) {
        return await this._userModel.update({
            where: { id: Number(id) },
            data: { isRandomPassword: false }
        });
    }
    async create(payload) {
        const password = await bcrypt.hash(payload.password, 10);
        const newUser = await this._userModel.create({ data: { ...payload, password } });
        const token = (0, tokenHandle_1.generateToken)({ email: newUser.email, username: newUser.username, id: newUser.id });
        return { token };
    }
    async authenticate(payload) {
        const user = await this._userModel.findFirst({
            where: {
                OR: [
                    { email: payload.username },
                    { username: payload.username },
                ]
            }
        });
        if (!user) {
            return ApiError_1.ApiError.notFound('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(payload.password, user.password);
        if (!isMatch) {
            return ApiError_1.ApiError.notFound('Invalid credentials');
        }
        const token = (0, tokenHandle_1.generateToken)({ email: user.email, username: user.username, id: user.id });
        return { token };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=index.js.map
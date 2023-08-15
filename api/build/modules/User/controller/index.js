"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(service) {
        this._service = service;
    }
    async create(req, res) {
        const newUser = await this._service.create(req.body);
        res.status(200).json(newUser);
    }
    async authenticate(req, res) {
        const user = await this._service.authenticate(req.body);
        res.status(200).json(user);
    }
    async getUserConnections(req, res) {
        // const { authorization } = req.headers;
        // const decodedUser = await validateToken(authorization);
        const user = await this._service.getUserConnections(req.params.id);
        res.status(200).json(user);
    }
}
exports.UserController = UserController;
//# sourceMappingURL=index.js.map
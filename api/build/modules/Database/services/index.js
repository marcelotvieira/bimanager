"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const prisma_1 = require("../../../prisma/prisma");
class DatabaseService {
    constructor() {
        this._databaseModel = prisma_1.prisma.database;
    }
    async create(data) {
        return this._databaseModel.create({ data });
    }
    async update(id, data) {
        const newConnection = await this._databaseModel.update({
            where: { id: Number(id) },
            data: data
        });
        return newConnection;
    }
}
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=index.js.map
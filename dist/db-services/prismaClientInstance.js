"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClientInstance = void 0;
const client_1 = require("@prisma/client");
// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections
exports.prismaClientInstance = new client_1.PrismaClient();
// { log: ["query"] }

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventsRouter_1 = __importDefault(require("./routers/eventsRouter"));
const commentsRouter_1 = __importDefault(require("./routers/commentsRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
// import { createCommentsTable, createEventsTable, createUsersTable } from './db'
const middleware_1 = require("./middleware");
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use(middleware_1.parseJWToken);
server.get('/version', (req, res) => {
    res.send('version 1.0- from pipeline 1.7 :)');
});
server.use('/api/events', eventsRouter_1.default);
server.use('/api/comments', commentsRouter_1.default);
server.use('/api/users', userRouter_1.default);
server.use('/', express_1.default.static('./dist/client'));
server.get('*', (req, res) => {
    res.sendFile('index.html', { root: './dist/client' });
});
server.use(middleware_1.errorHandler);
// createUsersTable()
// createEventsTable()
// createCommentsTable()
server.use(middleware_1.endPointNotFound);
exports.default = server;

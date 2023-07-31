"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentsTable = exports.createEventsTable = exports.createUsersTable = exports.executeQuery = exports.pool = void 0;
const pg_1 = __importDefault(require("pg"));
require("dotenv/config");
const { PG_HOST, PG_PORT, PG_USERNAME, PG_PASSWORD, PG_DATABASE, PG_SSL } = process.env;
exports.pool = new pg_1.default.Pool({
    host: PG_HOST,
    port: Number(PG_PORT),
    user: PG_USERNAME,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    ssl: PG_SSL === 'enabled'
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const executeQuery = (query, parameters) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield exports.pool.connect();
    try {
        const result = yield client.query(query, parameters);
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        console.error(error.stack);
        error.name = 'dbError';
        throw error;
    }
    finally {
        client.release();
    }
});
exports.executeQuery = executeQuery;
const createUsersTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `CREATE TABLE IF NOT EXISTS "users" (
    "user_id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "username" VARCHAR(45) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL
  )`;
    yield (0, exports.executeQuery)(query);
    console.log('Users table initialized');
});
exports.createUsersTable = createUsersTable;
const createEventsTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `CREATE TABLE IF NOT EXISTS "events" (
		"event_id" SERIAL PRIMARY KEY,
		"user_id" INTEGER,
		"title" VARCHAR(50),
		"text" VARCHAR(500),
		"isPrivate" boolean,
		"isCommentingOn" boolean,
		"date" DATE,
		"time" TIME,
		"place" VARCHAR(100)
	  ) `;
    yield (0, exports.executeQuery)(query);
    console.log('Events table initialized');
});
exports.createEventsTable = createEventsTable;
const createCommentsTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `CREATE TABLE IF NOT EXISTS "comments" (
		"comment_id" SERIAL PRIMARY KEY,
		"user_id" INTEGER,
		"event_id" INTEGER,
		"text" VARCHAR(2000),
		"date" DATE
	  )`;
    yield (0, exports.executeQuery)(query);
    console.log('Comments table initialized');
});
exports.createCommentsTable = createCommentsTable;

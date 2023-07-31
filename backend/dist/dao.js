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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.findUserByUSername = exports.deleteUser = exports.editUserData = exports.loginUser = exports.registerUsers = exports.updateEvent = exports.getAllUsers = exports.getCommentsByEventId = exports.getCommentsByUserId = exports.getAllComments = exports.addCommentWithoutUserId = exports.addComment = exports.deleteEventById = exports.createEvent = exports.geteventByUserId = exports.getEventByEventId = exports.getPublicEvents = exports.getAllEvents = exports.getDummyInfo = void 0;
const db_1 = require("./db");
const getDummyInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM dummy';
    const result = yield (0, db_1.executeQuery)(query);
    return result;
});
exports.getDummyInfo = getDummyInfo;
//EVENTS 
const getAllEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM events';
    const result = yield (0, db_1.executeQuery)(query);
    return result.rows;
});
exports.getAllEvents = getAllEvents;
const getPublicEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM events WHERE isPrivate = false';
    const result = yield (0, db_1.executeQuery)(query);
    return result.rows;
});
exports.getPublicEvents = getPublicEvents;
const getEventByEventId = (event_id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM events WHERE event_id = $1';
    const params = [event_id];
    const result = yield (0, db_1.executeQuery)(query, params);
    return result.rows;
});
exports.getEventByEventId = getEventByEventId;
const geteventByUserId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM events WHERE user_id = $1';
    const params = [user_id];
    const result = yield (0, db_1.executeQuery)(query, params);
    return result.rows;
});
exports.geteventByUserId = geteventByUserId;
const createEvent = (user_id, title, text, date, place, isPrivate, isCommentingOn, time) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'INSERT INTO events (user_id, title, text, date , place, isPrivate, isCommentingOn, time) values ($1, $2, $3, $4, $5, $6, $7, $8)';
    const params = [user_id, title, text, date, place, isPrivate, isCommentingOn, time];
    console.log('create event dao: ', { query, params });
    const result = yield (0, db_1.executeQuery)(query, params);
    return result.rows;
});
exports.createEvent = createEvent;
const deleteEventById = (event_id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'DELETE FROM events comments WHERE event_id = $1';
    const params = [event_id];
    console.log('from delete dao', { query, params });
    return yield (0, db_1.executeQuery)(query, params);
});
exports.deleteEventById = deleteEventById;
//////////////////COMMENTS///////////////////////
const addComment = (event_id, user_id, text) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'INSERT INTO comments (event_id,user_id, text) VALUES ($1, $2, $3)';
    const params = [event_id, user_id, text];
    const result = yield (0, db_1.executeQuery)(query, params);
    return result;
});
exports.addComment = addComment;
const addCommentWithoutUserId = (event_id, text) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'INSERT INTO comments (event_id,user_id, text) VALUES ($1,null, $2)';
    const params = [event_id, text];
    const result = yield (0, db_1.executeQuery)(query, params);
    return result;
});
exports.addCommentWithoutUserId = addCommentWithoutUserId;
const getAllComments = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM comments';
    const result = yield (0, db_1.executeQuery)(query);
    return result;
});
exports.getAllComments = getAllComments;
const getCommentsByUserId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM comments WHERE user_id = $1';
    const params = [user_id];
    const result = yield (0, db_1.executeQuery)(query, params);
    return result;
});
exports.getCommentsByUserId = getCommentsByUserId;
const getCommentsByEventId = (event_id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM comments WHERE event_id = $1';
    const params = [event_id];
    const result = yield (0, db_1.executeQuery)(query, params);
    return result;
});
exports.getCommentsByEventId = getCommentsByEventId;
////////////////////USER/////////////////////////
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM users';
    const result = yield (0, db_1.executeQuery)(query);
    return result.rows;
});
exports.getAllUsers = getAllUsers;
const updateEventColumn = (columnName, newInfo, event_id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `UPDATE events SET  ${columnName} = $1 WHERE event_id = $2`;
    const params = [newInfo, event_id];
    return yield (0, db_1.executeQuery)(query, params);
});
const updateEvent = (event_id, event) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, text, date, place, isPrivate, isCommentingOn } = event;
    if (title) {
        updateEventColumn('title', title, event_id);
    }
    if (text) {
        updateEventColumn('text', text, event_id);
    }
    if (date) {
        updateEventColumn('date', date, event_id);
    }
    if (place) {
        updateEventColumn('place', place, event_id);
    }
    if (isPrivate) {
        updateEventColumn('isPrivate', isPrivate, event_id);
    }
    if (place) {
        updateEventColumn('isCommentingOn', isCommentingOn, event_id);
    }
    return;
});
exports.updateEvent = updateEvent;
//USERS
const registerUsers = (name, username, password, email) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
      INSERT INTO users (name,username, password, email)
      VALUES ($1, $2, $3, $4)
      RETURNING user_id;`;
    const params = [name, username, password, email];
    const result = yield (0, db_1.executeQuery)(query, params);
    return result.rows;
});
exports.registerUsers = registerUsers;
const loginUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM users WHERE (username, password) = ($1, $2)';
    const params = [username, password];
    const result = yield (0, db_1.executeQuery)(query, params);
    const user = result.rows;
    return user;
});
exports.loginUser = loginUser;
const editUserData = (user_id, name, username, password, email) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'UPDATE users SET name = $2, username = $3, password = $4, email = $5 WHERE user_id = $1';
    const params = [user_id, name, username, password, email];
    return yield (0, db_1.executeQuery)(query, params);
});
exports.editUserData = editUserData;
const deleteUser = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
	  WITH deleted_comments AS (
		DELETE FROM comments WHERE user_id = $1
		RETURNING user_id
	  ),
	  deleted_users AS (
		DELETE FROM users WHERE user_id = $1
		RETURNING user_id
	  )
	  DELETE FROM events WHERE user_id = $1
	`;
    const params = [user_id];
    return (0, db_1.executeQuery)(query, params);
});
exports.deleteUser = deleteUser;
const findUserByUSername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM users WHERE username = $1';
    const params = [username];
    return (0, db_1.executeQuery)(query, params);
});
exports.findUserByUSername = findUserByUSername;
const findUserById = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM users WHERE user_id = $1';
    const params = [user_id];
    return (0, db_1.executeQuery)(query, params);
});
exports.findUserById = findUserById;

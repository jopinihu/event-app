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
const express_1 = __importDefault(require("express"));
const dao_1 = require("../dao");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("../middleware");
const users = express_1.default.Router();
users.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, dao_1.getAllUsers)();
    return res.status(200).send(result);
}));
users.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, password, email } = req.body;
    const userExists = yield (0, dao_1.findUserByUSername)(username);
    if (userExists.rows.length === 1) {
        return res.status(401).send('Username already exists');
    }
    const newUser = (0, dao_1.registerUsers)(name, username, password, email);
    return res.status(200).send(newUser);
}));
users.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { username, password } = req.body;
    const existingUsername = yield (0, dao_1.findUserByUSername)(username);
    if (existingUsername.rows.length < 1) {
        console.log('username does not exist');
        return res.status(401).send('Username does not exist');
    }
    const dbUserPass = existingUsername.rows[0].password;
    if (password !== dbUserPass) {
        return res.status(401).send('Incorrect password!');
    }
    const response = yield (0, dao_1.loginUser)(username, password);
    const user = response[0];
    const payload = { user_id: user.user_id };
    const SECRET = (_a = process.env.SECRET) !== null && _a !== void 0 ? _a : '';
    const options = { expiresIn: '1h' };
    const token = jsonwebtoken_1.default.sign(payload, SECRET, options);
    return res.status(200).send(token);
}));
users.put('/edit/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = parseInt(req.params.id);
    const { name, username, password, email } = req.body;
    console.log(user_id, name, username, password, email);
    if (!name || !username || !password || !email) {
        return res.status(404).send('Missing parameters');
    }
    yield (0, dao_1.editUserData)(user_id, name, username, password, email);
    return res.status(201).send('User updated');
}));
users.delete('/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = Number(req.params.user_id);
    try {
        const result = yield (0, dao_1.deleteUser)(user_id);
        if (result.rowCount > 0) {
            return res.sendStatus(204);
        }
        else {
            return res.status(404).json({ error: 'User not found' });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}));
users.get('/currentUser', middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user_id) {
        const user_id = parseInt(req.user_id);
        const result = yield (0, dao_1.findUserById)(user_id);
        return res.status(200).send(result.rows[0]);
    }
    else {
        return res.status(404).send('No such user found');
    }
}));
users.get('/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = parseInt(req.params.user_id);
    const result = yield (0, dao_1.findUserById)(user_id);
    return res.status(200).send(result.rows);
}));
exports.default = users;

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
const comments = express_1.default.Router();
comments.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, dao_1.getAllComments)();
    return res.status(200).send(result.rows);
}));
comments.get('/userId/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const result = yield (0, dao_1.getCommentsByUserId)(Number(user_id));
    return res.status(200).send(result.rows);
}));
comments.get('/eventId/:event_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { event_id } = req.params;
    const result = yield (0, dao_1.getCommentsByEventId)(Number(event_id));
    return res.status(200).send(result.rows);
}));
comments.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { event_id, text } = req.body;
    console.log(event_id, text);
    if (req.user_id) {
        console.log(event_id, text);
        yield (0, dao_1.addComment)(event_id, Number(req.user_id), text);
        return res.status(200).send('posted comment: registered');
    }
    else {
        yield (0, dao_1.addCommentWithoutUserId)((event_id), text);
        console.log(event_id, text);
        return res.status(200).send('posted comment:anon');
    }
}));
exports.default = comments;

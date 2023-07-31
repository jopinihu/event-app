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
const middleware_1 = require("../middleware");
const events = express_1.default.Router();
//Get all events and checks if user is loggedin
events.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = (0, middleware_1.isAuthenticatedRequest)(req)
        ? yield (0, dao_1.getAllEvents)()
        : yield (0, dao_1.getPublicEvents)();
    return res.status(200).send(results);
}));
events.get('/:event_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { event_id } = req.params;
    const results = yield (0, dao_1.getEventByEventId)(parseInt(event_id));
    return res.status(200).send(results[0]);
}));
events.get('/user/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const results = yield (0, dao_1.geteventByUserId)(parseInt(user_id));
    return res.status(200).send(results);
}));
events.post('/', middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = Number(req.user_id);
    const { title, text, date, place, isPrivate, isCommentingOn, time } = req.body;
    yield (0, dao_1.createEvent)(user_id, title, text, date, place, isPrivate, isCommentingOn, time);
    const newevent = yield (0, dao_1.geteventByUserId)(user_id);
    return res.status(201).send(newevent);
}));
events.delete('/:event_id', middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { event_id } = req.params;
    const event = yield (0, dao_1.getEventByEventId)(Number(event_id));
    if (event[0].user_id) {
        if (event[0].user_id === req.user_id) {
            yield (0, dao_1.deleteEventById)(Number(event_id));
            console.log('delete reached');
            return res.status(200).send('Event deleted');
        }
        return res
            .status(401)
            .send('Your are not allowed to delete someone elses event');
    }
    return res.status(401).send('That event doesnt exist ');
}));
events.put('/:event_id', middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { event_id } = req.params;
    yield (0, dao_1.updateEvent)(parseInt(event_id), req.body);
    const newEventInfo = yield (0, dao_1.getEventByEventId)(parseInt(event_id));
    return res.send(newEventInfo);
}));
exports.default = events;

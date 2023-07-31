"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.isAuthenticatedRequest = exports.parseJWToken = exports.authenticate = exports.endPointNotFound = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const endPointNotFound = (_req, res) => {
    res.status(404).send({ error: 'oops...wrong place maybe?' });
};
exports.endPointNotFound = endPointNotFound;
// export const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {
//   const auth = req.get('Authorization')
//   if (!auth?.startsWith('Bearer ')) {
//       return res.status(401).send('Invalid token')
//   }
//   const token = auth.substring(7)
//   const SECRET = process.env.SECRET ?? ''
//   try {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const decodedToken: any = jwt.verify(token, SECRET)
//       req.user_id = decodedToken.user_id
//       next()
//   } catch (error) {
//       return res.status(401).send('Invalid token')
//   }
// }
const authenticate = (req, res, next) => {
    return req.user_id ? next() : res.status(401).send('User not authenticated');
};
exports.authenticate = authenticate;
const parseJWToken = (req, res, next) => {
    var _a;
    const auth = req.get('Authorization');
    // if authentication token found add user id to the request
    if (auth) {
        try {
            const token = auth.substring(7);
            const SECRET = (_a = process.env.SECRET) !== null && _a !== void 0 ? _a : '';
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const decodedToken = jsonwebtoken_1.default.verify(token, SECRET);
            req.user_id = decodedToken.user_id;
        }
        catch (error) {
            return res.status(401).send('Invalid token');
        }
    }
    next();
};
exports.parseJWToken = parseJWToken;
const isAuthenticatedRequest = (req) => {
    return !!req.user_id;
};
exports.isAuthenticatedRequest = isAuthenticatedRequest;
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    console.log(err);
    res.status(500);
    res.send({ error: err });
}
exports.errorHandler = errorHandler;

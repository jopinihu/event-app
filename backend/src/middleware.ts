import { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

//Checks if endpoint exists

interface CustomRequest extends Request {
  user_id?: string
}

export const endPointNotFound = (_req: Request, res: Response) => {
  res.status(404).send({ error: 'oops...wrong place maybe?' })
}

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

export const authenticate = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  return req.user_id ? next() : res.status(401).send('User not authenticated')
}



export const parseJWToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const auth = req.get('Authorization')

  // if authentication token found add user id to the request
  if (auth) {
    try {
      const token = auth.substring(7)
      const SECRET = process.env.SECRET ?? ''
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decodedToken: any = jwt.verify(token, SECRET)
      req.user_id = decodedToken.user_id
    } catch (error) {
      return res.status(401).send('Invalid token')
    }
  }

  next()
}

export const isAuthenticatedRequest = (req: CustomRequest) => {
  return !!req.user_id
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err)
  } console.log(err)
  res.status(500)
  res.send({ error: err })
}


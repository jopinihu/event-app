import express, { Request, Response } from 'express'
import eventsRouter from './routers/eventsRouter'
import comments from './routers/commentsRouter'
import users from './routers/userRouter'
// import { createCommentsTable, createEventsTable, createUsersTable } from './db'


import { endPointNotFound, errorHandler, parseJWToken } from './middleware'
const server = express()
server.use(express.json())

server.use(parseJWToken)


server.get('/version', (req: Request, res: Response) => {
	res.send('version 1.0- from pipeline 1.7 :)')
})


server.use('/api/events', eventsRouter)

server.use('/api/comments', comments)

server.use('/api/users', users)
server.use('/', express.static('./dist/client'))

server.get('*', (req, res) => {
	res.sendFile('index.html', { root: './dist/client' })
})
server.use(errorHandler)
// createUsersTable()
// createEventsTable()
// createCommentsTable()
server.use(endPointNotFound)
export default server


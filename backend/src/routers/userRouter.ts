import express, { Request, Response } from 'express'
import { findUserByUSername, getAllUsers, registerUsers, editUserData, deleteUser, loginUser, findUserById } from '../dao'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { authenticate } from '../middleware'

interface CustomRequest extends Request {
    user_id?: string
}

const users = express.Router()

users.get('/', async (_req: Request, res: Response) => {
    const result = await getAllUsers()
    return res.status(200).send(result)
})


users.post('/register', async (req: Request, res: Response) => {
    const { name, username, password, email } = req.body

    const userExists = await findUserByUSername(username)

    if (userExists.rows.length === 1) {
        return res.status(401).send('Username already exists')
    }

    const newUser = registerUsers(name, username, password, email)
    return res.status(200).send(newUser)
})

users.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body

    const existingUsername = await findUserByUSername(username)

    if (existingUsername.rows.length < 1) {
        console.log('username does not exist')

        return res.status(401).send('Username does not exist')
    }

    const dbUserPass = existingUsername.rows[0].password

    if (password !== dbUserPass) {
        return res.status(401).send('Incorrect password!')
    }

    const response = await loginUser(username, password)

    const user = response[0]

    const payload = { user_id: user.user_id }
    const SECRET = process.env.SECRET ?? ''
    const options = { expiresIn: '1h' }

    const token = jwt.sign(payload, SECRET, options)

    return res.status(200).send(token)
})

users.put('/edit/:id', async (req: Request, res: Response) => {
    const user_id = parseInt(req.params.id)
    const { name, username, password, email } = req.body
    console.log(user_id, name, username, password, email)
    if (!name || !username || !password || !email) {
        return res.status(404).send('Missing parameters')
    }

    await editUserData(user_id, name, username, password, email)
    return res.status(201).send('User updated')
})
users.delete('/:user_id', async (req: Request, res: Response) => {
    const user_id = Number(req.params.user_id)

    try {

        const result = await deleteUser(user_id)


        if (result.rowCount > 0) {
            return res.sendStatus(204)
        } else {
            return res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal server error' })
    }
})


users.get('/currentUser', authenticate, async (req: CustomRequest, res: Response) => {
    if (req.user_id) {
        const user_id = parseInt(req.user_id)
        const result = await findUserById(user_id)


        return res.status(200).send(result.rows[0])
    } else {
        return res.status(404).send('No such user found')
    }
})
users.get('/:user_id', async (req: Request, res: Response) => {
    const user_id = parseInt(req.params.user_id)
    const result = await findUserById(user_id)
    return res.status(200).send(result.rows)
})



export default users

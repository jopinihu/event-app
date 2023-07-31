import express, { Response, Request, Router } from 'express'
import { addComment, getAllComments, getCommentsByEventId, getCommentsByUserId, addCommentWithoutUserId } from '../dao'

interface CustomRequest extends Request {
    user_id?: string
}


const comments = express.Router()

comments.get('/', async (req: Request, res: Response) => {
    const result = await getAllComments()
    return res.status(200).send(result.rows)
})

comments.get('/userId/:user_id', async (req: Request, res: Response) => {
    const { user_id } = req.params
    const result = await getCommentsByUserId(Number(user_id))
    return res.status(200).send(result.rows)
})

comments.get('/eventId/:event_id', async (req: Request, res: Response) => {
    const { event_id } = req.params
    const result = await getCommentsByEventId(Number(event_id))
    return res.status(200).send(result.rows)
})

comments.post('/', async (req: CustomRequest, res: Response) => {
    const { event_id, text } = req.body
    console.log(event_id, text)
    if (req.user_id) {
        console.log(event_id, text)
        await addComment(event_id, Number(req.user_id), text)
        return res.status(200).send('posted comment: registered')
    } else {
        await addCommentWithoutUserId((event_id), text)
        console.log(event_id, text)
        return res.status(200).send('posted comment:anon')
    }
})



export default comments
import express, { Response, Request } from 'express'
import { getPublicEvents, getAllEvents, getEventByEventId , geteventByUserId, createEvent, deleteEventById, updateEvent} from '../dao'
import {  isAuthenticatedRequest , authenticate} from '../middleware'

const events = express.Router()

interface CustomRequest extends Request {
  user_id?: string
}



//Get all events and checks if user is loggedin

events.get('/', async (req: CustomRequest, res: Response) => {

  const results = isAuthenticatedRequest(req)
    ? await getAllEvents()
    : await getPublicEvents()

  return res.status(200).send(results)
})



events.get('/:event_id', async (req: Request, res: Response) => {

  const { event_id } = req.params
  const results = await getEventByEventId(parseInt(event_id))
  return res.status(200).send(results[0])

})


events.get('/user/:user_id', async (req: Request, res: Response) => {

  const { user_id } = req.params
  const results = await geteventByUserId(parseInt(user_id))
  return res.status(200).send(results)

})


events.post('/',authenticate, async (req: CustomRequest, res: Response) => {
  const user_id = Number(req.user_id)
  const {
    title,
    text,
    date,
    place,
    isPrivate,
    isCommentingOn,
    time
  } = req.body
  await createEvent(
    user_id,
    title,
    text,
    date,
    place,
    isPrivate,
    isCommentingOn,
    time
  )
  const newevent = await geteventByUserId(user_id)
  return res.status(201).send(newevent)
})


events.delete(
  '/:event_id',
  authenticate,
  async (req: CustomRequest, res: Response) => {
    const { event_id } = req.params
    const event = await getEventByEventId(Number(event_id))
    if (event[0].user_id) {
      if (event[0].user_id === req.user_id) {
        await deleteEventById(Number(event_id))
        console.log('delete reached')
        return res.status(200).send('Event deleted')
      }

      return res
        .status(401)
        .send('Your are not allowed to delete someone elses event')
    }

    return res.status(401).send('That event doesnt exist ')
  }
)


events.put('/:event_id',authenticate, async (req: Request, res: Response) => {
  const { event_id } = req.params
  await updateEvent(parseInt(event_id), req.body)
  const newEventInfo = await getEventByEventId(parseInt(event_id))
  return res.send(newEventInfo)
})

export default events




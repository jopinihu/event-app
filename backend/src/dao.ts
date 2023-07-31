import { executeQuery } from './db'


export const getDummyInfo = async () => {
	const query = 'SELECT * FROM dummy'
	const result = await executeQuery(query)
	return result

}


//EVENTS 

export const getAllEvents = async () => {
	const query = 'SELECT * FROM events'
	const result = await executeQuery(query)
	return result.rows
}

export const getPublicEvents = async () => {
	const query = 'SELECT * FROM events WHERE isPrivate = false'
	const result = await executeQuery(query)
	return result.rows
}


export const getEventByEventId = async (event_id: number) => {
	const query = 'SELECT * FROM events WHERE event_id = $1'
	const params = [event_id]
	const result = await executeQuery(query, params)
	return result.rows
}


export const geteventByUserId = async (user_id: number) => {
	const query = 'SELECT * FROM events WHERE user_id = $1'
	const params = [user_id]
	const result = await executeQuery(query, params)
	return result.rows
}

export const createEvent = async (user_id: number, title: string, text: string, date: string, place: string, isPrivate: boolean, isCommentingOn: boolean, time: string) => {
	const query = 'INSERT INTO events (user_id, title, text, date , place, isPrivate, isCommentingOn, time) values ($1, $2, $3, $4, $5, $6, $7, $8)'
	const params = [user_id, title, text, date, place, isPrivate, isCommentingOn, time]
	console.log('create event dao: ', { query, params })
	const result = await executeQuery(query, params)
	return result.rows
}


export const deleteEventById = async (event_id: number) => {
	const query = 'DELETE FROM events comments WHERE event_id = $1'
	const params = [event_id]
	console.log('from delete dao', { query, params })
	return await executeQuery(query, params)
}



//////////////////COMMENTS///////////////////////

export const addComment = async (event_id: number, user_id: number, text: string) => {
	const query = 'INSERT INTO comments (event_id,user_id, text) VALUES ($1, $2, $3)'
	const params = [event_id, user_id, text]
	const result = await executeQuery(query, params)
	return result
}
export const addCommentWithoutUserId = async (event_id: number, text: string) => {
	const query = 'INSERT INTO comments (event_id,user_id, text) VALUES ($1,null, $2)'
	const params = [event_id, text]
	const result = await executeQuery(query, params)
	return result
}

export const getAllComments = async () => {
	const query = 'SELECT * FROM comments'
	const result = await executeQuery(query)
	return result
}

export const getCommentsByUserId = async (user_id: number) => {
	const query = 'SELECT * FROM comments WHERE user_id = $1'
	const params = [user_id]
	const result = await executeQuery(query, params)
	return result
}

export const getCommentsByEventId = async (event_id: number) => {
	const query = 'SELECT * FROM comments WHERE event_id = $1'
	const params = [event_id]
	const result = await executeQuery(query, params)
	return result
}

////////////////////USER/////////////////////////

export const getAllUsers = async () => {
	const query = 'SELECT * FROM users'
	const result = await executeQuery(query)
	return result.rows
}



const updateEventColumn = async (columnName: string, newInfo: string | boolean, event_id: number) => {
	const query = `UPDATE events SET  ${columnName} = $1 WHERE event_id = $2`
	const params = [newInfo, event_id]
	return await executeQuery(query, params)
}


export const updateEvent = async (
	event_id: number,
	event: { title: string; text: string, date: string, place: string, isPrivate: boolean, isCommentingOn: boolean }
) => {
	const { title, text, date, place, isPrivate, isCommentingOn } = event
	if (title) {
		updateEventColumn('title', title, event_id)
	}
	if (text) {
		updateEventColumn('text', text, event_id)
	}
	if (date) {
		updateEventColumn('date', date, event_id)
	}
	if (place) {
		updateEventColumn('place', place, event_id)
	}
	if (isPrivate) {
		updateEventColumn('isPrivate', isPrivate, event_id)
	}
	if (place) {
		updateEventColumn('isCommentingOn', isCommentingOn, event_id)
	}
	return
}




//USERS


export const registerUsers = async (name: string, username: string, password: string, email: string) => {
	const query = `
      INSERT INTO users (name,username, password, email)
      VALUES ($1, $2, $3, $4)
      RETURNING user_id;`
	const params = [name, username, password, email]
	const result = await executeQuery(query, params)
	return result.rows
}

export const loginUser = async (username: string, password: string) => {
	const query = 'SELECT * FROM users WHERE (username, password) = ($1, $2)'
	const params = [username, password]
	const result = await executeQuery(query, params)
	const user = result.rows

	return user
}


export const editUserData = async (user_id: number, name: string, username: string, password: string, email: string) => {
	const query = 'UPDATE users SET name = $2, username = $3, password = $4, email = $5 WHERE user_id = $1'
	const params = [user_id, name, username, password, email]
	return await executeQuery(query, params)
}

export const deleteUser = async (user_id: number) => {
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
	`
	const params = [user_id]
	return executeQuery(query, params)
}

export const findUserByUSername = async (username: string) => {
	const query = 'SELECT * FROM users WHERE username = $1'
	const params = [username]
	return executeQuery(query, params)
}
export const findUserById = async (user_id: number) => {
	const query = 'SELECT * FROM users WHERE user_id = $1'
	const params = [user_id]
	return executeQuery(query, params)
}
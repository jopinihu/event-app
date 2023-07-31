import pg from 'pg'
import 'dotenv/config'

const { PG_HOST, PG_PORT, PG_USERNAME, PG_PASSWORD, PG_DATABASE, PG_SSL } = process.env

export const pool = new pg.Pool({
	host: PG_HOST,
	port: Number(PG_PORT),
	user: PG_USERNAME,
	password: PG_PASSWORD,
	database: PG_DATABASE,
	ssl: PG_SSL === 'enabled'
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const executeQuery = async (query: string, parameters?: Array<any>) => {
	const client = await pool.connect()
	try {
		const result = await client.query(query, parameters)
		return result
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error(error.stack)
		error.name = 'dbError'
		throw error
	} finally { client.release() }
}



export const createUsersTable = async () => {
	const query = `CREATE TABLE IF NOT EXISTS "users" (
    "user_id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "username" VARCHAR(45) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL
  )`

	await executeQuery(query)
	console.log('Users table initialized')
}

export const createEventsTable = async () => {
	const query = `CREATE TABLE IF NOT EXISTS "events" (
		"event_id" SERIAL PRIMARY KEY,
		"user_id" INTEGER,
		"title" VARCHAR(50),
		"text" VARCHAR(500),
		"isPrivate" boolean,
		"isCommentingOn" boolean,
		"date" DATE,
		"time" TIME,
		"place" VARCHAR(100)
	  ) `

	await executeQuery(query)
	console.log('Events table initialized')
}

export const createCommentsTable = async () => {
	const query = `CREATE TABLE IF NOT EXISTS "comments" (
		"comment_id" SERIAL PRIMARY KEY,
		"user_id" INTEGER,
		"event_id" INTEGER,
		"text" VARCHAR(2000),
		"date" DATE
	  )`

	await executeQuery(query)
	console.log('Comments table initialized')
}

import server from './server'

const PORT = 3000

server.listen(PORT, () => {
	console.log('Orange Event server API listening to port', PORT)
})

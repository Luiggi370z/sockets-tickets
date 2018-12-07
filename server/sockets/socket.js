import { io } from '../server'
import TicketControl from '../classes/ticketControl'

let ticketControl = new TicketControl()

io.on('connect', client => {
	client.emit('sendMessage', {
		user: 'Admin',
		message: 'Welcome to the app'
	})

	client.on('disconnect', () => {
		console.log('User disconnected')
	})

	client.on('nextTicket', (data, callback) => {
		const nextTicket = ticketControl.next()

		callback(nextTicket)
	})

	client.emit('currentStatus', {
		currentTicket: ticketControl.getLastTicket(),
		lastFour: ticketControl.getLastFour()
	})

	client.on('takeTicket', (data, callback) => {
		if (!data.desktop) {
			return callback({
				err: true,
				message: 'Desktop is required'
			})
		}

		let currentTicket = ticketControl.takeTicket(data.desktop)

		callback(currentTicket)

		client.broadcast.emit('lastFour', { lastFour: ticketControl.getLastFour() })
	})
})

io.on('connect', client => {
	console.log('User connected')
})

import fs from 'fs'
import Ticket from './ticket'

class TicketControl {
	constructor() {
		this.last = 0
		this.today = new Date().getDate()
		this.tickets = []
		this.lastFour = []

		let data = require('../data/data.json')

		if (this.today === data.today) {
			this.last = data.last
			this.tickets = data.tickets
			this.lastFour = data.lastFour
		} else {
			this.restart()
		}
	}

	next() {
		this.last += 1
		let newTicket = new Ticket(this.last, null)
		this.tickets.push(newTicket)

		this.saveFile()

		return this.getLastTicket()
	}

	saveFile() {
		const jsonData = {
			last: this.last,
			today: this.today,
			tickets: this.tickets,
			lastFour: this.lastFour
		}

		let jsonDataString = JSON.stringify(jsonData)

		fs.writeFileSync('./server/data/data.json', jsonDataString)
	}

	restart() {
		this.last = 0
		this.tickets = []
		this.lastFour = []
		this.saveFile()
	}

	getLastTicket() {
		return `Ticket ${this.last}`
	}

	getLastFour() {
		return this.lastFour
	}

	takeTicket(desktop) {
		if (!this.tickets.length) return

		const nextPendingTicketNumber = this.tickets[0].number
		this.tickets.shift()

		let ticket = new Ticket(nextPendingTicketNumber, desktop)
		this.lastFour.unshift(ticket)

		if (this.lastFour.length > 4) this.lastFour.splice(-1, 1)

		this.saveFile()

		return ticket
	}
}

export default TicketControl

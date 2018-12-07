var socket = io()
var searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('desktop')) {
	window.location = 'index.html'
	throw new Error('Desktop is required')
}

var desktop = searchParams.get('desktop')
var label = $('small')

socket.on('connect', function() {
	console.log('Connected to server')
})
socket.on('disconnect', function() {
	console.log('Disconnected from server')
})

$('h1').text(`Desktop ${desktop}`)

$('button').on('click', function() {
	socket.emit('takeTicket', { desktop }, res => {
		if (!res || !res.number) {
			label.text('No tickets')
			return alert('No tickets')
		}

		label.text(`Ticket ${res.number}`)
	})
})

var socket = io()
var label = $('#lblNuevoTicket')

socket.on('connect', function() {
	console.log('Connected to server')
})

socket.on('currentStatus', function(data) {
	label.text(data.currentTicket)
})

socket.on('disconnect', function() {
	console.log('Disconnected from server')
})

$('button').on('click', function() {
	socket.emit('nextTicket', null, msg => {
		label.text(msg)
	})
})

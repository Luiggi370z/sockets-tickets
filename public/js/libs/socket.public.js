var socket = io()

socket.on('connect', function() {
	console.log('Connected to server')
})

socket.on('disconnect', function() {
	console.log('Disconnected from server')
})

socket.on('currentStatus', function(res) {
	if (!res.lastFour || !res.lastFour.length) return

	updateLabels(res)
})

socket.on('lastFour', function(res) {
	var audio = new Audio('audio/new-ticket.mp3')
	console.log('audio', audio)
	audio.play()

	updateLabels(res)
})

function updateLabels(res) {
	res.lastFour.forEach((item, index) => {
		$(`#lblTicket${index + 1}`).text(`Ticket ${item.number}`)
		$(`#lblEscritorio${index + 1}`).text(`Desktop ${item.desktop}`)
	})
}

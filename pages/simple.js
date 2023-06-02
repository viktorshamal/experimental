const myTopic = 'gruppe21'
const clamp = (number, min, max) => Math.max(min, Math.min(number, max))
const randomNumber = max => Math.floor(Math.random() * max)
const screenHeight = clamp(screen.availHeight - 200, 0, 800)
const screenWidth = clamp(screen.availWidth - 10, 0, 500)

function setup() {
	let myCanvas = createCanvas(screenWidth, screenHeight)
	myCanvas.parent('myContainer')
}

const energy = {
	x: 250,
	y: 250,
	size: 50,
	move: function ({ x, y }) {
		this.x = clamp(this.x + x, 0, screenWidth)
		this.y = clamp(this.y + y, 0, screenHeight)
	},
}

class Lamp {
	constructor({ x, y, size = 80, color }) {
		this.x = x || randomNumber(screenWidth - size)
		this.y = y || randomNumber(screenWidth - size)
		this.size = size
		this.color = color
	}

	contains = point => {
		const distance = dist(point.x, point.y, this.x, this.y)
		return distance < this.size / 2
	}

	withinRect = rect => {
		return (
			this.x >= rect.x &&
			this.x <= rect.x + rect.width &&
			this.y >= rect.y &&
			this.y <= rect.y + rect.height
		)
	}
}

// Variables
const bgColor = 'black'
const defaultCircleColor = 'black'
const circleSize = 50

sensor.threshold = 1000

const discoRect = {
	x: screenWidth - 200,
	y: screenHeight - 100,
	width: 200,
	height: 100,
}

const lamps = [
	//new Lamp({ color: "blue" }),
]

let previousHoveredLamp = null

// Variables to store velocity of the energy, along with deacceleration constants
let vx = 0
let vy = 0
const speed = 150
const deacceleration = 0.97

// Debouce the shake event
let lastShake = 0
const debounce = 1000

function draw() {
	background(bgColor)

	// Draw the disco rect
	fill('white')

	// Draw the circles
	lamps.forEach(l => {
		fill(l.color)
		circle(l.x, l.y, l.size)
	})

	let shakeAvailable = lastShake + debounce < Date.now()
	if (sensor.hasNewValue && shakeAvailable) {
		// check if we have shaken the phone by comparing the current value with the previous value
		// if the difference is greater than the shaken threshold, we have shaken the phone

		// Set a random velocity for the energy and make it deaccelerate
		vx = Math.random() * speed
		vy = Math.random() * speed
		lastShake = Date.now()

		sendMessage('shake' + myID)
	}

	// Move the energy
	energy.move({ x: vx, y: vy })

	// Deaccelerate the energy
	vx *= deacceleration
	vy *= deacceleration

	// Bounce the energy off the walls
	if (energy.x <= 0 || energy.x >= screenWidth) vx *= -1
	if (energy.y <= 0 || energy.y >= screenHeight) vy *= -1

	// Check what we're hovering over
	const hoveredLamp = lamps.find(lamp => lamp.contains(energy))

	// Check if we're hovering over a new lamp
	const hoverEnter = hoveredLamp !== previousHoveredLamp
	previousHoveredLamp = hoveredLamp

	let circleColor = defaultCircleColor

	// Change the color of the circle if we're hovering over a lamp
	// and send a message if we're hovering over a new lamp
	if (hoveredLamp) {
		circleColor = hoveredLamp.color

		hoveredLamp.x = randomNumber(screenWidth)
		hoveredLamp.y = randomNumber(screenHeight)

		// Only send a message if we're hovering over a new lamp
		if (hoverEnter) sendMessage(hoveredLamp.color)
	}

	fill(circleColor)
	circle(energy.x, energy.y, energy.size)
}

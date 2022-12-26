const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// canvas size
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// disable antialiacing
c.imageSmoothingEnabled = false;

// player and background images
const backgroundImage = new Image()
//backgroundImage.src = "{% static 'kingdomfiles/imgs/KingdomMap.png' %}"

backgroundImage.src = '/static/kingdomfiles/imgs/KingdomMap.png'

const playerImage = new Image()
playerImage.src = '/static/kingdomfiles/imgs/knight3.png'

const enemyImage = new Image()
enemyImage.src = '/static/kingdomfiles/imgs/zombieknightderp.png'

// exit door cords
var top0 = {
	x: 2,
	y: 0
}
var left0 = {
	x: 0,
	y: 2
}
var down0 = {
	x: 2,
	y: 4
}
var right0 = {
	x: 4,
	y: 2
}

// keys constant
const keys = {
	w: {
		pressed: false
	},
	a: {
		pressed: false
	},
	s: {
		pressed: false
	},
	d: {
		pressed: false
	}
}

// default player cords
const cords = {x: 2, y: 4}

// default enemy cords
const enemycords = {
	x: Math.floor(Math.random() * 5),
	y: Math.floor(Math.random() * 2),
}

//player sprite
const player = new Sprite({
	position: cordtopos(cords),
	scale: {
		x: window.innerHeight/9,
		y: window.innerHeight/9
	},
	image: playerImage
})

// background sprite
const background = new Sprite({
	position: {
		x: window.innerWidth/2 - window.innerHeight/2,
		y: window.innerHeight/2 - window.innerHeight/2
	},
	scale: {
		x: window.innerHeight,
		y: window.innerHeight
	},
	image: backgroundImage
})

// starting enemy 
const enemy = new Enemy()

// convert cords like {x:0, y:1} to pixel location
function cordtopos(cord) {
	return ({
		x: window.innerWidth/2 - window.innerHeight/2 + (cord.x+2)*window.innerHeight/9,
		y: window.innerHeight/2 - window.innerHeight/2 + (cord.y+2)*window.innerHeight/9
	})
}

// tween/interpolate func
function getTween(b, e, i) {
    return b + ((i/99) * (e-b));
}

// vars
var tweenI = 0
var tweenSpeed = 9
var activeTween = false

var tweenEnemyI = 0
var tweenEnemySpeed = 9
var activeEnemyTween = false

var oldPlayerPositionX = 0
var playerPositionX = 0

var oldPlayerPositionY = 0
var playerPositionY = 0

var oldEnemyPositionX = 0
var enemyPositionX = 0

var oldEnemyPositionY = 0
var enemyPositionY = 0

var floorexit = false
var newfloor = false
var floorexitdir = ''

// frame loop
function animate() {
	// looping
	window.requestAnimationFrame(animate)

	// drawing player and background
	background.draw()
	player.draw()
	enemy.enemy01.draw()

	// Background
	c.fillStyle = '#197238';
	c.fillRect(0, 0, window.innerWidth/2 - window.innerHeight/2, canvas.height);
	c.fillRect(window.innerWidth/2 - window.innerHeight/2 + window.innerHeight, 0, window.innerWidth/2 - window.innerHeight/2, canvas.height);

	// player movement
	if (keys.w.pressed && !activeTween) {
		if (cords.x === top0.x && cords.y === top0.y) {
			floorexit = true
			floorexitdir = 'top'
		}
		
		if (cords.y > 0 || cords.x === top0.x && cords.y === top0.y) {
			oldPlayerPositionY = cordtopos(cords).y
			cords.y -= 1
			if (floorexit) {
				cords.y -= 2
				tweenSpeed = 3
			}
			playerPositionY = cordtopos(cords).y

			activeTween = true
			tweenX = false
		}
	} else if (keys.a.pressed && !activeTween) {
		if (cords.x === left0.x && cords.y === left0.y) {
			floorexit = true
			floorexitdir = 'left'
		}
		
		if (cords.x > 0 || cords.x === left0.x && cords.y === left0.y) {
			oldPlayerPositionX = cordtopos(cords).x
			cords.x -= 1
			if (floorexit) {
				cords.x -= 2
				tweenSpeed = 3
			}
			playerPositionX = cordtopos(cords).x

			activeTween = true
			tweenX = true
			//player.flip()
		}
	} else if (keys.s.pressed && !activeTween) {
		if (cords.x === down0.x && cords.y === down0.y) {
			floorexit = true
			floorexitdir = 'down'
		}
		
		if (cords.y < 4 || cords.x === down0.x && cords.y === down0.y) {
			oldPlayerPositionY = cordtopos(cords).y
			cords.y += 1
			if (floorexit) {
				cords.y += 2
				tweenSpeed = 3
			}
			playerPositionY = cordtopos(cords).y

			activeTween = true
			tweenX = false
		}
	} else if (keys.d.pressed && !activeTween) {
		if (cords.x === right0.x && cords.y === right0.y) {
			floorexit = true
			floorexitdir = 'right'
		}
		
		if (cords.x < 4 || cords.x === right0.x && cords.y === right0.y) {
			oldPlayerPositionX = cordtopos(cords).x
			cords.x += 1
			if (floorexit) {
				cords.x += 2
				tweenSpeed = 3
			}
			playerPositionX = cordtopos(cords).x

			activeTween = true
			tweenX = true
		}
	}

	// tweening system
	if (activeTween) {
		if (tweenX) {
			player.position.x = getTween(oldPlayerPositionX, playerPositionX, tweenI)
		} else {
			player.position.y = getTween(oldPlayerPositionY, playerPositionY, tweenI)
		}
		if (tweenI >= 99) {
			activeTween = false
			tweenI = 0
			if (newfloor) {
				tweenSpeed = 9
				newfloor = false
			}
			if (floorexit) {
				switch (floorexitdir) {
					case 'top':
						cords.x = 2
						cords.y = 7
						player.position = cordtopos(cords)

						oldPlayerPositionY = cordtopos(cords).y
						cords.y -= 3
						playerPositionY = cordtopos(cords).y

						tweenX = false
						break
					case 'left':
						cords.x = 7
						cords.y = 2
						player.position = cordtopos(cords)

						oldPlayerPositionX = cordtopos(cords).x
						cords.x -= 3
						playerPositionX = cordtopos(cords).x
						
						tweenX = true
						break
					case 'down':
						cords.x = 2
						cords.y = -3
						player.position = cordtopos(cords)

						oldPlayerPositionY = cordtopos(cords).y
						cords.y += 3
						playerPositionY = cordtopos(cords).y

						tweenX = false
						break
					case 'right':
						cords.x = -3
						cords.y = 2
						player.position = cordtopos(cords)

						oldPlayerPositionX = cordtopos(cords).x
						cords.x += 3
						playerPositionX = cordtopos(cords).x
						
						tweenX = true
						break
				}

				activeTween = true

				newfloor = true
				floorexit = false
			} else {
				
				oldEnemyPositionX = cordtopos(enemycords).x
				enemycords.x += 1
				enemyPositionX = cordtopos(enemycords).x

				activeEnemyTween = true
				tweenEnemyX = true
			}
		} else {
			tweenI += tweenSpeed
		}
		
	}

	// enemy tween
	if (activeEnemyTween) {
		if (tweenEnemyX) {
			enemy.enemy01.position.x = getTween(oldEnemyPositionX, enemyPositionX, tweenEnemyI)
		} else {
			enemy.enemy01.position.y = getTween(oldEnemyPositionY, enemyPositionY, tweenEnemyI)
		}
		if (tweenEnemyI >= 99) {
			activeEnemyTween = false
			tweenEnemyI = 0
		} else {
			tweenEnemyI += tweenEnemySpeed
		}
	}

	// reset keypressed after each frame
	keys.w.pressed = false
	keys.a.pressed = false
	keys.s.pressed = false
	keys.d.pressed = false
}

// start frame loop
animate()

// keyboard controls
window.addEventListener('keydown', (e) => {
	switch (e.key) {
		case 'w':
			keys.w.pressed = true
			break

		case 'a':
			keys.a.pressed = true
			break

		case 's':
			keys.s.pressed = true
			break

		case 'd':
			keys.d.pressed = true
			break
	}
})

// touch controls
document.addEventListener('swiped-up', function(e) {
    keys.w.pressed = true
});
document.addEventListener('swiped-left', function(e) {
    keys.a.pressed = true
});
document.addEventListener('swiped-down', function(e) {
    keys.s.pressed = true
});
document.addEventListener('swiped-right', function(e) {
    keys.d.pressed = true
});

// Start music once website has been interacted with
let clicked = false
addEventListener('click', () => {
	if (!clicked) {
		audio.MainTheme.play()
	}
	clicked = true
})
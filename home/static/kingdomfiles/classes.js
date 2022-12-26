class Sprite {
	constructor({ position, scale, image }) {
		this.position = position
		this.image = image
		this.scale = scale

		this.image.onload = () => {
			this.width = this.image.width
			this.height = this.image.height
		}
	}

	draw() {
		c.drawImage(
			this.image,
			0,
			0,
			this.image.width,
			this.image.height,
			this.position.x,
			this.position.y,
			this.scale.x,
			this.scale.y
		)
	}

	flipold() {
	  	c.translate(this.position.x+this.image.width,this.position.y);

	  	c.scale(-1,1);

	  	c.drawImage(
		  	this.image, 
		  	this.position.x,
		  	this.position.y,
		  	this.image.width,
		  	this.image.height,
		  	0,
		  	0,
		  	this.image.width,
		  	this.image.height);

	  	c.setTransform(1,0,0,1,0,0);
	}

	flip() {
		player.scale(-1, 0);
	}
}

class Enemy {
	constructor() {
		this.enemy01 = new Sprite({
			position: cordtopos(enemycords),
			scale: {
				x: window.innerHeight/9,
				y: window.innerHeight/9
			},
			image: enemyImage
		})
	}
}
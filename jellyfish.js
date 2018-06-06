function Jellyfish(game, x, y, key, frame) {

	Phaser.Sprite.call(this, game, x, y, key, frame);
	
	//this.idle = this.animations.add()

}

Jellyfish.prototype = Object.create(Phaser.Sprite.prototype);
Jellyfish.prototype.constructor = Jellyfish;

Jellyfish.prototype.update = function() {

	if(Math.sin(game.time.now/700) > 0) {
		this.body.velocity.x = 100;	
		
	} else {
		this.body.velocity.x = -100;	
	}	
}
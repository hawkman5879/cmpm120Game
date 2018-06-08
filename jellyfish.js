function Jellyfish(game, x, y, key, frame) {

	Phaser.Sprite.call(this, game, x, y, key, frame);
	
	this.movementOffSet = game.rnd.realInRange(-1, 1);
	this.movementSpeed = game.rnd.realInRange(-1, 1);
	this.animations.add('jelmov', Phaser.Animation.generateFrameNames('Jellyfish', 1 , 4, '', 1), 0.5, true);
	this.animations.play('jelmov', 4, true);
}

Jellyfish.prototype = Object.create(Phaser.Sprite.prototype);
Jellyfish.prototype.constructor = Jellyfish;

Jellyfish.prototype.update = function() {

	if(Math.sin(this.movementOffSet + game.time.now/500) > 0) {
		this.body.velocity.x = 100 + 50 * this.movementSpeed;	
		
	} else {
		this.body.velocity.x = -100 - 50 * this.movementSpeed;	
	}	

	this.animations.play('jelmov');
}
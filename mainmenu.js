//MAIN MENU STATE

// define MainMenu state and methods
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log('MainMenu: preload');
		
		//loading assets
		game.load.image('Back', 'assets/img/background.png');
		game.load.image('Mid', 'assets/img/midground.png');
	},
	create: function() {
		console.log('MainMenu: create');

		//midground
		midground = game.add.sprite(0, 0, 'Mid');	
		midground.scale.setTo(3, 3);

		//Main beginning menu ----> just the text that shows up
		game.add.text(150, 175, 'SUSHI HUNTERS', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 210, 'By Nick, Brian, and Marcos', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS R TO START', { fontSize: '32px', fill: '#7B241C' });


	},
	update: function() {
		// main menu logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			game.state.start('Story');
		}
	}
}


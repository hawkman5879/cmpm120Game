//STORY STATE

var Story = function(game) {};
Story.prototype = {
	preload: function() {
		console.log('MainMenu: preload');
		game.load.image('background', 'assets/img/TitleScreen.png');

	},
	create: function() {
		console.log('MainMenu: create');
		game.add.text(115, 210, 'TEMP STORY STATE', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS R TO START', { fontSize: '32px', fill: '#7B241C' });

		var background = game.add.sprite(0, 0, 'background');
	},
	update: function() {
		// main menu logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			game.state.start('Level1');
		}
	}
}
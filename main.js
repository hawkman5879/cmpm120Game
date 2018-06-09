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
		game.add.text(115, 255, 'PRESS C for credits', { fontSize: '32px', fill: '#7B241C' });

	},
	update: function() {
		// main menu logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			game.state.start('Story');
		}
		//goes to credits state
		if(game.input.keyboard.isDown(Phaser.Keyboard.C)) {
			game.state.start('credits');
		}
	}
}

//CREDITS STATE
var credits = function(game) {};
credits.prototype = {
	preload: function() {
		console.log('MainMenu: preload');

	},
	create: function() {
		console.log('MainMenu: create');
		game.add.text(115, 210, 'TEMP CREDITS STATE', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS R TO START', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 300, 'Goes Back to MainMenu', { fontSize: '32px', fill: '#7B241C' });


	},
	update: function() {
		//state switching logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			game.state.start('MainMenu');
		}

			
	}
}

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

//GAMEOVER 1 STATE
var GameOver1 = function(game) {};
GameOver1.prototype = {
	preload: function() {
		console.log('MainMenu: preload');


	},
	create: function() {
		console.log('MainMenu: create');
		game.add.text(115, 210, 'TEMP GAMEOVER STATE', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS R TO START', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 300, 'Goes Back To Lvl 1 ATM', { fontSize: '32px', fill: '#7B241C' });


	},
	update: function() {
		// main menu logic
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			air = 100;
			life = 100;
			game.state.start('Level1');
		}
	}
}

//GAMEOVER 2 State
var GameOver2 = function(game) {};
GameOver2.prototype = {
	preload: function() {
		console.log('MainMenu: preload');


	},
	create: function() {
		console.log('MainMenu: create');
		game.add.text(115, 210, 'TEMP GAMEOVER STATE', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS R TO START', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 300, 'Goes Back To Lvl 1 ATM', { fontSize: '32px', fill: '#7B241C' });


	},
	update: function() {
		// main menu logic
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			air = 100;
			life = 100;
			game.state.start('Level2');
		}		
	}
}

//GAMEOVER 3 State
var GameOver3 = function(game) {};
GameOver3.prototype = {
	preload: function() {
		console.log('MainMenu: preload');

	},
	create: function() {
		console.log('MainMenu: create');
		game.add.text(115, 210, 'TEMP GAMEOVER STATE', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS R TO START', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 300, 'Goes Back To Lvl 1 ATM', { fontSize: '32px', fill: '#7B241C' });


	},
	update: function() {
		// main menu logic
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			air = 100;
			life = 100;
			game.state.start('Level3');
		}	
	}
}

//GAMEOVER 4 State
var GameOver4 = function(game) {};
GameOver4.prototype = {
	preload: function() {
		console.log('MainMenu: preload');


	},
	create: function() {
		console.log('MainMenu: create');
		game.add.text(115, 210, 'TEMP GAMEOVER STATE', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS R TO START', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 300, 'Goes Back To Lvl 1 ATM', { fontSize: '32px', fill: '#7B241C' });


	},
	update: function() {
		// main menu logic
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			air = 100;
			life = 100;
			game.state.start('Level4');
		}		
	}
}

//Ending State
var ending = function(game) {};
ending.prototype = {
	preload: function() {
		console.log('MainMenu: preload');


	},
	create: function() {
		console.log('MainMenu: create');
		game.add.text(115, 210, 'TEMP ending STATE', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS R TO START', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 300, 'Goes Back To MainMenu', { fontSize: '32px', fill: '#7B241C' });


	},
	update: function() {
		//end game logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			game.state.start('MainMenu');
		}
	
	}
}

//AIR FUNCTIONS:
function subAir(){
	air = air - 12.5;
}

function airF(monkas, bubbles){
	air = 100;
}

//when enemies hit player
function subLife(monkas,enemies){
	enemies.destroy();
	life = life - 25;
}

function eatSushi(monkas, sushi) {
	sushi.destroy();
	if(life == 100){
		life = life;
	} else{
		life = 100;
	}
}



//add states to StateManager and start MainMenu
game.state.add('MainMenu', MainMenu);
game.state.add('credits', credits);
game.state.add('Story', Story);
game.state.add('Level1', Level1);
game.state.add('Level2', Level2);
game.state.add('Level3', Level3);
game.state.add('Level4', Level4);
game.state.add('GameOver1', GameOver1);
game.state.add('GameOver2', GameOver2);
game.state.add('GameOver3', GameOver3);
game.state.add('GameOver4', GameOver4);
game.state.add('ending', ending);
game.state.start('Level1');
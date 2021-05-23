
import { 
    grid_width, grid_height,
    move_a,move_r,
    zoom_, resizeWorld,
    new_,
    input_xaxis,input_yaxis
} from './modules/units.mjs'; 

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var tiles;

var player;
var player_unit

var cursors;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('tile', 'assets/tile.png');
    this.load.image('player', 'assets/player.png');
}

function create ()
{
    console.clear();
    // grid
    tiles = this.physics.add.staticGroup();
    for(let i = 0;i<grid_height;i++){
        for(let j = 0;j<grid_width;j++){
           let tile = new_('tile',tiles);
           move_a(tile, i, j);
        }
    }

    //player
    player = this.physics.add.staticGroup();
    player_unit = player.create(0,0,'player');
    player_unit.setScale(zoom_());
    move_a(player_unit, 0, 0);

    //user inputs
    cursors = this.input.keyboard.createCursorKeys();

    
}

function update ()
{
    if(true){
        move_r(player_unit, input_xaxis(cursors), input_yaxis(cursors));
        cursors.canMove = false;
    }
    if(cursors.up.isDown){
        resizeWorld(zoom_()+0.1, player, tiles);
    }
}






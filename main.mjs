
import { 
    grid_width, grid_height,
    move_a,move_r,
    zoom,
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

var units = [];
var tiles;

var player;

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
    units = this.physics.add.staticGroup();
    player = units.create(0,0,'player');
    player.setScale(zoom);
    move_a(player, 0, 0);

    //user inputs
    cursors = this.input.keyboard.createCursorKeys();
}

function update ()
{
    if(true){
        move_r(player, input_xaxis(cursors), input_yaxis(cursors));
        cursors.canMove = false;
    }
}






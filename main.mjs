import { 
    grid_width_123, grid_height_123,
    tile_height_123,tile_width_123,
    world_offset_height_123,world_offset_width_123,
    grid_gap_height_123,grid_gap_width_123
} from './modules/world_grid_tiles.mjs';

import { 
    player_x_123, player_y_123,
} from './modules/player.mjs';

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

var player;
var tiles;
var cursors;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('tile', 'assets/tile.png');
    this.load.image('player', 'assets/player.png');

}

function create ()
{
    
    tiles = this.physics.add.staticGroup();
    for(let i = 0;i<grid_height_123;i++){
        for(let j = 0;j<grid_width_123;j++){
            tiles.create(world_offset_height_123+i*(tile_height_123+grid_gap_height_123), 
                world_offset_width_123+j*(tile_width_123+grid_gap_width_123), 
                'tile');
        }
    }

    player = this.physics.add.sprite(world_offset_height_123, world_offset_height_123, 'player');

}

function update ()
{
   
}




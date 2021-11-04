import {
    new_,
} from './modules/misc.mjs';

import {
    rythm_activated,
    rythm_bar_displayed,
    rythm_breakable,
    time_between_ticks,
    event_rythmBreakable,
    init_rythm_var,
    tick_withRythmBar,
    tick_noRythmBar,
} from './modules/rythm.mjs';

import {
    grid_width,
    grid_height,
    move_a,
    zoom_,
    getTile
} from './modules/grid.mjs';

import {
    Graph
} from './modules/graph/graph.mjs';

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
    },
};

var tiles;

export var units;
var mobs = [];
export var player_unit;

export var cursors;

var rythm = {};

var game = new Phaser.Game(config);

var graph;

function preload() {
    this.load.image('tile', 'assets/tile.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('mob', 'assets/mob.png');
}

function create() {
    console.clear();

    // grid
    tiles = this.physics.add.staticGroup();
    for (let i = 0; i < grid_height; i++) {
        for (let j = 0; j < grid_width; j++) {
            let tile = new_('tile', tiles);
            move_a(tile, i, j);
        }
    }

    //graph
    graph = new Graph();
    for (let i = 0; i < grid_height; i++) {
        for (let j = 0; j < grid_width; j++) {
            let tile = getTile(i, j, tiles)
            graph.addVertex(tile)
            if (x)
            //graph.addEdge(vertex1, vertex2, 3)
        }
    }


    //player
    units = this.physics.add.staticGroup();
    player_unit = units.create(0, 0, 'player');
    player_unit.setScale(zoom_());
    player_unit.type = "player"
    player_unit.id = "1"
    move_a(player_unit, 0, 0);

    //user inputs
    cursors = this.input.keyboard.createCursorKeys();

    //setup tick calls
    rythm.subTick = {};
    rythm.movedSinceLastTick = false;

    if (rythm_activated) {
        if (rythm_bar_displayed) {
            init_rythm_var(rythm);
            setInterval(() => {
                tick_withRythmBar(rythm, cursors, player_unit)
            }, time_between_ticks);
        } else {
            setInterval(() => {
                tick_noRythmBar(rythm, cursors, player_unit)
            }, time_between_ticks);
        }
    }
    if (rythm_breakable) {
        event_rythmBreakable(document, player_unit, rythm.subTick);
    }

    //generating MAP
    //mobs
    let unit = units.create(0, 0, 'mob');
    mobs.push(unit);
    unit.setScale(zoom_());
    unit.type = "mob"
    unit.id = "2"
    move_a(unit, 5, 5);
}

function update() {

}
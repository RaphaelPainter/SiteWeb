
import {
    zoom
} from './grid.mjs'; 

// CREATION
export function new_(spriteName, group){
    let sprite = group.create(0,0,spriteName);
    sprite.setScale(zoom);
    return sprite;
}






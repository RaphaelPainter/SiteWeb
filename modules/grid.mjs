import {
    log
} from './log.mjs';

//GRID CONFIG
export const world_offset_height = 50;
export const world_offset_width = 50;
export const grid_width = 10;
export const grid_height = 10;
export const grid_gap_height = 1;
export const grid_gap_width = 1;
export const tile_height = 64;
export const tile_width = 64;

//GETTER

export function getTile(x, y, tiles) {
    if ((y * grid_gap_width + x) > tiles.getChildren().length || (x + y) < 0) {
        log(x + " " + y + "is not in the grid")
    }
    return tiles.getChildren()[y * grid_gap_width + x]
}

//MOVEMENT
export function refreshPosition(unit) {
    unit.setX(world_offset_width + unit.idx * (tile_width + grid_gap_width) * zoom)
    unit.setY(world_offset_height + unit.idy * (tile_height + grid_gap_height) * zoom)
}
export function move_a(unit, width_idx, height_idx) {
    if (isValidPosition(width_idx, height_idx)) {
        unit.idx = width_idx;
        unit.idy = height_idx;
        refreshPosition(unit)
        log(unit.texture.key + "=>" + height_idx + "," + width_idx)
    } else {
        log(unit.texture.key + "=/>" + height_idx + "," + width_idx)
    }
}
export function move_r(unit, height_offset, width_offset) {
    move_a(unit, unit.idx + height_offset, unit.idy + width_offset)
}
export function isValidPosition(height_idx, width_idx) {
    if (height_idx < 0 || height_idx >= grid_height) {
        return false;
    } else if (width_idx < 0 || width_idx >= grid_width) {
        return false;
    } else {
        return true;
    }
}

//ZOOM
export var zoom = 0.8;
export function zoom_group(value, group) {
    apply(group, zoom_unit, value);
    apply(group, refreshPosition)
}

function zoom_unit(unit, value) {
    unit.setScale(value)
}
export function resizeWorld(value, ...groups) {
    zoom = value;
    groups.forEach(e => { zoom_group(value, e) })
}
export function zoom_() {
    return zoom;
}
export function zoomEvent(event, player, tiles) {
    if (event.deltaY < 0 && zoom_() < 4.5) {
        resizeWorld(zoom_() - event.deltaY / 100 * 0.25, player, tiles);
    } else if (event.deltaY > 0 && zoom_() > 0.5) {
        resizeWorld(zoom_() - event.deltaY / 100 * 0.25, player, tiles);
    }
}

//LOGGING
const logMode = true;
export function log(msg){
    if(logMode){
        //TODO: proper log with levels and tags
        console.log("units.mjs: " + " " + msg)
    }
}
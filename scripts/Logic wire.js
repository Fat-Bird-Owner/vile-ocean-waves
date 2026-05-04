Events.on(TapEvent, event => {
try {
const {tile} = event;
const block = tile.block();
const targetBlock = Vars.content.block("surge-router");
if (block != targetBlock) return;

function nearby(build){
const {tile} = build;
const nextTile = tile.nearby(build.rotation);
}
  
} catch(e){
Vars.ui.showInfoToast(e,5); 
}});

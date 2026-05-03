Events.on(TileChangeEvent, event => {
try {
const {tile} = event;
const block = Vars.content.block("gr-sporeoplasma");
const tileBlock = tile.block();

if (!block || !tile) return;
for (let i = 0; i < 2; i++){
const ro = Mathf.round(Mathf.random(0,3));
const spreadTile = tile.nearby(ro);

if (!spreadTile.solid() && spreadTile.block != block){
Time.runTask(0.45,() => {
try{
tile.setBlock(block, build.team());
} catch(e){
Vars.ui.showInfoToast(e,5);
}});
}
  
}


} catch(e){
Vars.ui.showInfoToast(e,5);
}});

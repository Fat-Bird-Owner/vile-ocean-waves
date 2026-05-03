Events.on(TileChangeEvent, event => {
try {
const {tile} = event;
const block = Vars.content.block("gr-sporeoplasma");
const tileBlock = tile.block();

if (!block || !tile || tileBlock != block) return;
for (let i = 0; i < 0; i++){
const ro = Mathf.round(Mathf.random(0,3));
const spreadTile = tile.nearby(ro);
  
if(!spreadTile) continue;
if (!spreadTile.solid() && spreadTile.block() != block){
Time.runTask(0.45,() => {
try{
spreadTile.setBlock(block, tile.team());
} catch(e){
Vars.ui.showInfoToast(e,5);
}});
}
  
}


} catch(e){
Vars.ui.showInfoToast(e,5);
}});

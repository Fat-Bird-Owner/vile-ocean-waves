Events.on(TileChangeEvent, event => {
try {
const {tile} = event;
const block = Vars.content.block("gr-sporeoplasma");
const tileBlock = tile.block();
const limit = 45;
  
if (!block || !tile || tileBlock != block) return;

Time.run(0.5 * 60 , () => {
try{
if (Vars.state.isPaused() || !Vars.state.isPlaying()) return;

let size = 0;
Groups.build.each(b => {
if (b.block == block) size++;
});
  
for (let i = 0; i < 3; i++){
  
const ro = Mathf.round(Mathf.random(0,3));
const spreadTile = tile.nearby(ro);
  
if(!spreadTile || size >= (limit * limit)) continue;
if (!spreadTile.solid() && spreadTile.block() != block){
spreadTile.setBlock(block, tile.team());
size++;
}
}  

} catch(e){
Vars.ui.showInfoToast(e,5);
}
});


} catch(e){
Vars.ui.showInfoToast(e,5);
}});

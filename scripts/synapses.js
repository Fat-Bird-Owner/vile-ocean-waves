const {indexer} = Vars;
const block = Vars.content.block("meld-meld-synapse");

Events.on(BlockDestroyEvent, event => {
try {
const {tile} = event;
const blockTile = tile.block();
if (blockTile != block) return;
const {build} = tile;
let delay = 0;

indexer.eachBlock(
build.team, 
build.x, 
build.y, 
8 * Vars.tileSize 
b => b.block() != block,
b => {
delay += Mathf.random(0.05, 0.1);
Time.runTask(delay, {
b.kill();
});

}  
);

  
} catch(e){
Vars.ui.showInfoToast(e,5);
}});

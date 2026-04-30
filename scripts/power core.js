var cores = [];
const block = Vars.content.block("core-shard");

Events.on(WorldLoadEvent,() => {
try {
cores = [];  
Vars.world.tiles.each(tile => {

if(tile != null && tile.build && tile.block() == block){
const build = tile.build;
cores.push(tile.build);
Vars.ui.showInfoToast(tile.build, 5);
}
});
  
} catch(e){
Vars.ui.showInfoToast(e + "[red] - CoreBlock",5);
}});

Events.run(Trigger.update, () => {
try {
if (cores.length <= 0) return;
for (let i = 0; i < cores.length; i++){
if(!cores[i] || !cores[i].power || !cores[i].power.graph) continue;

const graph = cores[i].power.graph;
graph.transferPower(25/60);
}
  
} catch(e){
Vars.ui.showInfoToast(e + "[red] - PowerCore update", 5);
}});

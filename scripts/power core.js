var cores = [];
const block = Vars.content.block("battery");
block.hasPower = true;
block.consumePowerBuffered(1250);
block.outputsPower = true;

Events.on(WorldLoadEvent,() => {
try {
cores = [];  
Vars.world.tiles.each(tile => {

if(tile != null && tile.build && tile.block() == block){
const build = tile.build;
cores.push(build);
Vars.ui.showInfoToast(build, 5);

if(tile.build){
tile.build.power = new PowerModule();
tile.build.power.graph.add(tile.build);
}
  
}
});

Vars.ui.showInfoToast(String(cores), 5);
  
} catch(e){
Vars.ui.showInfoToast(e + "[red] - CoreBlock",5);
}});

Events.run(Trigger.update, () => {
try {
if (cores.length <= 0) return;
for (let i = 0; i < cores.length; i++){
if(!cores[i] || !cores[i].power || !cores[i].power.graph) continue;

const graph = cores[i].power.graph;
cores[i].power.status = 1;
cores[i].power.graph.batteryStored += 25/60;
  
}
  
} catch(e){
Vars.ui.showInfoToast(e + "[red] - PowerCore update", 5);
}});

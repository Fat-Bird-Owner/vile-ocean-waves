var cores = [];
const block = Vars.content.block("battery");
block.hasPower = true;
block.consumePowerBuffered(1250);
block.outputsPower = true;

Events.on(WorldLoadEvent, () => {
    Timer.schedule(() => {
        try {

            cores = [];

            Vars.world.tiles.each(tile => {

                if(!tile || !tile.build) return;

                if(tile.build.block == block){

                    const build = tile.build;

                    build.power = new PowerModule();
                    build.power.graph = new PowerGraph();
                    build.power.graph.add(build);

                    cores.push(build);
                }

            });

            Vars.ui.showInfoToast("Found: " + cores.length, 5);

        } catch(e){
            Vars.ui.showInfoToast(e + "", 5);
        }
    }, 0.5);
});

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

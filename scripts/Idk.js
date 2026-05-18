const fx = Fx.ventSteam.wrap(Color.valueOf("D3DEE466"));
let builds = null;
let time = 0;

Events.run(Trigger.update, () => {
try {

if (
!Weathers.snow.isActive() ||
!Vars.state.isPlaying() ||
Vars.state.isPaused()
) return;

const block = Vars.content.block("gr-boiler");

time += Time.delta;
if (time < 60) return;
time = 0;

builds = Groups.build;
if (builds == null) return;

const protectedTiles = {};

builds.each(b => {
try{
if (
b &&
b.isValid() &&
b.block == block &&
b.enabled &&
b.efficiency > 0
){
const radius = 10;

for(let dx = -radius; dx <= radius; dx++){
for(let dy = -radius; dy <= radius; dy++){

const tx = Math.floor(b.tile.x + dx);
const ty = Math.floor(b.tile.y + dy);

protectedTiles[tx + "," + ty] = true;

}
}
}
}catch(e){}
});

builds.each(p => {
try {

if (!p || !p.isValid() || !p.block.update) return;

if (
p.block instanceof StackConveyor ||
p.block instanceof Conveyor ||
p.block instanceof Duct ||
p.block instanceof Conduit ||
p.block instanceof ItemBridge ||
p.block instanceof Router
) return;

if (p.block == block) return;

if (!protectedTiles[p.tile.x + "," + p.tile.y]) {
p.applySlowdown(0.5, 60);
/*p.damage(p.maxHealth / 20);*/
fx.at(p.x, p.y);
}

} catch(e){}
});

} catch(e){
Vars.ui.showInfoToast(String(e), 5);
}
});

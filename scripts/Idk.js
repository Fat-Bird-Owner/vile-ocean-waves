const fx = Fx.mineSmall.wrap(Color.valueOf("D3DEE466"));
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

builds = Groups.build.copy();
time = 0;

if (builds == null) return;

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

const next = Vars.indexer.findTile(
p.team,
p.x,
p.y,
10 * Vars.tilesize,
b => b.block == block
);

if (!next && (p.block != block || p.status() != BlockStatus.active)) {
p.enabled = true;
p.applySlowdown(0.5, 60);
p.damage(p.maxHealth / 20);
fx.at(p.x, p.y);
}

} catch(e){
Vars.ui.showInfoToast(String(e) + "[red] - inner", 5);
}
});

} catch(e){
Vars.ui.showInfoToast(String(e) + " - Outer", 5);
}
});

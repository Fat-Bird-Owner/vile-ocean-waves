const fx = Fx.mineSmall.wrap(Color.valueOf("D3DEE466"));
let builds = null;
let time = 0;

Events.run(Trigger.update, () => {
try {
if (Time.time % 60 > 1) return;
if (!Weathers.snow.isActive()) return; 
  
const block = Vars.content.block("gr-boiler");

time += Time.delta;
if (build == null || time >= 60){
builds = Groups.build;
time = 0;
}
  
builds.each(p => {
try {

if (!p || !p.isValid() || !p.block.update) return;
if (p.block instanceof StackConveyor || p.block instanceof Conveyor || p.block instanceof Duct) return;
if (p.block instanceof Conduit || p.block instanceof ItemBridge || p.block instanceof Router) return;
  
const next = Vars.indexer.findTile(
p.team,
p.x,
p.y, 
10 * Vars.tilesize,
b => b.block == block
);
  
if (!next && p.block != block) {
p.enabled = true;
p.applySlowdown(0.5 , 60);
p.damage(p.maxHealth / 20);
fx.at(p.x, p.y);
}

} catch(e){
Vars.ui.showInfoToast(e + "[red] - inner",5);
}});

} catch(e){
Vars.ui.showInfoToast(e + " - Outer" ,5);
}});

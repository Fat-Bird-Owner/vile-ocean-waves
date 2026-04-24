const fx = Fx.mineSmall.wrap(Color.valueOf("D3DEE466"));

Events.run(Trigger.update, () => {
try {
if (Time.time % 60 > 1) return;
if (!Weathers.snow.isActive()) return; 
  
const block = Vars.content.block("gr-boiler");

Groups.build.each(p => {
try {
  
if (p.block instanceof StackConveyor || p.block instanceof Conveyor || p.block instanceof Duct) return;
if (p.block instanceof Conduit || p.block instanceof ItemBridge || p.block instanceof Router) return;
  
const next = Vars.indexer.findTile(
p.team,
p.x,
p.y, 
10 * Vars.tilesize,
o => {
    if (o == null || !o.isValid()) return false;
    if(o.block != block) return false;
    if(!o.enabled) return false;
    if(o.efficiency <= 0) return false;
    return true;
}
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

Events.run(Trigger.update, () => {
try {
if (Time.time % 60 > 1) return;
if (!Weathers.snow.isActive()) return; 
  
var builds = [];
const block = Vars.content.block("gr-boiler");
  
Groups.build.each(p => {

if (p.block instanceof StackConveyor || p.block instanceof Conveyor || p.block instanceof Duct) return;
if (p.block instanceof Conduit || p.block instanceof ItemBridge || p.block instanceof Router) return;
  
const next = Vars.indexer.findTile(
p.team,
p.x,
p.y, 
10 * Vars.tilesize,
o => o.block == block
);

if (!next && p.block != block) {
p.enabled = true;
p.applySlowdown(0.5 , 60);
p.damage(p.maxHealth / 20);
} else {
p.enabled = true;

}
  
});

} catch(e){
Vars.ui.showInfoToast(e,5);
}});

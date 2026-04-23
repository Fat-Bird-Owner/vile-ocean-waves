Events.run(Trigger.update, () => {
try {
if (!Weathers.snow.isActive()) return; 

var builds = [];
const block = Vars.content.block("gr-boiler");
  
Groups.build.each(p => {
const next = BlockIndexer.findTile(
build.team,
build.x,
build.y, 
6 * Vars.tileSize,
o => o.block == block
);

if (!next) {
p.enabled = 0;
} else {
p.enabled = 1;
}
  
});

} catch(e){
Vars.ui.showInfoToast(e,5);
}});

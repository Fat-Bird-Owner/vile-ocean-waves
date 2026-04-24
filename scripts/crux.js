const particle = new ParticleEffect();
Object.assign(particle, {
particles: 1,
cone: 15,
cap: false,
layer: 22,
lifetime: 600,
colorTo: Color.valueOf("00000000")
});

Events.on(BlockDestroyEvent, e => {
try{ 
const tile = e.tile;
const block = tile.block();
const build = tile.build;

particle.region = String(block.uiIcon);
particle.sizeFrom = particle.sizeTo = block.size * 8;
particle.at(build.x, build.y);
  
} catch(e){
Vars.ui.showInfoToast(e,5); 
}});

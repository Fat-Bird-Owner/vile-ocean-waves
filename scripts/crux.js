Events.on(BlockDestroyEvent, e => {
try{ 
const tile = e.tile;
const block = tile.block();
const build = tile.build;

const particle = new ParticleEffect();
Object.assign(particle, {
particles: 1,
cone: 15,
cap: false,
layer: 22,
length: 0.1,
lifetime: 600,
colorTo: Color.valueOf("00000000"),
colorFrom: Color.valueOf("7f7f7fff")
});
  
particle.region = String(block.uiIcon);
particle.sizeFrom = particle.sizeTo = block.size * 4;
particle.lifetime = Mathf.random(900,3000);
particle.at(build.x, build.y);
particle.baseLength = Mathf.random(-4,4);
particle.offset = Mathf.random(-15,15) + (build.rotation * 90);
  
} catch(e){
Vars.ui.showInfoToast(e,5); 
}});

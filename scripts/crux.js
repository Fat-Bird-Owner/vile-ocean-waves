Events.on(BlockDestroyEvent, e => {
try{ 
/*if (!Core.settings.getBool("wreckEnabled")) return;*/
  
const tile = e.tile;
const block = tile.block();
const build = tile.build;

const particle = new ParticleEffect();
Object.assign(particle, {
particles: 8,
cone: 15,
cap: false,
layer: 22,
length: 0.1,
lifetime: 600,
colorTo: Color.valueOf("00000000"),
colorFrom: Color.valueOf("2b2b2bff"),
interp: Interp.pow3In
});
  
particle.region = String(block.uiIcon);
particle.sizeFrom = particle.sizeTo = block.size * 3.95;
particle.lifetime = Mathf.random(300,3000);
particle.at(build.x, build.y);
particle.baseLength = Mathf.random(-5,5);
particle.length = Mathf.random(0.1,8);
particle.spin = Mathf.random(-5, 5) / 10;
particle.offset = Mathf.random(-15,15) + (build.rotation * 90);
  
} catch(e){
Vars.ui.showInfoToast(e,5); 
}});

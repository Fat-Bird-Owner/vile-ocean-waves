Events.on(BlockDestroyEvent, e => {
try{ 
if (!Core.settings.getBool("wreckEnabled")) return;
  
const tile = e.tile;
const unit = e.unit;
const type = unit.type;
  
const particle = new ParticleEffect();
Object.assign(particle, {
particles: 1,
cone: 40,
cap: false,
layer: 18,
length: 0.1,
lifetime: 600,
colorTo: Color.valueOf("00000000"),
colorFrom: Color.valueOf("7b7b7bff"),
interp: Interp.sineIn,
clip: 1000
});
  
particle.region = String(type.uiIcon);
particle.sizeFrom = particle.sizeTo = unit.hitSize * 0.95;
particle.lifetime = Mathf.random(300,3000);
particle.at(unit.x, unit.y);
particle.baseLength = Mathf.random(-8,8);
particle.offset = Mathf.random(-15,15) + (unit.rotation);
  
} catch(e){
Vars.ui.showInfoToast(e,5); 
}});

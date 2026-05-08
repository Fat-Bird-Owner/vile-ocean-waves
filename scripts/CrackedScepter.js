const unit = UnitTypes.scepter;

const weapon0 = unit.weapons.get(0); 
weapon0.reload = 8;
weapon0.rotate = true;

const weapon1 = unit.weapons.get(1);
weapon1.rotate = true;
weapon1.reload = 8;
weapon1.shootStatus = StatusEffects.slow;
weapon1.shootStatusDuration = 2.25 * 60;
weapon1.bullet.inaccuracy = 20;

const shoot = new ShootPattern(); 
shoot.shots = 4;
shoot.shotDelay = 0;

for (let i = 2; i < unit.weapons.size; i++){
const smol = unit.weapons.get(i);
smol.shoot = shoot;
smol.inaccuracy = 25;
}

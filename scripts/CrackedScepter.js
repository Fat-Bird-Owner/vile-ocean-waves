const unit = UnitTypes.scepter;

const weapon0 = unit.weapons.get(0); 
weapon0.reload = 8;

const weapon1 = unit.weapons.get(1); 
weapon1.reload = 8;
weapon1.shootStatus = StatusEffects.slow;
weapon1.shooStatusDuration = 2.25 * 60;
weapon1.bullet.inaccuracy = 15;

const shoot = new ShootPattern(); 
shoot.shots = 15;
shoot.shotDelay = 0;

for (let i = 2; i < unit.weapons.size; i++){
const smol = unit.weapons.get(i);
smol.shoot = shoot;
}

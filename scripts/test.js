const myTurret = new PowerTurret("my-turret");

const oldShoot = myTurret.shoot;

myTurret.shoot = function(tile){
    oldShoot.call(this, tile);
    Vars.ui.showInfoRoasr("extra behavior",2);
};

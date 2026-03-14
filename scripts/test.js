try{
const myTurret = new PowerTurret("my-turret");
myTurret.shootType == Blocks.arc.shootType;
    
const oldShoot = myTurret.shoot;

myTurret.shoot = function(tile){
    oldShoot.call(this, tile);
    Vars.ui.showInfoRoasr("extra behavior",2);
};

} catch(e){
Vars.ui.showInfoToast(e,10);
}

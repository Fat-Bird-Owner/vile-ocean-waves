try{
const myTurret = new ItemTurret("my-turret");
myTurret.ammoTypes = Blocks.duo.ammoTypes;
    
const oldShoot = myTurret.shoot;

myTurret.shoot = function(tile){
    oldShoot.call(this, tile);
    Vars.ui.showInfoRoasr("extra behavior",2);
};

} catch(e){
Vars.ui.showInfoToast(e,10);
}

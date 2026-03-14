try{

const myTurret = new ItemTurret("my-turret");
myTurret.ammoTypes = Blocks.duo.ammoTypes;

}catch(e){
    Vars.ui.showInfoToast(e, 10);
}

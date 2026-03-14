try{

const myTurret = new ItemTurret("my-turret");
myTurret.ammoTypes = Blocks.duo.ammoTypes;

myTurret.buildType = () => {
    const b = new JavaAdapter(ItemTurret.ItemTurretBuild, {

        shoot(type){
            this.super$shoot(type);
            Vars.ui.showInfoToast("extra behavior", 2);
        }

    }, myTurret);

    return b;
};

}catch(e){
    Vars.ui.showInfoToast(e, 10);
}

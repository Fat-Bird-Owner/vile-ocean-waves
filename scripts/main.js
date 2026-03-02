Events.on(TapEvent, event => {

if (event.tile != null){

var sound = Sounds.click;

if (!sound){
Vars.ui.showInfoToast("bruh",2);
return;
}

var build = event.tile.build;
var block = event.tile.block();

if (block != Blocks.combustionGenerator) return;

build.handleStack(Items.coal,1,null);
Fx.dooropenlarge.at(build.x,build.y);
sound.at(build.x,build.y);

}

})

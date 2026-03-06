
Events.on(BlockBuildEndEvent, event => { 
try {
if (event.breaking == true) return;
const tile = event.tile



} catch (e) {
Vars.ui.showInfoToast(e,6.5);
}})


Events.on(SectorLaunchEvent, event => {
try {

const sector = event.sector;
const info = sector.info;
  
  if (sector && info){
  const attempts = info.attempts;

  Timer.schedule(() => {  
  Vars.ui.showInfoFade("Attempt [accent]" + attempts,4.5); 
  }, 2.667);

}

  
} catch(e){
    Timer.schedule(() => {  
Vars.ui.showInfoFade(e,3);
    },1.5);
}
  
});





Events.on(GeneratorPressureExplodeEvent, event => {

try {
// Find entity otherwise return if is then if the block type isnt the target's also return

var target = Vars.content.getByName(ContentType.block, "neoplasia-reactor");
  
  if(event.build && event.build.block == target){  
  
    var x = event.build.x;
    var y = event.build.y;
    var block = Vars.content.getByName(ContentType.block, "gr-sporeoplasma");  

    if (!event.build.tile || !block) return;

    Vars.ui.announce("[red]///Sporeoplasma Detected///",4.5);
    
    Timer.schedule(() => {  
    event.build.tile.setBlock(block,Team.get(4),1);
    }, 0.15);

  }
  
} catch(e){
Vars.ui.showInfoToast(e,3);
}
  
})




Events.on(ClientLoadEvent, e => { 
  
try{

const display = Core.bundle.get("mod.gr.display");
const title = Core.bundle.get("mod.gr.mail");
  
MapResizeDialog.maxSize = 2500;
Vars.ui.showText(title,display,Align.center);
    
} catch(e) {
Vars.ui.showText("Not work",e,Align.center);
}

})

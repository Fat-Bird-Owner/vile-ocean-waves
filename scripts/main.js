try{

function Loop(){
if (Vars.world == null) return;

Vars.ui.showInfoFade("work",0.15);
   
const indexer = Vars.indexer;
Vars.indexer.allBuildings(0, 0, 999999, b => {
    const blockType = b.block;
    if (blockType != Blocks.copperWall) return;

    b.damage(1);

});

Timer.schedule({
Loop()
}, 0.25);
    
}    

   
Events.on(WorldLoadEvent, e => {
try {

loop()
    
}catch(err){
Vars.ui.showInfoToast(err,3);
}
});
  

/*
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
Vars.ui.showText("e",e,Align.center);
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






*/

} catch(e){
Vars.ui.showText("e",e,Align.center);
}

Events.on(ContentInitEvent, e => {
try {
const block = Vars.content.block("conduit");

// load region 0
const top0 = Core.atlas.find("conduit" + "-top-0");
const bot0 = Core.atlas.find("conduit" + "-bottom-0");

// overwrite all frames
for(let i = 0; i < block.topRegions.length; i++){
    block.topRegions[i] = top0;
}

for(let i = 0; i < block.botRegions.length; i++){
    block.botRegions[i] = bot0;
}

} catch(e) {
Vars.ui.showText("e",e,Align.center);
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


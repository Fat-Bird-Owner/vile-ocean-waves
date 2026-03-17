const modifiers = ["conveyor"];

Events.on(ResearchEvent, e => {
try {

const content = e.content;

modifiers.forEach(function(v){
const target = Vars.content.getByName(ContentType.block,v);
if (!target || content != target) return;
content.clearUnlock()

if (v == "conveyor"){
Vars.ui.hudfrag.showToast("Drones Disabled.");

const facility = Vars.content.getByName(ContentType.block,"junction");
const dropzone = Vars.content.getByName(ContentType.block,"unit-cargo-unload-point");

const banned = Vars.state.rules.bannedBlocks;
banned.add(facility);
banned.add(dropzone);

}



});

} catch(e){
Vars.ui.showInfoToast(e,5);
}
});


Events.on(SectorLaunchEvent, event => {
try {

const target = Vars.content.getByName(ContentType.block,"conveyor");
target.clearUnlock();

} catch(e){
Timer.schedule(() => {  
Vars.ui.showText("e",e,Align.center);
},1.5);
}});


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

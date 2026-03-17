const modifiers = ["gr-dedrone"];

Events.on(ResearchEvent, e => {
try {

const content = e.content;

modifiers.forEach(function(v){
const target = Vars.content.getByName(ContentType.status,v);
if (!target || content != target) content.clearUnlock() return;

//const tex = Core.atlas.find(v);

if (v === "gr-dedrone"){
Vars.ui.hudfrag.showToast(tex,"Drones Disabled.");

const facility = Vars.content.getByName(ContentType.block,"gr-drone-facility");
const dropzone = Vars.content.getByName(ContentType.block,"gr-facility-dropzone");

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

const target = Vars.content.getByName(ContentType.status,"gr-dedrone");
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

function GetValid(type,name){
const target = Vars.content.getByName(ContentType.unit, name);
if (target == null || target != type) return false;
return true;
}


Events.on(UnitSpawnEvent, e => {
try{

const unit = e.unit;

if(!GetValid(unit.type,"gr-drive") || !GetValid(unit.type,"gr-barracade")) return;
if(!Vars.state.isCampaign()) return;
unit.type.quietUnlock();

const name = unit.type.localizedName;
const message = "Enemy encyclopedia updated";
Vars.ui.hudFrag.showToast(unit.type.previewRegion, message);
  
}catch(err){
Vars.ui.showInfoToast(err, 3);
}
});


Events.on(SectorLaunchEvent, event => {
try {

Vars.content.unit("gr-barracade").clearUnlock();
Vars.content.unit("gr-drive").clearUnlock();
 
} catch(e){
Timer.schedule(() => {  
Vars.ui.showText("e",e,Align.center);
},1.5);
} });

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


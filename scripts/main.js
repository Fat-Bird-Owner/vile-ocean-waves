Events.on(UnitDamageEvent, e => {
try {

const unit = e.unit;
if (unit == null) return;

const type = unit.type
const target = Vars.content.getByName(ContentType.unit, "gr-electron");
if (type != target) return;

Sounds.shootArc.at(unit.x,unit.y);
Lightning.create(
    unit.team,
    Color.valueOf("bccae0ff"),
    35,
    unit.x,
    unit.y,
    Mathf.random(360),
    24 + Mathf.random(24)
);
    
} catch(e){
Vars.ui.showInfoToast(e,5);
}});

Events.on(ResearchEvent, e => {
    try {
        const content = e.content;
        const gier = Planets.gier;

        if (!Vars.state.isGame() || Vars.state.getPlanet() != gier || Vars.state.wave != 1) return;

        const drone = Vars.content.getByName(ContentType.status, "gr-dedrone");
        const reinforced = Vars.content.getByName(ContentType.status, "gr-reinforced");
        const delisted = Vars.content.getByName(ContentType.status, "gr-delisted");
    
        if (content == drone) {
            drone.clearUnlock();
            const facility = Vars.content.getByName(ContentType.block,"gr-drone-facility");
            const dropzone = Vars.content.getByName(ContentType.block,"gr-facility-dropzone");
            
            Vars.ui.hudfrag.showToast(Icon.settings, "[tan]Dedrone[red] Enabled");
            Vars.state.rules.bannedBlocks.add(facility);
            Vars.state.rules.bannedBlocks.add(dropzone);
        }

        if (content == reinforced) {
            Vars.ui.hudfrag.showToast(Icon.settings, "[lightgrey]Reinforced[red] Enabled");

            Vars.state.rules.teams.get(Team.get(5)).unitHealthMultiplier = 1.45;
            reinforced.clearUnlock();
        }

        if (content == delisted) {
            delisted.clearUnlock();
            const outpost = Vars.content.getByName(ContentType.block,"gr-outpost");
            
            Vars.ui.hudfrag.showToast(Icon.settings, "[accent]Delisted[red] Enabled");
            Vars.state.rules.bannedBlocks.add(outpost);
        }

        drone.clearUnlock();
        reinforced.clearUnlock();
        delisted.clearUnlock();   
        
    } catch(err){
        Vars.ui.showInfoToast(err, 5);
    }
});


Events.on(SectorLaunchEvent, event => {
try {
Vars.ui.showInfoToast("planet: " + Vars.state.getPlanet(), 3);
    
const dedrone = Vars.content.getByName(ContentType.status,"gr-dedrone");
dedrone.clearUnlock();

const reinforced = Vars.content.getByName(ContentType.status,"gr-reinforced");
reinforced.clearUnlock();

const delisted = Vars.content.getByName(ContentType.status,"gr-delisted");
delisted.clearUnlock();
    
} catch(e){
Timer.schedule(() => {  
Vars.ui.showText("e",e,Align.center);
},1.5);
}});

Events.on(TapEvent, event => {
try{
const tile = event.tile;
const player = event.player;
const block = tile.block();
const build = tile.build;
const silo = Vars.content.getByName(ContentType.block, "gr-launchh-silo");
    
if (block == null || block != silo || build == null) return;
const peekAmmo = build.peekAmmo();
if (peekAmmo == null) return;
    
build.control(LAccess.shoot, build.x, build.y, 1, 0);
Sounds.click.at(build.x,build.y);

Timer.schedule(() => {  
build.control(LAccess.shoot, build.x, build.y, 0, 0);
}, 0.1);
    
} catch(e) {
Vars.ui.showInfoToast(e,4.5);
}
});

/*
Events.on(UnitCreateEvent, e => {
try{
const spawner = e.spawner;
const unit = e.unit;

Vars.ui.showInfoToast("[red]works",5);
    
if (spawner == null || spawner.block != Blocks.unitCargoLoader) return;

Vars.ui.showInfoToast("[green]works",5);

// wait for it to actually work
Timer.schedule(() => {
    if (!spawner.isValid()) return;

    if (spawner.items.has(Items.titanium,45) && spawner.items.has(Items.thorium,65)) {
        unit.kill();
        UnitTypes.mega.spawn(spawner.team, spawner.x, spawner.y);

        spawner.removeStack(Items.titanium,45);
        spawner.removeStack(Items.thorium,65);
    }
}, 0);


} catch(e){
Vars.ui.showInfoToast(e,5);
}});




Events.on(ResearchEvent, e => {
    try {
        const content = e.content;
        Vars.ui.showInfoToast("Researched: " + content.name, 3);

        const gier = Planets.gier;

        if (!Vars.state.isGame() || Vars.state.getPlanet() != gier) return;

        //const target = Vars.content.getByName(ContentType.status, "gr-dedrone");

        if (content.name == "gr-dedrone") {
            Vars.ui.hudfrag.showToast("[red]Dedrone Enabled");

            const facility = Vars.content.getByName(ContentType.block,"gr-drone-facility");
            const dropzone = Vars.content.getByName(ContentType.block,"gr-facility-dropzone");

            Vars.state.rules.bannedBlocks.add(facility);
            Vars.state.rules.bannedBlocks.add(dropzone);
        }

        //const target2 = Vars.content.getByName(ContentType.status, "gr-reinforced");

        if (content.name == "gr-reinforced") {
            Vars.ui.hudfrag.showToast("[red]Reinforced Enabled");

            Team.get(5).unitHealthMultiplier = 1.45;
        }

    } catch(err){
        Vars.ui.showInfoToast(err, 5);
    }
});


Events.on(SectorLaunchEvent, event => {
try {
Vars.ui.showInfoToast("planet: " + Vars.state.getPlanet(), 3);
    
Vars.content.getByName(ContentType.status,"gr-dedrone").clearUnlock();
//Vars.content.getByName(ContentType.status,"gr-reinforced").clearUnlock();

} catch(e){
Timer.schedule(() => {  
Vars.ui.showText("e",e,Align.center);
},1.5);
}});



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

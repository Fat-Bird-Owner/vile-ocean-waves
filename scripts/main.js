var cyanogenFx = null;
var waterFx = null;
var galliumFx = null;
var cryoFx = null;

Events.on(ContentInitEvent, e => {
try {
cyanogenFx = new WrapEffect(Fx.artilleryTrailSmoke, Color.valueOf("89e8b699"));
waterFx = new WrapEffect(Fx.artilleryTrailSmoke, Color.valueOf("596ab8ff"));
galliumFx = new WrapEffect(Fx.artilleryTrailSmoke, Color.valueOf("9a9dbf"));
cryoFx = new WrapEffect(Fx.artilleryTrailSmoke, Color.valueOf("6ecdecff"));
    
Liquids.gallium.hidden = false;
Liquids.gallium.coolant = true;
} catch(e){
Vars.ui.showInfoToast(e,5);
}});




Events.on(UnitCreateEvent, e => {
try {

const unit = e.unit;
const spawner = e.spawner;
if (spawner == null) return;

const type = spawner.block;
const target =  Vars.content.getByName(ContentType.block,"gr-imprinter");

if (type == target && spawner.liquids != null){

if (spawner.liquids.get(Liquids.cyanogen) >= 10){
unit.apply(StatusEffects.overdrive,9999);
spawner.liquids.remove(Liquids.cyanogen,10);
cyanogenFx.at(spawner.x,spawner.y);    
}

if (spawner.liquids.get(Liquids.water) >= 10){
unit.apply(StatusEffects.fast,9999);
spawner.liquids.remove(Liquids.water,10);
waterFx.at(spawner.x,spawner.y);
}

if (spawner.liquids.get(Liquids.cryofluid) >= 10){
unit.apply(StatusEffects.overclock,9999);
spawner.liquids.remove(Liquids.cryofluid,10);
cryoFx.at(spawner.x,spawner.y);
}

if (spawner.liquids.get(Liquids.gallium) >= 10){
unit.apply(StatusEffects.shielded,9999);
spawner.liquids.remove(Liquids.gallium,10);
galliumFx.at(spawner.x,spawner.y);
}
}
    
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

            const count = Groups.build.count(b => 
            b != null && b.isValid() && (b.block === facility || b.block === dropzone)
            );
            if (count != 0){
            Vars.ui.hudfrag.showToast(Icon.settings, "[red]Modifier building on the map");
            return;
            }
            
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

            const count = Groups.build.count(b => b.block === outpost);
            if (count != 0){
            Vars.ui.hudfrag.showToast(Icon.settings, "[red]Modifier building on the map");
            return;
            }
        
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

Events.on(BuildDamageEvent, e => {
try{
const build = e.build;
const source = e.source;
const damage = source.damage;

const block = build.block;
const target = Vars.content.getByName(ContentType.block,"gr-dummy");

if (block != target || build == null || source == null) return;

Vars.ui.showLabel("[red]" + damage,500,0.5,build.x,build.y);
    
} catch(e){
Vars.ui.showInfoToast(e,6);
}});

Events.on(EventType.TapEvent, e => {
    try{
        const tile = e.tile;
        if (!tile) return;

        const build = tile.build;
        if (!build) return;

        const target = Vars.content.getByName(ContentType.block, "gr-the-stem");
        if (tile.block() != target) return;

        Sounds.click.at(build.x, build.y);

        Vars.ui.showCustomConfirm(
            "[green]The Stem[]",
            "[#3a8f64]It's a green router[]",
            "[red]Remove[]",
            "[green]Spare[]",

            () => {
                const unit = Vars.content.getByName(ContentType.unit, "gr-router-god");
                if (!unit){
                    Vars.ui.showInfoToast("Unit null", 2);
                    return;
                }

                //unit.spawn(Team.get(6), build.x, build.y,90);
                Vars.ui.announce("[red]It know it's wrong and still commit.",4.5);
                build.kill();
            },

            () => {
                Vars.ui.showInfoToast("[#3a8f64]Wise choice.", 5);
            }
        );

    } catch(err){
        Vars.ui.showInfoToast(err + "", 5);
    }
});

let routHealth = null;
let routSpeed = null;
let routArmor = null;
let routWeapons = null;

Events.on(ContentInitEvent, e => {
try{
const routerGod = Vars.content.getByName(ContentType.unit,"gr-router-god");
routHealth = routerGod.health;
routSpeed = routerGod.speed;
routArmor = routerGod.armor;
routWeapons = routerGod.weapons;

} catch(e){
Vars.ui.showInfoToast(e,5);
}});

Events.on(ContentPatchLoadEvent, e => {
try{
if (Vars.state.rules.editor) return;
    
const routerGod = Vars.content.getByName(ContentType.unit,"gr-router-god");
    
if (routerGod.health == routHealth && routerGod.speed == routSpeed && routerGod.armor == routArmor && routerGod.weapons == routWeapons) return;
routerGod.health = routHealth;
routerGod.speed = routSpeed;
routerGod.armor = routArmor; 
routerGod.weapons = routWeapons;

Vars.ui.announce("[green]Your attempts are pathetic to change absolute power is pathetic.",10);

//Timer.schedule(() => {
   // const routerGod = Vars.content.getByName(ContentType.unit, "gr-router-god");
    if (routerGod == null) {
        Vars.ui.showInfoToast("routerGod Null", 5);
        return;
    }

    const cx = Vars.world.width() * Vars.tilesize / 2;
    const cy = Vars.world.height() * Vars.tilesize / 2;

    routerGod.spawn(Team.get(6), cx, cy, 0);
//}, 3);
    
} catch(e){
Vars.ui.showInfoToast(e,7.5);
}});


/*
Events.on(EventType.TileChangeEvent, e => {
    try {
        if (!Vars.state.isGame() || Vars.state.isPaused()) return;

        const tile = e.tile;
        const block = tile.block();
        const target = Vars.content.getByName(ContentType.block, "gr-sporeoplasma");

        if (block != target) return;

        for (let i = 0; i < 2; i++) {

            let dx = 0;
            let dy = 0;

            // pick a random direction
            if (Mathf.random() < 0.5) {
                dx = Mathf.random() < 0.5 ? -1 : 1;
            } else {
                dy = Mathf.random() < 0.5 ? -1 : 1;
            }

            const spreadTile = Vars.world.tile(tile.x + dx, tile.y + dy);
            if (!spreadTile) continue;

            // skip invalid tiles
            if (
                spreadTile.floor().isLiquid ||
                spreadTile.block() == target ||
                spreadTile.block().solid
            ) continue;

            // schedule placement
            Timer.schedule(() => {
                spreadTile.setBlock(target, Team.get(5), 1);
            }, 0.1);
        }

    } catch (err) {
        Vars.ui.showInfoToast(err + "", 5);
    }
});



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

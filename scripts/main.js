Events.on(ContentInitEvent, e => { 
// lol
Planets.tantros.visible = true;
Planets.tantros.accessible = true;
Planets.tantros.alwaysUnlocked = true;

Planets.tantros.ruleSetter = r -> {
r.waveTeam = Team.blue;
r.placeRangeCheck = true;
r.showSpawns = true;
r.coreDestroyClear = true;
};


});

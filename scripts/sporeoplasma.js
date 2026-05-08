const block = Vars.content.block("gr-sporeoplasma");

const activeLimit = 15;
const maxTotal = 45;

/* global cached count (important) */
let total = 0;
let active = 0;

/* cache update every few seconds instead of every event */

Events.run(Trigger.run, () => {
try {

active = 0;
  
} catch(e){
Vars.ui.showInfoToast(e,5);
}});

function reload(){
Time.runTask(60, () => {
total = 0;

Groups.build.each(b => {
if(b.block == block){
total++;
}
});

reload();
});
}

Events.on(TileChangeEvent, event => {
try{
const tile = event.tile;
if(!tile || tile.block() != block) return;

/* hard cap check */
if(total >= maxTotal) return;

/* throttle active processing */
if(active >= activeLimit) return;
active++;

Time.run(0.5 * 60, () => {
try{
if(!tile || !tile.isValid()) return;

/* spread logic */
for(let i = 0; i < 3; i++){

const dir = Mathf.random(0, 3);
const spreadTile = tile.nearby(dir);

if(!spreadTile) continue;

if(!spreadTile.solid() && spreadTile.block() != block){
spreadTile.setBlock(block, tile.team());
total++;
active++

if (active >= 25) return;
}
}

active--;

}catch(e){
Vars.ui.showInfoToast(e, 5);
}
});

}catch(e){
Vars.ui.showInfoToast(e, 5);
}
});

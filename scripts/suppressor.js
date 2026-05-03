const blocks = [
"meld-meld-node",
"mele-meld-surppressor"
];

Events.on(BlockDestroyEvent, event => {
try {
const {tile} = event;
let found = false;
const targetFloor = Vars.content.block("meld-meld-crystal-floor");
  
for (let i = 0; i < blocks.length; i++){
if (tile.block() == Vars.content.block(blocks[i]) found = true;
}

if (!found) return;
tile.circle(range, t => {
try {
if (!t || !t.floor() || t.floor() != targetFloor) return;


} catch(e){
Vars.ui.showInfoToast(e,5);
}});

} catch(e){
Vars.ui.showInfoToast(e,5);
}});

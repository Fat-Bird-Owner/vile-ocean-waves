const blocks = [
"meld-meld-node",
"mele-meld-surppressor"
];

Events.on(BlockDestroyEvent, event => {
try {
const {tile} = event;
let found = false;

for (let i = 0; i < blocks.length; i++){
if (tile.block() == Vars.content.block(blocks[i]) found = true;
}

} catch(e){
Vars.ui.showInfoToast(e,5);
}});

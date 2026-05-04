Events.on(TapEvent, event => {
try {
const {tile} = event;
const block = tile.block();
const targetBlock = Vars.content.block("surge-router");
if (block != targetBlock) return;

function nearby(build){
const {tile} = build;
const nextTile = tile.nearby(build.rotation);
}

let currentBlock = tile.build;
function loop(){
    let limit = 1000;

    while(currentBlock != null && limit-- > 0){
        currentBlock = nearby(currentBlock);
        Fx.generate.at(currentBlock.x, currentBlock.y);
    }
}
  
} catch(e){
Vars.ui.showInfoToast(e,5); 
}});

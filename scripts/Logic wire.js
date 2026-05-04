Events.on(TapEvent, event => {
try {
const {tile} = event;
const block = tile.block();
const targetBlock = Vars.content.block("surge-router");
if (block != targetBlock) return;

} catch(e){
Vars.ui.showInfoToast(e,5); 
}});

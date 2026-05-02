const {content} = Vars;
const {atlas} = Core;
const block = content.block("message");

Events.on(TapEvent,event => {
try {
const {tile} = event;
const tileBlock = tile.block();
const {player} = event;

if (!tile || !tile.build || !player || !player.team() || !player.team() != tile.team()) return;
const image = atlas.fine(tile.build.string.toString());
const dialog = new BaseDialog("Info");

if (image){
dialog.cont.add(image).grow();
} else {
dialog.cont.add(tile.build.string.toString()); 
}
  
} catch(e){
Vars.ui.showInfoToast(e + "[red] - ImageBlock",5);
}});

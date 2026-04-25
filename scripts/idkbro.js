const blocks = [
"gr-sealent-capsule",
"gr-sealent-capsule-team",
"gr-sealant-capsule-steam"
];

const items = [
"gr-water-capsule",
"gr-steam-capsule",
"gr-oil-capsule"
];

function build(item){
try {
const button = new Button();
button.image(item.uiIcon).size(60);

return button;
} catch(e) {
Vars.ui.showInfoToast(e,5);
}}

Events.on(TapEvent, e => {
try {
const tile = e.tile;
const block = tile.block();
const player = e.player;
if (!tile || !block || !tile.build || tile.build.team != player.team()) return;
var valid = false;
const build = tile.build;

for (let i = 0; i < blocks.length; i++){
if (block == Vars.content.block(blocks[i])) valid = true;
}

if (!valid) return;
var count = 0;
const dialog = new BaseDialog("Configure");
dialog.addCloseButton();

  
for (let i = 0; i < items.length; i++){
const button = build(Vars.content.item(items[i]));
dialog.cont.add(button).size(100);
let num = i;

button.clicked(() => {
try {
const health = build.health;
build.tile.setBlock(Vars.content.block(blocks[num]));
tile.build.health = health;

dialog.hide();
} catch(e) {
Vars.ui.showInfoToast(e,5);
}});
  
if (count > 3){
dialog.cont.row();
count = 0;
} else {
count++;
}  
}

dialog.show();
  
} catch(e){
Vars.ui.showInfoToast(e,5);
}});

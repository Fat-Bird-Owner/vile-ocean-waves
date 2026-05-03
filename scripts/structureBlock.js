const {content} = Vars;
const blocks = [
"gr-reinforced-structure"
];

Events.on(BuildDamageEvent, event => {
try {
const {build, source} = event;
const {lightBlock} = Fx;
const {targets} = build;
const {damage} = source;
let found = false;

for (let i = 0; i < blocks.length; i++){
if (build.block == content.block(blocks[i])) found = true;
}
  
if (!found || !build || !source || !lightBlock || !targets) return;
const lightBlockWrap = lightBlock.wrap(Color.valueOf(build.block.baseColor));

targets.each(b => {
try {
b.heal(damage * 0.4);
lightBlockWrap.at(b.x, b.y, b.block.size);

} catch(e){
Vars.ui.showInfoToast(e + "[red] - StructureBlock Inner", 5);
}});
  
} catch(e){
Vars.ui.showInfoToast(e + "[red] - StructureBlock", 5);
}});

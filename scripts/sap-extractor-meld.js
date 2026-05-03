const block = Vars.content.block("meld-sap-extractor");
const block2 = Vars.content.block("meld-earthen-wall-fissure"); 

block.stats.replace(Stat.tiles, StatValues.content(block2));
block.stats.remove(Stat.input);

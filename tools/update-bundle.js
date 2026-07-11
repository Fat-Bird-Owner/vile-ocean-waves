const fs = require("fs");
const Hjson = require("hjson");
const glob = require("fast-glob");

const bundlePath = "bundles/bundle.properties";

let bundle = fs.existsSync(bundlePath)
    ? fs.readFileSync(bundlePath, "utf8")
    : "";

let lines = bundle.split("\n");

const files = glob.sync("content/**/*.hjson");

for (const file of files) {

    const data = Hjson.parse(fs.readFileSync(file, "utf8"));

    if (!data.name) continue;

    const type = file
        .split("/")
        [1]
        .replace(/s$/, "");

    const id = data.name;

    const entries = {
        [`${type}.${id}.name`]: data.name,
        [`${type}.${id}.description`]: data.description || ""
    };


    for (const [key, value] of Object.entries(entries)) {

        if (!lines.some(line => line.startsWith(key + ":"))) {
            lines.push(`${key}: ${value}`);
        }

    }
}


fs.writeFileSync(
    bundlePath,
    lines.join("\n")
);

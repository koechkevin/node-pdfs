import fs from "fs";
import dotenv from "dotenv";
import path from "path";

const envConfig = dotenv.parse(fs.readFileSync(".env"));
const outputFilePath = path.join(
    __dirname,
    "..",
    "public",
    "sass",
    ".env.scss",
);
let scssContent = "";

for (const key in envConfig) {
    if (key.startsWith("SASS_VAR_")) {
        const variableName = key.replace("SASS_VAR_", "");
        const variableValue = envConfig[key];
        scssContent += `$${variableName}: "${variableValue}";\n`;
    }
}

// Write the SCSS content to the output file
fs.writeFileSync(outputFilePath, scssContent);

console.log(`SCSS variables written to ${outputFilePath}`);

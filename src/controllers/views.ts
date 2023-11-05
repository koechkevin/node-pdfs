import { readFile } from "fs";
import { resolve } from "path";
import { promisify } from "util";

const readFileAsync = promisify(readFile);

const applyHeader = (htmlString: string) => {
    const header =
        '<img src="${baseUrl}/public/images/nccg.png" alt="nccg" class="logo">' +
        `
        <meta name="viewport" content="width=device-width, initial-scale=1" />

    <div class="content">
        <h4 class="title">
            NAIROBI CITY COUNTY
        </h4>
        <div class="contacts">
            <div class="street">
                <p class="name">Nairobi City Hall</p>
                <p>City Hall Way</p>
                <p>Nairobi, Kenya</p>
            </div>
            <div class="contact">
                <p class="name">Contact Support</p>
                <p>+254 725 624 489</p>
                <p style="text-transform: lowercase">info@nairobi.go.ke</p>
            </div>
        </div>
    </div>`;
    const headRegex = /<header[^>]*>[\s\S]*<\/header>/i;
    return htmlString.replace(
        headRegex,
        `<header class="header">${header}</header>`,
    );
};
const applyStyles = (htmlString: string, styles: string[]) => {
    const headRegex = /<head[^>]*>[\s\S]*<\/head>/i;
    let newHeadContent = `
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@100;400;500;600&amp;display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0">
    `;
    const allStyles: string[] = ["/public/css/styles.css", ...styles];
    allStyles.forEach((style: string) => {
        if (style) {
            const serverUrl = process.env.SERVER_URL;
            newHeadContent += `<link href="${serverUrl}${style}" rel="stylesheet">
            `;
        }
    });
    return htmlString.replace(headRegex, `<head>${newHeadContent}</head>`);
};

export const htmlToString = async (
    htmlPath: string,
    { styles = [], ...props }: { styles: string[] } & any,
): Promise<string> => {
    const htmlString = (await readFileAsync(htmlPath)).toString();
    const withStyles = applyStyles(applyHeader(htmlString), styles).replace(
        new RegExp(`/@{baseUrl}`, "g"),
        "${baseUrl}",
    );
    const placeholderRegex = /\${([^}]+)}/g;
    const output = withStyles.replace(
        placeholderRegex,
        (match, variableName) => {
            const variableValue = props[variableName];
            return variableValue !== undefined ? variableValue : match;
        },
    );
    return output;
};

export const invoice = async (
    props: { styles: string[] } & any,
): Promise<string> =>
    htmlToString(resolve(__dirname, "..", "..", "public", "invoice.html"), {
        ...props,
        baseUrl: process.env.SERVER_URL,
    });

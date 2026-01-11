import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

const templateMap = {
    ats: "ats.html",
    modern: "modern.html",
    creative: "creative.html",
};

// helper for "index+1" cases
Handlebars.registerHelper("inc", function (value) {
  return parseInt(value) + 1;
});

Handlebars.registerHelper("join", function (arr, sep) {
    if (!Array.isArray(arr)) return "";
    return arr.join(sep);
});

const renderResumeHtml = ({ templateType, data }) => {
    const filename = templateMap[templateType] || templateMap.ats;

    const templatePath = path.join(process.cwd(), "src", "templates", filename);
    const html = fs.readFileSync(templatePath, "utf8");

    const template = Handlebars.compile(html);
    return template(data);
};

export { renderResumeHtml };
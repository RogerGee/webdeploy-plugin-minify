// minify.js - webdeploy build plugin

const uglifyjs = require("uglify-js");
const uglifycss = require("uglifycss");

module.exports = {
    async exec(target,settings) {
        const code = await target.loadContent();
        const matchJs = target.targetName.match(/(.*)\.js$/);
        const matchCss = target.targetName.match(/(.*)\.css/);

        let newName;
        let newCode;

        if (matchJs) {
            const result = uglifyjs.minify(code);

            if (result.error) {
                throw result.error;
            }

            newName = matchJs[1] + ".min.js";
            newCode = result.code;
        }
        else if (matchCss) {
            newName = matchCss[1] + ".min.css";
            newCode = uglifycss.processString(code,{});
        }
        else {
            newName = target.targetName;
            newCode = code;
        }

        if (typeof settings.rename !== 'undefined' && !settings.rename) {
            newName = target.targetName;
        }

        const newTarget = target.makeOutputTarget(newName);
        newTarget.stream.end(newCode);

        return newTarget;
    }
};

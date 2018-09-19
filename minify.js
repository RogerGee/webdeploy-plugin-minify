// minify.js - webdeploy build plugin

const uglifyjs = require("uglify-js");
const uglifycss = require("uglifycss");

module.exports = {
    exec: (target,settings) => {
        return new Promise((resolve,reject) => {
            target.loadContent().then((code) => {
                var matchJs = target.targetName.match(/(.*)\.js$/);
                var matchCss = target.targetName.match(/(.*)\.css/);

                if (matchJs) {
                    var newName = matchJs[1] + ".min.js";
                    var result = uglifyjs.minify(code);

                    if (result.error) {
                        throw result.error;
                    }

                    var newCode = result.code;
                }
                else if (matchCss) {
                    var newName = matchCss[1] + ".min.css";
                    var newCode = uglifycss.processString(code,{});
                }
                else {
                    var newName = target.targetName;
                    var newCode = code;
                }

                if (typeof settings.rename !== 'undefined' && !settings.rename) {
                    newName = target.targetName;
                }

                var newTarget = target.makeOutputTarget(newName);
                newTarget.stream.end(newCode);

                resolve(newTarget);
            }).catch(reject)
        })
    }
}

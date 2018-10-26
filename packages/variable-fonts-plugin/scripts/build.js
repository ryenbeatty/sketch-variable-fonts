const fs = require("fs-extra");
const path = require("path");
const mkdirp = require("mkdirp");
const { panels } = require("../config.json");
const { skpm } = require("../package.json");

const copyLib = p => {
  try {
    const pkg = path.dirname(require.resolve(`${p}/package.json`));
    const lib = path.join(pkg, "lib");
    // tbd check if lib exist
    const dest = path.resolve(
      __dirname,
      `../${skpm.main}/Contents/Resources/${p}/`
    );
    const resources = path.resolve(
      __dirname,
      `../${skpm.main}/Contents/Resources`
    );

    if (!fs.existsSync(resources)) {
      mkdirp(resources);
    }

    return fs.copy(lib, dest).catch(err => console.error(err));
  } catch (reason) {
    throw new Error(
      `package ${p} does not exist in node_modules, are you sure it is published?`
    );
  }
};

panels.map(p => copyLib(p));

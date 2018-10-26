const fs = require("fs-extra");
const path = require("path");
const { panels } = require("../config.json");
const { skpm } = require("../package.json");

const linkLib = p => {
  const pkg = path.dirname(require.resolve(`${p}/package.json`));
  const lib = path.join(pkg, "lib");
  const dest = path.resolve(
    __dirname,
    `../${skpm.main}/Contents/Resources/${p}/`
  );
  return fs.ensureSymlinkSync(lib, dest);
};

panels.map(p => linkLib(p));

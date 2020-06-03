const { version } = require("../package.json");
const { readFile, writeFile } = require("fs").promises;

(async () => {
  const testPage = await readFile("test.html");
  await writeFile(
    "./dist/test.html",
    testPage.toString().replace(/%VERSION%/g, version)
  );
})();

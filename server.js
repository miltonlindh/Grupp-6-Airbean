const { ConsoleMessage } = require("puppeteer");
const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`kör på http:/localhost:${PORT}`)
});
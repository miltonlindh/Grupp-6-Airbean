const app = require("./app");
const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`kör på http:/localhost:${PORT}`);
});

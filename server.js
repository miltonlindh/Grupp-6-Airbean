//hämtar app.js, där alla routesoch funktioner är
const app = require("./app");

//väljer vilket port den ska köras på
const PORT = process.env.PORT || 3000;
//startar servern

app.listen(PORT, () => {
  console.log(`kör på http:/localhost:${PORT}`);
});

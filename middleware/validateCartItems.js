const menu = require("../menu.json");

function validateCartItem(req, res, next) {
  //hämtar productId och quantity
  const { productId, quantity } = req.body;
//kontrollerar om quantity är ett positivt heltal
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ error: "Quantity måste vara ett positivt heltal" });
  }
//kollar om produkt finns på menyn
  const product = menu.menu.find(item => item.id === productId);
  if (!product) {
    return res.status(400).json({ error: "Produkten finns inte i menyn" });
  }

  //prisvalidering om pris skickas med i body
  if (req.body.price && req.body.price !== product.price) {
    return res.status(400).json({ error: "Felaktigt pris – manipulerad förfrågan" });
  }
//om allt ser bra ut fortätter det till nästa steg
  next();
}

module.exports = validateCartItem;

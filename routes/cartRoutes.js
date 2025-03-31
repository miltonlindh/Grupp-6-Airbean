const express = require("express");
const router = express.Router();
//hämtar frpn meny fil
const menu = require("../Data/menu.json");

//skapar en tom kundvagn
let cart = [];

//lägger till en produkt i kundvagnen
router.post("/", (req, res) => {
    const { productId, quantity } = req.body; //hämtar produkt id och antal

    //letar upp produkten i menyn
    const product = menu.menu.find(p => p.id === productId);
    if (!product) {
        return res.status(400).json({ error: "Finns inte på menyn"});
    }
    //kollar om produkt redan finns i kundvagnen
  const existingItem = cart.find(item => item.productId === productId);
  //om den finns lägger ökar antalet 
    if (existingItem) {
        existingItem.quantity += quantity;
    }else{
        //annars lägger den till produkten
        cart.push({productId, quantity});
    }

    res.status(201).json({ message: "Produkten har lagts till", cart});
});
//hämtar hela kundvagnen
router.get("/", (req, res) => {
    //skapar en array för info av varje vara i kundvagnn
    const cartWithDetails = cart.map(item =>{
        //letar upp info i meny
        const product = menu.main.find(p => p.id === item.productId);
        return {
            productId: item.productId,
            title: product.title,
            price: product.price,
            quantity: item.quantity,
            subtotal: product.price * item.quantity
        };
    });
    //räknar ut totalpriset 
    const total = cartWithDetails.reduce((sum, item) => sum + item.subtotal, 0);
//skickar tillbaka kundvagn samt totalbelopp
    res.json({
        cart: cartWithDetails,
        total
    });
});

module.exports = router;

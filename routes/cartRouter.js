const router = require('express').Router();
const auth = require('../middleware/auth');
const Inventory = require('../models/invModel');
const Cart = require('../models/cartModel');
const User = require('../models/userModel');

router.get('/', async(req, res) => {
    try {
        const carts = await Cart.find();
        res.json(carts);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// finds all elements that contain the users id
router.get('/usercart/:userId', async (req, res) => {
    const carts = await Cart.find({userId: req.params.userId});

    res.json(carts);
});

// adds an item to the cart documents and returns the cart's id to the users cart
router.post('/addtocart', async (req, res) => {
    const { itemId, userId, count } = req.body;
    const user = await User.findOne({_id: userId});
    const item = await Inventory.findOne({_id: itemId});

    if (count > item.onHand) return res.status(400).json({msg: "Not enough inventory for that amount."});

    const newCart = new Cart({
        itemId,
        userId,
        name: item.item,
        description: item.description,
        count,
        price: item.price,
    });

    const savedCart = await newCart.save();

    user.cart.push(savedCart._id);

    await user.save();

    res.json(savedCart);
});

module.exports = router;
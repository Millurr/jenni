const router = require('express').Router();
const auth = require('../middleware/auth');
const Inventory = require('../models/invModel');


// Adds new item to inventory
router.post('/', async (req, res) => {
    try {
        const { item, description, count, price, imageName, imagePath } = req.body;

        const level = req.header("level");

        if (level !== "4")
            return res.status(400).json({msg: "You do not have valid permissions."}); 

        const existingItem = await Inventory.findOne({item: item});
        if (existingItem)
            return res.status(400).json({msg: "An item with this name already exists."});

        if (!item) return res.status(400).json({msg: "An item must exist"});
        if (!description) return res.status(400).json({msg: "A description must exist"});
        if (!count) return res.status(400).json({msg: "An On Hand must exist"});
        if (!price) return res.status(400).json({msg: "A price must exist"});
        if (!imageName) return res.status(400).json({msg: "An image must exist"});
            
        const newInv = new Inventory({
            item, 
            description, 
            count, 
            price,
            imageName,
            imagePath
        });
        const savedInv = await newInv.save();
        res.json(savedInv);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Edits an item 
router.post("/edit/:id", async (req, res) => {
    try {
        const foundItem = await Inventory.findOne({_id: req.params.id});

        const level = req.header('level');
        if (level !== "4") return res.status(400).json({msg: "You do not have valid permissions."}); 

        let { item, description, count, price, imageName, imagePath } = req.body;

        const compareItem = await Inventory.findOne({ item: item });
        
        if (compareItem){
            if (compareItem.item !== foundItem.item) return res.status(400).json({msg: "This item name already exits."}); 
        }

        if (foundItem.item != item) foundItem.item = item;
        if (foundItem.description != description) foundItem.description = description;
        if (foundItem.price != price) foundItem.price = price;
        if (foundItem.count != count) foundItem.count = count;
        if (foundItem.imagePath != imagePath) foundItem.imagePath = imagePath;
        
        const newItem = await foundItem.save();
        res.json(newItem);
    } catch (err) {

    }
});

// Gets individual items from database
router.get('/items/:id', async(req, res) => {
    // const {_id} = req.body;
    const item = await Inventory.findOne({_id: req.params.id});
    // console.log(req.body);
    // let item = [];
    // if (Object.keys(_ids).length <= 1) {
    //     item[0] = await Inventory.findOne({_id: _ids[0]});
    // } else {
    //     for (let i=0; i<Object.keys(_ids).length; i++) {
    //         item[i] = await Inventory.findOne({_id: _ids[i]});
    //     }
    // }
    res.json(item);
});

// Gets all items in the inventory
router.get("/all", async(req, res) => {
    let mysort = { item: 1 };
    try {
        const inv = await Inventory.find().sort(mysort);
        console.log(inv)
        res.json(inv);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
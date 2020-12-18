const router = require('express').Router();
const auth = require('../middleware/auth');
const Location = require('../models/locModel');
const Inventory = require('../models/invModel');

router.get('/all', async (req, res) => {
    try {
        const loc = await Location.find();
        res.json(loc);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
})

router.post("/addLoc", async (req, res) => {
    try {
        const { location, show, startDate, endDate, inventory } = req.body;
        const level = req.header("level");

        if (level !== "4")
            return res.status(400).json({msg: "You do not have valid permissions."}); 

        const existingLoc = await Location.findOne({location: location});
        
        if (existingLoc)
            return res.status(400).json({msg: "A location with this name already exists."});
        
        if (!location || (location == ''))
            return res.status(400).json({msg: "You must enter a location."});

        if (startDate > endDate)
            return res.status(400).json({msg: "End date must be after start date."});

        const newLoc = new Location({
            location,
            show,
            startDate,
            endDate,
            inventory
        });

        const savedLoc = await newLoc.save();
        res.json(savedLoc);
        }
    catch (err) {
    }
});

router.post('/editLoc/:id', async (req,res) => {
    try {
        const {startDate, endDate, show} = req.body;
        if (startDate > endDate)
            return res.status(400).json({msg: "End date must be after start date."});
        
        const foundLoc = await Location.findOne({_id: req.params.id});
        foundLoc.startDate = startDate;
        foundLoc.endDate = endDate;
        foundLoc.show = show;
        const savedLoc = await foundLoc.save();
        res.json(savedLoc);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get("/getone/:locId", async (req, res) => {
    let foundLoc = await Location.findOne({_id: req.params.locId});

    const {_id, location, show, startDate, endDate, inventory} = foundLoc;

    console.log(location);
    res.json(foundLoc);
})

router.post("/addinv/:locId/:itemId", async (req, res) => {
    try {
        let foundLoc = await Location.findOne({_id: req.params.locId});
        let foundItem = await Inventory.findOne({_id: req.params.itemId});

        const level = req.header('level');
        if (level !== "4") return res.status(400).json({msg: "You do not have valid permissions."}); 

        if (!foundItem) return res.status(400).json({msg: "An item with this name already exists."});
        if (!foundLoc) return res.status(400).json({msg: "A location with this name already exists."});

        const id = foundItem._id;
        const item = foundItem.item;
        const description = foundItem.description;
        const price = foundItem.price;

        const { count } = req.body;

        if (count > foundItem.onHand) return res.status(400).json({msg: "Not enough inventory to move this much."});

        foundItem.onHand -= count;
        foundItem.allocated += count;

        const newInv =  {
            '_id': id,
            'item': item,
            'description': description,
            'price': price,
            'count': count
        }


        for (let i =0;i<foundLoc.inventory.length; i++){
            if (foundLoc.inventory[i].item === item)
                return res.status(400).json({msg: "An item already exists in this location."});
        }
        
        let addInv = foundLoc.inventory;
        addInv.push(newInv);

        foundLoc.inventory = addInv;

        const savedItem = await foundItem.save();
        const savedLoc = await foundLoc.save();
        res.json(savedLoc);
        //res.json(savedItem);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Edits inventory count while in the locations inventory
// Updates the main inventory according to the changes made
router.post('/editinvcount/:locId/', async(req, res) => {
    try {
        const { _id, oldCount, newCount } = req.body;

        let foundLoc = await Location.findOne({_id: req.params.locId});
        let foundItem = await Inventory.findOne({_id: _id});

        const level = req.header('level');
        if (level !== "4") return res.status(400).json({msg: "You do not have valid permissions."}); 

        if (!foundItem) return res.status(400).json({msg: "An item with this name already exists."});
        if (!foundLoc) return res.status(400).json({msg: "A location with this name already exists."});

        const item = foundItem.item;
        const description = foundItem.description;
        const price = foundItem.price;

        if (newCount > foundItem.onHand) return res.status(400).json({msg: "Not enough inventory to move this much."});

        let updateVal = newCount - oldCount;

        foundItem.onHand -= updateVal;
        foundItem.allocated += updateVal;

        const updatedInv =  {
            '_id': _id,
            'item': item,
            'description': description,
            'price': price,
            'count': newCount
        }

        for (let i =0;i<foundLoc.inventory.length; i++){
            if (foundLoc.inventory[i].item === item) {
                if (newCount === 0)
                    deleteItem = true;
                foundLoc.inventory.splice(i, 1);
            }
        }
        
        let addInv = foundLoc.inventory;

        addInv.push(updatedInv);

        foundLoc.inventory = addInv;

        const savedItem = await foundItem.save();
        const savedLoc = await foundLoc.save();
        res.json(savedLoc);
        //res.json(savedItem);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/toinv/:locId", async (req, res) => {

    const level = req.header('level');
    if (level !== "4") return res.status(400).json({msg: "You do not have valid permissions."}); 

    let foundLoc = await Location.findOne({_id: req.params.locId});
    const {item, count} = req.body;
    let foundItem = await Inventory.findOne({item: item});

    foundItem.onHand += count;
    foundItem.allocated -= count;

    console.log(foundLoc);

    for (let i =0;i<foundLoc.inventory.length; i++){
        if (foundLoc.inventory[i].item === item)
            foundLoc.inventory.splice(i, 1);
    }

    console.log(foundLoc);

    let savedLoc = await foundLoc.save();
    let savedItem = await foundItem.save();

    res.json(savedLoc);
});

module.exports = router;
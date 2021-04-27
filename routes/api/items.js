const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/Item')

/**
 * @route   GET api/items
 * @desc    Get All Items
 * @access  Public
 */
 router.get('/', async (req, res) => {
    Item.find()
        .sort({ date: -1 }).then((items) => res.json(items));
  });

  /**
 * @route   Post api/items
 * @desc    Create a item
 * @access  Public
 */
 router.post('/', async (req, res) => {
   const newItem = new Item({
       name: req.body.name
   });
   newItem.save().then((item) => res.json(item))
  });

    /**
 * @route   Delete api/items
 * @desc    Delete an item
 * @access  Public
 */
 router.delete('/:id', async (req, res) => {
   Item.findById(req.params.id)
                    .then((item) =>item.remove()
                    .then(() => res.json({ success: true} )))
                    .catch((err) =>res.status(400).json({success: false}));
   });
module.exports = router;
const express = require('express');
const router = express.Router();
const CartSchema = require('../../models/Cart');
const Cart = require('../../models/Cart');

/** 
* @route POST api/route/register
* @desc Register the user
* @access Public
*/

router.post('/add', (req, res) => {
    let {
        _id,
        title,
        color,
        size,
        price,
        selectedFlickrImage,
        dateAdded,
        sale,
        serverId,
        farmId,
        secret
    } = req.body
    if (CartSchema.length >= 1) {
        CartSchema.findOne({ _id: _id }).then(item => {
            if (item) {
                return res.status(400).json({
                    msg: "Cannot add another of the same item"
                });
            }
        });
    }

    let cartItem = new CartSchema({
        _id,
        title,
        color,
        size,
        price,
        selectedFlickrImage,
        dateAdded,
        sale,
        serverId,
        farmId,
        secret
    });

    cartItem.save().then(() => {
        return res.status(201).json({
            success: true,
            msg: "Item is added to the cart"
        })
    });
});

/**
 * @route GET api/cart/items
 * @desc Return the Items
 * @access Private
 */
router.get('/items', (req, res) => {
    CartSchema.find({}, (err, items) => {
        if (err) {
            console.log("no items")
        } else {
            res.json({
                cart: items
            })
        }
    })  
});

module.exports = router;
 
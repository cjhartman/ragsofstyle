const express = require('express');
const router = express.Router();
const PhotoSchema = require('../../models/Photos');
var ObjectID = require('mongodb').ObjectID;

/**
 * @route Post api/route/upload
 * @desc add item to DB
 * @access Private
 */

router.post('/upload', (req, res) => {
    let {
        title,
        color,
        size,
        description,
        price,
        extras,
        selectedFlickrImage,
        dateAdded,
        sale,
        serverId,
        farmId,
        secret
    } = req.body

    //check to see that title is unique
    if (PhotoSchema > 1) {
        PhotoSchema.findOne({ title: title }).then(photo => {
            if (photo) {
                return res.status(400).json({
                    msg: "Title is already in use, please change it to a different one"
                });
            }
        });
    }

    let newItem = new PhotoSchema({
        title,
        color,
        size,
        description,
        price,
        extras,
        selectedFlickrImage,
        dateAdded,
        sale,
        serverId,
        farmId,
        secret
    });

    newItem.save().then(item => {
        return res.status(201).json({
            success: true,
            msg: "New Item has been uploaded"
        })
    });
});

/**
 * @route GET api/photos/items
 * @desc Return the Items
 * @access Private
 */
router.get('/items', (req, res) => {
    PhotoSchema.find({}, (err, photos) => {
        if (err) {
            console.log("no items")
        } else {
            res.json({
                items: photos
            })
        }
    })  
});

/** 
 * @route PUT api/photos/upload
 * @desc Updates the original item
 * @access Private
 */
// router.put('/upload/:id', (req, res) => {});

/** 
 * @route PUT api/photos/item-in-cart/:id
 * @desc Ensures that item is in cart
 * @access Private
 */

router.put('/item-in-cart/:id', (req, res) => {
    if (req.params.id) {
        PhotoSchema.updateOne({ "_id": ObjectID(req.params.id) }, { $set: { "isInCart" : true }}, (err, resp) => { 
            if(resp) {
                return res.status(200).json({
                    success: true,
                    msg: "Item is flagged as in a cart"
                })
            } else {
                console.log(err)
            }
        })
    } else {
        return res.status(400).json({
            success: false,
            msg: "Couldn't find an id"
        })
    }
});

/** 
 * @route PUT api/photos/remove-item-in-cart/:id
 * @desc Ensures that item is in cart
 * @access Private
 */

router.put('/remove-item-in-cart/:id', (req, res) => {
    if (req.params.id) {
        PhotoSchema.updateOne({ "_id": ObjectID(req.params.id) }, { $set: { "isInCart" : false }}, (err, resp) => { 
            if(resp) {
                return res.status(200).json({
                    success: true,
                    msg: "Item is no longer in a cart"
                })
            } else {
                console.log(err)
            }
        })
    } else {
        return res.status(400).json({
            success: false,
            msg: "Couldn't find an id"
        })
    }
});

/** 
 * @route PUT api/photos/sdItems
 * @desc Sets the items that have been sold as soft deleted
 * @access Private
 */

router.put('/sd-items', (req, res) => {
    let soldId = [];
    for (let body of req.body) {
        soldId.push(body._id);
    }
    PhotoSchema.find({}, (err, photos) => {
        if (err) {
            console.log(err)
        } else {
            for (let photo of photos) {
                soldId.filter((photoId) => {
                    if(photoId === photo._id.toString()) {
                        PhotoSchema.updateOne({ "_id": ObjectID(photo._id.toString()) }, { $set: { "isDeleted" : false }}, (err, res) => {
                            if (res) {
                                return
                            } else {
                                console.log(err)
                            }
                        })
                    }
                })
            }
        }
    })
    return res.status(200).json({
        success: true,
        msg: "items have been update"
    })
});

/** 
 * @route DELETE api/photos/upload/id
 * @desc Deletes an item
 * @access Private
 */
router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    PhotoSchema.deleteOne({ _id: id}, (err, deleted) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(204).json({
                success: true,
                msg: "Item has been deleted"
            })
        }
    })
});

module.exports = router;
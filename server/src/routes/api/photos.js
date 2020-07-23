const express = require('express');
const router = express.Router();
const PhotoSchema = require('../../models/Photos')

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
router.put('/upload/:id', (req, res) => {

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
})

module.exports = router;
var express = require('express');
var router = express.Router();

const Device = require('../models/deviceModel');

// CREATE DEVICE
router.post('/create_device_api', (req, res) => {

    const { name, brand, price, warranty } = req.body;

    const device = new Device({
        name,
        brand,
        price,
        warranty
    });

    const validationError = device.validateSync();

    if (validationError) {

        const errors = {
            name: validationError.errors.name ?
                validationError.errors.name.properties.message :
                undefined,

            brand: validationError.errors.brand ?
                validationError.errors.brand.properties.message :
                undefined,

            price: validationError.errors.price ?
                validationError.errors.price.properties.message :
                undefined,

            warranty: validationError.errors.warranty ?
                validationError.errors.warranty.properties.message :
                undefined
        };

        return res.status(400).json({ errors });
    }

    device.save()
        .then(() => {
            res.status(201).json({
                message: 'Device added successfully'
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({
                message: 'Server Error'
            });
        });

});


// READ ALL DEVICES
router.get('/retrieve_device_api', (req, res) => {

    Device.find()

        .then(data => {

            const serializedData = data.map(device => ({

                id: device._id,
                name: device.name,
                brand: device.brand,
                price: device.price,
                warranty: device.warranty

            }));

            res.status(200).json({
                data: serializedData
            });

        })

        .catch(error => {

            console.error(error);

            res.status(500).json({
                message: 'Internal Server Error'
            });

        });

});


// UPDATE DEVICE
router.put('/update_device_api/:id', (req, res) => {

    const deviceId = req.params.id;

    const { name, brand, price, warranty } = req.body;

    Device.findByIdAndUpdate(
        deviceId,
        {
            name,
            brand,
            price,
            warranty
        }
    )

    .then(() => {

        res.status(200).json({
            message: 'Device updated successfully'
        });

    })

    .catch(error => {

        console.error(error);

        res.status(500).json({
            message: 'Internal Server Error'
        });

    });

});


// DELETE DEVICE
router.delete('/delete_device_api/:id', (req, res) => {

    const deviceId = req.params.id;

    Device.findByIdAndDelete(deviceId)

        .then(() => {

            res.status(200).json({
                message: 'Device deleted successfully'
            });

        })

        .catch(error => {

            console.error(error);

            res.status(500).json({
                message: 'Internal Server Error'
            });

        });

});

module.exports = router;
const router = require('express').Router();
let Ship = require('../models/ships.model');

router.route('/').get((reg, res) => {
    Ship.find()
        .then(ships => res.json(ships))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newShip = new Ship({
        username,
        description,
        duration,
        date,
    });

    newShip.save()
    .then(() => res.json('Ship added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Ship.findById(req.params.id)
        .then(ship => res.json(ship))
        .catch(err => res.status(400).json('Error:' + err))
})

router.route('/:id').delete((req, res) => {
    Ship.findByIdAndDelete(req.params.id)
        .then(() => res.json('Ship deleted'))
        .catch(err => res.status(400).json('Error:' + err))
})
router.route('/update/:id').post((req, res) => {
    Ship.findById(req.params.id)
        .then(ship => {
            ship.username = req.body.username;
            ship.description = req.body.description;
            ship.duration = req.body.duration;
            ship.date = Date.parse(req.body.date);

            ship.save()
                .then(() => res.json('Ship Updated'))
                .catch(err => res.status(400).json('Error:' + err));
        })
    .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;
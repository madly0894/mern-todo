const {Router} = require('express');
const Employee = require('../models/Employee');
const {check, validationResult} = require('express-validator');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const data = new Employee.find();

        await data.all()

    } catch (e) {
        res.status(500).json({ message: "'Something wen't wrong, please try again" })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const data = new Employee.findById(req.params.id);


    } catch (e) {
        res.status(500).json({ message: "'Something wen't wrong, please try again" })
    }
});

router.post('/',
    [
        check('firstname', 'Invalid firstname').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid data'
                })
            }

            const data = new Employee(req.body);

            await data.save()
                .then(item => {
                    console.log(item)
                })
                .catch(err => {

                });

            res.status(201).json({ message: 'KRUTO' })

        } catch (e) {
            res.status(500).json({ message: "'Something wen't wrong, please try again" })
        }
});

router.put('/:id',
    [

    ], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            })
        }

    } catch (e) {
        res.status(500).json({ message: "'Something wen't wrong, please try again" })
    }
});

router.delete('/:id', async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({ message: "'Something wen't wrong, please try again" })
    }
});

module.exports = router;

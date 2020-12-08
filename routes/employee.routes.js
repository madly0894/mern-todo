const {Router} = require('express');
const Employee = require('../models/Employee');
const {check, validationResult} = require('express-validator');
const router = Router();

router.get('/', async (req, res) => {
    try {
        await Employee.find()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(errors => {
                res.status(400).json({ message: "Bad Request", errors: errors.array() })
            });

    } catch (e) {
        res.status(500).json({ message: "'Something wen't wrong, please try again" })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const data = Employee.findById(req.params.id);

        await data
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(400).json({ message: "Bad Request", err })
            });

    } catch (e) {
        res.status(500).json({ message: "'Something wen't wrong, please try again" })
    }
});

router.post('/add',
    [],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid data'
                })
            }

            await new Employee(req.body).save()
                .then(result => {
                    res.status(201).json({ message: 'Employee created!', data: result })
                })
                .catch(err => {
                    res.status(400).json({ message: "Bad Request", err })
                });

        } catch (e) {
            res.status(500).json({ message: "'Something wen't wrong, please try again" })
        }
});

router.put('/update/:id',
    [], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            })
        }

        await Employee.findById(req.params.id)
            .then(result => {
                result.firstName = req.body.firstName;
                result.lastName = req.body.lastName;
                result.login = req.body.login;
                result.workPhone = req.body.workPhone;
                result.personalPhone = req.body.personalPhone;
                result.workEmail = req.body.workEmail;
                result.personalEmail = req.body.personalEmail;
                result.businessLocation = req.body.businessLocation;
                result.company = req.body.company;
                result.role = req.body.role;
                result.hourlyRate = req.body.hourlyRate;

                result.save()
                    .then((result) => {
                        console.log(result)
                        res.status(200).json({ message: 'Employee updated!', data: result })
                    })
                    .catch(err => {
                        res.status(400).json({ message: "Bad Request", err })
                    });
            })

    } catch (e) {
        res.status(500).json({ message: "'Something wen't wrong, please try again" })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).json({ message: 'Employee deleted!' });
            })
            .catch(err => {
                res.status(400).json({ message: "Bad Request", err });
            });

    } catch (e) {
        res.status(500).json({ message: "'Something wen't wrong, please try again" })
    }
});

module.exports = router;

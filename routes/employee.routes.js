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
            .catch(errors => {
                res.status(400).json({ message: "Bad Request", errors: errors.array() })
            });

    } catch (e) {
        res.status(500).json({ message: "'Something wen't wrong, please try again" })
    }
});

router.post('/add',
    [
        // check('firstName', '').isLength({ min: 2 }),
        // check('lastName', '').isLength({ min: 2 }),
        // check('workEmail', 'Incorrect email').isEmail(),
        // check('personalEmail', 'Incorrect email').isEmail(),
        // check('firstName', '').isLength({ min: 2 }),
        // check('firstName', '').isLength({ min: 2 }),
        // check('firstName', '').isLength({ min: 2 }),
        // check('firstName', '').isLength({ min: 2 }),
        // check('firstName', '').isLength({ min: 2 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Bad Request'
                })
            }

            await new Employee(req.body).save()
                .then(result => {
                    res.status(201).json({ message: 'Employee created!', data: result })
                })
                .catch(errors => {
                    res.status(400).json({ message: "Bad Request", errors: errors.array() })
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
                message: 'Bad Request'
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
                result.hourlyRate = req.body.hourlyRate;
                result.businessLocation = req.body.businessLocation;
                result.company = req.body.company;
                result.role = req.body.role;

                result.save()
                    .then((result) => {
                        console.log(result)
                        res.status(200).json({ message: 'Employee updated!', data: result })
                    })
                    .catch(errors => {
                        res.status(400).json({ message: "Bad Request", errors: errors.array() })
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
            .catch(errors => {
                res.status(400).json({ message: "Bad Request", errors: errors.array() });
            });

    } catch (e) {
        res.status(500).json({ message: "'Something wen't wrong, please try again" })
    }
});

router.delete('/all', async (req, res) => {
    try {
        await Employee.findAndModify().then(() => {
                res.status(200).json({ message: 'All Employees deleted!' });
            })
            .catch(errors => {
                res.status(400).json({ message: "Bad Request", errors: errors.array() });
            });

    } catch (e) {
        res.status(500).json({ message: "'Something wen't wrong, please try again" })
    }
});

module.exports = router;

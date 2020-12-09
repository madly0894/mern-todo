const {Router} = require('express');
const Employee = require('../models/Employee');
const {check, validationResult, checkSchema} = require('express-validator');
const router = Router();


const validationRules = checkSchema({
    firstName: {
        notEmpty: {
            errorMessage: 'The First Name field is required'
        },
        isLength: {
            options: {min: 2},
            errorMessage: 'First Name should be at least 2 chars long'
        }
    },
    lastName: {
        notEmpty: {
            errorMessage: 'The Last Name field is required'
        },
        isLength: {
            options: {min: 2},
            errorMessage: 'Last Name should be at least 2 chars long'
        }
    },
    login: {
        notEmpty: {
            errorMessage: 'The Login field is required'
        },
        isLength: {
            options: {min: 2},
            errorMessage: 'Login should be at least 2 chars long'
        }
    },
    workPhone: {
        notEmpty: {
            errorMessage: 'The Work Phone field is required'
        },
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: 'Please enter Work Phone number in 10 digits'
        },
        matches: {
            options: [/^\d{10}$/],
            errorMessage: 'Please enter digits'
        }
    },
    personalPhone: {
        notEmpty: {
            errorMessage: 'The Personal Phone field is required'
        },
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: 'Please enter Personal Phone number in 10 digits'
        },
        matches: {
            options: [/^\d{10}$/],
            errorMessage: 'Please enter digits'
        }
    },
    workEmail: {
        notEmpty: {
            errorMessage: 'The Work Email field is required'
        },
        isLength: {
            options: { max: 25 },
            errorMessage: 'Work Email should not be greater than 25 chars',
        },
        isEmail: {
            errorMessage: 'Invalid Email address',
        }
    },
    personalEmail: {
        notEmpty: {
            errorMessage: 'The Personal Email field is required'
        },
        isLength: {
            options: { max: 25 },
            errorMessage: 'Personal Email should not be greater than 25 chars',
        },
        isEmail: {
            errorMessage: 'Invalid Email address',
        }
    },
    businessLocation: {
        notEmpty: {
            errorMessage: 'The Business Location field is required'
        }
    },
    company: {
        notEmpty: {
            errorMessage: 'The Company field is required'
        }
    },
    role: {
        notEmpty: {
            errorMessage: 'The Role field is required'
        }
    },
    hourlyRate: {
        notEmpty: {
            errorMessage: 'The Hourly Rate field is required'
        },
        isLength: {
            options: { max: 2 },
            errorMessage: ' Hourly Rate should not be greater than 2 chars',
        }
    }
});

router.get('/', async (req, res) => {
    try {
        await Employee.find()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(errors => {
                res.status(400).json({ message: "Bad Request", errors })
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
                res.status(400).json({ message: "Bad Request", errors })
            });

    } catch (e) {
        res.status(500).json({ message: "'Something wen't wrong, please try again" })
    }
});

router.post('/add',
    validationRules,
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
                .catch(err => {
                    if (err) {
                        if (err.name === 'MongoError' && err.code === 11000) {
                            let errors = [];
                            const key = Object.keys(err.keyValue)[0];
                            const name = key.replace(/([A-Z])/g, ' $1')
                                .replace(/^./, (str) => str.toUpperCase());

                            const message = `${name} already exists`;
                            const obj = {
                                location: 'body',
                                msg: message,
                                param: key,
                                value: req.body[key]
                            };
                            errors.push(obj);

                            return res.status(400).json({ message: "Bad Request", errors })
                        }
                    }

                    res.status(400).json({ message: "Bad Request", errors: err })
                });

        } catch (e) {
            res.status(500).json({ message: "'Something wen't wrong, please try again" })
        }
});

router.put('/update/:id',
    validationRules, async (req, res) => {
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
                        res.status(200).json({ message: 'Employee updated!', data: result })
                    })
                    .catch(errors => {
                        res.status(400).json({ message: "Bad Request", errors })
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
                res.status(400).json({ message: "Bad Request", errors });
            });

    } catch (e) {
        res.status(500).json({ message: "'Something wen't wrong, please try again" })
    }
});

router.delete('/all/:id', async (req, res) => {
    try {
        const ids = req.params.id.substring(1);

        let arr = [];
        if (ids) {
            const id = [ids].map(i => i.split(','));
            arr = id[0];
        }

        await Employee.deleteMany({
            _id: {$in: arr}
        })
            .then(() => {
                res.status(200).json({ message: 'All employees deleted!' });
            })
            .catch(errors => {
                res.status(400).json({ message: "Bad Request", errors });
            })

    } catch (e) {
        res.status(500).json({ message: "'Something wen't wrong, please try again" })
    }
});

module.exports = router;

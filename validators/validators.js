const {checkSchema} = require('express-validator');

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

module.exports = validationRules;

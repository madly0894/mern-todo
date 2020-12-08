const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(express.json({ extended: true }));
app.disable('etag');
app.use(cors());
app.use('/api/employee', require('./routes/employee.routes'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }, (err, db) => {
            // console.log(db.getCollectionNames())
            // if (err) throw new Error(err);
            // db.collection('employees').deleteMany(// MongoDB delete method 'deleteMany'
            //     { farewell: "okay" }, // Delete ALL documents with the property 'farewell: okay'
            //     function (err, result) {
            //         if (err) throw new Error(err);
            //         db.close(); // Don't forget to close the connection when you are done
            //     });
        });
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1)
    }
}

start();


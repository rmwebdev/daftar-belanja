const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');


const items = require('./routes/api/items');


const app = express();

//BodyParser Middleware
app.use(bodyParser.json());

//DB Configuration
const db = require('./config/config').mongoURI;

//Connect to db
mongoose.connect(db, { 
        useUnifiedTopology: true,
        useNewUrlParser: true
     })
    .then(() => console.log('Database connected...'))
    .catch(err => console.log(err));
    
//Use Routes
app.use('/api/items', items);


// Serve static asset if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder 
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port} .`));

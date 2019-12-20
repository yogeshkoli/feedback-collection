const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');


async function connectToDb() {
    await mongoose.connect(keys.MONGO_DB_DEV_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

connectToDb().then(console.log('connected to mongo db'));

const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'hello' });
});

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);



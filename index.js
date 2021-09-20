require("dotenv").config();
const express = require("express");
const sequelize = require("./db.js");
const models = require('./models/models.js');
const cors = require('cors');
const router = require('./routes/index.js');

const PORT = process.env.PORT || 7777;

const app = express();
app.use(cors());
app.use(express.json())
app.use('/api', router);

// req - запрос, res - ответ
app.get('/', (req, res) => {
    res.status(200).json({ message: 'WORKING!!!' });
})

const start = async () => {
    try {
//         await sequelize.authenticate();
//         await sequelize.sync({alter: true}); // синхронизация
        app.listen(PORT, () => console.log(`Server started: ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
//  for dev:
		// "dev": "npm run kill && nodemon --delay 500ms index.js",
		// "kill": "kill -9 $(lsof -i : 7777) &>/dev/null | exit 0"

// for docker :
// 		"start" : "node index.js"

// for fix porblem with babel
// 		"start" : "node --exec babel-node index.js"

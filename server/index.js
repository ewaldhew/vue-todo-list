import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser';
import models, { sequelize } from './models';

import taskRouter from './routes/tasks';
import todoRouter from './routes/todo';

var pgtools = require('pgtools');
pgtools.createdb({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
    host: 'localhost'
}, process.env.DATABASE, (err) => {
    if (err) {
        console.log("Database already exists");
    }
});

const app = express();
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", `http://localhost:${process.env.CLIENT_PORT}`);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Access-Control-Allow-Methods", 'GET, PUT, PATCH, DELETE, HEAD')
    next();
});

app.use('/task', taskRouter);
app.use('/todo', todoRouter);

sequelize.sync()
    .then(() => {
        return models.TaskList.bulkCreate([
            {
                id: 1,
                name: 'Work',
                tasks: [{ name: 'Do the thing', task_finished: false }]
            },
            {
                id: 2,
                name: 'Social',
                tasks: [{ name: 'Dinner with Alice and Bob', task_finished: false }]
            }
        ], { include: [models.Task] }).catch((e) => { console.error(e.message) })
    })
    .then(() => app.listen(1234, () => {
        console.log(`Listening on port ${process.env.PORT}`)
    }));

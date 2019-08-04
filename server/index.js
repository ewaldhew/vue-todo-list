import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser';
import models, { sequelize } from './models';

import taskRouter from './routes/tasks';

var pgtools = require('pgtools');
pgtools.createdb({
    user: 'postgres',
    password: 'postgres',
    port: 5432,
    host: 'localhost'
}, 'taskdb', (err) => {
    if (err) {
        console.log("Database already exists");
    }
});

const createSampleData = async () => {
    await models.TaskList.bulkCreate([
        {
            id: 1,
            name: 'Work',
            tasks: [{ name: 'Do the thing', task_finished: false }]
        },
        {
            id: 2,
            name: 'Social',
            tasks: [{ name: 'Dinner with Alice and Bob', task_finished: false }]
        }],
        {
            include: [models.Task]
        }).catch((e) => { console.error(e.message) });
};

sequelize.sync().then(() => {
    createSampleData();

    app.listen(1234, () => {
        console.log(`Listening on port ${process.env.PORT}`)
    });
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

app.put('/todo/', async (req, res) => {
    try {
        let task = await models.Task.create({
            name: req.body.name,
            task_finished: false
        })
        let list = await models.TaskList.findByPk(req.body.id)
        await list.addTask(task)

        res.send({ ok: task });
    } catch (err) {
        res.send({ ok: err });
    }
})

app.get('/todo/:id', async (req, res) => {
    const task = await models.Task.findByPk(req.params.id)
    return res.send(task);
})

app.patch('/todo/:id', async (req, res) => {
    try {
        const todo = await models.Task.findByPk(req.params.id)
        todo.update(req.body)

        res.send({ ok: todo })
    } catch (err) {
        res.send({ ok: err })
    }
})

app.delete('/todo/:id', async (req, res) => {
    await models.Task.destroy({
        where: { id: req.params.id }
    })
})

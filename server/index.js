import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser';
import models, { sequelize } from './models';

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
    await models.TaskList.create({
        id: 1,
        name: 'Work',
        tasks: [{ name: 'Do the thing', task_finished: false }]
    },
    {
        include: [models.Task]
    }).catch((e) => { console.error(e.message) });

    await models.TaskList.create({
        id: 2,
        name: 'Social',
        tasks: [{ name: 'Dinner with Alice and Bob', task_finished: false }]
    },
    {
        include: [models.Task]
    }).catch((e) => { console.error(e.message) });
};

sequelize.sync()
.then(() => {
    createSampleData();

    app.listen(1234, () => {
        console.log('Listening on port ' + 1234)
    });
});

const app = express();
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Access-Control-Allow-Methods", 'GET, PUT, PATCH, DELETE, HEAD')
    next();
});

app.get('/task/', async (req, res) => {
    const lists = await models.TaskList.findAll()
    return res.send(lists)
})

app.get('/task/:id', async (req, res) => {
    const list = await models.Task.findAll({
        include: [{
            model: models.TaskList,
            where: { id: req.params.id }
        }]
    });
    const name = await models.TaskList.findByPk(req.params.id)
    return res.send({
        name: name.name,
        list: list
    });
});

app.get('/task/:id/:taskId', async (req, res) => {
    const task = await models.Task.findOne({
        where: { id: req.params.taskId },
        include: [{
            model: models.TaskList,
            where: { id: req.params.id }
        }]
    })
    return res.send(task);
});

app.put('/task/', async (req, res) => {
    const success = await models.TaskList.create({
        name: req.body.name
    });
    return res.send({
        ok: success
    })
})

app.put('/todo/', async (req, res) => {
    const success = await models.Task.create({
        name: req.body.name,
        task_finished: false
    })
    .then(async (task) => {
        await models.TaskList.findByPk(req.body.id)
        .then((list) => {
            if (list) {
                list.addTask(task)
                .then(() => {})
            }
        })
    });
    return res.send({
        ok: success
    })
})

app.get('/todo/:id', async (req, res) => {
    const task = await models.Task.findByPk(req.params.id)
    return res.send(task);
})

app.patch('/todo/:id', async (req, res) => {
    await models.Task.findByPk(req.params.id)
    .then((todo) => {
        if (todo) {
            todo.update(req.body)
            .then(() => {})
        }
    });
})

app.delete('/todo/:id', async (req, res) => {
    await models.Task.destroy({
        where: { id: req.params.id }
    })
})

const insertTask = async () => {
    await models.Task.create({
        id: 0,
        name: '',
        task_finished: false
    })
};

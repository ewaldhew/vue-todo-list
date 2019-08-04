import express from 'express';
var router = express.Router();

import models from '../models';

router.get('/', (req, res) => {
    models.TaskList.findAll()
        .then((tasks) => res.send(tasks));
});

router.get('/:id', async (req, res) => {
    try {
        const list = await models.Task.findAll({
            include: [{
                model: models.TaskList,
                where: { id: req.params.id }
            }]
        });
        const name = await models.TaskList.findByPk(req.params.id)

        res.send({
            name: name.name,
            list: list
        });
    } catch {
        res.send({})
    }
});

router.get('/:id/:taskId', async (req, res) => {
    models.Task.findOne({
        where: { id: req.params.taskId },
        include: [{
            model: models.TaskList,
            where: { id: req.params.id }
        }]
    }).then((task) => res.send(task))
});

router.put('/', async (req, res) => {
    models.TaskList.create({
        name: req.body.name
    }).then((success) => res.send({
        ok: success
    }));
});

export default router;
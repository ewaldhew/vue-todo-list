import express from 'express';
var router = express.Router();

import models from '../models';

router.put('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
    const task = await models.Task.findByPk(req.params.id)
    return res.send(task);
})

router.patch('/:id', async (req, res) => {
    try {
        const todo = await models.Task.findByPk(req.params.id)
        todo.update(req.body)

        res.send({ ok: todo })
    } catch (err) {
        res.send({ ok: err })
    }
})

router.delete('/:id', async (req, res) => {
    await models.Task.destroy({
        where: { id: req.params.id }
    })
})

export default router;

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'taskdb',
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        dialect: 'postgres'
    }
);

const models = {
    TaskList: sequelize.import('./taskList'),
    Task: sequelize.import('./task')
};

Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

export { sequelize };
export default models;

import 'sequelize';

const task = (sequelize, DataTypes) => {
    const Task = sequelize.define('task', {
        id: { type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        task_finished: DataTypes.BOOLEAN
    });

    Task.associate = (models) => {
        Task.belongsTo(models.TaskList);
    };

    return Task;
};

export default task;

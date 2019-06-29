import 'sequelize';

const taskList = (sequelize, DataTypes) => {
    const TaskList = sequelize.define('taskList', {
        id: { type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING
    });

    TaskList.associate = (models) => {
        TaskList.hasMany(models.Task, { onDelete: 'CASCADE' });
    };

    return TaskList;
}

export default taskList;

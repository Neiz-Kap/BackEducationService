const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');

// без внешних ключей
const Lesson = sequelize.define('lessons', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    date: DataTypes.DATE,
	status: DataTypes.BOOLEAN,
});

const Students = sequelize.define('students', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: DataTypes.STRING,
});

const Teachers = sequelize.define('teachers', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: DataTypes.STRING,
});

// включая внешние ключи
const LessonStudents = sequelize.define('lesson_students', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	visit: DataTypes.BOOLEAN
});

const LessonTeachers = sequelize.define('lessons_teachers', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});



Lesson.hasMany(LessonStudents);
LessonStudents.belongsTo(Lesson);

Students.hasMany(LessonStudents);
LessonStudents.belongsTo(Students);

Lesson.hasMany(LessonTeachers);
LessonTeachers.belongsTo(Teachers);

Teachers.hasMany(LessonTeachers);
LessonTeachers.belongsTo(Teachers);

module.exports = {
	Lesson,
	LessonStudents,
	Students,
	LessonTeachers,
	Teachers,
}

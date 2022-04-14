const {Lesson} = require('../models/models');
 const ApiError = require('../error/ApiError');
 const { Op } = require('sequelize')

class LessonController {
	async getAll(req, res, next){
		try{
			let {date, status, teacherIds, studentsCount, page, lessonPerPage} = req.body;

			if(!date | !Date.parse(date)) return next(ApiError.badRequest('Введена некорректная дата. Принимается дата формата YYYY-MM-DD'));
			if(date.length>10)	var newDate = date.map(el=>new Date(el).toLocaleDateString('en-CA')).split(',');
			date = (date.constructor !== Array) ? [date] : date;

			if(+status!== 1 && +status!==0) return next(ApiError.badRequest('Некорректно указан статус занятия. Принимается лишь 0 или 1'));
			if(!teacherIds) return next(ApiError.badRequest('Отсутствуют id учителя(ей) в запросе'));
			if(!studentsCount) return next(ApiError.badRequest('Нет заданного количества студентов на занятие(я)'));
			studentsCount = (studentsCount.constructor !== Array) ? [studentsCount] : studentsCount;

			page = page || 1;
			lessonPerPage = lessonPerPage || 5;

			const lessons = await Lesson.findAll({
				where: {
					[Op.between]: newDate,
					status: status,
					[Op.between]: studentsCount,
				},

				limit: lessonPerPage,
				offset: lessonPerPage * (page - 1),
				include: [
					{
						model: LessonStudents,
						attributes: [[Sequelize.fn('COUNT', Sequelize.col('visit')), 'visitCount']],
						where: {
							visit: 1,
						}
					},
// 					{
// 						model: Students,
// 						where: {choiseChoiseId: user_id}
// 					},
// 					{
// 						model: Teachers,
// 						where: {choiseChoiseId: user_id}
// 					}
				]
			});
			return res.json(lessons);
		}
		catch(e){console.log(e.message)}
	}
}
module.exports = new LessonController()

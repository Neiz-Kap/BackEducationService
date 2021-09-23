const {Lesson} = require('../models/models');
 const ApiError = require('../error/ApiError');

class LessonController {
	async getAll(req, res, next){
		let {date, status, teacherIds, studentsCount, page, lessonPerPage} = req.body;

		if(!date | !Date.parse(date)) next(ApiError.badRequest('Введена некорректная дата. Принимается дата формата YYYY-MM-DD'));
		else let newDate = date.split(',');
				// 				new Date().toISOString().
// 				replace(/T/, ' ').      // replace T with a space
// 				replace(/\..+/, '')
		}

		if(status!== 1 && status!==0) return next(ApiError.badRequest('Некорректно указан статус занятия. Принимается лишь 0 или 1'));
		if(!teacherIds) return next(ApiError.badRequest('Отсутствуют id учителя(ей) в запросе'));
		if(!studentsCount) return next(ApiError.badRequest('Нет заданного количества студентов на занятие(я)'));

		page = page || 1;
		lessonPerPage = lessonPerPage || 5;
		let offset = lessonPerPage * (page - 1);

		const lessons = await Lesson.findAll(
			where: {
				[Op.between]: newDate,
				[Op.between]: studentsCount,
				status: status,
			},
			{limit: lessonPerPage, offset}, {raw: true});
		return res.json(lessons);
	}

}

module.exports = new LessonController()

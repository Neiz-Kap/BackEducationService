const {Courses} = require('../models/models');
const ApiError = require('../error/ApiError');

class CardController {
    async getAll(req, res){
        let {limit, page} = req.query;
        page = page || 1;
        limit = limit || 12;

        let offset = limit * (page - 1);

        const courses = await Courses.findAndCountAll({limit, offset}, {raw: true});
        return res.json(courses);
    }

    async getOne(req, res, next){
		const {course_id} = req.params;
		const card = await Courses.findByPk(course_id);
		if(!card) return next(ApiError.badRequest('Курс с таким id не найден'));
		return res.json(card);
	}

	async editOne(req, res, next){
		const course = req.body;
		if(!course.course_id) return next(ApiError.badRequest('Курс с таким id не найден'));
		const updatedCourse = await Courses.findByIdAndUpdate(course.course_id, course, {new: true});
		return res.json(updatedCourse);
	}
}

module.exports = new CardController()

'use strict'
const api = require('express').Router()
const db = require('../db')
const Campus = require('../db/models/campus')
const Student = require('../db/models/student')
const {resolve} = require('path')



// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
// I know this because we automatically send index.html for all requests that don't make sense in our backend.
// Ideally you would have something to handle this, so if you have time try that out!


api.get('/campus', (req, res, next) => {
	Campus.findAll({ include: [ Student ] })
		.then(function (campuses) {
			res.json(campuses);
		})
		.catch(next)
})

api.get('/campus/:id', (req, res, next) => {
	const campusId = req.params.id;
	Campus.findById(campusId)
		.then(function (campus) {
			res.json(campus);
		})
		.catch(next);
})

api.get('/student', function (req, res, next) {
	Student.findAll()
		.then(function (students) {
			res.json(students);
		})
		.catch(next);
})

api.get('/student/:id', function (req, res, next) {
	const studentId = req.params.id;
	Student.findById(studentId)
		.then(function (student) {
			res.json(student);
		})
		.catch(next);
})

api.post('/campus', function (req, res, next) {
	Campus.create(req.body)
		.then(function (newCampus) {
			// var resBody = {
			// 	campus: newCampus
			// }
			res.status(201).json(newCampus);
		})
		.catch(next);
})

api.post('/student', function (req, res, next) {
	Student.create(req.body)
		.then(function (newStudent) {
			res.status(201).json(newStudent);
		})
		.catch(next);
})

api.put('/student/:id', function (req, res, next) {
	var studId = req.params.id;
	Student.update(
		{
			name: req.body.name,
			email: req.body.email,
			campusId: req.body.campusId
		},
		{
			returning: true,
			where: {
				id: studId
			}
		})
		.then(function ([rowsUpdated, [updatedStudent]]) {
			var resBody = {
				message: 'Updated successfully',
				student: updatedStudent
			};
			res.status(200).json(resBody);
		})
		.catch(next);
})

api.put('/campus/:id', function (req, res, next) {
	var campId = req.params.id;
	Campus.update(
		{
			name: req.body.name,
			image: req.body.image
		},
		{
			returning: true,
			where: {
				id: campId
			}
		})
		.then(function ([rowsUpdated, [updatedCampus]]) {
			var resBody = {
				message: 'Updated successfully',
				campus: updatedCampus
			};
			res.status(200).json(resBody);
		})
		.catch(next);
})

api.delete('/campus/:id', function (req, res, next) {
	var campId = req.params.id;
	Campus.destroy({
		where: {
			id: campId
		}
	})
		.then(function (err) {
			if (err) return res.send(err);
			res.json({ message: 'Deleted' });
		});
})

api.delete('/student/:id', function (req, res, next) {
	var studId = req.params.id;
	Student.destroy({
		where: {
			id: studId
		}
	})
		.then(function (err) {
			if (err) return res.send(err);
			res.json({ message: 'Deleted' });
		});
})

module.exports = api

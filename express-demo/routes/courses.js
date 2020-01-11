const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];


router.get('/', (req, res) => {
    //return all courses in real case
    res.send(courses);
});

router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);//result.error
    if (error) {
        //400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    //Look up the course
    //If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found.');
        return;
    }

    //Validate
    //If invaid, return 400
    //const result = validateCourse(req.body);
    const { error } = validateCourse(req.body);//result.error
    if (error) {
        //400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    //Update coures
    //Return the update course
    course.name = req.body.name;
    res.send(course);
});

router.delete('/:id', (req, res) => {
    //Look up the course
    //If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found.');
        return;
    }

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //Return the same course
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found.');
        return;
    }
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

module.exports = router;
const Joi = require('joi');
const express = require('express');//a function
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];
app.get('/', (req, res) => { //req has many properties, this callback function also called route handler
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    //return all courses in real case
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
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

app.put('/api/courses/:id', (req, res) => {
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

app.delete('/api/courses/:id', (req, res) => {
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

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found.');
        return;
    }
    res.send(course);
});

/*
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});
*/

//environment variable PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}
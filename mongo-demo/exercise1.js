const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected'))
    .catch(err => console.log('Connection failed...'));

const courseSchema = new mongoose.Schema({
    tags: [String],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        .find({ isPublished: true, })
        .or([
            { price: { $gte: 15 } },
            { name: /.*by.*/ }
        ])
        //.or([{ tags: 'fronend' }, { tags: 'backend' }])
        .sort({ price: -1 })
        .select({ name: 1, author: 1, tags: 1, price: 1 });
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();
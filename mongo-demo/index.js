//連上 schema model 操作
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        //match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        //uppercase:true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(()=>{
                    //do async work
                    const result = v && v.length > 0;
                    callback(result);
                },4000);
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPubkished: Boolean,
    price: {
        type: Number,
        min: 10,
        max: 200,
        required: function () { return this.isPubkished; },
        get: v=> Math.round(v),
        set: v=> Math.round(v)
    }
});

//use schema to create model, and use model to create and find docs
const Course = mongoose.model('Course', courseSchema);

async function CreateCourses() {
    const course = new Course({
        name: 'angular.js course',
        category: 'Web',
        author: 'Jason',
        tags: ['frontend'],
        isPubkished: true,
        price: 15.8
    });

    try {
        const result = await course.save();
        console.log(result);
    }
    catch (err) {
        //console.log(err.message);
        for (field in err.errors)
            console.log(err.errors[field].message);
    }
}

async function getCourses() {
    //const pageNumber = 2;
    //const pageSize = 10;
    const courses = await Course
        .find({ author: 'Jason', isPubkished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
    //.find({ price: { $gt: 10, $lte: 20 } })
    //.find({ price: { $in: [10, 15, 50] } })

    //.find()
    //.or([{ author: 'Jason' }, { isPubkished: true }])
    //.and([])

    //.find({ author: /^Mosh/ })
    //.find({ author: /chen$/i })
    //.find({ author: /.*Jason.*/i })

    //.limit(10)
    //.sort({ name: 1 }) //1 for asending order, -1...
    //.select({ name: 1, tags: 1 });
    //.count()
    console.log(courses);
}

async function updateCourse(id) {
    //Directly update in databae and return the doc
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'aaaaa',
            isPubkished: false
        }
    }, { new: true });

    console.log(course);
    //Query first
    //const course = await Course.findById(id);
    //if (!course) return console.log(course,'no this id');
    //course.isPubkished = true;
    //course.author = 'another author';
    //const result = await course.save();

    /*//Directly update in databae
    const result = await Course.update({_id:id},{
        $set:{
            author:'kkkk',
            isPubkished:false
        }
    })
    */
}

async function removeCourse(id) {
    //const result = await Course.deleteMany({ _id: id });
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

CreateCourses();
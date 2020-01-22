const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseID) {
  //const course = await Course.findById(courseID);
  //course.author.name = 'Jason';
  //course.save();

  //update directly in db
  const course = await Course.update({ _id: courseID }, {
    $unset: {
      'author': ''
    }
  });
};

async function addAuthor(courseID,author){
  const course = await Course.findById(courseID);
  course.authors.push(author);
  course.save();
};

async function removeAuthor(courseID,authorID){
  const course = await Course.findById(courseID);
  const author = course.authors.id(authorID);
  author.remove();
  course.save();
}

//updateAuthor('5e2510cf2baf0122b80f4e2b');
/*
createCourse('Node Course', [
  new Author({ name: 'Mosh' }),
  new Author({ name: 'John' })
]);
*/
//addAuthor('5e251339e2429e3a7494a96e',new Author({ name: 'Jason' }));
removeAuthor('5e251339e2429e3a7494a96e','5e251339e2429e3a7494a96c');

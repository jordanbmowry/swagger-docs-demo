const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const fileUpload = require('express-fileupload');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());

let courses = [
  {
    id: '11',
    name: 'Learn Reactjs',
    price: '299',
  },
  {
    id: '12',
    name: 'Learn Angular',
    price: '199',
  },
  {
    id: '13',
    name: 'Learn Vue',
    price: '399',
  },
];

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/v1/jbm', (req, res) => res.send('Hello from jbm docs'));

app.get('/api/v1/jbmobject', (req, res) =>
  res.json({ id: '555', name: 'Learn Backend', price: '999' })
);

app.get('/api/v1/courses', (req, res) => res.json(courses));

app.get('/api/v1/mycourse/:courseID', (req, res) => {
  const { courseID } = req.params;
  const myCourse = courses.find((course) => +course.id === +courseID);
  res.send(myCourse);
});

app.post('/api/v1/addCourse', (req, res) => {
  console.log(req.body);

  courses.push(req.body);
  res.send(true);
});

app.get('/api/v1/coursequery', (req, res) => {
  let location = req.query.location;
  let device = req.query.device;

  res.send({ location, device });
});

app.post('/api/v1/courseupload', (req, res) => {
  console.log(req.headers);
  const file = req.files.file;

  let path = __dirname + '/images/' + Date.now() + '.jpg';

  file.mv(path, (error) => {
    res.send(true);
  });
});

app.listen(4000, () => {
  console.log(`Server is running at port 4000...`);
});

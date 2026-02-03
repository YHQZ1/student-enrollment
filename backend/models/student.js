//student managent system 
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
let students = [];
let idCounter = 1;

app.use(express.json());
app.post('/students', (req, res) => {
  const student ={
    id:idCounter++,
    name:req.body.name,
    age:req.body.age,
    grade:req.body.grade
  };
  students.push(student);
  res.status(201).send(student);
});
//update student
app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id, 10);
    const student = students.find(s => s.id === studentId);     
    if (student) {
      student.name = req.body.name !== undefined ? req.body.name : student.name;
      student.age = req.body.age !== undefined ? req.body.age : student.age;
      student.grade = req.body.grade !== undefined ? req.body.grade : student.grade;
      res.status(200).send(student);
    } else {
      res.status(404).send({ message: 'Student not found' });
    }
  });
  //get all students
  app.get('/students', (req, res) => {
    res.status(200).send(students);
  });       

  //delete student
  app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id, 10);
    const index = students.findIndex(s => s.id === studentId);
    if (index !== -1) {
      students.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'Student not found' });
    }
  });

  app.get('/students', (req, res) => {
    res.status(200).send(students);
  });       
app.listen(PORT, () => {
  console.log(`Todo API server running on http://localhost:${PORT}`);
});

export default app;
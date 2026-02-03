import express from "express";
import Student from "../models/student.js";

const router = express.Router();

// Create student
router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all students
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.status(200).json(students);
});

// Update student
router.put("/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  student
    ? res.status(200).json(student)
    : res.status(404).json({ message: "Student not found" });
});

// Delete student
router.delete("/:id", async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  student
    ? res.status(204).send()
    : res.status(404).json({ message: "Student not found" });
});

// 🔴 THIS LINE IS MANDATORY
export default router;

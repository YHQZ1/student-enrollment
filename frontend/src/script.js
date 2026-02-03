const API_URL = "http://localhost:3000/students";

async function loadStudents() {
  const res = await fetch(API_URL);
  const students = await res.json();

  const list = document.getElementById("studentList");
  list.innerHTML = "";

  students.forEach(student => {
    const li = document.createElement("li");
    li.innerText = `${student.name} - ${student.grade}`;
    list.appendChild(li);
  });
}

document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const grade = document.getElementById("grade").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age, grade })
  });

  e.target.reset();
  loadStudents();
});

loadStudents();

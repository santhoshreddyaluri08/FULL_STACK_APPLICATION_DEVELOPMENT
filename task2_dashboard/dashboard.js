const tableBody = document.querySelector("#studentTable tbody");
const deptFilter = document.getElementById("deptFilter");
const sortOption = document.getElementById("sortOption");
const deptCountDiv = document.getElementById("deptCount");

let students = [];

// Fetch student data from backend
fetch("http://localhost:3000/students")
  .then(res => res.json())
  .then(data => {
    students = data;
    renderTable();
    renderDeptCount();
  });

// Render table
function renderTable() {
  let filtered = students;

  // Filter by department
  if (deptFilter.value !== "All") {
    filtered = filtered.filter(s => s.department === deptFilter.value);
  }

  // Sort
  if (sortOption.value === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption.value === "dob") {
    filtered.sort((a, b) => new Date(a.dob) - new Date(b.dob));
  }

  // Populate table
  tableBody.innerHTML = "";
  filtered.forEach(s => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${s.name}</td>
      <td>${s.email}</td>
      <td>${s.dob}</td>
      <td>${s.department}</td>
      <td>${s.phone}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Render department count
function renderDeptCount() {
  const counts = {};
  students.forEach(s => counts[s.department] = (counts[s.department] || 0) + 1);
  deptCountDiv.innerHTML = Object.keys(counts).map(d => `<p>${d}: ${counts[d]}</p>`).join("");
}

// Event listeners
deptFilter.addEventListener("change", renderTable);
sortOption.addEventListener("change", renderTable);
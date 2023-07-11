(async function () {
  const data = await fetch("data.json");
  const res = await data.json();

  let employees = res;
  let selectedEmployeeID = employees[0].id;
  let selectedEmployee = employees[0];

  const employeesList = document.querySelector(".employee-list");
  const employeesInfo = document.querySelector(".employee-info");

  const createEmployee = document.querySelector(".create-employee");
  const addEmployeeModal = document.querySelector(".addEmployee");
  const addEmployeeForm = document.querySelector(".create");

  createEmployee.addEventListener("click", () => {
    addEmployeeModal.style.display = "flex";
  });

  addEmployeeModal.addEventListener("click", (e) => {
    e.target.className === "addEmployee" &&
      (addEmployeeModal.style.display = "none");
  });

  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addEmployeeForm);
    const values = [...formData.entries()];

    let empData = {};
    values.forEach((val) => {
      empData[val[0]] = val[1];
    });
    empData.id = employees[employees.length - 1].id + 1;
    empData.age =
      new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
    empData.imageUrl =
      empData.imageUrl || "https://cdn.iconscout.com/icon/free/png-512/free-account-2-83553.png?f=avif&w=256";
    employees.push(empData);
    renderEmployees();
    addEmployeeForm.reset();
    addEmployeeModal.style.display = "none";
  });

  const dobInput = document.querySelector(".dob");
  dobInput.max = `${new Date().getFullYear() - 18}-${new Date()
    .toISOString()
    .slice(5, 10)}`;

  const renderEmployees = () => {
    employeesList.innerHTML = "";
    employees.forEach((emp) => {
      const employee = document.createElement("span");
      employee.classList.add("employee-name-item");
      if (parseInt(selectedEmployeeID, 10) === emp.id) {
        employee.classList.add("selected");
        selectedEmployee = emp;
      }
      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">🧨</i>`;
      employeesList.append(employee);
    });
  };

  employeesList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && selectedEmployeeID !== e.target.id) {
      selectedEmployeeID = e.target.id;
      renderEmployees();
      renderSingleEmployee();
    }

    if (e.target.tagName === "I") {
      employees = employees.filter(
        (emp) => String(emp.id) !== e.target.parentNode.id
      );
      if (String(selectedEmployeeID) === e.target.parentNode.id) {
        selectedEmployeeID = employees[0]?.id || -1;
        selectedEmployee = employees[0] || {};
        renderSingleEmployee();
      }
      renderEmployees();
    }
  });

  const renderSingleEmployee = () => {
    if (selectedEmployeeID === -1) {
      employeesInfo.innerHTML = "No Records";
      return;
    }
    employeesInfo.innerHTML = `
    <img src="${selectedEmployee.imageUrl}"/>
    <span class="info-heading">
    ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
    </span>
    <span>${selectedEmployee.address}</span>
    <span>${selectedEmployee.email}</span>
    <span>Mobile - ${selectedEmployee.contactNumber}</span>
    <span>DOB - ${selectedEmployee.dob}</span>
    `;
  };

  renderSingleEmployee();
  renderEmployees();
})();

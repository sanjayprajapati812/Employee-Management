import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service.js";

export default class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmpName = this.onChangeEmpName.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.newEmployee = this.newEmployee.bind(this);

    this.state = {
      id: null,
      employee_name: "",
      employee_salary: "",
      employee_age: null,
      submitted:false
    };
  }

  onChangeEmpName(e) {
    this.setState({
      employee_name: e.target.value
    });
  }

  onChangeSalary(e) {
    this.setState({
      employee_salary: e.target.value
    });
  }

  onChangeAge(e) {
    this.setState({
      employee_age: e.target.value
    });
  }

  saveEmployee() {
    var data = {
      employee_name: this.state.employee_name,
      employee_salary: this.state.employee_salary,
      employee_age: this.state.employee_age,
    };

    EmployeeDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          employee_name: response.data.employee_name,
          employee_salary: response.data.employee_salary,
          employee_age: response.data.employee_age,
          submitted:true
        });
      })
      .catch(e => {
        alert("Error while creating employee")
      });
  }

  newEmployee() {
    this.setState({
      id: null,
      employee_name: "",
      employee_salary: "",
      employee_age: null,
      submitted:false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Employee created successfully!</h4>
            <button className="btn btn-success" onClick={this.newEmployee}>
              Create New
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="emp_name">Employee Name</label>
              <input
                type="text"
                className="form-control"
                id="emp_name"
                required
                value={this.state.employee_name}
                onChange={this.onChangeEmpName}
                name="emp_name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="emp_salary">Salary</label>
              <input
                type="text"
                className="form-control"
                id="emp_salary"
                required
                value={this.state.employee_salary}
                onChange={this.onChangeSalary}
                name="emp_salary"
              />
            </div>

            <div className="form-group">
              <label htmlFor="emp_age">Age</label>
              <input
                type="text"
                className="form-control"
                id="emp_age"
                required
                value={this.state.employee_age}
                onChange={this.onChangeAge}
                name="emp_age"
              />
            </div>

            <button onClick={this.saveEmployee} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

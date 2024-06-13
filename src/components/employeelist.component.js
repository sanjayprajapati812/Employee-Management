
import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service.js";
import { Link } from "react-router-dom";

export default class EmployeesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchEmpName = this.onChangeSearchEmpName.bind(this);
    this.retrieveEmployees = this.retrieveEmployees.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEmployee = this.setActiveEmployee.bind(this);
    //this.removeAllEmployees = this.removeAllEmployees.bind(this);
    this.searchEmployee = this.searchEmployee.bind(this);

    this.state = {
      employees: [],
      currentEmployee: null,
      currentIndex: -1,
      searchEmployee: ""
    };
  }

  componentDidMount() {
    this.retrieveEmployees();
  }

  onChangeSearchEmpName(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchEmployee: searchTitle
    });
  }

  retrieveEmployees() {
    EmployeeDataService.getAll()
      .then(response => {
        this.setState({
          employees: response.data.data
        });
        return response.data.data;
      }).then((data)=>{
        this.setActiveEmployee(data[0], 0)
      })
      .catch(e => {
        alert("errror while retrieveing employees")
      });
  }

  refreshList() {
    this.retrieveEmployees();
    this.setState({
      currentEmployee: null,
      currentIndex: -1
    });
  }

  setActiveEmployee(employee, index) {
    this.setState({
      currentEmployee: employee,
      currentIndex: index
    });
  }

  // removeAllEmployees() {
  //   EmployeeDataService.deleteAll()
  //     .then(response => {
  //       console.log(response.data);
  //       this.refreshList();
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  searchEmployee() {
    this.setState({
      currentEmployee: null,
      currentIndex: -1
    });

    EmployeeDataService.getAll()
      .then(response => {
        response = response.data.data.filter(x => x.employee_name == this.state.searchEmployee)
        this.setState({
          employees: response
        });
      }).then((response)=>{
        if(response.length>0){
          this.setActiveEmployee(response[0], 0)
        }
      })
      .catch(e => {
        alert("Error while retrieving employees");
      });
  }

  render() {
    const { searchEmployee, employees, currentEmployee, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Employee Name"
              value={searchEmployee}
              onChange={this.onChangeSearchEmpName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchEmployee}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Employees List</h4>

          <ul className="list-group">
            {employees &&
              employees.map((employee, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveEmployee(employee, index)}
                  key={index}
                >
                  {employee.employee_name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6 list-comp">
          {currentEmployee ? (
            <div>
              <h4>Employee Detail</h4>
              <div>
                <label>
                  <strong>Employee:</strong>
                </label>{" "}
                {currentEmployee.employee_name}
              </div>
              <div>
                <label>
                  <strong>Salary:</strong>
                </label>{" "}
                {currentEmployee.employee_salary}
              </div>
              <div>
                <label>
                  <strong>Age:</strong>
                </label>{" "}
                {currentEmployee.employee_age}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentEmployee ? "Active" : "Active"}
              </div>

              <Link
                to={"/employees/" + currentEmployee.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p></p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

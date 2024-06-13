
import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service.js";
import { withRouter } from '../common/with-router';

class Employee extends Component {
  constructor(props) {
    super(props);
    this.OnChangeEmpName = this.OnChangeEmpName.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.getEmployee = this.getEmployee.bind(this);
    //this.updatePublished = this.updatePublished.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);

    this.state = {
      currentEmployee: {
        id: null,
        employee_name: "",
        employee_salary:null,
        employee_age: null
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getEmployee(this.props.router.params.id);
  }

  OnChangeEmpName(e) {
    const emp_name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentEmployee: {
          ...prevState.currentEmployee,
          employee_name: emp_name
        }
      };
    });
  }

  onChangeSalary(e) {
    const emp_sal = e.target.value;

    this.setState(function(prevState) {
      return {
        currentEmployee: {
          ...prevState.currentEmployee,
          employee_salary: emp_sal
        }
      };
    });
  }

  onChangeAge(e) {
    const emp_age = e.target.value;
    
    this.setState(prevState => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        emp_age: emp_age
      }
    }));
  }

  getEmployee(id) {
    EmployeeDataService.get(id)
      .then(response => {
        this.setState({
          currentEmployee: response.data.data
        });
      })
      .catch(e => {
        alert("Error while getting employee detail")
      });
  }

  updateEmployee() {
    EmployeeDataService.update(
      this.state.currentEmployee.id,
      this.state.currentEmployee
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Employee was updated successfully!"
        });
      })
      .catch(e => {
        alert("Error while Updating employee")
      });
  }

  deleteEmployee() {    
    EmployeeDataService.delete(this.state.currentEmployee.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/employees');
      })
      .catch(e => {
        alert("error while deteing employee")
      });
  }

  render() {
    const { currentEmployee } = this.state;

    return (
      <div>
        {currentEmployee ? (
          <div className="edit-form">
            <h4>Employee</h4>
            <form>
              <div className="form-group">
                <label htmlFor="emp_name">Employee Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="emp_name"
                  value={currentEmployee.employee_name}
                  onChange={this.OnChangeEmpName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="emp_sal">Employee Salary</label>
                <input
                  type="text"
                  className="form-control"
                  id="emp_sal"
                  value={currentEmployee.employee_salary}
                  onChange={this.onChangeSalary}
                />
              </div>

              <div className="form-group">
                <label htmlFor="emp_age">Employee Age</label>
                <input
                  type="text"
                  className="form-control"
                  id="emp_age"
                  value={currentEmployee.employee_age}
                  onChange={this.onChangeAge}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteEmployee}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateEmployee}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Employee...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Employee);

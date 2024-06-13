import React, { Component } from "react";
import { useState, Suspense, lazy } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Loading from './components/loading.component.js';

import AddEmployee from "./components/addemployee.component.js";
import Employee from "./components/employee.component.js";
const EmployeeList = lazy(() => delayForDemo(import('./components/employeelist.component.js')));

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="nav-div">
            <Link to={"/employees"} className="navbar-brand">
              React
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/employees"} className="nav-link">
                  All Employees
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </div>

        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Suspense fallback={<Loading />}>
              <EmployeeList />
            </Suspense>} />
            <Route path="/employees" element={<Suspense fallback={<Loading />}>
              <EmployeeList />
            </Suspense>} />
            <Route path="/add" element={<AddEmployee />} />
            <Route path="/employees/:id" element={<Employee />} />
          </Routes>
        </div>
      </div>
    );
  }
}

function delayForDemo(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 4000);
  }).then(() => promise);
}

export default App;

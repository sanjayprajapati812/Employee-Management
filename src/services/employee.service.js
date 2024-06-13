import http from "../http-common";

class EmployeeDataService {
  getAll() {
    return http.get("/employees");
  }

  get(id) {
    return http.get(`/employee/${id}`);
  }

  create(data) {
    return http.post("/create", data);
  }

  update(id, data) {
    return http.put(`/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/delete/${id}`);
  }
}

export default new EmployeeDataService();
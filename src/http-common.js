import axios from "axios";

export default axios.create({
  baseURL: "https://dummy.restapiexample.com/api/v1/",
  headers: {
    "Content-type": "application/json"
  }
});
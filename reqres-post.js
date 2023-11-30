import http from "k6/http";
import { check, sleep } from "k6";

const baseUrl = "https://reqres.in/api";

export const options = {
  vus: 15,
  duration: "1s",
};

function check_response(res) {
  check(res, {
    "is status 201": (r) => r.status === 201, //status code
    "response body contains id": (r) => r.body.includes("id"),
    "response body contains createdAt": (r) => r.body.includes("createdAt"),
  });
}

let headers = { "Content-Type": "application/json" };
let jsonData = JSON.stringify({
  name: "Dima",
  job: "QA",
});

export default function () {
  const response = http.get(baseUrl + "/users", jsonData, {
    headers: headers,
  });
  check_response(response);
  sleep(1);
}

import http from "k6/http";
import { check, sleep } from "k6";

const baseUrl = "https://reqres.in/api";

export const options = {
  vus: 1,
  duration: "1s",
};

function check_response(res) {
  check(res, {
    "is status 200": (r) => r.status === 200,
    "response body not empty": (r) => r.body.length > 0,
    "response time is less than 200ms": (r) => r.timings.duration < 200,
    "is JSON": (r) => r.headers["Content-Type"] === "application/json",
    "contains expected ID": (r) => JSON.parse(r.body).data[0].id === 7,
  });
}

export default function () {
  const response = http.get(baseUrl + "/users?page=2");
  check_response(response);
  sleep(1);
}

import http from "k6/http";
import { check, sleep } from "k6";

const baseUrl = "https://reqres.in/api";

export const options = {
  vus: 1,
  duration: "1s",
};

function check_response(res) {
  check(res, {
    "is status 200": (r) => r.status === 200, //status code
    "response body not empty": (r) => r.body.length > 0, // body have some value
    "response time is less than 200ms": (r) => r.timings.duration < 200, //response time less 200ms
    "is JSON": (r) => r.headers["Content-Type"] === "application/json", // resposponse is JSON
    "contains expected ID": (r) => JSON.parse(r.body).data[0].id === 7, //inside of data we have ID
  });
}

export default function () {
  const response = http.get(baseUrl + "/users?page=2");
  check_response(response);
  sleep(1);
}

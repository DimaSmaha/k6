/*
*Load testing* – 10k users/hr –
 ==response time== with a ==big==, and 
 ==expected load of users==. 
 As well as their peak loads
*/

import http from "k6/http";
import { check, sleep } from "k6";

const baseUrl = "https://reqres.in/api";

export const options = {
  insecureSlipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: "20s", target: 200 }, //normal load
    { duration: "60s", target: 200 },
    { duration: "20s", target: 300 }, //normal load peak
    { duration: "60s", target: 300 },
    { duration: "60s", target: 0 }, //go back
  ], // generally better to create those test for like 10-20m
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
  const response = http.post(baseUrl + "/users", jsonData, {
    headers: headers,
  });
  check_response(response);
  sleep(1);
}

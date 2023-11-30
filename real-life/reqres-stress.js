/*
*Stress testing* – 100k users/hr – 
Verifies your system under the ==huge amount== of users, 
determines the ==breaking point==, 
max users and then failure. 
*/

import http from "k6/http";
import { check, sleep } from "k6";

const baseUrl = "https://reqres.in/api";

export const options = {
  insecureSlipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: "15s", target: 200 }, //belove normal load
    { duration: "15s", target: 200 },
    { duration: "60s", target: 400 }, //Normal load
    { duration: "60s", target: 400 },
    { duration: "40s", target: 500 }, //around breaking point
    { duration: "40s", target: 500 },
    { duration: "50s", target: 650 }, //beyong breaking point
    { duration: "50s", target: 650 },
    { duration: "120s", target: 0 }, //scale down recover
  ], // generally better to create those test for like 30-40m
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

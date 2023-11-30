/*
*Spike testing* – 10k users/hr >> 50k users/hr  
– check the performance of your system when there’s
 a ==sudden surge of traffic==. 
 Check here a response time
*/

import http from "k6/http";
import { check, sleep } from "k6";

const baseUrl = "https://reqres.in/api";

export const options = {
  insecureSlipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: "15s", target: 100 }, //belove normal load
    { duration: "30s", target: 100 },
    { duration: "10s", target: 800 }, //Spike to 800
    { duration: "60s", target: 800 },
    { duration: "10s", target: 100 }, //beyong breaking point
    { duration: "30s", target: 100 },
    { duration: "60s", target: 0 }, //scale down recover
  ], // generally better to create those test for like 10m
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

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
    "response body contains updatedAt": (r) => r.body.includes("updatedAt"),
  });
}

let headers = { "Content-Type": "application/json" };
let jsonData = JSON.stringify({
  name: "Dima",
  job: "QA",
});

export default function () {
  const response = http.put(baseUrl + "/users/2", jsonData, {
    headers: headers,
  });
  check_response(response);
  sleep(1);
}

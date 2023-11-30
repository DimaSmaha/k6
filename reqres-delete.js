import http from "k6/http";
import { check, sleep } from "k6";

const baseUrl = "https://reqres.in/api";

export const options = {
  vus: 300,
  duration: "1s",
};

function check_response(res) {
  check(res, {
    "is status 204": (r) => r.status === 204, //status code
    "response body contains updatedAt": (r) => r.body.length === 0,
  });
}

export default function () {
  const response = http.del(baseUrl + "/users/2");
  check_response(response);
  sleep(1);
}

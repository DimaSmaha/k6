import http from "k6/http";
import { check, sleep } from "k6";

const baseUrl = "https://reqres.in/api";

export const options = {
  vus: 1,
  duration: "1s",
};

function check_response(res) {
  check(res, {
    "is status 404": (r) => r.status === 404, //status code
    "response body empty": (r) => r.body === "{}",
  });
}

export default function () {
  const response = http.get(baseUrl + "/users/23");
  check_response(response);
  sleep(1);
}

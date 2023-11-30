import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 5,
  duration: "15s",
};

export default function () {
  const response = http.get("https://test.k6.io");
  check(response, {
    "is status 200": (r) => r.status === 200,
    "is status OK": (r) => r.status_text === "OK",
    "response body not empty": (r) => r.body.length > 0,
  });
}

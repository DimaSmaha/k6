import http from "k6/http";
import { check, sleep } from "k6";

const baseUrl = "https://reqres.in/api";

export const options = {
  stages: [
    { duration: "10s", target: 15 }, //increase to 5 for 5 seconds
    { duration: "5s", target: 40 }, //increase 5 more for other 5 seconds
    { duration: "10s", target: 10 }, //decrease 5 users for 5 seconds
  ],
};
function check_responseGet(res) {
  check(res, {
    "is status 200": (r) => r.status === 200, //status code
    "response body not empty": (r) => r.body.length > 0, // body have some value
    "response time is less than 200ms": (r) => r.timings.duration < 200, //response time less 200ms
    "is JSON": (r) => r.headers["Content-Type"] === "application/json", // resposponse is JSON
    "contains expected ID": (r) => JSON.parse(r.body).data[0].id === 7, //inside of data we have ID
  });
}

function check_responsePost(res) {
  check(res, {
    "is status 201": (r) => r.status === 201, //status code
    "response body contains id": (r) => r.body.includes("id"),
    "response body contains createdAt": (r) => r.body.includes("createdAt"),
  });
}

function check_responsePut(res) {
  check(res, {
    "is status 200": (r) => r.status === 200, //status code
    "response body contains updatedAt": (r) => r.body.includes("updatedAt"),
  });
}

function check_responseDelete(res) {
  check(res, {
    "is status 204": (r) => r.status === 204, //status code
    "response body contains updatedAt": (r) => r.body.length === 0,
  });
}

let headers = { "Content-Type": "application/json" };
let jsonData = JSON.stringify({
  name: "Dima",
  job: "QA",
});

// snoozes to not hammer this api call constanlty
export default function () {
  const getResponse = http.get(baseUrl + "/users?page=2");
  check_responseGet(getResponse);
  sleep(1);
  const postResponse = http.post(baseUrl + "/users", jsonData, {
    headers: headers,
  });
  check_responsePost(postResponse);
  sleep(1);
  const putResponse = http.put(baseUrl + "/users/2", jsonData, {
    headers: headers,
  });
  check_responsePut(putResponse);
  sleep(1);
  const deleteResponse = http.del(baseUrl + "/users/2");
  check_responseDelete(deleteResponse);
  sleep(1);
}

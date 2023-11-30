import http from "k6/http";

export const options = {
  stages: [
    { duration: "5s", target: 5 }, //increase to 5 for 5 seconds
    { duration: "10s", target: 10 }, //increase 5 more for other 5 seconds
    { duration: "5s", target: 5 }, //decrease 5 users for 5 seconds
  ],
};

export default function () {
  const response = http.get("https://test.k6.io");
  console.log(response.body);
}

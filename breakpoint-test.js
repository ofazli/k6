import http from "k6/http";
import { sleep } from "k6";

export const options = {
  //in this example, the stages means the test will run for 10s with 10 virtual users, then for 30s with 10 virtual users, then for 10s with 0 virtual users
  //this is a way to simulate a real-world scenario where the load on the server increases and decreases
  stages: [
    {
      //duration is the time the test will run for
      duration: "2h",
      target: 10000,
    },
  ],
};

export default function () {
  http.get("https://quickpizza.grafana.com/test.k6.io/");
  sleep(1);
}

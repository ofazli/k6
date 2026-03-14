import http from "k6/http";
import { sleep } from "k6";

export const options = {
  //in this example, the stages means the test will run for 10s with 10 virtual users, then for 30s with 10 virtual users, then for 10s with 0 virtual users
  //this is a way to simulate a real-world scenario where the load on the server increases and decreases
  stages: [
    {
      //duration is the time the test will run for
      duration: "10s",
      target: 10,
    },
    {
      //target is the number of virtual users to simulate
      duration: "30s",
      target: 10,
    },
    {
      //target is the number of virtual users to simulate
      //in this case, the test will run for 10s with 0 virtual users
      //this is a way to simulate a real-world scenario where the load on the server decreases
      duration: "10s",
      target: 0,
    },
  ],
};

export default function () {
  http.get("https://quickpizza.grafana.com/test.k6.io/");
  sleep(1);
  http.get("https://quickpizza.grafana.com/contacts.php");
  sleep(2);
  http.get("https://quickpizza.grafana.com/news.php");
  sleep(2);
}

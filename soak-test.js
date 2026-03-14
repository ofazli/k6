import http from "k6/http";
import { sleep } from "k6";

export const options = {
  //in this example, the stages means the test will run for 10s with 10 virtual users, then for 30s with 10 virtual users, then for 10s with 0 virtual users
  //this is a way to simulate a real-world scenario where the load on the server increases and decreases
  stages: [
    {
      //duration is the time the test will run for
      duration: "5m",
      target: 1000,
    },
    {
      //target is the number of virtual users to simulate
      //soak test will run for 8 hours with 1000 virtual users
      //this test will run 8 hours with 1000 virtual users and shows up the memory usage of the server
      //find memory leaks in the server
      //find the bottleneck of the server
      //find the slowest endpoint of the server
      //find the slowest database query of the server
      //find the slowest API call of the server
      //find the slowest page load of the server
      //find the slowest email send of the server
      //find the slowest file upload of the server
      //find the slowest file download of the server
      //find the slowest file transfer of the server
      //find the slowest file processing of the server
      //find the slowest file storage of the server
      //find the slowest file retrieval of the server
      //find the slowest file processing of the server
      //find the slowest file storage of the server
      //find the slowest file retrieval of the server
      //find the slowest file processing of the server
      //find the slowest file storage of the server
      //find the slowest file retrieval of the server
      //find the slowest file processing of the server
      //find the slowest file storage of the server
      //find the slowest file retrieval of the server
      duration: "8h",
      target: 1000,
    },
    {
      //target is the number of virtual users to simulate
      //in this case, the test will run for 10s with 0 virtual users
      //this is a way to simulate a real-world scenario where the load on the server decreases
      duration: "5m",
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

import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1, // number of virtual users
  duration: "30s", // duration of the test
};

export default function () {
  http.get("https://quickpizza.grafana.com/test.k6.io/");
  sleep(1);
  http.get("https://quickpizza.grafana.com/contact.php");
  sleep(2);
  http.get("https://quickpizza.grafana.com/news.php");
  sleep(2);
}

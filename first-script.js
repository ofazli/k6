import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 10, // number of virtual users
  duration: "10s", // duration of the test
  summaryMode: "full",
};

export default function () {
  http.get("https://quickpizza.grafana.com/test.k6.io/");
  sleep(1);
}

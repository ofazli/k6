import http from "k6/http";
import { check, sleep, group } from "k6";

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<500"],
  },
};

export default () => {
  group("Main page", function () {
    let res = http.get("https://quickpizza.grafana.com/test.k6.io/");
    check(res, { "status is 200": (r) => r.status === 200 });

    group("Assets", function () {
      http.get("https://quickpizza.grafana.com/test.k6.io/static/css/site.css");
    });
  });

  group("News page", function () {
    http.get("https://quickpizza.grafana.com/news.php");
  });

  group("Flip coin page", function () {
    http.get("https://quickpizza.grafana.com/flip_coin.php");
    sleep(1);
  });
};

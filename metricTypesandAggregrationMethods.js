import http from "k6/http";
import { check } from "k6";
import { sleep } from "k6";

export const options = {
  vus: 10,
  duration: "10s",
  thresholds: {
    http_req_duration: ["p(95)<200", "max<200"], //p(95) and max<200 are the thresholds for the http_req_duration metric
    http_req_failed: ["rate<0.01"],
    http_reqs: ["count>=50", "rate>4.7"], // 50 requests per second and 4.7 requests per second http_reqs -> : 50     4.81964/s
    vus: ["value>9"], // Greater than 9 virtual users this is the rule for the virtual users
  },
};

export default () => {
  const res = http.get("https://quickpizza.grafana.com/test.k6.io/");
  check(res, {
    "status is 200": (r) => r.status === 200,
    "page is startpage": (r) => r.body.includes("QuickPizza Legacy"),
  });
  sleep(2);
};

/*

Aggregation methods:
http_req_blocked	Trend	Time spent blocked (waiting for a free TCP connection slot) before initiating the request. float
http_req_connecting	Trend	Time spent establishing TCP connection to the remote host. float
http_req_duration	Trend	Total time for the request. It’s equal to http_req_sending + http_req_waiting + http_req_receiving 
(i.e. how long did the remote server take to process the request and respond, without the initial DNS lookup/connection times). float
http_req_failed	Rate	The rate of failed requests according to setResponseCallback.
http_req_receiving	Trend	Time spent receiving response data from the remote host. float
http_req_sending	Trend	Time spent sending data to the remote host. float
http_req_tls_handshaking	Trend	Time spent handshaking TLS session with remote host
http_req_waiting	Trend	Time spent waiting for response from remote host (a.k.a. “time to first byte”, or “TTFB”). float
http_reqs	    Counter	How many total HTTP requests k6 generated.
*/

import http from "k6/http";
import { check, sleep } from "k6";
import { Counter, Trend } from "k6/metrics";

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<500"],
    "http_req_duration{page : order}": ["p(95)<500"],
    http_errors: ["count==0"],
    "http_errors{page : order}": ["count==0"],
    checks: ["rate>=0.99"],
    "checks{page : order}": ["rate>=0.99"],
  },
};

let httpErrors = new Counter("http_errors");

export default () => {
  let res = http.get(
    "https://665a15e8ebd94b92a26543a5a5a12104.api.mockbin.io/",
  );

  if (res.error) {
    httpErrors.add(1);
  }

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  //submit order
  res = http.get("https://57b7d21d3056466ba947d1d68f3b132a.api.mockbin.io/", {
    tags: {
      page: "order",
    },
  });

  if (res.error) {
    httpErrors.add(1, { page: "order" });
  }

  check(
    res,
    {
      "status is 201": (r) => r.status === 201,
    },
    { page: "order" },
  );
};

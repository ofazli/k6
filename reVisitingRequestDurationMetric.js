import http from "k6/http";
import { check, sleep, group } from "k6";

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<500"],
    "http_req_duration{expected_response:true}": ["p(95)<500"],
    "group_duration{group:::Main page}": ["p(95)<600"],
    "group_duration{group:::News page}": ["p(95)<500"],
    "group_duration{group:::Flip coin page}": ["p(95)<1800"],
    "group_duration{group:::Main page::Assets}": ["p(95)<500"],
  },
};

export default () => {
  group("Main page", function () {
    let res = http.get(
      "https://57b7d21d3056466ba947d1d68f3b132a.api.mockbin.io/",
    );
    check(res, { "status is 201": (r) => r.status === 201 });

    group("Assets", function () {
      http.get("https://57b7d21d3056466ba947d1d68f3b132a.api.mockbin.io/");
    });
  });

  group("News page", function () {
    //status code 503
    http.get("https://900afec55c404db2b645242e4e70bb8f.api.mockbin.io/");
  });

  group("Flip coin page", function () {
    http.get("https://57b7d21d3056466ba947d1d68f3b132a.api.mockbin.io/");
    sleep(1);
  });
};

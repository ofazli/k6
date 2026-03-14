import http from "k6/http";
import { sleep } from "k6";
import exec from "k6/execution";

export const options = {
  vus: 10,
  duration: "60s",
};

export function setup() {
  let rest = http.get("https://httpstat.us/500");
  if (rest.error) {
    exec.test.abort("Aborting test. Application is down");
  }
}

export default function () {
  http.get("https://httpstat.us/500");
  sleep(1);
}

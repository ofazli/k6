import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  duration: "5s",
};

console.log(" --- init stage ---");

export default function (data) {
  console.log(" --- VU stage ---");
  //   console.log(data)
  sleep(1);
}

export function setup() {
  console.log(" --- setup stage ---");
  sleep(10);
  //setup is called before the first VU is started and called only once
  const data = {
    foo: "bar",
  };
  return data;
}

export function teardown(data) {
  console.log(" --- Teardown stage ---");
  //teardown is called after the last VU is finished and called only once
}
